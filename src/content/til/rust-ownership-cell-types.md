---
title: "Rust Ownership and Cell Types"
description: "Understanding interior mutability in Rust through Cell, RefCell, and when to use each."
pubDate: 2026-01-22
category: "Systems"
tags: ["rust", "ownership", "memory", "concurrency"]
---

# Rust Ownership and Cell Types

Rust's ownership system is strict, but sometimes you need interior mutability. Enter `Cell` and `RefCell`.

## When Ownership Gets in the Way

```rust
struct Counter {
    value: u32,
}

impl Counter {
    fn increment(&self) {
        self.value += 1;   // Error: cannot mutate
    }
}
```

## Cell<T> - Copy Types Only

```rust
use std::cell::Cell;

struct Counter {
    value: Cell<u32>,
}

impl Counter {
    fn increment(&self) {
        self.value.set(self.value.get() + 1);
    }
}
```

## RefCell<T> - Runtime Borrow Checking

```rust
use std::cell::RefCell;

struct Buffer {
    data: RefCell<Vec<u8>>,
}

impl Buffer {
    fn push(&self, byte: u8) {
        self.data.borrow_mut().push(byte);
    }
}
```

## Decision Matrix

| Type | Thread-Safe | Copy Required | Overhead |
|------|-------------|---------------|----------|
| `Cell<T>` | No | Yes | Zero |
| `RefCell<T>` | No | No | Runtime |
| `Mutex<T>` | Yes | No | OS-level |
| `RwLock<T>` | Yes | No | OS-level |

Choose wisely based on your constraints.
