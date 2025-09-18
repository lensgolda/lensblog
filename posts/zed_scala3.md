---
title: Zed editor for Scala3
date: '2025-09-18T00:00:00.000Z'
author: Lens
tags:
  - scala
  - mise
  - Zed
draft: false
comments: {}
---
Hi! 

Recently I wanted to try the Zed editor and to have some Scala3 practice with ZIO. So, I decided to set up a suitable environment and test how it would work.

I will be use:

- `scala-cli` to running the code.
- `Zed` editor for typing
- `mise` as environment tool and version manager to install dependencies

So, let's get started.

## Installing mise

Install mise as described [here](https://mise.jdx.dev/getting-started.html#installing-mise-cli).

We will use mise to install `scala-cli` and `coursier`.

## Scala tools

Go to the project directory and type in terminal

```shell
~/your_project_dir $ mise use scala-cli coursier
```

This will install `scala-cli` and `coursier` as tooling for current project root. Outside of that project root, tools wouldn't work. Also `mise.toml` file with installed tools under `[tools]` section will be placed in project root.


As described in Zed's scala page:

> Scala language support in Zed is provided by community-maintained [extension](https://zed.dev/docs/languages/scala).


To install, open Zed editor, go to main menu and click "Extensions", or press keys `Cmd + Shift + P` - this will open Command Palette and start typing `extensions, or simply use key binding `Cmd + Shift + X`

(I'm assuming here that Java extension was also installed, if not, do it for sure.)


Extension does not include Metals, so we has to, as described in [pre-requisites](https://github.com/scalameta/metals-zed?tab=readme-ov-file#pre-requisites).

That's for `coursier` has been installed.

In project root, type:
```shell
cs install metals
```

We has to add coursier to PATH because Zed currently does not pick environment variables from terminal

For my `zsh` shell, this would be like so:

```
# ~/.zshrc
# scala support Zed editor
export PATH = "$PATH:/Users/lens/Library/Application Support/Coursier/bin"
```

## Zed settings

Now open Zed settings, press `Cmd + Shif + P` again, start typing `settings`, when `zed: open settings` appeared, press enter.
After `settings.json` file opened, you need to set JAVA_HOME for Metals, as described [here](https://scalameta.org/metals/docs/integrations/new-editor/#java-home-directory), so past:

```json
{
  "metals": {
    "javaHome": "/Library/Java/JavaVirtualMachines/jdk21.jdk/Contents/Home"
  }
}
```

Possibly you may have to reboot your Zed editor.

So create and name `.scala` file, and as usual for scala-cli past at the top of file your dependencies

```scala
//> using scala 3.3.6
//> using dep "dev.zio::zio:2.1.21"

```

Now you can type some code for check. After that you can open Zed's terminal and type `scala-cli YourScalaFileName.scala` to run and check.

## Zed Tasks

Typing `scala-cli` every time in terminal can be tedious. So Zed has what is called `tasks`.

So you can press `Cmd + Shift + P` again and start typing `tasks`, when `zed:open tasks` found, press enter. Tasks json file will be opened.

We can add some:

```json
{
  "label": "Scala CLI compile watch",
  "command": "scala-cli compile",
  "shell": "system",
  "args": ["--watch", "${ZED_FILE}"],
  "cwd": "${ZED_WORKTREE_ROOT}",
  "tags": ["scala"]
}
```
(You can write your own, simple `scala-cli run` for example)

To run the Task, press `Cmd + Shift + P` as usual, than type `task: spawn` or `task` and choose `spawn`, or press keys `Cmd + Shift + R`.
Tasks list will be opened, choose your task and press enter.

File will be compiled and watched.

That's it.
