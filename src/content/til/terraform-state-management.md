---
title: "Terraform State Management Best Practices"
description: "Avoiding state file disasters with remote backends, locking, and workspace strategies."
pubDate: 2026-01-18
category: "Infra"
tags: ["terraform", "iac", "aws", "state", "devops"]
---

# Terraform State Management Best Practices

The state file is Terraform's single point of failure. Protect it.

## Remote Backend Setup (S3 + DynamoDB)

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/infrastructure.tfstate"
    region         = "eu-central-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

## DynamoDB Lock Table

```hcl
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

## Workspace Strategy

```bash
terraform workspace new prod
terraform workspace new staging
terraform workspace select prod
```

```hcl
locals {
  env = terraform.workspace
}

resource "aws_instance" "web" {
  instance_type = var.instance_types[local.env]
  tags = {
    Environment = local.env
  }
}
```

## State File Security Checklist

- Remote backend enabled
- Encryption at rest
- State locking enabled
- Versioning on S3 bucket
- Restricted IAM access
- No secrets in state (use SSM/Vault)
