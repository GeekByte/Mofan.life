# MySQL修改用户密码

1. 创建一个新密码作为主密码并将旧密码作为次要密码

    ```mysql
    ALTER USER 'jeffrey'@'localhost'
      IDENTIFIED BY 'new_password'
      RETAIN CURRENT PASSWORD;
    ```

2. 删除次要密码

    ```mysql
    ALTER USER 'jeffery'@'localhost' DISCARD OLD PASSWORD;
    ```



参考：[MySQL :: MySQL 8.0 Reference Manual :: 13.7.1.1 ALTER USER Statement](https://dev.mysql.com/doc/refman/8.0/en/alter-user.html#alter-user-authentication)



可能是第二种方案（未验证）：

[How To Reset Your MySQL or MariaDB Root Password | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-reset-your-mysql-or-mariadb-root-password)