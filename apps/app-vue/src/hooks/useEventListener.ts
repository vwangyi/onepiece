import { unref, watch, type WatchStopHandle } from 'vue';
import type { Ref } from 'vue';

/** 可绑定事件的目标（可能是 ref 包裹的） */
type MaybeRefTarget =
  | EventTarget
  | Ref<EventTarget | null | undefined>
  | null
  | undefined;

type EventHandler = (event: Event) => void;
type ListenerOptions = boolean | AddEventListenerOptions | undefined;

/** 实现签名用的参数元组 */
type ArgsWithTarget = [MaybeRefTarget, string, EventHandler, ListenerOptions?];
type ArgsWithoutTarget = [string, EventHandler, ListenerOptions?];

// ---------- 重载 1：省略 target，默认 window ----------
export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 重载 2：window ----------
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 重载 3：document ----------
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 重载 4：HTMLElement / Ref<HTMLElement> ----------
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Ref<HTMLElement | null | undefined>,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 重载 5：兜底 ----------
export function useEventListener(
  target: MaybeRefTarget,
  event: string,
  handler: EventHandler,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 实现签名 ----------
export function useEventListener(
  ...args: ArgsWithTarget | ArgsWithoutTarget
): WatchStopHandle {
  // 关键 1：判断第一个参数是不是 string，决定 target
  const target = typeof args[0] === 'string' ? window : args.shift();

  // if (typeof args[0] === 'string') {
  //   // 省略 target 形式：args 是 [event, handler, options?]
  //   target = window;
  // } else {
  //   // 传了 target：shift 掉第一个，剩下 [event, handler, options?]
  //   target = args.shift() as MaybeRefTarget;
  // }

  // 此时剩下 [event, handler, options?]
  const [event, handler, options] = args as ArgsWithoutTarget;

  return watch(
    // 关键 2：unref + 断言，让 element 有确定类型
    () => unref(target) as EventTarget | null | undefined,
    (element, _, onCleanup) => {
      if (!element) return;

      element.addEventListener(event, handler, options);

      onCleanup(() => {
        element.removeEventListener(event, handler, options);
      });
    },
    { immediate: true }
  );
}