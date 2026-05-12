# Hotfix Lifecycle Understanding

## Overview

This document explains my understanding of how enterprise hotfix / CHF (Cumulative Hotfix) workflows are handled using GitHub branching strategies and controlled production deployment approaches.

The workflow is explained using a practical Bitloka DDI Manager production support scenario.

---

# Why Separate Release Branches Exist

Enterprise products often maintain separate release branches for different customers because customer environments may differ in:

- deployment schedules
- infrastructure setup
- integrations
- custom configurations
- production timelines

Example:

```text
release/airtel/1.0
release/reliance/1.0
release/tata/1.0
```

The `main` branch usually contains:

- common product code
- ongoing development
- future release changes

while release branches contain customer-specific stable deployments.

---

# Example Production Issue

Suppose Reliance reports a production issue:

```text
DHCP lease synchronization failure
```

on:

```text
release/reliance/1.0
```

Instead of directly fixing the issue in `main`, a dedicated hotfix branch is created from the affected release branch:

```text
hotfix/reliance/1.0-DHCP-204
```

---

# Hotfix Development Flow

The developer:

- investigates the issue
- identifies the root cause
- implements the fix
- validates locally
- pushes changes to GitHub
- creates a Pull Request (PR)

Example flow:

```text
release/reliance/1.0
        ↓
hotfix/reliance/1.0-DHCP-204
```

---

# QA and Regression Validation

After development:

QA validates:

- issue resolution
- DHCP functionality
- regression impact
- network service stability

Regression testing is important because even a small production fix can unintentionally affect working functionality.

---

# Deployment Lifecycle

Instead of deploying the fix to all production servers immediately:

1. deployment starts on a limited node/server
2. monitoring and validation are performed
3. rollout gradually expands to remaining production nodes

This controlled rollout approach helps minimize production risk.

---

# GitHub Workflow Understanding

The hotfix branch is temporary and isolated.

Typical GitHub workflow:

```text
Create Hotfix Branch
        ↓
Develop Fix
        ↓
Push Changes
        ↓
Create Pull Request
        ↓
Code Review
        ↓
Merge Into Release Branch
```

After successful deployment, the hotfix branch may be deleted.

---

# Synchronization to Main

One important understanding is that production fixes should also reach `main`.

Otherwise future releases may miss important production corrections.

Usually teams do one of the following:

## Option 1 — Merge Release Branch Into Main

```text
release/reliance/1.0
            ↓
main
```

## Option 2 — Cherry-pick Only Required Fix Commits

Example:

```bash
git cherry-pick <commit-id>
```

This approach is preferred when release branches contain customer-specific configurations that should not enter the common codebase.

---

# Understanding Other Customer Branches

After fixing Reliance:

other customer branches are checked independently.

Possible scenarios:

| Branch | Result |
|--------|--------|
| Airtel | Issue not reproducible |
| Tata | Same issue exists |

Depending on branch differences:

- fix may work directly
- require adaptation
- or need reimplementation

---

# Complete Hotfix Lifecycle

```text
Production Issue Reported
            ↓
Identify Affected Release Branch
            ↓
Create Hotfix Branch
            ↓
Develop & Validate Fix
            ↓
GitHub Pull Request & Review
            ↓
QA & Regression Testing
            ↓
Limited / Canary Deployment
            ↓
Gradual Production Rollout
            ↓
Merge Back to Release Branch
            ↓
Sync Required Fixes to Main
            ↓
Close/Delete Hotfix Branch
```

---

# Key Learnings

From this workflow, I understood:

- why enterprise systems isolate customer releases
- how hotfix branches reduce deployment risk
- why PR reviews are important
- how regression testing protects production stability
- why fixes are synchronized back to main
- why cherry-pick is commonly used in enterprise workflows
- how release branches and hotfix branches interact in GitHub

---

# GitHub Commands Used

## Create Release Branch

```bash
git checkout -b release/reliance/1.0
```

## Create Hotfix Branch

```bash
git checkout -b hotfix/reliance/1.0-DHCP-204
```

## Push Branch

```bash
git push origin hotfix/reliance/1.0-DHCP-204
```

## Cherry-pick Fix

```bash
git cherry-pick <commit-id>
```

---

# Real Enterprise Understanding

One important thing I learned practically is:

PR merges only include commits available at merge time.

If additional commits are added later:

- another PR is required
- or another merge operation must happen

This is an important GitHub workflow behavior in real enterprise projects.