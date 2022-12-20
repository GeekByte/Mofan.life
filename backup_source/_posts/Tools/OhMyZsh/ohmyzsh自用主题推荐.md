---
title: ohmyzsh自用主题推荐
categories:
  - Tools
  - ohmyzsh
tags:
  - ohmyzsh
date: 2021-10-29 10:12:20
---

我用的主题是: murilasso, 将 .zshrc 里的 ZSH_THEME改成这个值即可.

同时，这个主题我认为有一个缺点，就是无法像Linux 那样普通用户模式下是 $ 开始，管理员账户下是 # 开始，于是我在这个基础上又进行了一些修改，具体很简单，编辑: `vim .oh-my-zsh/themes/murilasso.zsh-theme` ， 只需要关注下`${git_branch} %{$reset_color%}%(!.#.$) "` 这里即可.

我的主题文件为:
```txt
local return_code="%(?..%{$fg[red]%}%? ↵%{$reset_color%})"
local user_host='%{$terminfo[bold]$fg[green]%}%n@%m%{$reset_color%}'
local current_dir='%{$terminfo[bold]$fg[blue]%}%~%{$reset_color%}'
local rvm_ruby='%{$fg[red]%}$(rvm_prompt_info || rbenv_prompt_info)%{$reset_color%}'
local git_branch='%{$fg[blue]%}$(git_prompt_info)%{$reset_color%}'

PROMPT="${user_host}:${current_dir} ${rvm_ruby}
${git_branch} %{$reset_color%}%(!.#.$) "
RPS1="${return_code}"

ZSH_THEME_GIT_PROMPT_PREFIX=""
ZSH_THEME_GIT_PROMPT_SUFFIX=""
ZSH_THEME_GIT_PROMPT_DIRTY=" %{$fg[red]%}✗%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN=" %{$fg[green]%}✔%{$reset_color%}"
```
