// shared/wasm 的公共 API：外部只从这里导入
export {
  loadOpenCV,
  opencvLoaded,
  opencvVersion,
  detectRectWithOpenCV,
  perspectiveCorrect,
  OPENCV_DEFAULT_OPTIONS
} from './opencv-image-processing';
export type {
  Rect,
  StepTiming,
  CvMat,
  Cv,
  OpenCvDetectResult
} from './opencv-image-processing';
