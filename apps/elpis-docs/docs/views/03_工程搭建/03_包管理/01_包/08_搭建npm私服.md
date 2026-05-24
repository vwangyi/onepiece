# 如何搭建npm 私服 
- 因为npm官方 不允许发私有包 或 发私有包要钱 
```shell
# https://verdaccio.org/zh-CN/

# Verdaccio 是可以帮我们快速构建npm私服的一个工具

npm install verdaccio -g # 下载
verdaccio # 启动私有npm包服务器



#创建账号
npm adduser --registry http://localhost:4873/
#账号 密码 邮箱

# 发布npm
npm publish --registry http://localhost:4873/


#指定开启端口 默认 4873
verdaccio --listen 9999

# 指定安装源
npm install --registry http://localhost:4873

# 从本地仓库删除包
npm unpublish <package-name> --registry http://localhost:4873

```
