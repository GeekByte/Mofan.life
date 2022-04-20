---
title: How to Compile and Install Python with OpenSSL Support?
categories:
  - Linux
tags:
  - Linux
  - Python
date: 2022-04-20 18:52:23
---

### 步骤:
https://techglimpse.com/install-python-openssl-support-tutorial/


如果在步骤中遇到了问题，可参考后面部分。

### OpenSSL问题

#### 使用pip安装程序时提示 [SSLError(](https://stackoverflow.com/questions/63084049/sslerrorcant-connect-to-https-url-because-the-ssl-module-is-not-available))

```tex
SSLError("Can't connect to HTTPS URL because the SSL module is not available.") in pip command
```

pip 对应的 python 版本不支持 ssl；如果有多个 python 版本，注意 pip 是否对应到正确的 python 版本。

#### 检查 python 是否支持 ssl

在python交互器上执行下面命令，没报错说明支持

```py
import ssl
```

#### `make` ：SSL 问题：

##### 需要更新的版本

```text
Following modules built successfully but were removed because they could not be imported: _hashlib _ssl Could not build the ssl module! Python requires a OpenSSL 1.1.1 or newer
```

通过 apt 包管理器下载的 openssl 有点旧（version: 1.1.1f），可以卸载掉(`sudo apt autoremove openssl`)，从 [openssl 官网](https://www.openssl.org/)下载源码编译，编译文档详细可查看解压后包的 `INSTALL.md`。

参考：https://stackoverflow.com/questions/60536472/building-python-and-openssl-from-source-but-ssl-module-fails

> openssl 源码编译(copy from INSTALL.md)：
>
> #### Unix / Linux / macOS
> ```sh
>     $ ./Configure
>     # 如果需要指定安装路径，命令换为: ./Configure --prefix=/usr/local/openssl
>     $ make
>     $ make test
> ```
>
> #### Unix / Linux / macOS
>
> Depending on your distribution, you need to run the following command as
> root user or prepend `sudo` to the command:
> ```sh
>     $ make install
> ```
> By default, OpenSSL will be installed to
> ```sh
>     /usr/local
> ```
> More precisely, the files will be installed into the  subdirectories
> ```sh
>     /usr/local/bin
>     /usr/local/lib
>     /usr/local/include
>     ...
> ```
> depending on the file type, as it is custom on Unix-like operating systems.

##### undefined reference to `EVP_MD_CTX_free'

·参考:

- https://stackoverflow.com/questions/46768071/openssl-linking-undefined-reference-evp-md-ctx-new-and-fre
- https://github.com/nmap/ncrack/issues/42
- https://github.com/openssl/openssl/issues/11227

#### libels.sl.3 问题

```tex
openssl: error while loading shared libraries: libssl.so.3
```

通过 `sudo ldconfig` 解决

参考：https://stackoverflow.com/questions/54124906/openssl-error-while-loading-shared-libraries-libssl-so-3

### Zlib问题

```tex
can’t decompress data; zlib not available
```

缺少 zlib，通过 `sudo apt install zlib-devel` 安装。

参考：https://trendoceans.com/how-to-solve-zipimport-zipimporterror-cant-decompress-data-zlib-not-available/



### 删除通过源码编译方式安装的 Python

脚本 :

```sh
prefix='/usr/local/'
pyver='3.6'

rm -rf \
    $HOME/.local/lib/Python${pyver} \
    ${prefix}bin/python${pyver} \
    ${prefix}bin/python${pyver}-config \
    ${prefix}bin/pip${pyver} \
    ${prefix}bin/pydoc \
    ${prefix}bin/include/python${pyver} \
    ${prefix}lib/libpython${pyver}.a \
    ${prefix}lib/python${pyver} \
    ${prefix}bin/python${pyver} \
    ${prefix}bin/pip${pyver} \
    ${prefix}bin/include/python${pyver} \
    ${prefix}lib/libpython${pyver}.a \
    ${prefix}lib/python${pyver} \
    ${prefix}lib/pkgconfig/python-${pyver}.pc \
    ${prefix}lib/libpython${pyver}m.a \
    ${prefix}bin/python${pyver}m \
    ${prefix}bin/2to3-${pyver} \
    ${prefix}bin/python${pyver}m-config \
    ${prefix}bin/idle${pyver} \
    ${prefix}bin/pydoc${pyver} \
    ${prefix}bin/pyvenv-${pyver} \
    ${prefix}share/man/man1/python${pyver}.1 \
    ${prefix}include/python${pyver}m
rm -rI ${prefix}bin/pydoc ## WARN: skip if other pythons in local exist.
```

注：`pyver` 的版本需要对应好

参考：https://unix.stackexchange.com/questions/190794/uninstall-python-installed-by-compiling-source

## Other

#### Creating Virtual Environments

https://docs.python.org/3/tutorial/venv.html#creating-virtual-environments

#### Copying a Directory with SCP

https://stackabuse.com/copying-a-directory-with-scp/

#### [How to unpack .tgz file on a Linux](https://www.cyberciti.biz/faq/unpack-tgz-linux-command-line/)
