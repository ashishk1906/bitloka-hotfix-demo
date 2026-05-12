# Canary Deployment Understanding

## Overview

Canary deployment is a controlled production rollout strategy used to reduce deployment risk.

Instead of deploying a hotfix to the entire production environment immediately, the deployment is first performed on a smaller subset of servers, devices, or users.

---

# Why Canary Deployment Is Used

The main goal is to minimize production impact if the new deployment introduces unexpected issues.

Benefits include:

- reduced deployment risk
- easier rollback
- early issue detection
- controlled production validation
- improved production stability

---

# Simple Example

Suppose Reliance has:

```text
100 production DHCP servers
```

Instead of updating all 100 servers together:

1. deploy hotfix to 1 or 2 servers first
2. monitor logs, crashes, latency, synchronization
3. validate production behavior
4. continue rollout gradually if stable

---

# How Canary Deployment Actually Works

Canary deployment is controlled using:

- deployment configurations
- server selection
- load balancer routing
- Kubernetes rollout strategy
- feature flags
- user/device groups

Example:

```text
Server Group A → New Hotfix
Server Group B → Old Stable Version
```

Only selected nodes initially receive the new deployment.

---

# Example Enterprise Flow

```text
Production Fix Ready
            ↓
Deploy to Limited Node
            ↓
Monitor Metrics & Logs
            ↓
Validate Stability
            ↓
Gradually Expand Rollout
            ↓
Complete Production Deployment
```

---

# Monitoring During Canary Deployment

Teams usually monitor:

- CPU usage
- memory consumption
- service crashes
- API latency
- synchronization failures
- error logs
- customer impact

If problems occur:

- deployment may pause
- rollback may happen
- issue investigation starts immediately

---

# Real Understanding

From this workflow, I understood that canary deployment is mainly about:

- reducing production risk
- validating changes safely
- protecting customer environments
- improving deployment confidence

Instead of deploying blindly to all systems together.