// shared/hooks 的公共 API：外部只从这里导入
export { useEventListener } from './useEventListener';
export { useImageScanner, whenIdle } from './useImageScanner';
export type {
  DetectStatus,
  ScanStats,
  UseImageScanner
} from './useImageScanner';
export { useSocket } from './useSocket';
