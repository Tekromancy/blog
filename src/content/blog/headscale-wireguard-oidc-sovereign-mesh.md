---
title: "The Sovereign Mesh: Private WireGuard Overlay with Headscale, OIDC SSO, and Custom DERP"
description: "Building an enterprise self-hosted WireGuard control plane with Headscale, Keycloak OIDC authentication, private DERP relays, and split-tunnel CoreDNS."
pubDate: "2026-09-22"
heroImage: "6.jpg"
tags: ["networking", "wireguard", "security", "sysadmin", "linux"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

Tailscale has revolutionized internal network access by wrapping the modern **WireGuard** protocol in an intuitive peer-to-peer mesh with NAT traversal and central coordination.

However, for organizations subject to strict data sovereignty, air-gapped security, or zero-trust compliance standards, routing authentication and coordination metadata through third-party SaaS servers is unacceptable.

The open-source alternative is **Headscale**—a lightweight, self-hostable implementation of the Tailscale coordination protocol written in Go.

In this operational guide, we will deploy and harden a production **Headscale** control server with **Keycloak / OIDC Single Sign-On (SSO)**, run a private **DERP (Designated Encrypted Relay for Packets)** relay node for firewall traversal, and configure split-tunnel DNS.

---

## 1. Architecture Topology

```
+---------------------------------------------------------------------------------+
|                           SOVEREIGN HEADSCALE TOPOLOGY                          |
+---------------------------------------------------------------------------------+
|                                                                                 |
|   [ User Device / Laptop ] <====== Encrypted Direct WireGuard ======> [ Server ]|
|              \                                                        /         |
|               \ (If NAT Traversal fails: fallback encrypted relay)   /          |
|                v                                                    v           |
|         +-----------------------------------------------------------------+     |
|         |               Private DERP Relay (Port 443 HTTPS)               |     |
|         +-----------------------------------------------------------------+     |
|                                         ^                                       |
|                                         | Coordination & Keys                   |
|         +-------------------------------+---------------------------------+     |
|         |            Headscale Control Plane (sovereign-vpn)              |     |
|         |             + OIDC SSO via Keycloak / Authentik                 |     |
|         +-----------------------------------------------------------------+     |
|                                                                                 |
+---------------------------------------------------------------------------------+
```

---

## 2. Hardening Headscale Configuration (`config.yaml`)

Deploy Headscale on a hardened Linux node (Debian or Ubuntu LTS).

Configure `/etc/headscale/config.yaml`:

```yaml
server_url: https://vpn.tekromancy.internal:443
listen_addr: 0.0.0.0:8080
metrics_listen_addr: 127.0.0.1:9090

# Dedicated IP prefixes for nodes in the overlay mesh
prefixes:
  v4: 100.64.0.0/10
  v6: fd7a:115c:a1e0::/48

# Postgres backend for high reliability
database:
  type: postgres
  postgres:
    host: 127.0.0.1
    port: 5432
    name: headscale
    user: headscale
    pass: "YOUR_HARDENED_POSTGRES_PASS"

# OIDC Integration (Keycloak, Authentik, or Okta)
oidc:
  only_start_if_oidc_is_available: true
  issuer: "https://auth.tekromancy.com/realms/sovereign"
  client_id: "headscale-client"
  client_secret: "OIDC_CLIENT_SECRET_KEY"
  scope: ["openid", "profile", "email"]
  extra_params:
    domain_hint: "tekromancy.com"
  allowed_domains:
    - "tekromancy.com"
  strip_email_domain: true

# MagicDNS Configuration
dns_config:
  nameservers:
    - 1.1.1.1
    - 9.9.9.9
  domains:
    - mesh.internal
  magic_dns: true
  base_domain: mesh.internal

# Enable custom private DERP relay
derp:
  server:
    enabled: true
    region_id: 999
    region_code: "headscale-internal"
    region_name: "Internal Private DERP"
    stun_listen_addr: "0.0.0.0:3478"
  urls: [] # Disable public SaaS DERP servers completely
  paths:
    - /etc/headscale/derp-map.yaml
```

---

## 3. Configuring a Zero-Trust Private DERP Relay

When two endpoints reside behind symmetric firewalls or Carrier-Grade NAT (CGNAT), direct WireGuard UDP hole-punching can fail. Rather than relaying encrypted frames through public nodes, we configure a private DERP server.

Define `/etc/headscale/derp-map.yaml`:

```yaml
regions:
  999:
    regionid: 999
    regioncode: "sovereign-derp"
    regionname: "Tekromancy Primary Relay"
    nodes:
      - name: "derp-relay-01"
        regionid: 999
        hostname: "vpn.tekromancy.internal"
        stunport: 3478
        derpport: 443
        insecurefortests: false
```

DERP nodes only relay packets that are end-to-end encrypted with the target client's WireGuard public key. **The DERP relay server cannot inspect packet payloads.**

---

## 4. Enforcing Granular ACLs (Access Control Lists)

Control plane network policies are defined declaratively in `/etc/headscale/acls.hujson`:

```json
{
	"acls": [
		// Admins have access to everything
		{
			"action": "accept",
			"src": ["group:admin"],
			"dst": ["*:*"]
		},
		// Developers can only access staging clusters on SSH and HTTP
		{
			"action": "accept",
			"src": ["group:devs"],
			"dst": ["tag:staging:22", "tag:staging:80", "tag:staging:443"]
		},
		// Production database isolation: only application pods can reach Postgres
		{
			"action": "accept",
			"src": ["tag:app-tier"],
			"dst": ["tag:db-tier:5432"]
		}
	],
	"groups": {
		"group:admin": ["joshua@tekromancy.com"],
		"group:devs": ["engineer-alpha@tekromancy.com"]
	},
	"tagOwners": {
		"tag:staging": ["group:admin"],
		"tag:db-tier": ["group:admin"],
		"tag:app-tier": ["group:admin"]
	}
}
```

---

## 5. Client Enrollment via SSO & CLI

Enrolling any Linux, macOS, iOS, or Android device using the standard open-source Tailscale client is seamless:

```bash
# Connect client directly to the self-hosted Headscale control server
tailscale up \
  --login-server https://vpn.tekromancy.internal \
  --accept-dns=true
```

The CLI generates an interactive OIDC browser login redirect. The user authenticates against Keycloak with their hardware FIDO2 security key, and the device is provisioned into the sovereign WireGuard mesh in milliseconds.

With this setup, you retain complete sovereignty over cryptographic keys, zero-trust network policies, and telemetry—insulating your infrastructure from SaaS vendor risk.
