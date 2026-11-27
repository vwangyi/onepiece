
## FSD  
fsd是从上至下分为六层。app pages widgets features entities shared。上层依赖（调用）下层 。
entities只依赖shared层。shared层不依赖任何层。

## 
封装后端api接口 往往是传入泛型，返回值和泛型一致。 一般会约束泛型防止调用者乱传。
extends 约束泛型必须是一个对象 防止调用方随意乱传