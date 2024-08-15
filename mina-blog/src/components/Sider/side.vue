<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import TopSide from '@/components/Sider/components/TopSider/top-sider.vue'
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
  <div class="mi-left">
    <v-row>
      <v-col md="12" class="right-side-space right-side-space1">
        <v-card class="info-card">
          <v-skeleton-loader>
            <template #default>
              <TopSide :config-detail="configDetail" />
            </template>
          </v-skeleton-loader>
        </v-card>
      </v-col>
      <!---->
      <v-col md="12" class="right-side-space right-side-space2">
        <v-card class="right-card">
          <v-skeleton-loader>
            <template #default>
              <RightSideItem color="#ec6b94" title="碎碎念">
                <div class="notice-text">{{ configDetail.blog_notice }}</div>
              </RightSideItem>
            </template>
          </v-skeleton-loader>
        </v-card>
      </v-col>
      <!---->
      <v-col class="right-side-space right-side-space3">
        <v-card class="right-card">
          <v-skeleton-loader>
            <template #default>
              <RightSideItem color="#ec6b94" title="推荐文章">
                <div class="notice-text">{{ configDetail.recommended }}</div>
              </RightSideItem>
            </template>
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.right-side-space {
  width: 100%;
}
  .info-card {
    height: 26rem;
  }
  .right-card {
    padding: 1rem 1.4rem;
    color: #676767;
    min-height: 10rem;

    .card-title {
      font-size: 1.2rem;
      line-height: 2.4;

      .icon-laba {
        font-weight: 900;
      }
    }
  }

  .notice-text {
    min-height: 6rem;
    font-size: 1.1rem;
    line-height: 1.2;
    white-space: pre-line;
    display: inline-block;
    cursor: pointer;
  }
</style>
