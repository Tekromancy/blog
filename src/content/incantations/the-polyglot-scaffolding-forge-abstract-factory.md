---
title: "The Polyglot Forge: Multi-Runtime Scaffolding Abstract Factory"
description: "Conjure coordinated families of Dockerfiles, systemd service units, and directory topologies across heterogeneous language runtimes from a unified shell factory."
type: "shell"
gofPattern: "Abstract Factory (Creational)"
gofCategory: "Creational"
arcaneSchool: "Conjuration // The Polyglot Forge"
formula: "forge_runtime() { local runtime=\"$1\"; local name=\"$2\"; mkdir -p \"$name\"/{cmd,pkg,deploy/{k8s,systemd},scripts}; case \"$runtime\" in go) printf 'FROM golang:1.23-alpine AS build\\nWORKDIR /src\\nCOPY . .\\nRUN CGO_ENABLED=0 go build -o /bin/app ./cmd\\nFROM scratch\\nCOPY --from=build /bin/app /bin/app\\nENTRYPOINT [\"/bin/app\"]\\n' > \"$name/deploy/Dockerfile\" ;; rust) printf 'FROM rust:1.80-alpine AS build\\nWORKDIR /src\\nCOPY . .\\nRUN cargo build --release && cp target/release/app /bin/app\\nFROM alpine:latest\\nCOPY --from=build /bin/app /bin/app\\nENTRYPOINT [\"/bin/app\"]\\n' > \"$name/deploy/Dockerfile\" ;; node) printf 'FROM node:22-alpine\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm ci --omit=dev\\nCOPY . .\\nUSER node\\nENTRYPOINT [\"node\", \"cmd/index.js\"]\\n' > \"$name/deploy/Dockerfile\" ;; esac; printf '[Unit]\\nDescription=%s Daemon\\nAfter=network.target\\n[Service]\\nExecStart=/usr/local/bin/%s\\nRestart=always\\n[Install]\\nWantedBy=multi-user.target\\n' \"$name\" \"$name\" > \"$name/deploy/systemd/$name.service\"; }; forge_runtime go arcane-api"
tags: ["shell", "oneliners", "abstract-factory", "devops", "docker", "systemd", "gof-patterns", "scaffolding"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four lexicon, the **Abstract Factory** pattern coordinates the creation of entire product families:

> *"Provide an interface for creating families of related or dependent objects without specifying their concrete classes."*
> — Gang of Four, *Creational Patterns*

In software engineering, an Abstract Factory ensures that if you choose a specific look-and-feel (e.g., `MacWidgetFactory`), all generated buttons, scrollbars, and windows belong to the Mac family and maintain stylistic coherence.

### The Transmutation to Polyglot Infrastructure Scaffolding

In modern cloud platforms, every microservice requires a coordinated family of deployment artifacts:
- A multi-stage container buildfile (`Dockerfile`) tailored to the runtime's compilation semantics (e.g., Go `CGO_ENABLED=0 scratch` vs. Rust musl vs. Node alpine).
- An init-system descriptor (`systemd.service`) with correct restart policies.
- A standardized directory topology (`cmd/`, `pkg/`, `deploy/`).

Mixing runtime conventions causes subtle build regressions. The **Polyglot Forge** acts as an **Abstract Factory** in POSIX shell: clients pass an abstract runtime token (`go`, `rust`, `node`), and the factory yields a mutually compatible family of configuration, build, and operational artifacts.

---

## The Spell Formula

Cast this invocation to summon a unified production-ready microservice scaffold:

```bash
forge_runtime() {
  local runtime="$1"
  local name="$2"
  [ -z "$name" ] && { echo "Usage: forge_runtime <go|rust|node> <service_name>" >&2; return 1; }

  mkdir -p "$name"/{cmd,pkg,deploy/{k8s,systemd},scripts}

  case "$runtime" in
    go)
      printf 'FROM golang:1.23-alpine AS build\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /bin/app ./cmd\nFROM scratch\nCOPY --from=build /bin/app /bin/app\nENTRYPOINT ["/bin/app"]\n' > "$name/deploy/Dockerfile"
      ;;
    rust)
      printf 'FROM rust:1.80-alpine AS build\nWORKDIR /src\nCOPY . .\nRUN cargo build --release && cp target/release/app /bin/app\nFROM alpine:latest\nCOPY --from=build /bin/app /bin/app\nENTRYPOINT ["/bin/app"]\n' > "$name/deploy/Dockerfile"
      ;;
    node)
      printf 'FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nUSER node\nENTRYPOINT ["node", "cmd/index.js"]\n' > "$name/deploy/Dockerfile"
      ;;
    *)
      echo "Unknown runtime archetype: $runtime" >&2
      return 2
      ;;
  esac

  printf '[Unit]\nDescription=%s Sovereign Daemon\nAfter=network.target\n\n[Service]\nExecStart=/usr/local/bin/%s\nRestart=always\nRestartSec=5s\n\n[Install]\nWantedBy=multi-user.target\n' "$name" "$name" > "$name/deploy/systemd/$name.service"
}

forge_runtime go arcane-api
```

---

## Anatomy of the Spell

1. **`mkdir -p "$name"/{cmd,pkg,deploy/{k8s,systemd},scripts}`**: Materializes the invariant structural topology of the service.
2. **`case "$runtime" in ...`**: The concrete factory selector. Emits a runtime-specific `Dockerfile` whose compilation layer, runtime user, and base image match the language's security constraints.
3. **`printf '[Unit]...'`**: Emits the corresponding systemd daemon unit with auto-restart wards, ensuring the operational contract matches the containerized contract.

By binding directory layout, container compilation, and init supervision into a single coherent interface, the Abstract Factory prevents configuration drift across polyglot teams.
