
FSD 

FSD核心规则：上层可以依赖下层 下层不依赖上层


app 
pages
widgets
features
entities
shared 


features 是 方法
entities 是 数据    

由上层的 widgets 组合 feature和entities 两者 entities 不引用feature 


一个典型的 FSD 项目，大致会组织成下面这样：

```
src/
├── app/
│   ├── providers/
│   ├── router/
│   └── index.tsx
│
├── pages/
│   ├── home/
│   ├── users/
│   └── login/
│
├── widgets/
│   ├── header/
│   ├── sidebar/
│   └── user-profile/
│
├── features/
│   ├── login/
│   ├── search-user/
│   ├── add-to-cart/
│   └── theme-switch/
│
├── entities/
│   ├── user/
│   ├── product/
│   └── order/
│
└── shared/
    ├── ui/
    ├── api/
    ├── lib/
    ├── config/
    └── styles/
```

每一层的职责：

- Page 负责组织整个页面
- Widget 负责页面中的一个区域
- Feature 负责一个业务能力
- Entity 负责一个业务对象
- Shared 提供公共基础能力

另外需要注意，FSD 并不是所有项目都需要（P7）





















## ai
你这里的“PSD”我理解为 **FSD（Feature-Sliced Design）** 的笔误；如果确实指 Photoshop 的 PSD，那和前端目录结构不是一回事。下面按 **大型前端项目 + FSD 架构** 给一个可直接参考的目录结构。

## 一、大型项目推荐：Monorepo + FSD

```txt
repo/
├── apps/                           # 可独立部署的应用
│   ├── web/                        # 用户端 Web
│   │   ├── public/
│   │   ├── src/                    # 内部按 FSD 分层
│   │   ├── tests/
│   │   │   ├── e2e/
│   │   │   └── integration/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── admin/                      # 管理后台
│   │   └── ...                     # 同样按 FSD 组织
│   └── mobile-web/                 # H5 / 移动端
│       └── ...
│
├── packages/                       # 跨应用共享包
│   ├── ui-kit/                     # 基础 UI 组件库
│   ├── api-client/                 # 统一 API SDK
│   ├── eslint-config/              # ESLint 配置
│   ├── tsconfig/                   # TS 配置
│   ├── shared-utils/               # 无业务工具函数
│   └── shared-types/               # 全局类型
│
├── tools/
│   ├── generators/                 # 生成 FSD 切片脚手架
│   └── scripts/                    # 构建、发布、检查脚本
│
├── .github/
│   └── workflows/                  # CI/CD
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

每个 `apps/*` 内部都采用同一套 FSD 分层。

---

## 二、单个应用内部的 FSD 结构

```txt
src/
├── app/                            # 应用初始化层
│   ├── providers/                  # 全局 Provider：主题、i18n、QueryClient
│   │   ├── ThemeProvider/
│   │   ├── I18nProvider/
│   │   └── QueryProvider/
│   ├── routes/                     # 路由配置
│   │   ├── router.tsx
│   │   └── guards.tsx
│   ├── store/                      # 全局状态入口
│   │   └── index.ts
│   ├── styles/                     # 全局样式、变量、reset
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.tsx
│   └── main.tsx
│
├── pages/                          # 页面层：组合 widgets/features/entities
│   ├── home/
│   │   ├── ui/
│   │   │   └── HomePage.tsx
│   │   ├── model/
│   │   │   └── useHomePage.ts
│   │   ├── api/
│   │   │   └── loadHomeData.ts
│   │   └── index.ts
│   ├── product-detail/
│   ├── cart/
│   ├── checkout/
│   ├── profile/
│   └── login/
│
├── widgets/                        # 组件层：大型独立功能块
│   ├── header/
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   └── Header.test.tsx
│   │   ├── model/
│   │   │   └── useHeader.ts
│   │   └── index.ts
│   ├── footer/
│   ├── product-gallery/
│   ├── cart-summary/
│   └── checkout-form/
│
├── features/                       # 功能层：可复用的产品功能
│   ├── auth/
│   │   ├── ui/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   ├── selectors.ts
│   │   │   └── types.ts
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── lib/
│   │   │   └── useAuth.ts
│   │   └── index.ts
│   ├── add-to-cart/
│   ├── search/
│   ├── apply-promo/
│   └── change-language/
│
├── entities/                       # 实体层：业务实体
│   ├── user/
│   │   ├── ui/
│   │   │   ├── UserAvatar.tsx
│   │   │   └── UserName.tsx
│   │   ├── model/
│   │   │   ├── store.ts
│   │   │   ├── selectors.ts
│   │   │   └── types.ts
│   │   ├── api/
│   │   │   ├── userApi.ts
│   │   │   └── queries.ts
│   │   ├── lib/
│   │   │   └── formatUserName.ts
│   │   └── index.ts
│   ├── product/
│   ├── cart/
│   ├── order/
│   └── category/
│
└── shared/                         # 共享层：无业务逻辑
    ├── api/
    │   ├── http.ts
    │   ├── endpoints.ts
    │   └── index.ts
    ├── ui/
    │   ├── Button/
    │   ├── Input/
    │   ├── Modal/
    │   └── index.ts
    ├── lib/
    │   ├── hooks/
    │   ├── formatters/
    │   ├── validators/
    │   └── index.ts
    ├── config/
    │   ├── env.ts
    │   ├── routes.ts
    │   └── index.ts
    ├── assets/
    │   ├── icons/
    │   └── images/
    └── types/
        └── global.d.ts
```

---

## 三、典型切片内部结构

以 `features/add-to-cart` 为例：

```txt
features/add-to-cart/
├── ui/
│   ├── AddToCartButton.tsx
│   └── AddToCartButton.test.tsx
├── model/
│   ├── store.ts
│   ├── selectors.ts
│   └── types.ts
├── api/
│   └── addToCart.ts
├── lib/
│   └── useAddToCart.ts
└── index.ts              # Public API，外部只能从这里导入
```

以 `entities/product` 为例：

```txt
entities/product/
├── ui/
│   ├── ProductCard.tsx
│   └── ProductPrice.tsx
├── model/
│   ├── store.ts
│   ├── selectors.ts
│   └── types.ts
├── api/
│   ├── productApi.ts
│   └── queries.ts
├── lib/
│   └── formatPrice.ts
└── index.ts
```

---

## 四、FSD 依赖规则

```txt
app
 ↑
pages
 ↑
widgets
 ↑
features
 ↑
entities
 ↑
shared
```

- **上层可以依赖下层**：`pages` 可以用 `widgets/features/entities/shared`。
- **下层不能依赖上层**：`entities` 不能导入 `features`。
- **同层切片不能互相引用**：`features/auth` 不能直接导入 `features/search`。
- **每个切片通过 `index.ts` 暴露 Public API**，外部不要深入切片内部导入。
- `shared` 里不能出现业务逻辑。

---

## 五、大型项目补充建议

- **代码生成器**：`tools/generators` 自动生成 `features/xxx`、`entities/xxx` 模板，保证目录一致。
- **架构检查**：用 Steiger、ESLint 插件检查依赖方向，防止越层引用。
- **测试分层**：
  - 单元测试：同目录 `*.test.tsx`
  - 集成测试：`tests/integration`
  - E2E：`tests/e2e`
- **微前端**：每个 `apps/*` 可独立部署，通过 `packages/ui-kit`、`packages/api-client` 共享基础能力。
- **状态管理**：全局状态放 `app/store`，业务状态放各切片 `model`，基础工具放 `shared/lib`。
- **API 层**：`shared/api` 放 HTTP 实例和拦截器；`entities/*/api` 放实体请求；`features/*/api` 放具体功能操作。

一句话：**外层 Monorepo 管多应用，内层用 FSD 的 `app → pages → widgets → features → entities → shared` 管业务复杂度，每个切片用 `ui/model/api/lib` 分职责，并通过 `index.ts` 控制公开边界。**