<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import RightSideItem from '@/components/Sider/components/TopSider/right-side-item.vue'

  const isRotated =ref(false);
  const props = defineProps({
    websiteConfig: {
      type: Object
    }
  })

  const router = useRouter()

  const rotate = () => {
    isRotated.value = true;
  }

  const reset = () => {
    isRotated.value = false;
  }

  onMounted(() => {
    const list = []
    for (let i = 1; i <= 3; i++) {
      if (i > 1) {
        list.push('.right-side-space' + i)
      }
    }
    console.log("side",props.configDetail)
    // nextTick(() => {
    //   gsapTransY(list, 50, 0.6, 'none')
    // })
  })
</script>

<template>
  <div class="mi-left">
<!--    <div class="right-side-space right-side-space1">-->
<!--      <v-card class="info-card">-->
<!--        <v-sheet class="d-flex align-start flex-column">-->
<!--          <v-sheet class="info-bg">-->
<!--            <v-img :src="configDetail.avatar_bg" :cover="true">-->
<!--              <template #error>-->
<!--                <v-icon>mdi-image-off</v-icon>-->
<!--              </template>-->
<!--            </v-img>-->
<!--          </v-sheet>-->
<!--          <v-sheet class="info-avatar">-->
<!--            <v-avatar-->
<!--                :size="70"-->
<!--                class="blog-avatar"-->
<!--                :style="{ transform: isRotated ? 'rotate(360deg)' : 'rotate(0deg)', transition: 'transform 1s' }"-->
<!--                @mouseover="rotate"-->
<!--                @mouseleave="reset"-->
<!--            >-->
<!--              <img :src="configDetail.blog_avatar" width="100%" />-->
<!--            </v-avatar>-->
<!--            <span class="blog-name ma-2 mouse_pointer">{{ configDetail.blog_name }}</span>-->
<!--          </v-sheet>-->
<!--          <v-sheet class="personality-signature mouse_pointer clearfix">-->
<!--            {{ configDetail.personality_signature }}-->
<!--          </v-sheet>-->
<!--        </v-sheet>-->
<!--        <v-divider></v-divider>-->
<!--        <div class="flex_r_around">-->
<!--            <span class="common-menu flex_c">-->
<!--              <span class="common-menu__label to_printer">文章</span>-->
<!--              <span class="common-menu__value to_pointer">-->
<!--                {{ configDetail.articleCount || 0 }}-->
<!--              </span>-->
<!--            </span>-->
<!--          <span class="common-menu flex_c">-->
<!--              <span class="common-menu__label to_printer">分类</span>-->
<!--              <span class="common-menu__value to_pointer">-->
<!--                {{ configDetail.categoryCount || 0 }}-->
<!--              </span>-->
<!--            </span>-->
<!--          <span class="common-menu flex_c">-->
<!--              <span class="common-menu__label to_printer">标签</span>-->
<!--              <span class="common-menu__value to_pointer">-->
<!--                {{ configDetail.tagCount || 0 }}-->
<!--              </span>-->
<!--            </span>-->
<!--        </div>-->
<!--        <div class="git-ee flex_r_around">-->
<!--          <span-->
<!--              class="git-ee__item button-animated"-->
<!--          >-->
<!--            <v-icon color="#fff" class="icon-wechat">mdi-wechat</v-icon>-->
<!--          <span class="git-ee__item-text">朋友圈</span>-->
<!--        </span>-->
<!--        </div>-->
<!--      </v-card>-->
<!--    </div>-->
<!--    <div class="right-side-space right-side-space2">-->
<!--      <v-card class="right-card">-->
<!--        <v-skeleton-loader>-->
<!--          <template #default>-->
<!--            <RightSideItem icon="mdi-bullhorn-variant-outline" color="#ec6b94" title="碎碎念">-->
<!--              <div class="notice-text mouse_pointer">{{ configDetail.blog_notice }}</div>-->
<!--            </RightSideItem>-->
<!--          </template>-->
<!--        </v-skeleton-loader>-->
<!--      </v-card>-->
<!--    </div>-->
<!--    <div class="right-side-space right-side-space3">-->
<!--      <v-card class="right-card">-->
<!--        <v-skeleton-loader>-->
<!--          <template #default>-->
<!--            <RightSideItem icon="mdi-book-open-variant" color="#ec6b94" title="推荐文章">-->
<!--              <div class="notice-text">{{ configDetail.recommended }}</div>-->
<!--            </RightSideItem>-->
<!--          </template>-->
<!--        </v-skeleton-loader>-->
<!--      </v-card>-->
<!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.right-side-space {
  width: 100%;
}
  .info-card {
    min-height: 26rem;
    overflow: hidden;
    .info-bg {
      height: 12rem;
      width: 100%;
    }
    .blog-avatar {
      position: absolute;
      top: 32%;
      left: 8%;
    }
    .blog-name {
      display: inline-block;
      position: relative;
      left: 32%;
      padding: 0.3rem 0 0 0.5rem;
      color: #222;
      font-size: 18px;
      font-weight: 600;
    }
    .personality-signature {
      margin-top: 10px;
      max-height: 5rem;
      height: 5rem;
      padding: 8px;
      color: var(--font-color);
      font-size: 1em;
    }
    .common-menu {
      text-align: center;
      font-size: 1rem;
      color: #1f2d3d;
      font-weight: bold;
      padding: 1.5rem 0;
      &__label {
        color: #533737;
        font-size: 1rem;
        font-weight: 400;
      }

      &__value {
        margin-top: 0.3rem;
        color: var(--font-color);
        font-size: 1.4rem;
      }
    }
    .git-ee {
      padding: 0 2rem;
      margin-bottom: 20px;
      .icon-wechat {
        margin-bottom: 3px;
      }
      &__item {
        width: 100%;
        line-height: 1.6;
        text-align: center;
        background-color: #b8cbb8;
        border-radius: 15px;
        &-text {
          font-size: 1.2rem;
          color: #fff;
          padding-left: 0.5rem;
        }
      }
    }
  }

.button-animated {
  position: relative;
  z-index: 1;
  transition: color 1s;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-image: linear-gradient(to right, #596d59 0%, #809f80 0%, #8fbf7d 0%, #a6c47a 33%, #A6C47AFF 66%, #A6C47AFF 100%);
  //background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b0c28a 0%, #aace9f 33%, #AACE9F 66%, #9FACE1F 100%);
    content: "";
    transition: transform 0.5s ease-out;
    transform: scaleX(0);
    transform-origin: 0 50%;
    border-radius: 15px;
  }

  &:hover {
    &:before {
      transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
      transform: scaleX(1);
    }
  }
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
