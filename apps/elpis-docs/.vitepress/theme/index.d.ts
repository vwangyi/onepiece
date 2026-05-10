// .vitepress/theme/shims.d.ts
declare module '*.css' {
    const content: string
    export default content
}