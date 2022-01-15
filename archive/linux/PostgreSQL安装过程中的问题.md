# PostgreSQL安装过程中的问题

## 1. 在 postgres 用户中，psql 要求输入密码

> 错误信息大概是：
>
> psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL: Peer authentication failed for user "postgres"

在确保正确安装了 postgresql<版本>-server 后，将 `pg_hba.conf` 中的 `peer` 改成 `trust`。

> pg_hba.conf的位置：
>
> * Ubuntu: /etc/postgresql/14/main/
> * CentOS: /var/lib/pgsql/14/data/

## 2. 在完成了 PostgreSQL 用户的创建后，登陆密码总是不对

将 1 中的 `peer` 或 `trust` 改成 `md5`。

