- 使用包管理器安装Nginx

  ```
  dnf install nginx -y  #安装过程中跳过所有询问,系统自动选择y
  ```

- 常用命令

  ```
  nginx -V # 查看版本
  systemctl enable nginx # 设置nginx开机启动
  systemctl start nginx # 启动nginx
  systemctl status nginx # 查看nginx状态
  ```

- 修改Nginx配置文件

  ```
  vim /etc/nginx/nginx.conf
      server {
          listen       80 default_server;
          listen       [::]:80 default_server;
          server_name  114.215.87.215;  
          root         /usr/share/nginx/html;
  
          # Load configuration files for the default server block.
          include /etc/nginx/default.d/*.conf;
  
          location / {
          }
  
          error_page 404 /404.html;
              location = /40x.html {
          }
  
          error_page 500 502 503 504 /50x.html;
              location = /50x.html {
          }
      }
  ```

- 防火墙设置

  > 浏览器打开公网IP未出现welcome to Nginx，应该是防火墙未打开80端口，先去阿里云安全组规则中添加80端口规则，然后打开防火墙的80端口即可

  ```
  systemctl start firewalld.service            #启动防火墙  
  systemctl stop firewalld.service             #停止防火墙  
  systemctl status firewalld.service           #显示服务的状态
  systemctl enable firewalld.service           #在开机时启用服务
  firewall-cmd --state                         #查看防火墙状态  
  firewall-cmd --reload                        #重载防火墙规则  
  firewall-cmd --list-ports                    #查看所有打开的端口  
  firewall-cmd --list-services                 #查看所有允许的服务
  firewall-cmd --add-port=80/tcp --permanent   #永久添加80端口例外(全局)
  ```

  

