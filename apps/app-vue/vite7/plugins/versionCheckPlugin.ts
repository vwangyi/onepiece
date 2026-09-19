
import type { UserConfig, ConfigEnv, Plugin } from 'vite';

export const versionCheckPlugin = (): Plugin => {
  return {
    name: 'version-check',
    buildStart() {
      // 在插件的 this.meta 上获取当前 Vite 版本
      const viteVersion = this.meta.viteVersion
      console.log('当前 Vite 版本:', viteVersion) // 例如 "8.0.0"
    }
  }
}