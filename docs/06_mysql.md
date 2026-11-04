## 删除表

删除表通过 drop table if exists `表名`;

## 创建表

create table if not exists `student` (
-- not null 表示非空
-- default null 表示设置默认值为null
-- auto_increment 表示自增
-- comment '' 表示写注释
`id` int(4) not null auto_increment comment '这是表示学号',
`name` varchar(30) not null default '未知用户' comment '这是表示姓名',
`pwd` varchar(20) not null default '123456' comment '这是表示姓名',
`gender` varchar(2) not null default '女' comment '这是表示性别',
`birthday` datetime default null comment '这是表示出生日期',
`address` varchar(100) default null comment '这是表示家庭住址',
`email` varchar(50) default null comment '邮箱',
-- 设置 这张表的主键为 id
primary key(`id`)

) engine=innodb default charset=utf8

## 表增加一条记录

通过 insert into 表名(字段1,字段2) values(值1,值2) 语句来增加一条记录 字段需要用反引号包裹，值需要用单引号或双引号包裹。
values后面的括号 可以有多组值有逗号分隔。 表示一次性增加多条记录。

## 事务

事务是多个操作组合到一起。要么全部成功，要么全部失败。比如转账操作分为扣钱和加钱。
