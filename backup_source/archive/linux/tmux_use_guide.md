参考网站：

[A Quick and Easy Guide to tmux](https://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)

[tmux - a very simple beginner's guide](https://www.ocf.berkeley.edu/~ckuehl/tmux/)



开启一个 命名session

```shell
tmux new -s <session name>
```

查看 session 列表

```shell
tmux ls
```

连接一个session

```shell
tmux attach -t <session name>
```



## Important Keybindings

Use these to control tmux when inside a tmux session. For all keybindings, press ctrl-b first, then press the key you want.

| key                 | what it does                                                 |
| :------------------ | :----------------------------------------------------------- |
| ctrl-b, %           | split the screen in half from left to right                  |
| ctrl-b, "           | split the screen in half from top to bottom                  |
| ctrl-b, x           | kill the current pane                                        |
| ctrl-b, <arrow key> | switch to the pane in whichever direction you press          |
| ctrl-b, d           | detach from tmux, leaving everything running in the background |

This is an incomplete list; a more exhaustive list is available [here](https://gist.github.com/MohamedAlaa/2961058).

Note: ctrl-b is the default prefix; I highly recommend changing it to ctrl-a. See ``Customization'' at the bottom of the page.