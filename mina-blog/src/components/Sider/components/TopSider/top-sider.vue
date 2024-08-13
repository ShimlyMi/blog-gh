<script setup>
  defineProps({
    configDetail: {
      type: Object,
      default: () => {},
    },
  })
</script>

<template>
  <div class="info-bg">
    <v-img :cover="true" height="100%" :lazy-src="[configDetail.avatar_bg]" :src="configDetail.avatar_bg" width="100%">
      <template #error>
        <div class="image-slot">
          <v-icon>mdi-image-off</v-icon>
        </div>
      </template>
    </v-img>
  </div>
  <div class="info-avatar">
    <router-link to="/">
      <v-avatar>
        <template #default>
          <img alt="头像" :src="configDetail.blog_avatar">
        </template>
      </v-avatar>
    </router-link>
    <span class="blog-name">{{ configDetail.blog_name }}</span>
  </div>
  <div class="personality-signature">{{ configDetail.personality_signature }}</div>
  <hr>
  <div class="flex_r_around">
    <span class="common-menu flex_c_center">
      <span class="common-menu__label to_pointer">文章</span>
      <span class="common-menu__value to_pointer">
        <!--        <GsapCount :value="configDetail.articleCount" />-->
        {{ configDetail.articleCount }}
      </span>
    </span>
    <span class="flex_c_center">
      <span class="common-menu__label to_pointer">分类</span>
      <span class="common-menu__value to_pointer">
        <!--        <GsapCount :value="configDetail.categoryCount" />-->
        {{ configDetail.categoryCount }}
      </span>
    </span>
    <span class="flex_c_center">
      <span class="common-menu__label to_pointer">标签</span>
      <span class="common-menu__value to_pointer">
        <!--        <GsapCount :value="configDetail.tagCount" />-->
        {{ configDetail.tagCount }}
      </span>
    </span>
  </div>
  <div class="git-ee flex_r_around">
    <span
      class="git-ee__item button-animated"
    >
      <!--      <i class="iconfont">&#xe641;</i>-->
      <span class="git-ee__item-text">朋友圈</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.info-background {
  height: 8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-avatar {
  display: flex;
  justify-content: flex-start;
  //align-items: center;

  .el-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    transition: ease-in-out 1s;
    background-color: #fff;
    margin: -2rem 0 0 1rem;

    &:hover {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }

  .blog-name {
    //padding-left: 0.5rem;
    padding: 0.3rem 0 0 0.5rem;
    color: #222;
    font-size: 16px;
    font-weight: 600;
  }
}
.personality-signature {
  height: 5rem;
  padding: 8px;
  color: var(--font-color-title);
  font-size: 0.9em;
  //font-family: "DYBlack", serif;
  //border-bottom: 3px dashed #5d666e;
}

.common-menu {
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
    color: var(--text-highlight-color);
    font-size: 1.4rem;
  }
}

.git-ee {
  padding: 0 2rem;
  margin-bottom: 20px;
  &__item {
    width: 100%;
    line-height: 1.6;
    text-align: center;
    background-color: #b8cbb8;
    border-radius: 15px;

    .iconfont {
      color: #fff;
      font-size: 1.2rem;
    }

    &-text {
      font-size: 1.2rem;
      color: #fff;
      padding-left: 0.5rem;
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
</style>
