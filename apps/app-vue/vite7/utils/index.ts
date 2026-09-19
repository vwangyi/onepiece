export function wrapperEnv(obj: any) {
    return {
        ...obj,
        VITE_PORT: Number(obj.VITE_PORT) || 1234,
        VITE_OPEN: obj.VITE_OPEN === 'true',
        VITE_DROP_CONSOLE: obj.VITE_DROP_CONSOLE === 'true',
    }
}