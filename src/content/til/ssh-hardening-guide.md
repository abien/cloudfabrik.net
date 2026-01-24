---
title: "SSH Hardening Guide for Production Servers"
description: "Essential SSH configuration changes to secure your Linux servers against common attacks."
pubDate: 2026-01-15
category: "Infra"
tags: ["ssh", "security", "linux", "hardening", "sysadmin"]
---

# SSH Hardening Guide for Production Servers

Default SSH configs are insecure. Fix them.

## /etc/ssh/sshd_config

```bash
PermitRootLogin no

PasswordAuthentication no
PubkeyAuthentication yes

AllowUsers deploy admin

Port 2222

PermitEmptyPasswords no

ClientAliveInterval 300
ClientAliveCountMax 2

X11Forwarding no

Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
```

## Key-Based Auth Setup

```bash
ssh-keygen -t ed25519 -C "admin@server"

ssh-copy-id -p 2222 admin@server

ssh -p 2222 admin@server
```

## Fail2Ban Configuration

```ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

## Verification Checklist

```bash
sshd -t

ss -tlnp | grep ssh

nmap -p 2222 your-server
```

## Quick Security Wins

| Setting | Default | Hardened |
|---------|---------|----------|
| Root Login | Yes | No |
| Password Auth | Yes | No |
| Port | 22 | 2222 |
| X11 Forward | Yes | No |
| Empty Password | Yes | No |
