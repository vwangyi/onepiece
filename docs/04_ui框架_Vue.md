## ref和reactive

## computed和watch

## 透传

v-bind="attrs"

## 插槽

- 接收插槽
  <slot name="default" :xx1="xx">默认内容</slot>
  $slots

- 传递插槽
  <template #['default']="scoped"></template>

## key

key属性是xx 如何使用

keyValue++

<div key="keyValue"></div

## computed和watch区别

computed只能是同步的 ，watch 可以同步可以异步

推荐优先有watch 方便后续改为异步获取数据。
