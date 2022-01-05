通过安装 `devtoolsets` ，然后将 `bash` 切换到 `scl` ，在 `scl` 环境下编译。

The "devtoolsets" come from Software Collections (SCL).
To install (these) SCL packages, you need:

```bash
yum install centos-release-scl-rh
```

There are currently only two devtoolset versions, the older ones have been removed:
devtoolset-6 and devtoolset-7

Available versions of g++ are thus:

```txt
compat-gcc-34-c++.x86_64            3.4.6-19.el6   base
devtoolset-6-gcc-c++.x86_64         6.3.1-3.1.el6  centos-sclo-rh
devtoolset-7-gcc-c++.x86_64         7.3.1-5.10.el6 centos-sclo-rh
gcc-c++.x86_64                      4.4.7-23.el6   base
```

To get the devtoolset version, I do recommend:

```shell
yum install devtoolset-7-toolchain # 获取指定版本,目前可以获取到8
```

That pulls in the tools to do a build.

In order to do a build:

```shell
scl enable devtoolset-7 bash # 切换到scl环境下
make # 然后编译要编译的软件
exit # 推出scl环境
```

The **scl** starts a command (bash) with environment, where devtoolset-7 tools are first in PATH.
The binaries ought to run in normal environment.