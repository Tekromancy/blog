---
title: "The Hardened Linux Bastion: Kernel Sysctls, SSH Certificates & AppArmor"
description: "A comprehensive, battle-tested operational checklist for hardening production Linux servers against modern automated adversary campaigns."
pubDate: "2026-09-03"
updatedDate: "2026-09-04"
heroImage: "5.jpg"
tags: ["security", "linux", "sysadmin", "devsecops"]
author: "Joshua Edward McLaughlin Cox"
---

The moment a public IPv4 or IPv6 address is bound to a server, it is bombarded by continuous automated port scans, brute-force bots, and credential stuffers. Relying solely on default OS settings is negligence.

This guide provides an uncompromising, battle-tested hardening checklist for modern Debian, Ubuntu, Fedora, and Arch Linux systems running production workloads.

## 1. Zero-Trust SSH with Short-Lived Certificates

Never use static passwords or long-lived static public keys. Instead, implement **SSH Certificate Authorities (CA)** or strictly locked-down ED25519 keys with hardware FIDO2 tokens.

Configure `/etc/ssh/sshd_config.d/01-hardened.conf`:

```ini
# Enforce modern protocol and disable weak ciphers
Protocol 2
Port 2222
PermitRootLogin no
PasswordAuthentication no
PermitEmptyPasswords no
KbdInteractiveAuthentication no
X11Forwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# Allowed key exchange algorithms and ciphers
KexAlgorithms sntrup761x25519-sha512@openssh.com,curve25519-sha256
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com

# Enforce SSH CA validation
TrustedUserCAKeys /etc/ssh/trusted-user-ca.pub
```

Restart OpenSSH cleanly:

```bash
sudo sshd -t && sudo systemctl restart sshd
```

## 2. Hardening Kernel Sysctls

Mitigate common memory pointer leaks, SYN flood attacks, and ICMP redirection exploits via `/etc/sysctl.d/99-security-hardening.conf`:

```ini
# Restrict kernel pointer exposure (dmesg restrictions)
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.unprivileged_bpf_disabled = 1
kernel.yama.ptrace_scope = 2

# Prevent core dumps of setuid programs
fs.suid_dumpable = 0

# Network stack protection
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.conf.all.log_martians = 1

# ASLR Randomization
kernel.randomize_va_space = 2
```

Reload sysctl parameters:

```bash
sudo sysctl --system
```

## 3. Mandatory Access Control: AppArmor Enforcement

Ensure AppArmor is active and running in enforce mode, not merely complain mode:

```bash
sudo aa-status
```

Expected output:

```text
apparmor module is loaded.
48 profiles are loaded.
48 profiles are in enforce mode.
0 profiles are in complain mode.
0 processes are in unconfined mode.
```

If profiling a custom Go or Rust daemon:

```bash
# Generate a baseline profile automatically
sudo aa-genprof /usr/local/bin/tekromancy-daemon
```

## 4. nftables: Stateless Default-Drop Firewall

Avoid legacy `iptables` and write clean, declarative `/etc/nftables.conf`:

```text
table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;

        # Accept loopback traffic
        iif lo accept

        # Accept established and related connections
        ct state established,related accept

        # Drop invalid state packets
        ct state invalid drop

        # Rate-limit ICMP echo requests (Ping of death mitigation)
        ip protocol icmp icmp type echo-request limit rate 5/second accept

        # Secure SSH port
        tcp dport 2222 accept

        # WireGuard transit
        udp dport 51820 accept
    }

    chain forward {
        type filter hook forward priority 0; policy drop;
    }

    chain output {
        type filter hook output priority 0; policy accept;
    }
}
```

Enable and start:

```bash
sudo systemctl enable --now nftables
```

## Conclusion

Security is not a final state—it is continuous discipline. By locking down SSH, enforcing in-kernel sysctl boundaries, isolating processes with AppArmor, and running a default-deny packet filter, your host transitions from a soft target into a hardened bastion.
