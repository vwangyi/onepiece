
# 计算属性computed


```vue
<script setup>
// vue3.2
import { computed } from 'vue'
const 变量名 = computed(() => xx ) 
const 变量名1 = computed({
    set(value) { },
    get() {return 1}
}) 


// 只读
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: (oldValue: T | undefined) => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>

</script>
 <!-- commuted 可以根据响应式数据的变化而变化 -->

<!-- // vue2.x 


// vue3.2 -->
import { computed } from 'vue'
const 变量名 = computed(() => xx ) 

<!-- 计算属性 应该避免副作用 比如 对响应式变量进行重新赋值 这是一个副作用 不建议
eslint会报错 虽然vue不报错  -->
```