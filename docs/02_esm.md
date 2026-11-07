## import

import.meta.url

## 获取当前文件夹名路径

获取当前文件夹名路径
commonjs通过 __dirname
esm 通过
path.dirname(fileURLToPath(import.meta.url));
或
new URL('.', import.meta.url).pathname

## 获取当前文件名路径

获取当前文件名路径
commonjs通过 __filename
esm 通过
path.basename(fileURLToPath(import.meta.url));
