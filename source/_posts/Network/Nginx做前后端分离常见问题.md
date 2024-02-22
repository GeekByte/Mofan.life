---
title: Nginx做前后端分离常见问题
categories:
  - Nginx
tags:
  - Nginx
date: 2021-08-10 22:43:56
---

### 问题一：Nginx做Web服务器

```tex
#前端页面服务器
    server {
        #监听端口和域名
        listen       80; 
        server_name  172.18.58.31;
 
        #添加头部信息
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        #添加拦截路径和根目录
        location / {
               root   html/wanmor_cloud_platform_frontend;  
               index  html/login/login.html;  
        }           
        
    }
```

让nginx拦截80端口,然后直接去nginx根目录下的html/wanmor_cloud_platform_frontend      wanmor_cloud_platform_frontend 就是前端项目名.

当然root也可以写绝对路径,  

root  /home/winnersoft/server/wanmo-soft/wanmor_cloud_platform_frontend/ ;

index后面就是首页的路径.  

这样访问ip就可以访问web前端的静态页面了.


### 问题二：跨域问题

> 跨域问题：*如果前端资源和后端资源不在一个项目的话,浏览器会拦截前端对后台的请求*

基于问题一的设置，就会存在跨域问题，解决跨域问题可以利用 Nginx的转发。

```tex
server {
        #监听端口和域名
        listen       80; 
        server_name  172.18.58.31;
 
        #添加头部信息
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 
        #添加拦截路径和代理地址
        location /api/ {              
               proxy_pass http://172.18.58.31:4541/;  #注意：使用代理地址时末尾记得加上斜杠"/"。    
        }
           
        
        #添加拦截路径和根目录
        location / {
               root   html/wanmor_cloud_platform_frontend;  
               index  html/login/login.html;  #index表示首页 
        }           
        
    }
```

让nginx拦截所有带/api/的请求,转发到后端服务器,就可以解决跨域的问题.

比如前端ajax 请求的url为http://172.18.58.31:80/api/login

经过nginx代理之后变成了

http://172.168.58.31:4541/login

这样配置之后,在前端所有的请求加上/api/

这样就可以欺骗浏览器和服务器,解决跨域的问题

### 问题三：获取用户IP的问题

基于问题二，用Nginx转发后，后端获取的IP其实是Nginx的IP，所以，想获取用户的IP，还需要对配置做些修改：

```tex
server {
        #监听端口和域名
        listen       80; 
        server_name  172.18.58.31;
 
        #添加头部信息
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-real-ip $remote_addr;
 
        #添加拦截路径和代理地址
        location /api/ {    
       		   #注意：使用代理地址时末尾记得加上斜杠"/"。    
               proxy_pass http://172.18.58.31:4541/;  
        }
          
        
        #添加拦截路径和根目录
        location / {
               root   html/wanmor_cloud_platform_frontend;  
               index  html/login/login.html;  #index表示首页 
        }           
        
    }
```

在头部信息里添加

proxy_set_header X-real-ip $remote_addr; 这样nginx就会带着用户真实ip去访问后端服务器,

 

后端代码也需要修改

String userIp = request.getHeader("X-real-ip");

这样就是获取nginx传过来的用户真实ip

### 问题四：大文件上传失败问题

如果前端请求涉及到资源上传,资源大小过大的话nginx会拦截请求，并返回`413 (Request Entity Too Large)`的信息。

解决此问题需要修改Nginx对请求大小的限制。

```tex
http {
    include       mime.types;
    default_type  application/octet-stream;
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                       '"$http_user_agent" "$http_x_forwarded_for"';
    client_max_body_size 100m;
 
    sendfile        on;
    keepalive_timeout  65;
 
    #前端页面服务器
    server {
        #监听端口和域名
        listen       80; 
        server_name  172.18.58.31;
 
        #添加头部信息
        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-real-ip $remote_addr;
 
        #添加拦截路径和代理地址
        location /api/ {              
               proxy_pass http://172.18.58.31:4541/;  #注意：使用代理地址时末尾记得加上斜杠"/"。    
        }
          
        
        #添加拦截路径和根目录
        location / {
               root   html/wanmor_cloud_platform_frontend;  
               index  html/login/login.html;  #index表示首页 
        }           
        
    }
}
```

http下面添加

client_max_body_size 100m;

可以将请求大小最大值限制在100M,大家可以根据实际情况配置

### 问题5: 配置下载速率

```tex
http {
 
	limit_conn_zone $binary_remote_addr zone=one:10m; #容器共使用10M的内存来对于IP传输开销
 
    include       mime.types;
    default_type  application/octet-stream;
 
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
 
    #access_log  logs/access.log  main;
 
    sendfile        on;
    #tcp_nopush     on;
 
    #keepalive_timeout  0;
    keepalive_timeout  65;
 
    #gzip  on;
 
 
    server {
        listen       8080;
        server_name  localhost;
 
        #nginx下载文件指向本地服务
        location ~ \.apk {
            root   /usr/local/apache-tomcat-8.0.51/webapps/;  
            autoindex on;
        	limit_conn one 1; 
 			limit_rate 20k; 
 	#		limit_rate_after 1m;   
        }
 
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
 
    }
}
```

在http 下面添加

limit_conn_zone $binary_remote_addr zone=one:10m;

 然后在service下面location 拦截.apk的请求

root 是静态.apk资源的文件路径

autoindex on; 表示可以访问目录列表

limit_conn one 1;表示拦截下载的每1个线程

limit_rate 20k; 表示下载速度限制 20kb;\

limit_rate_after 1m;  表示下载了1m之后才开始限速

这样如果下载的kehu客户端使用单线程下载,就是20kb/s,如果客户端开启了3个线程 ,就是20kb/s*3=60kb/s,
