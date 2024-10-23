import { Ref, unref, shallowRef, onMounted, onDeactivated, onBeforeUnmount } from "vue";

import echarts from "@/utils/lib/echarts";

export type EchartsCoreOption = echarts.EChartsCoreOption
const useECharts = (elRef: Ref<HTMLDivElement>, options: EchartsCoreOption) => {
  const charts = shallowRef<echarts.ECharts>()
  const setOptions = (options: EchartsCoreOption) => {
    charts.value && charts.value.setOption(options)
  }

  const initCharts = () => {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }
    charts.value = echarts.init(el)
    // if (theme) {
    //   options.color = theme
    // }
    setOptions(options)
  }

  const resize = () => {
    charts.value && charts.value.resize()
  }

  onMounted(() => {
    window.addEventListener('resize', resize)
  })
  // 页面为keepAlive 时不监听
  onDeactivated(() => {
    window.removeEventListener('resize', resize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })

  return { initCharts, setOptions, resize }
}

export { useECharts }
