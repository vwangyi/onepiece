方案一：Cloudflare R2（个人项目首选）
如果你只是自己练手、做个人项目，这是目前最省心的选择。

它的核心优势是没有出站流量费。静态资源（图片、视频）被访问时，流量不花钱，这恰恰是其他云厂商容易产生意外账单的地方。免费额度是每月 10GB 存储、100 万次读操作、10 万次写操作。对于个人博客或小型应用，这个量基本用不完。

技术上，它兼容 S3 API，在 NestJS 里可以用你熟悉的 S3 SDK 来操作，迁移成本低。已经有现成的开源项目（如 cf-image-cloud）可以直接部署成个人图床，完全基于 Cloudflare 免费套餐。需要注意，注册时可能需要绑定信用卡验证，但只要不超额，就不会扣费。

在 NestJS 项目里接入 Cloudflare R2，核心思路是利用它**兼容 S3 API** 的特性，让你用熟悉的 `@aws-sdk/client-s3` 就能操作。整个过程可以拆解为三步：开通配置、后端接入、上传与访问。

### 🚀 第一步：在 Cloudflare 端完成准备工作

1.  **开通 R2 并创建存储桶**：登录 Cloudflare 控制台，进入 R2 服务。开通时会要求绑定支付方式（如信用卡或 PayPal）用于验证，但只要用量在免费额度内就不会扣费。免费额度是每月 **10 GB 存储**、100 万次 A 类操作（如上传）和 1000 万次 B 类操作（如读取）。然后创建一个存储桶，记下它的名称。
2.  **获取 S3 凭据**：在 R2 控制台生成一对 **Access Key ID** 和 **Secret Access Key**，并记下你的 **Account ID**。后续 NestJS 连接时需要用它们来构造 endpoint。
3.  **配置公开访问（按需）**：R2 的桶默认是私有的。如果你的图片视频需要被公开链接直接访问，可以在桶的设置里启用 **R2.dev 子域名**，或者绑定你自己的自定义域名。如果只想通过后端生成临时签名链接来访问，这一步可以跳过。

### 💻 第二步：在 NestJS 中接入 R2

**1. 安装必要的依赖**
在你的 NestJS 项目里，安装 AWS S3 SDK 和生成预签名 URL 的工具：

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

**2. 配置 S3 客户端**
创建一个服务来封装 R2 操作。关键配置在于 `endpoint` 和 `region`：

```typescript
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto', // R2 要求填 'auto'，它本身不使用 region 概念
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});
```

记得把 `R2_ACCOUNT_ID`、`R2_ACCESS_KEY_ID` 等放在你的 `.env` 文件里，不要硬编码在代码中。

### 📤 第三步：实现上传与访问逻辑

对于你的场景（上传图片视频），推荐使用**预签名 URL（Presigned URL）** 的方式。这样客户端直接传文件到 R2，不经过你的 NestJS 服务器，能避免大文件占用服务器内存和带宽。

**后端（NestJS）生成上传链接**：

```typescript
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

async function getUploadUrl(fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${fileName}`, // 给文件一个唯一路径
    ContentType: contentType
  });
  // 生成一个 5 分钟内有效的上传链接
  return getSignedUrl(s3, command, { expiresIn: 300 });
}
```

你的 NestJS 接口返回这个 `url` 给前端。前端拿到后，直接用 `fetch(url, { method: 'PUT', body: file })` 就能把文件传到 R2。

**访问文件**：

- **公开访问**：如果桶开启了 R2.dev 或自定义域名，文件的访问地址就是 `https://<你的域名>/<文件Key>`。
- **私有访问**：如果桶是私有的，可以用 `GetObjectCommand` 生成一个有时效的下载链接，同样通过后端返回给前端。

### 💡 一个省心的替代方案

如果你不想在 NestJS 里自己封装 S3 客户端，可以考虑用社区维护的 `@oxth/nestjs-storage` 这类模块。它内置了对 R2 的支持，你只需要在配置里填入 `driver: 'r2'` 和你的凭据，就能直接用它的 `StorageService` 来上传、获取签名链接，代码会更简洁。

整个流程里，最需要留意的就是 `region: 'auto'` 这个配置，其他部分和你用 AWS S3 几乎一样。你可以先从创建一个测试桶开始，跑通一次上传，确认网络和权限没问题再集成到项目里。
