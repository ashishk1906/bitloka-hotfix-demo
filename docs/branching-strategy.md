# Branching Strategy Understanding

## Overview

This document explains my understanding of enterprise Git branching strategies used during production hotfix and CHF workflows.

---

# Main Branch

The `main` branch usually contains:

- common product code
- ongoing development
- future release features
- shared platform logic

Example:

```text
main
```

---

# Release Branches

Release branches are created for stable customer deployments.

Example:

```text
release/airtel/1.0
release/reliance/1.0
release/tata/1.0
```

These branches may contain:

- customer-specific configurations
- deployment changes
- integrations
- environment-specific fixes

---

# Can Customers Have Multiple Releases?

Yes.

A customer may have multiple active releases running simultaneously.

Example:

```text
release/airtel/1.0
release/airtel/1.5
release/airtel/2.0
```

Reasons include:

- phased migration
- different production regions
- legacy support
- staggered upgrades
- customer validation cycles

---

# Hotfix Branches

Hotfix branches are temporary branches created for isolated production fixes.

Example:

```text
hotfix/reliance/1.0-DHCP-204
```

---

# Parent Branch Understanding

One important understanding:

Hotfix branches are usually created from the affected release branch.

Example:

```text
release/reliance/1.0
        ↓
hotfix/reliance/1.0-DHCP-204
```

NOT directly from:

```text
main
```

because the issue exists specifically in that customer release environment.

---

# Why Hotfixes Are Not Usually Created From Main

The `main` branch may already contain:

- new features
- unfinished development
- incompatible changes

Directly using `main` could introduce instability into production release branches.

---

# Synchronization Flow

After hotfix validation:

```text
hotfix branch
        ↓
release branch
        ↓
main
```

---

# Why Cherry-pick Is Common

Enterprise teams often cherry-pick only required commits into `main`.

Example:

```bash
git cherry-pick <commit-id>
```

This avoids unintentionally moving customer-specific code into the common product codebase.

---

# Real Enterprise Understanding

From this workflow, I understood:

- why release isolation is important
- why hotfixes are branch-specific
- why PR reviews matter
- why selective synchronization is preferred
- how enterprise Git workflows protect production stability