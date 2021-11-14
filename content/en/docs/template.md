---
title: Templates
description: 
category: Docs
position: 6
prev: '/docs/opath/'
next: '/docs/procedures/'
---

When dealing with configuring systems and services, there is often a need to prepare configuration files. 

In order to keep true to the *single source of truth* rule, with [Opereon](/), we provide a custom template engine, 
allowing to create configuration files from data contained withing the [model](/docs/model).

Our template engine has a syntax generally inspired by tried and tested 
[Velocity Template Language](https://velocity.apache.org/engine/2.3/vtl-reference.html), but with significant 
differences.

## Variables

All variables used in the template are prefixed with a dollar sign '$' sigil, like in [Opath](/docs/opath)
```
#set $test=true
```

## Interpolations

Variable values, and more generally Opath expressions, can be printed to the output with the use of interpolation
in the form
```
<%<opath>%>
```
For example, to output `login` property of a `$user` variable, the following can be used:
```
Logged in as <% $user.login %>
```

## Directives

Template directive names in simple form are prefixed with a hash sign `#` i.e. 
```
#directive
```
In a canonical form they are in addition surrounded in curly braces `{` and `}`,  i.e. 
```
#{directive}
``` 
This form is useful in one-line expressions to avoid adding spaces into the output

```
#{if $test}Test is true#{else}Test is false#{end}
```

For directives with arguments, there can be any number of whitespaces between directive name and arguments. In 
canonical form, whitespaces are also allowed inside curly braces. For example, all variants below are equivalent:
- `#set $var1='String value'`
- `#set $var1 = 'String value'`
- `#{  set  $var1='String value' }`


### #set

Set directive is used to assign value (Opath nodes) to a variable.
This directive has a general form 
```
#set $variable=<opath>
```
and canonical form
```
#{set $variable=<opath>}
```

Example
```
#set $users = $.users[*]
```

### #if/#elseif/#else

If/else directive provides conditional instruction flow to a template rendering. It has a general form of
```
#if <Opath expression> output #end
#if <Opath expression> output #else output #end
#if <Opath expression> output #elseif <Opath expression> output #else output #end
```

```
#{if <Opath expression>}output#end
#{if <Opath expression>}output#{else}output#end
#{if <Opath expression>}output#{elseif <Opath expression>}output#{else}output#end
```

### #for

For directive executes its body for every value in provided expression 
```
#for <Opath expression> output #end
#for <Opath expression> output #else output #end
```

As a special case, when loop expression evaluates to empty, and `#else` block is defined, it will be output instead.

### #def

Def directive allows to define template blocks which can be evaluated with arguments in the template, not unlike VTK macros.
This directive has a general form
```
#def name(<variables>) output #end 
```
for example:
```
#def is_equal($a, $b)
  #if $a==$b
  values are equal
  #end 
#end 
```

Note that the definition block itself will not produce any output. In order to use such definition, `#print` directive is used.

### #print

Print directive is used to output a defined template block (see [#def](#def)).
This directive has a general form
```
#print name(<opath>,...) 
```
for example:
```
#print is_equal(1, 2)
```

### #include

Include directive can be used to output content of another file into the template, either as a simple text or another 
template.
This directive has a general form
```
#include <opath>
#include <opath>, resolve=<opath>
```
The special argument `resolve` indicates, whether the file's content, as pointed by the Opath expression, should be 
parsed as another template or simply copied to the output. By default, all included files are parsed as templates.
