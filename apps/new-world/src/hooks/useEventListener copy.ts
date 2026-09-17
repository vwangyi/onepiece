
import { unref, watch, type WatchStopHandle } from 'vue';
import type { Ref } from 'vue';

type MaybeRefTarget =
  | EventTarget
  | Ref<EventTarget | null | undefined>
  | null
  | undefined;

type EventHandler = (event: Event) => void;
type ListenerOptions = boolean | AddEventListenerOptions | undefined;

// 重载 1：省略 target
export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// 重载 2：window
export function useEventListener<K extends keyof WindowEventMap>(
  target: Window,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// 重载 3：document
export function useEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// 重载 4：HTMLElement / Ref<HTMLElement>
export function useEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Ref<HTMLElement | null | undefined>,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: ListenerOptions
): WatchStopHandle;

// 重载 5：兜底
export function useEventListener(
  target: MaybeRefTarget,
  event: string,
  handler: EventHandler,
  options?: ListenerOptions
): WatchStopHandle;

// ---------- 实现 ----------
export function useEventListener(
  targetOrEvent: MaybeRefTarget | string,
  eventOrHandler: string | EventHandler,
  handlerOrOptions?: EventHandler | ListenerOptions,
  maybeOptions?: ListenerOptions
): WatchStopHandle {
  // 关键：显式声明 target 的类型，让后续 unref 有确定结果
  let target: MaybeRefTarget;

  if (typeof targetOrEvent === 'string') {
    // 省略 target 的调用形式
    target = window;
    eventOrHandler = eventOrHandler as string;
    handlerOrOptions = handlerOrOptions as EventHandler;
  } else {
    target = targetOrEvent;
  }

  const event = eventOrHandler as string;
  const handler = handlerOrOptions as EventHandler;
  const options = (typeof targetOrEvent === 'string'
    ? handlerOrOptions
    : maybeOptions) as ListenerOptions;

  return watch(
    // unref 后这里能推出 EventTarget | null | undefined
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