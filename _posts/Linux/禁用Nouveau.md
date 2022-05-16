---
title: 禁用 Nouveau
categories:
  - Linux
tags:
  - Ubuntu
date: 2022-04-20 18:55:58
---

Ubuntu20.04安装Nvidia driver提示Nouveau问题，要禁用 Nouveau，参考 `RHEL/CentOS` 部分
```tex
The Nouveau kernel driver is currently in use by your system.
```

To install the Display Driver, the Nouveau drivers must first be disabled. Each distribution of Linux has a different method for disabling Nouveau.

The Nouveau drivers are loaded if the following command prints anything:
```shell
lsmod | grep nouveau
```

- Fedora
Create a file at /usr/lib/modprobe.d/blacklist-nouveau.conf with the following contents:
```tex
blacklist nouveau
options nouveau modeset=0
```
Regenerate the kernel initramfs:
```bash
sudo dracut --force
```
Run the following command:
```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```
Reboot the system.
- RHEL/CentOS
Create a file at /etc/modprobe.d/blacklist-nouveau.conf with the following contents:
```bash
blacklist nouveau
options nouveau modeset=0
```
Regenerate the kernel initramfs:
```bash
sudo dracut --force
```
- OpenSUSE
Create a file at /etc/modprobe.d/blacklist-nouveau.conf with the following contents:
```bash
blacklist nouveau
options nouveau modeset=0
```
Regenerate the kernel initrd:
```bash
sudo /sbin/mkinitrd
```

