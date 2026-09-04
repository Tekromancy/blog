---
title: "The Crucible of Hackers: The History of CTFs, Red vs. Blue Teaming, and Open-Source Lab Frameworks"
description: "From DEF CON 4's ethernet cables to modern adversary emulation: the evolution of Capture The Flag, offensive/defensive tradecraft, and the definitive guide to open-source CTF platforms."
pubDate: "2026-09-04"
heroImage: "6.jpg"
tags: ["security", "ctf", "red-team", "blue-team", "linux"]
author: "Joshua Edward McLaughlin Cox"
---

Long before structured corporate compliance, cyber insurance matrices, or enterprise SIEM platforms, computer security was forged in the fire of direct technical combat. 

The concepts of **Capture The Flag (CTF)** competitions and **Red vs. Blue teaming** are the crucible through which modern offensive security, vulnerability research, and incident response were born. What began as informal wargames among underground phreakers, military war-gamers, and DEF CON attendees has evolved into sophisticated adversary emulation frameworks, automated attack-defense ranges, and global cyber exercises.

This deep dive traces the history of CTF competitions and Red/Blue doctrine, breaks down the core competitive formats, and provides a comparative technical guide to the best open-source Git repositories for building your own CTF competitions and security testing labs.

---

## Part I: The Origins of Red vs. Blue Teaming

The concept of dividing a security exercise into opposing teams did not originate in Silicon Valley; it was borrowed directly from Cold War military doctrine and strategic war-gaming.

### 1. Military Roots and the Red Cell
During the 1960s and 70s, the US Department of Defense and think tanks like the RAND Corporation formalized the concept of **Red Teaming**: assigning an independent group of tactical experts to think, plan, and execute like an adversary (the Soviet Union or Warsaw Pact) against friendly defenses ("Blue Team"). 

In the 1980s, the US Navy created the infamous **Red Cell** (headed by Richard Marcinko), tasked with testing physical and logistical security at naval bases, submarines, and nuclear installations. Their methods—picking locks, forging identification credentials, planting fake explosives, and capturing high-value targets—demonstrated that checklist compliance was meaningless against determined adversaries.

### 2. The Birth of Cyber Red Teaming: Eligible Receiver 97
In 1997, the US military executed **Exercise Eligible Receiver 97**. A Department of Defense Red Team was instructed to use exclusively publicly available, commercial-off-the-shelf software and scripts downloaded from underground hacker sites. 

Within days, the Red Team compromised critical command-and-control grids, gained root access to power and telecommunication switches, and demonstrated that computer networks were vulnerable to catastrophic disruption. Eligible Receiver served as the wake-up call that sparked modern offensive cyber operations and institutional Blue Team monitoring.

```
       [ THREAT INTELLIGENCE ]
                 |
                 v
   +---------------------------+          +---------------------------+
   |         RED TEAM          |          |         BLUE TEAM         |
   |   Adversary Simulation    |  ======> |   Detection & Hardening   |
   |  Exploitation / C2 / TTPs |  Combat  |   SIEM / EDR / Forensics  |
   +---------------------------+          +---------------------------+
                 \                             /
                  \                           /
                   v                         v
               +---------------------------------+
               |          PURPLE TEAM            |
               |  Collaborative Feedback Loop    |
               |  Measure & Optimize Detections  |
               +---------------------------------+
```

---

## Part II: The Evolution of Capture The Flag (CTF)

### 1. DEF CON 4 (1996): Physical Hackers and 10BASE-T Hubs
The first formal computer security CTF was organized at **DEF CON 4 in 1996** in Las Vegas. Inspired by the traditional outdoor game, organizers set up physical Ethernet cables, unmanaged hubs, and Linux/BSD servers in a conference room. 

Participants were tasked with breaking into a target machine, finding a designated secret string (the "flag"), and transmitting it back to prove unauthorized access. In those early days, raw packet sniffing over unencrypted hubs and ARP spoofing were rampant, and defense often consisted of writing bash scripts to kill incoming telnet sessions or patch binary vulnerabilities in `/bin/login`.

### 2. The Rise of Attack-Defense (DEF CON CTF)
As competitions grew in sophistication, the **Attack-Defense** paradigm became the gold standard for premier tournaments:
- Each team receives an identical, pre-configured server image containing custom proprietary services written in C, C++, or assembly.
- Every service contains deliberate zero-day vulnerabilities (buffer overflows, format string bugs, race conditions, flawed crypto).
- A central scoring engine periodically places new secret flags into each team's services.
- **The Objective**: Teams must reverse engineer the binary, discover the vulnerability, write an automated exploit to steal flags from all rival teams, and patch their own binary without breaking the service's legitimate functionality (service availability SLA).

Over the decades, organizing DEF CON CTF passed through legendary hacker collectives:
- **K2 and DEF CON staff** (late 1990s)
- **Goolsbey and DDL** (early 2000s)
- **Kenshoto** (2006–2010)
- **Legitimate Business Syndicate (LegitBS)** (2013–2017), who introduced custom processor architectures like DEFCON x86 and custom architectures running on raw QEMU.
- **Order of the Overflow (OOO)** (2018–2021)
- **Nautilus Institute** (2022–Present)

### 3. The Modern Competition Formats

Today, CTF events generally fall into three distinct architectures:

| Format | Mechanics | Target Skillsets | Typical Scenarios |
| :--- | :--- | :--- | :--- |
| **Jeopardy** | Static challenges across categories (Web, Pwn, Reverse, Crypto, Forensics) with point values scaling by difficulty. | Broad technical problem solving, code auditing, exploit writing. | CTFtime global circuit, picoCTF, Google CTF, DEF CON Quals. |
| **Attack-Defense** | Live real-time combat between rival teams defending identical networked server infrastructure. | Binary patching, protocol reversing, automated exploit scripting, packet sniffing. | DEF CON Finals, HITCON, iCTF, FAUST CTF. |
| **King of the Hill (KotH)** | Multiple teams battle for persistent root access on designated target machines, actively defending their foothold while evicting rival backdoors. | Post-exploitation, privilege escalation, persistent rootkits, Linux process hunting. | DEF CON OpenCTF, HackTheBox KotH, university cyber ranges. |

---

## Part III: Top Open-Source Git Repositories for Building Your Own CTF

If you want to host an internal company cyber exercise, university tournament, or homelab training arena, you don't need to write a scoring platform from scratch. Below is an exhaustive breakdown of the leading open-source repositories available on GitHub today.

### 1. Jeopardy-Style CTF Platforms

#### [CTFd/CTFd](https://github.com/CTFd/CTFd)
- **Language/Stack**: Python (Flask), SQLAlchemy, Redis, Docker
- **The Undisputed King**: CTFd powers the majority of global Jeopardy CTFs. It features dynamic scoring, team registration, challenge hint systems, unlockable dependencies, plugin architecture, and webhook integrations for Slack and Discord.
- **Why Choose It**: Instant setup via `docker compose up`, massive ecosystem of themes and plugins, and battle-tested at thousands of concurrent users.

#### [google/google-ctf](https://github.com/google/google-ctf)
- **Language/Stack**: Python, Go, Docker, Kubernetes (kctf)
- **Enterprise Scale**: Google's open-source framework and infrastructure tooling for running high-security CTFs on top of Google Kubernetes Engine (GKE). Features `kctf`, which isolates every connected challenger into their own sandboxed nsjail container.
- **Why Choose It**: If you are running pwnable binary challenges or web exploits where players must be cryptographically isolated from attacking other players' containers.

#### [Nakiami/mellivora](https://github.com/Nakiami/mellivora)
- **Language/Stack**: PHP, MySQL, Apache
- **Lightweight Alternative**: An extremely fast, bare-bones Jeopardy platform designed for resource-constrained deployments and educational classrooms.

---

### 2. Attack-Defense & King-of-the-Hill Platforms

#### [moloch--/RootTheBox](https://github.com/moloch--/RootTheBox)
- **Language/Stack**: Python (Tornado), SQLite/PostgreSQL, WebSockets
- **Game Mechanics**: A unique cyber-combat and King of the Hill platform themed around corporate espionage. Teams earn in-game cash by stealing flags, compromising target boxes, and maintaining access, which they can spend on black-market upgrades (denial-of-service weapons, malware, or surveillance on rival teams).
- **Why Choose It**: Unmatched engagement for live, interactive gamified workshops.

#### [fausehh/faustctf-scg](https://github.com/fausehh/faustctf-scg) & [FAUST CTF Framework](https://github.com/fausehh)
- **Language/Stack**: Python, PostgreSQL, Redis, Docker
- **Hardcore Attack-Defense**: Developed by the Friedrich-Alexander University Security Team for one of Europe's largest Attack-Defense competitions. Includes the central game controller, checker scripts that submit and verify flags every round, and team network routers with WireGuard and BGP peering.

#### [CyberDefenseEnthusiasts/Enowars](https://github.com/enowars/enowars)
- **Language/Stack**: C#, .NET Core, Docker, Go
- **Production Attack-Defense Engine**: The battle-tested scoring engine behind the international ENOFLAG Attack-Defense CTFs. High-performance asynchronous flag submission engine with sub-second round resolution.

---

### 3. Red/Blue Teaming & Adversary Emulation Frameworks

#### [mitre/caldera](https://github.com/mitre/caldera)
- **Language/Stack**: Python, asyncio, SQLite
- **Automated Adversary Emulation**: Built by MITRE, CALDERA automates adversary behavioral profiles aligned directly to the MITRE ATT&CK matrix. It deploys lightweight agents onto target Windows, Linux, and macOS systems to test whether your Blue Team detections (Splunk, Elastic, Falco) actually trigger.

#### [Orange-Cyberdefense/GOAD](https://github.com/Orange-Cyberdefense/GOAD)
- **Language/Stack**: Ansible, Terraform, Vagrant, PowerShell
- **Game of Active Directory**: The premier open-source vulnerable Active Directory lab. Deploys complex multi-domain forests with built-in misconfigurations (Kerberoasting, AS-REP roasting, ACL abuse, AD CS certificate escalations) to train both Red Teams on lateral movement and Blue Teams on domain defense.

#### [praetorian-inc/purple-team-exercise-framework](https://github.com/praetorian-inc/purple-team-exercise-framework)
- **Language/Stack**: Markdown, Python, JSON
- **Process & Playbooks**: A standardized framework for structuring, executing, and reporting collaborative Purple Team assessments between internal offensive and defensive units.

---

## Comparison Matrix: Top CTF & Range Repositories

| Repository | Primary Category | Architecture / Stack | Host Platform | Active Maintenance | Ideal Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[CTFd](https://github.com/CTFd/CTFd)** | Jeopardy CTF | Python / Flask / SQLAlchemy / Redis | Linux / Docker | High (Active releases) | Any standard Jeopardy CTF, school competitions, corporate events. |
| **[RootTheBox](https://github.com/moloch--/RootTheBox)** | KotH / Gamified CTF | Python / Tornado / WebSockets | Linux / Docker / Bare Metal | Moderate | Real-time interactive offensive games with financial/espionage mechanics. |
| **[kctf (Google)](https://github.com/google/kctf)** | Jeopardy Container Sandbox | Go / Bash / nsjail | Kubernetes (GKE / Minikube) | High (Google security) | Securely running dangerous pwn/RCE challenges without sandbox escape risk. |
| **[Enowars](https://github.com/enowars/enowars)** | Attack-Defense Engine | C# / .NET / Redis / Docker | Linux / Docker | High (Active) | Hosting multi-team full Attack-Defense tournaments with automated SLA checks. |
| **[FAUST CTF Engine](https://github.com/fausehh/faustctf-scg)** | Attack-Defense Scoring | Python / PostgreSQL / WireGuard | Linux / Dedicated VMs | High | Traditional academic Attack-Defense games with VPN routing. |
| **[MITRE CALDERA](https://github.com/mitre/caldera)** | Adversary Emulation | Python / ATT&CK Framework | Linux / Windows / macOS | High (MITRE sponsored) | Automated Red/Blue/Purple testing of detection pipelines against ATT&CK TTPs. |
| **[GOAD](https://github.com/Orange-Cyberdefense/GOAD)** | Active Directory Range | Ansible / Terraform / PowerShell | Proxmox / ESXi / AWS / Azure | Very High | Practicing real-world enterprise Active Directory exploitation and threat hunting. |
| **[Haaukins](https://github.com/aau-network-security/haaukins)** | Automated Lab Provisioner | Go / gRPC / Docker / Kube | Linux / Cloud | Active | Automated on-demand virtual lab generation for students and trainees. |

---

## Technical Walkthrough: Launching a CTFd Instance with Docker

Getting a production-grade Jeopardy CTF running locally or on a cloud VPS takes fewer than three minutes using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/CTFd/CTFd.git
cd CTFd

# Inspect docker-compose.yml configuration
# CTFd runs with Gunicorn behind Nginx, utilizing Redis for caching and MariaDB for storage
cat docker-compose.yml
```

```yaml
version: '3.8'

services:
  ctfd:
    build: .
    user: root
    restart: always
    ports:
      - "8000:8000"
    environment:
      - UPLOAD_FOLDER=/var/uploads
      - DATABASE_URL=mysql+pymysql://ctfd:ctfd@db/ctfd
      - REDIS_URL=redis://cache:6379
    volumes:
      - .data/CTFd/logs:/var/log/CTFd
      - .data/CTFd/uploads:/var/uploads
      - .:/opt/CTFd:ro
    depends_on:
      - db
      - cache

  db:
    image: mariadb:10.11
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=ctfd
      - MYSQL_USER=ctfd
      - MYSQL_PASSWORD=ctfd
      - MYSQL_DATABASE=ctfd
    volumes:
      - .data/mysql:/var/lib/mysql

  cache:
    image: redis:7-alpine
    restart: always
    volumes:
      - .data/redis:/data
```

Launch the cluster:

```bash
docker compose up -d
```

Check the health status:

```bash
docker compose ps
```

```text
NAME         IMAGE              COMMAND                  SERVICE   CREATED          STATUS          PORTS
ctfd-ctfd-1  ctfd-ctfd          "/opt/CTFd/docker-en…"   ctfd      20 seconds ago   Up 19 seconds   0.0.0.0:8000->8000/tcp
ctfd-db-1    mariadb:10.11      "docker-entrypoint.s…"   db        20 seconds ago   Up 19 seconds   3306/tcp
ctfd-cache-1 redis:7-alpine     "docker-entrypoint.s…"   cache     20 seconds ago   Up 19 seconds   6379/tcp
```

Navigate to `http://localhost:8000` to access the setup wizard, configure your tournament title, create your admin credentials, and start authoring challenges.

---

## Conclusion

Capture The Flag events and Red/Blue exercises are far more than games—they are the modern digital proving ground. Whether you are reverse-engineering stripped x86 binaries in an Attack-Defense ring, writing eBPF probes to catch stealthy rootkits on the Blue Team, or standing up your first internal tournament using CTFd and GOAD, hands-on combat remains the single fastest path to mastery in systems and security engineering.
