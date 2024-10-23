<script setup lang="ts" name="Chart">
import { ref, computed, watch, type Ref, onMounted } from "vue";
import {EchartsCoreOption, useECharts} from "@/hooks/useCharts";

const props = defineProps({
  options: { type: Object as PropType<EchartsCoreOption>, required: true },
  height: { type: String, default: '57.1vh' },
  width: { type: String, default: '100%'},
});
const chartRef = ref()
const { setOptions, initCharts } = useECharts(chartRef, props.options)

watch(
  () => props.options,
  (nVal) => {
    let targetOptions: EchartsCoreOption = {}
    targetOptions = { ...nVal }
    setOptions(targetOptions)
  }
)

onMounted(() => {
  initCharts()
})
</script>

<template>
  <div ref="chartRef" :style="{ width: width,  height: height }" />
</template>

<style scoped lang="scss">
//.barChart-card {
//  height: ;
//}
</style>
