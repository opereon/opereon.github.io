---
title: Overview
description: 'An overview of the Opereon IT orchestration tool'
category: Docs
position: 2
prev: '/docs/quickstart/'
next: '/docs/install/'
---

Nowadays, the ever changing landscape of [DevOps](https://en.wikipedia.org/wiki/DevOps) tools and practices encourages 
system administrators to shift more and more into the [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)
paradigm. Automated approach for system administration, if used efficiently, can provide significant benefits for the 
organization, like operational cost and/or risk reductions. On the other hand, the introduction of any solution 
for IT automation will incur added cost of it's implementation within the organization. 

We thrive to provide and maintain our own *open-source* solution for *IT automation*, which we have designed and 
implemented because we could not find an existing solution for our needs that would check all of the boxes. In the 
following part we will present our product and discuss its features in comparison to the existing popular solutions.  


## What is Opereon?

[Opereon](https://opereon.io) is an open-source, free of charge, configuration management and automation system for IT, 
similar in function to the other solutions like:

- [Ansible](https://www.ansible.com) 
- [Puppet](https://puppet.com), [Bolt](https://puppet.com/products/bolt)
- [Chef](https://www.chef.io)
- [SaltStack](https://www.saltstack.com)

It is essentially a remote task runner, capable of performing administrative tasks on hosts using Unix-like systems, 
using SSH protocol. It does not require any particular software to be installed on the managed (remote) hosts, except 
of course for a working SSH server. Task are basically just system commands or shell scripts, so they can be implemented
in any programming language the user sees fit. The tasks are implemented imperatively by the user, and they can have 
triggers to be executed automatically when declarative part of the infrastructure definition changes. 


## Why Opereon?

Typically configuration management tools were designed around two fundamental approaches of representing what needs to be
configured on remote hosts for the infrastructure to operate as required. 
 
- *Declarative* (or functional), where the user typically defines *what* is the desired state of the infrastructure. 
  This approach is encouraged for instance by [Puppet](https://puppet.com) and [SaltStack](https://www.saltstack.com). 
      
- *imperative* (procedural), where the user defined *how* the desired state is to be achieved  


## How Opereon works?


