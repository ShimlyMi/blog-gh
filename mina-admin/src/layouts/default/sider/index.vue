<script setup lang="ts" name="Side">
import { ref, watch } from "vue";
import MenuGroup from "@/layouts/default/sider/menuGroup.vue";

const props = defineProps({
  isOpen: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const drawerOpen = ref(props.isOpen);
watch(() => props.isOpen, (newVal) => {
  drawerOpen.value = newVal;
});

watch(drawerOpen, (newVal) => {
  emit('update:isOpen', newVal);
});

const emit = defineEmits<{
  (e: 'update:isOpen', isOpen: boolean): void;
}>();
</script>

<template>
  <v-navigation-drawer
    v-bind:open="props.isOpen"
    permanent
    class="mi-side"
    :clipped="true"
    :rail="drawerOpen"
    app>
    <v-list>
      <v-list-item title="MINA ADMIN">
        <template #prepend>
          <v-avatar>
            <v-img src="@/assets/logo.png"></v-img>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <menu-group />
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.mi-side {
  height: 100% !important;
}
</style>
