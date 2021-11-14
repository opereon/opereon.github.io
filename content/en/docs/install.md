---
title: Installation
description: Installation instructions for supported platforms
category: Docs
position: 3
prev: '/docs/overview/'
next: '/docs/model/'
---

At present the only way to install Opereon is to build it from the [source code](https://github.com/opereon/opereon.git), and manually installing 
the executable.

```bash
> git clone https://github.com/opereon/opereon.git
> cd opereon
> cargo build
```

In order to compile the sources, You must have a working [Rust](https://rust-lang.org) installation. Opereon requires
a recent nightly version of a Rust compiler.

A more ergonomic approach is being implemented, and it will be available shortly.

