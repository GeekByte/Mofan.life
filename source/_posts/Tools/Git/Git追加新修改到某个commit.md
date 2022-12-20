---
title: Git追加新修改到某个commit
categories:
  - Tools
  - Git
tags:
  - Git
date: 2022-12-20 11:40:24
---

本文也可以理解为修改某次commit。



1. 就修改添加到暂存区

    ```sh
    git add
    ```

2. 暂存修改

    ```sh
    git stash
    ```

3. 找到需要追加的 commit 记录

    ```sh
    git log
    ```

4. 打开 commit 记录

    ```sh
    git rebase -i 181362549eaa6099f92726d3aede030e8eb396be
    
    # 如果修改的是上次 commit，在 commit 记录后加 ^, eg:
    # git rebase -i 181362549eaa6099f92726d3aede030e8eb396be^
    ```

5. 找到要更改的commit，将那行 `pick` 改成 `edit`，然后 `:wq` 退出编辑

6. 恢复暂存的修改

    ```sh
    git stash pop
    ```

7. 重新添加修改

    ```sh
    git add
    ```

8. 加入到指定 commit

    ```sh
    git commit --amend
    ```

9. 回到工作区

    ```sh
    git rebase --continue
    ```

10. 推送到远端

    ```sh
    git push
    ```

    
