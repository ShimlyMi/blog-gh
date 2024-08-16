<template>
  <div class="card-title mouse_pointer">
    <v-icon :class="['iconfont',props.icon]" :style="{ fontSize: props.size, color: props.color }">{{ props.icon }}</v-icon>
    <span> {{ props.title }}</span>
  </div>
  <slot />
</template>
<script setup>
  const props = defineProps({
    icon: {
      type: String,
      default: '-',
    },
    title: {
      type: String,
      default: '-',
    },
    size: {
      type: String,
      default: '1.2rem',
    },
    color: {
      type: String,
      default: '#676767',
    },
  })
</script>
<style lang="scss" scoped>
.card-title {
  font-size: 1.2rem;
  line-height: 2.4;
  font-weight: bold;
  .iconfont {
    font-weight: 900;
    margin-bottom: 4px;
  }
  span {
    margin-left: 0.3rem;
  }
}
</style>
