## 透传

v-bind="attrs"

## 插槽

- 接收插槽
  <slot name="default" :xx1="xx">默认内容</slot>
  $slots

- 传递插槽
  <template #['default']="scoped"></template>
