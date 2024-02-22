---
title: 在Linux中源码安装Nginx
categories:
  - Linux
tags:
  - Linux
date: 2022-07-05 22:00:20
---

## 准备工作

首先，安装编译环境用到的 gcc g++ 等库。

**CentOS**

```shell
sudo yum -y install gcc automake autoconf libtool make
sudo yum install gcc gcc-c++
```

**Ubuntu**

```shell
sudo apt-get install build-essential
sudo apt-get install libtool
```

进入到 `/usr/local/src` 目录，按照顺序安装 pcre，zlib，ssl。

**pcre**

可以在 [pcre](https://github.com/PCRE2Project/pcre2/releases) 下载源码，这里下载的是 [pcre2-10.40.tar.gz](https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.40/pcre2-10.40.tar.gz)

```shell
cd /usr/local/src
wget https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.40/pcre2-10.40.tar.gz
tar -zxvf pcre2-10.40.tar.gz
cd pcre2-10.40
./configure
make
make install
```

**zlib**

可以去 [zlib](https://zlib.net/) 下载源码，这里下载的是 zlib-1.2.12.tar.gz

```shell
cd /usr/local/src
wget https://zlib.net/zlib-1.2.12.tar.gz
tar -zxvf zlib-1.2.12.tar.gz
cd zlib-1.2.12
./configure
make
make install
```

**ssl**

下载 [ssl](https://www.openssl.org/source/) 源码，无需安装，这里下载的是openssl-1.1.1p.tar.gz，不要使用高版本那个，会报错误，不清楚为啥。可以使 Nginx 支持 https。

```shell
cd /usr/local/src
wget https://www.openssl.org/source/openssl-1.1.1p.tar.gz
tar -zxvf openssl-1.1.1p.tar.gz
```

## 安装 Nginx

进入到 `/usr/local`，下载 [nginx](https://nginx.org/en/download.html) 源码，Nginx 分为 开发版(Mainline version) 和 稳定版(Stable version)，这里安装的是稳定版 1.22.0。

```
cd /usr/local
wget https://nginx.org/download/nginx-1.22.0.tar.gz
tar -zxvf nginx-1.22.0.tar.gz
cd nginx-1.22.0

./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_gzip_static_module \
--with-http_stub_status_module \
--with-file-aio \
--with-http_realip_module \
--with-http_ssl_module \
--with-pcre=/usr/local/src/pcre2-10.40 \
--with-zlib=/usr/local/src/zlib-1.2.12 \
--with-openssl=/usr/local/src/openssl-1.1.1p

make -j2
make install
```

上面 `./configure` 后的 `--with-pcre` `--with-zlib` `--with-openssl` 的值对应 `pcre` `zlib` `openssl` 的源码目录。

> configure命令是用来检测你的安装平台的目标特征的吗，是个shell脚本，执行结束时，它会创建一个Makefile文件。nginx的configure命令支持以下参数：
>
> - `--prefix=*path*`  定义一个目录，存放服务器上的文件 ，也就是nginx的安装目录。默认使用 `/usr/local/nginx。`
> - `--sbin-path=*path*` 设置nginx的可执行文件的路径，默认为  `*prefix*/sbin/nginx`.
> - `--conf-path=*path*` 设置在nginx.conf配置文件的路径。nginx允许使用不同的配置文件启动，通过命令行中的-c选项。默认为`*prefix*/conf/nginx.conf`.
> - `--pid-path=*path* 设置nginx.pid文件，将存储的主进程的进程号。安装完成后，可以随时改变的文件名 ， 在nginx.conf配置文件中使用 PID指令。默认情况下，文件名 为``*prefix*/logs/nginx.pid`.
> - `--error-log-path=*path*` 设置主错误，警告，和诊断文件的名称。安装完成后，可以随时改变的文件名 ，在nginx.conf配置文件中 使用 的error_log指令。默认情况下，文件名 为`*prefix*/logs/error.log`.
> - `--http-log-path=*path*` 设置主请求的HTTP服务器的日志文件的名称。安装完成后，可以随时改变的文件名 ，在nginx.conf配置文件中 使用 的access_log指令。默认情况下，文件名 为`*prefix*/logs/access.log`.
> - `--user=*name*` 设置nginx工作进程的用户。安装完成后，可以随时更改的名称在nginx.conf配置文件中 使用的 user指令。默认的用户名是nobody。
> - `--group=*name*` 设置nginx工作进程的用户组。安装完成后，可以随时更改的名称在nginx.conf配置文件中 使用的 user指令。默认的为非特权用户。
> - `--with-select_module` `--without-select_module 启用或禁用构建一个模块来允许服务器使用select()方法。该模块将自动建立，如果平台不支持的kqueue，epoll，rtsig或/dev/poll。`
> - `--with-poll_module` `--without-poll_module` 启用或禁用构建一个模块来允许服务器使用poll()方法。该模块将自动建立，如果平台不支持的kqueue，epoll，rtsig或/dev/poll。
> - `--without-http_gzip_module` — 不编译压缩的HTTP服务器的响应模块。编译并运行此模块需要zlib库。
> - `--without-http_rewrite_module` 不编译重写模块。编译并运行此模块需要PCRE库支持。
> - `--without-http_proxy_module` — 不编译http_proxy模块。
> - `--with-http_ssl_module` — 使用https协议模块。默认情况下，该模块没有被构建。建立并运行此模块的OpenSSL库是必需的。
> - `--with-pcre=*path*` — 设置PCRE库的源码路径。PCRE库的源码（版本4.4 - 8.30）需要从PCRE网站下载并解压。其余的工作是Nginx的./ configure和make来完成。正则表达式使用在location指令和 ngx_http_rewrite_module 模块中。
> - `--with-pcre-jit` —编译PCRE包含“just-in-time compilation”（1.1.12中， pcre_jit指令）。
> - `--with-zlib=*path*` —设置的zlib库的源码路径。要下载从 zlib（版本1.1.3 - 1.2.5）的并解压。其余的工作是Nginx的./ configure和make完成。ngx_http_gzip_module模块需要使用zlib 。
> - `--with-cc-opt=*parameters*` — 设置额外的参数将被添加到CFLAGS变量。例如,当你在FreeBSD上使用PCRE库时需要使用:`--with-cc-opt="-I /usr/local/include。`.如需要需要增加 `select()支持的文件数量`:`--with-cc-opt="-D FD_SETSIZE=2048".`
> - `--with-ld-opt=*parameters*` —设置附加的参数，将用于在链接期间。例如，当在FreeBSD下使用该系统的PCRE库,应指定:`--with-ld-opt="-L /usr/local/lib".`

安装成功后，进入到 `/usr/local/nginx` 目录，里面的内容大致为：

```txt
fastcgi.conf            koi-win             nginx.conf.default
fastcgi.conf.default    logs                scgi_params
fastcgi_params          mime.types          scgi_params.default
fastcgi_params.default  mime.types.default  uwsgi_params
html                    nginx               uwsgi_params.default
koi-utf                 nginx.conf          win-utf
```

其中，主要为 `nginx` 可执行文件 和 `nginx.conf` 的配置文件。

## 运行 Nginx

检查 80 端口是否被占用。

```shell
netstat -ano|grep 80
```

如果没有输出，则代表没有被占用。

启动 nginx

```shell
sudo /usr/local/nginx/nginx # 使用默认 /etc/nginx/nginx.conf 作为配置文件

# 或者

sudo /usr/local/nginx/nginx -f /usr/local/nginx/nginx.conf # 指定配置文件
```

## 可能遇到的错误

### 编译 pcre 错误

```tex
libtool: compile: unrecognized option `-DHAVE_CONFIG_H'
libtool: compile: Try `libtool --help' for more information.
make[1]: *** [pcrecpp.lo] Error 1
make[1]: Leaving directory `/usr/local/src/pcre2-10.40'
make: *** [all] Error 2
```

重新安装 g++，然后重新在 nginx 源码目录执行 configure。

```shell
apt-get install g++
apt-get install build-essential
make clean
./configure
make
```

### 编译 nginx 出错

```tex
make: *** No rule to make target `build', needed by `default'.  Stop.
./configure: error: SSL modules require the OpenSSL library.
You can either do not enable the modules, or install the OpenSSL library
into the system, or build the OpenSSL library statically from the source
with nginx by using --with-openssl= option.
```

ubuntu下

```shell
apt-get install opensslapt-get install libssl-dev
```

centos下

```shell
yum -y install openssl openssl-devel
```

