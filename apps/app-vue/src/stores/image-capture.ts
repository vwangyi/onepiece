import { ref, readonly } from 'vue';
import type { TreeProps } from 'ant-design-vue';
import { defineStore } from 'pinia';
import type { Ref, DeepReadonly } from 'vue';

type TreeData = TreeProps['treeData'];

interface ImageCaptureStore {
  test: Ref<number>;
  open: Ref<boolean>;
  selectedKeys: Ref<string[]>;
  expandedKeys: Ref<string[]>;
  treeData: Ref<TreeData>;
  updateOpen: (v: boolean) => void;
  updateSelectedKeys: (v: string[]) => void;
  updateExpandedKeys: (v: string[]) => void;
  updateTreeData: (v: TreeData) => void;
}

export const useImageCaptureStore = defineStore(
  'image-capture',
  (): ImageCaptureStore => {
    const test = ref(1);
    const open = ref<boolean>(false);
    const selectedKeys = ref<string[]>(['0-0']);
    const expandedKeys = ref<string[]>(['0-0']);
    const treeData = ref<TreeData>([
      { title: '身份证人像页', key: '0-0', children: [] },
      { title: '身份证人像页', key: '0-0-8', children: [] },
      { title: '身份证国徽页', key: '0-1', children: [] }
    ]);

    function updateOpen(v: boolean) {
      open.value = v;
    }

    function updateSelectedKeys(v: string[]) {
      selectedKeys.value = v;
    }
    function updateExpandedKeys(v: string[]) {
      expandedKeys.value = v;
    }

    function updateTreeData(v: TreeData) {
      treeData.value = v;
    }

    return {
      test,
      open,
      selectedKeys,
      expandedKeys,
      treeData,
      updateOpen,
      updateSelectedKeys,
      updateExpandedKeys,
      updateTreeData
    };
  }
);
