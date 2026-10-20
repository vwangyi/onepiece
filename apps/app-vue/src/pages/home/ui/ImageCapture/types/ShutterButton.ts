/**
 * 快门按钮 ShutterButton 的类型契约
 *
 * 这里集中定义「props」与「事件」两侧的类型，让事件发出方
 * （ShutterButton / VideoCamera）与事件接收方（ImageCapture）
 * 共用同一份声明，避免各写各的内联类型导致对不上。
 */

/** ShutterButton 组件的 Props */
export interface ShutterButtonProps {
  /** 由父组件 VideoCamera 注入的 video 元素 */
  video: HTMLVideoElement;
}

/**
 * `click-shutter` 事件的载荷。
 * 用对象而不是裸的 video 元素，是为了后续要带额外信息（如拍摄时间、来源）
 * 时不需要破坏性修改事件签名。
 */
export interface ClickShutterPayload {
  video: HTMLVideoElement;
}

/**
 * `click-shutter` 事件的类型声明。
 * 具名元组语法让 vue-tsc 能校验 emit 的入参，
 * 同时让父组件的 handler 参数类型被自动推导出来。
 */
export interface ShutterButtonEmits {
  'click-shutter': [payload: ClickShutterPayload];
}
