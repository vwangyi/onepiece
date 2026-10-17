import { ref, reactive, readonly } from 'vue';
import type { DeepReadonly } from 'vue';
import type { TreeProps } from 'ant-design-vue';
import { defineStore } from 'pinia';

type TreeData = TreeProps['treeData'];

// 内部状态为可读写
interface ImageCaptureState {
  test: number;
  open: boolean;
  selectedKeys: string[];
  expandedKeys: string[];
  treeData: TreeData;
}

// 外部状态类型为只读
interface ImageCaptureStore {
  readonly state: DeepReadonly<ImageCaptureState>;
  incrementTest: () => void;
  updateOpen: (v: boolean) => void;
  updateSelectedKeys: (v: string[]) => void;
  updateExpandedKeys: (v: string[]) => void;
  updateTreeData: (v: TreeData) => void;
}

export const useImageCaptureStore = defineStore(
  'image-capture',
  (): ImageCaptureStore => {
    const state = reactive<ImageCaptureState>({
      test: 1,
      open: false,
      selectedKeys: ['0-0'],
      expandedKeys: ['0-0'],
      treeData: [
        { title: '身份证人像页', key: '0-0', children: [] },
        { title: '身份证人像页', key: '0-0-8', children: [] },
        { title: '身份证国徽页', key: '0-1', children: [] }
      ]
    });

    function incrementTest() {
      state.test += 1;
    }

    function updateOpen(v: boolean) {
      state.open = v;
    }

    function updateSelectedKeys(v: string[]) {
      state.selectedKeys = v;
    }

    function updateExpandedKeys(v: string[]) {
      state.expandedKeys = v;
    }

    function updateTreeData(v: TreeData) {
      state.treeData = v;
    }

    return {
      state: readonly(state),
      incrementTest,
      updateOpen,
      updateSelectedKeys,
      updateExpandedKeys,
      updateTreeData
    };
  }
);
