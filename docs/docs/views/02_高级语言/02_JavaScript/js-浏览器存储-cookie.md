# cookie 



记住密码功能
cookie大小为 4kb 


## 4. localStorage & sessionStorage & cookie & session
> localStorage & sessionStorage & cookie在客户端
>
> session在服务器 没有大小 更安全
>
> localStorage 20m  关页面不消失 跨页面能拿到 不清除一直有（必须手动清除）
>
> sessionStorage 5m  关页面消失 跨页面拿不到
>
> cookie 4k  不设置过期时间关页面消失 可以设置路径
>

```javascript
// 举例
// 1. token用cookie 优势是可以设置过期时间
// 2. 记住账号密码 localStorage 优势是持久存储
// 3. 购物车用session 临时数据但是要存储 因为换设备依然要显示
```
