import { RouterView } from 'vue-router';
import DebugInfo from '@/components/DebugInfo/DebugInfo.vue';
function setup() {
  return () => (
    <div>
      {/* <DebugInfo /> */}
      <RouterView /> 
    </div>
  )
}
export default { setup };
