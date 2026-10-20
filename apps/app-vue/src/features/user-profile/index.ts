export {} from './ui/UserProfilePanel.vue';

// 如果 useUser 的加载逻辑觉得太重

// entities/user 也可以不提供 useUser composable，只保留纯函数 getCurrentUser / getUserById，
// 把加载状态的编排交给 features 层自己处理。
// 这样 entities 更“薄”，但代价是多个 feature 可能重复写相似的加载逻辑。
// 取舍原则是：加载/错误状态的模式如果稳定且跨 feature 复用，可以放到 entities 的 api 段；
// 如果不同 feature 对加载行为有不同诉求，就让它们各自管理。
// 上面的 useUser 是一个可选的便利封装，不是 FSD 的强制要求。

/**
 * 非常重要的心得
 *
 * 1. entities features widgets shared 并不是一开始就有的 ，app pages 任何大小的项目都有。
 *
 * 我们应该无脑的在pages上写所有功能，当发现问题时 才 分门别类的 拆分抽离到 feature entities widgets shared中
 *
 *
 */
