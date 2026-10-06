---
title: "The All-Seeing Beacon: Observer Health Watchdog in Pure Bash"
description: "An asynchronous, decoupled process watchdog in Bash implementing the Gang of Four Observer pattern using POSIX named pipes (FIFOs) to notify multiple independent subscribers (Syslog, Webhook, Metrics) without blocking the publisher."
type: "script"
gofPattern: "Observer Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Evocation // The All-Seeing Beacon Sentinel"
formula: |
  #!/usr/bin/env bash
  set -Eeuo pipefail
  readonly FIFO="/tmp/beacon.fifo"
  [[ -p "${FIFO}" ]] || mkfifo "${FIFO}"
  observer_syslog()  { while read -r msg; do logger -t BEACON "${msg}"; done < "${FIFO}" & }
  observer_metrics() { while read -r msg; do echo "$(date +%s) ${msg}" >> /tmp/metrics.log; done < "${FIFO}" & }
  notify() { echo "$*" > "${FIFO}"; }
  observer_syslog; observer_metrics
  notify "HEALTH_OK latency=12ms"
tags: ["bash", "shell-script", "observer-pattern", "watchdog", "fifo", "event-driven", "gof-patterns", "evocation"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Observer

In 1994, the Gang of Four defined the **Observer Pattern**:
> *"Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."*
> — Design Patterns, p. 293

In systems infrastructure, health monitors often suffer from tight coupling:
- A monitoring script pings an endpoint.
- If it fails, it synchronously calls `curl -X POST` to Slack.
- If the Slack API hangs on a network timeout, the entire monitoring loop freezes, missing downtime alerts for critical peer services.
- If someone wants to add Prometheus metric scraping or local journald logging, they must edit the core polling engine.

The **All-Seeing Beacon** decouples the **Subject** (the health prober) from any number of **Observers** (Syslog, Cloud Webhook, Local Console, Time-Series Metrics) using a POSIX named pipe (`mkfifo`) or tee multiplexer.

---

## The Complete Bash Script

Save this script as `/usr/local/bin/beacon-watchdog.sh` and make it executable:

```bash
#!/usr/bin/env bash
# ==============================================================================
# SCRIPT: beacon-watchdog.sh
# PATTERN: Observer Pattern (Gang of Four Behavioral)
# ARCANUM: Evocation // The All-Seeing Beacon Sentinel
# DESCRIPTION: Multi-subscriber event bus using UNIX named pipes and background dispatch.
# ==============================================================================
set -Eeuo pipefail

readonly BUS_DIR="/tmp/tekromancy_beacon"
readonly BUS_FIFO="${BUS_DIR}/events.fifo"
mkdir -p "${BUS_DIR}"
[[ -p "${BUS_FIFO}" ]] || mkfifo "${BUS_FIFO}"

# ------------------------------------------------------------------------------
# 1. INDEPENDENT OBSERVERS (SUBSCRIBERS)
# Each observer runs as a detached coroutine, consuming events independently.
# ------------------------------------------------------------------------------

# Observer 1: Local Syslog / Journald Observer
observer_syslog() {
    local fifo="$1"
    while read -r event; do
        logger -t "BEACON-SENTINEL" "${event}"
    done < "${fifo}"
}

# Observer 2: Time-Series TSV Metric Logger
observer_metrics() {
    local fifo="$1"
    local logfile="${BUS_DIR}/telemetry.tsv"
    while read -r event; do
        echo -e "$(date +%s)\t$(date -Iseconds)\t${event}" >> "${logfile}"
    done < "${fifo}"
}

# Observer 3: Visual ANSI Alert Console Observer
observer_console() {
    local fifo="$1"
    while read -r event; do
        if [[ "${event}" == *"CRITICAL"* ]]; then
            echo -e "\033[1;31m[BEACON ALERT - CRITICAL]\033[0m ${event}" >&2
        elif [[ "${event}" == *"WARN"* ]]; then
            echo -e "\033[1;33m[BEACON ALERT - WARNING]\033[0m  ${event}" >&2
        else
            echo -e "\033[0;32m[BEACON TELEMETRY - OK]\033[0m    ${event}"
        fi
    done < "${fifo}"
}

# ------------------------------------------------------------------------------
# 2. EVENT MULTIPLEXER (THE SUBJECT DISPATCH HUB)
# Clones events arriving on the main bus to dedicated observer FIFOs via tee.
# ------------------------------------------------------------------------------
cleanup() {
    echo "[BEACON SHUTDOWN] Terminating observers and unlinking FIFOs..." >&2
    rm -rf "${BUS_DIR}"
    kill 0 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Create sub-FIFOs for each registered observer
mkfifo "${BUS_DIR}/syslog.fifo"
mkfifo "${BUS_DIR}/metrics.fifo"
mkfifo "${BUS_DIR}/console.fifo"

# Start Observers in background
observer_syslog  "${BUS_DIR}/syslog.fifo"  &
observer_metrics "${BUS_DIR}/metrics.fifo" &
observer_console "${BUS_DIR}/console.fifo" &

# Background multiplexer fan-out process
tee "${BUS_DIR}/syslog.fifo" \
    "${BUS_DIR}/metrics.fifo" \
    "${BUS_DIR}/console.fifo" < "${BUS_FIFO}" >/dev/null &

# ------------------------------------------------------------------------------
# 3. THE SUBJECT (HEALTH PROBER EMITTER)
# Emits telemetry into the bus without knowing who is listening.
# ------------------------------------------------------------------------------
publish_event() {
    local payload="$*"
    # Non-blocking write into main FIFO
    echo "[$(date -Iseconds)] ${payload}" > "${BUS_FIFO}"
}

echo "[BEACON ACTIVATED] Observer bus initialized with 3 subscribers."

# Simulate health probes
publish_event "STATUS=OK service=api latency=14ms"
sleep 1
publish_event "STATUS=WARN service=postgres connection_pool=89%"
sleep 1
publish_event "STATUS=CRITICAL service=payment_gateway response=504_GATEWAY_TIMEOUT"
sleep 1
publish_event "STATUS=OK service=payment_gateway recovered=true"
```

---

## Fan-Out Topology

```
   [Subject: Health Probe]
              │
              ▼
      [Main events.fifo]
              │
              ▼
      [tee Multiplexer]
      ┌───────┼───────┐
      │       │       │
      ▼       ▼       ▼
    FIFO    FIFO    FIFO
      │       │       │
      ▼       ▼       ▼
   Syslog  Metrics Console
  Observer Logger  Observer
```
