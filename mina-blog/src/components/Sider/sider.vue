<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import TopSider from '@/components/Sider/components/TopSider/top-sider.vue'
  import RightSideItem from '@/components/Sider/components/TopSider/right-side-item.vue'
  defineProps({
    configDetail: {
      type: Object,
      default: () => {},
    },
    runtime: {
      type: [String, Number],
      default: '半年不到',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    articleCount: {
      type: Number,
      default: 0,
    },
  })

  const router = useRouter()

  onMounted(() => {
    const list = []
    for (let i = 1; i <= 3; i++) {
      if (i > 1) {
        list.push('.right-side-space' + i)
      }
    }
    // nextTick(() => {
    //   gsapTransY(list, 50, 0.6, 'none')
    // })
  })
</script>

<template>
  <div class="mi-right">
    <v-row>
      <v-col>
        <v-card>
          <TopSider :config-detail="configDetail" />
        </v-card>
      </v-col>
      <!---->
      <v-col>
        <v-card>
          <RightSideItem color="#ec6b94" title="碎碎念">
            <div class="notice-text">{{ configDetail.blog_notice }}</div>
          </RightSideItem>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>
