# MVVM   
 
M是 model层：负责管理状态和核心业务逻辑。只关注数据本身和操作数据的方法 ，状态存储的是 View Object 

V是view视图层：负责管理视图，视图是对model层管理的状态的一种映射  样式 通常是 XML HTML 等标记语言  没有业务逻辑 
VM是 viewmodel层：
    负责管理交互，负责 将 model层的数据 加工 给template直接显示, 比如 价格数据格式化 加个¥ 
    负责view层 用户输入的数据 加工给 model层 比如 trim()清除左右空格

Vue借鉴了MVVM模式 但没有完全采用MVVM格式 


