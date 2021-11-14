---
title: Data model
description: Data model for managed infrastructure
category: Docs
position: 4
prev: '/docs/install/'
next: '/docs/opath/'
---

In our approach to ICT automation, everything is built around a concept of **data model** representing every piece of significant 
information about the managed infrastructure in the form of a **versioned** **file tree**. All of the necessary facts about 
actors (managed hosts, users, services, etc.) are represented by set of (mostly) textual files, that are easy to edit and 
maintain. The organizational structure of actors can be reflected by file tree structure.

The model is kept in a single [git](https://git-scm.com) repository for change tracking. When used, the 
data from files is then transformed into an generalized object tree, which can be traversed and searched with the use 
of our own specialized data query language [Opath](/docs/opath).


## Introduction

For illustration purposes, consider the following directory, containing some crucial pieces of information about a very 
simple infrastructure, with one host named `server1` and one user account named `john`.  

```
.
├── hosts/
│    └── server1/
│        ├── etc/
│        │   └── ssh/
│        │       ├── ssh_host_rsa_key
│        │       └── ssh_host_rsa_key.pub
│        └── _.yaml
└── users/
    └── john/
        ├── ssh/
        │   └── id_rsa.pub
        └── _.json
```

Of particular interest in this discussion are the files presented below:
```yaml[hosts/server1/_.yaml]
hostname: server1
domain: example.org
net:
  eth0:
    ip4:
      address: 192.168.1.100
      mask: 255.255.255.0
      gateway: 192.168.1.1
packages: [mc, vim, nmap]
```
```json[users/john/_.json]
{
  "username": "john",
  "email": "johnny@example.org",
  "first_name": "John",
  "last_name": "Smith"
}
```

which contain some arbitrary metadata about the host `server1` and the user `john` respectively.
 
The files in `hosts/server1/etc/ssh/` folder contain private and public keys for SSH service on the host. It would be 
desired in this example, that the actual SSH service keys, which are presumably kept in `/etc/ssh` folder on the `server1`, 
should always be identical to those in the file structure. That way, in case of catastrophic hardware failure, the host can be
recreated on another hardware, with identical SSH fingerprint. 

As it can be seen from the example, such file set can intuitively and efficiently store in a *declarative manner* a desired 
configuration of the managed infrastructure. By changing some metadata inside the file set (for instance changing IP 
address for the hosts) and running Opereon toolchain on the file set, that change should be performed on the actual host 
by executing a defined set of administrative tasks (like reconfiguring network interfaces).


## Data representation

Files in the model can contain arbitrary JSON-like data (currently supported parsable formats include [JSON](https://www.json.org), 
[YAML](https://yaml.org) and [TOML](https://github.com/toml-lang/toml)). 
Other data formats are treated as binary files. 

All of the files are transformed into an object tree in memory when in use by Opereon tools. The rules of this 
transformation are configurable, as described below. 


### Manifest file

At the root of file tree representing data model for Opereon, there must be preset a manifest file. Manifest file is by 
default named `op.toml`

```toml{numberLines: true}[op.toml]
[info]
authors = ["John <johnny@example.org>", "Mark <mark@example.org>"]
description = "Server farm 1"

[defines]
users = "$.conf.users.*"
hosts = "$.conf.hosts.*"
procs = "$.(proc, probe).**[@.proc != null]"
user_defined_expr_1 = "$.**[custom_property == 'custom_value']"
```

### Settings file

Everywhere in the data model, a user can also define a file named `.operc`, containing settings used when reading the model
into the object tree. The settings are overwritten by a setting file in hierarchical fashion, for the folder in which the 
`.operc` file is located, and its subfolders, unless further overwritten with nested `.operc` files.

By default, if no `.operc` file is present anywhere in the model, the default settings are used, as presented below. 

```toml[.operc]
inherit_excludes = true
inherit_includes = true
inherit_overrides = true

[[exclude]]
path = "**/.*/**"

[[include]]
path = "**/*"
file_type = "dir"
item = "${map()}"
mapping = "${$.find(array($item.@file_path_components[..-2]).join('.')).set($item.@file_name, $item)}"

[[include]]
path = "**/_.{yaml,yml,toml,json}"
file_type = "file"
item = "${loadFile(@.@file_path, @.@file_ext)}"
mapping = "${$.find(array($item.@file_path_components[..-2]).join('.')).extend($item)}"

[[include]]
path = "**/*.{yaml,yml,toml,json}"
file_type = "file"
item = "${loadFile(@.@file_path, @.@file_ext)}"
mapping = "${$.find(array($item.@file_path_components[..-2]).join('.')).set($item.@file_stem, $item)}"

[[include]]
path = "**/*"
file_type = "file"
item = "${loadFile(@.@file_path, 'text')}"
mapping = "${$.find(array($item.@file_path_components[..-2]).join('.')).set($item.@file_stem, $item)}"

[overrides]
# no overrides

```

### Object tree

The presented above data model is loaded with given settings into object tree presented in JSON: 

```
{
    "users": { 
        "john" : {
            "username": "john",
            "email": "johnny@example.org",
            "first_name": "John",
            "last_name": "Smith"
        }
    },
    "hosts": {
        "server1": {
            "hostname": "server1",
            "domain": "example.org",
            "net": {
                "eth0": {
                    "ip4": {
                        "address": "192.168.1.100",
                        "mask": "255.255.255.0",
                        "gateway": "192.168.1.1"
                    }
                }
            },
            "packages": ["mc", "vim", "nmap"]
        }
    }
}
```
