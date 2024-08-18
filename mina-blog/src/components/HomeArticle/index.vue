<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { numberFormat } from "@/utils/tool";

const emit = defineEmits(["pageChange"]);

const props = defineProps({
  articleList: {
    type: Array,
    default: () => {},
  },
  articleTotal: {
    type: Number,
    default: 0
  },
  param: {
    type: Object,
    default: () => {},
  },
  category: {
    type: Object,
    default: () => {},
  }
})

const router = useRouter();
const operate = (type, item) => {
  switch (type) {
    case "detail":
      router.push({ path: `/article/${item.id}`});
      break;
    case "category":
      router.push({ path: `/category/${item.id}`});
      break;
  }
}

watch(
    () => props.articleList,
    () => {
      if (!props.articleList?.length) return false;
    }
)
onMounted(
  () => {
    console.log(props.articleList)
  }
)
</script>

<template>
<v-container>
  <v-row class="root">
    <template v-if="articleList?.length > 0">
      <v-col
        sm="4"
        v-for="(item, index) in articleList"
        :key="index"
        :class="['article-main', 'article' + index]">
        <v-card>
          <div class="mi-articleBox">
            <div
              :class="['article-cover', 'article-cover' + index]"
              @click="operate('detail', item)"
            >
              <div

                style="width: 100%; height: 100%"
              >
                <v-img :src="item.article_cover" class="image" cover>
                  <template #error>
                    <v-icon class="icon-error">mdi-image-off</v-icon>
                  </template>
                </v-img>
              </div>
            </div>
            <!-- 文章信息 -->
            <div class="article-info">
              <div class="mata">
                <div class="meta-time mouse_pointer">
                  <v-icon class="icon-calendar">mdi-calendar-month</v-icon>
                  <span class="meta-label">发表于</span>
                  <span class="meta-value">{{ item.createdAt }}</span>
                </div>

                <div class="meta-title mouse_pointer">
<!--                  <div class="hover-box clearfix">-->
<!--                    <span class="title-hover">{{ item.article_title }}</span>-->
<!--                  </div>-->
                  <span class="text_overflow">{{ item.article_title }}</span>
                </div>

                <div class="meta-some mouse_pointer">
                  <!-- 热度 -->
                  <v-icon class="icon-fire">mdi-fire</v-icon>
                  <span class="meta-value">
                      {{ numberFormat(item.view_times) + "&nbsp;" + "热度" }}
                    </span>
                  <!-- 点赞 -->
                   <v-icon class="icon-heart">mdi-heart</v-icon>
<!--                  <i class="iconfont icon-heart"></i>-->
                  <span class="meta-value">
                      {{ numberFormat(item.thumbs_up_times) + "&nbsp;" + "订阅" }}
                    </span>
                </div>

                <div class="meta-description mouse_pointer text_overflow">
                  <p class="meta-value">{{ item.article_description }}</p>
                </div>

                <div
                  class="meta-tagAndDesc mouse_pointer"
                  @click="operate('category', item)">
                    <span class="meta-category">
                      <v-icon class="icon-folder">mdi-folder</v-icon>
                      <span>{{ item.categoryName }}</span>
                    </span>

                  <span class="meta-tag">
                      <v-icon class="tag">mdi-tag</v-icon>
<!--                       <i class="iconfont icon-a-tagbiaoqian"></i>-->
                      <span
                        v-for="(tagName, index) in item.tagNameList"
                        :key="index">
                      {{ index == item.tagNameList.length - 1 ? tagName : tagName + "、" }}
                      </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </template>
    <template v-else>
      <div class="no-article">暂无文章，请博主在后台发表文章哦~</div>
    </template>
  </v-row>
</v-container>
</template>

<style lang="scss" scoped>

.root {
  box-shadow: none!important;
  display: flex;
  overflow: hidden;
}
.article-main {
  min-width: 17rem;
}

.article-cover {
  .image {
    width: 100%;
    height: 170px;
    vertical-align: bottom;
    .icon-error {
      font-size: 30px;
    }
    //.image-slot {
    //  display: flex;
    //  justify-content: center;
    //  align-items: center;
    //  width: 100%;
    //  height: 100%;
    //  background: var(--el-fill-color-light);
    //  color: var(--el-text-color-secondary);
    //  font-size: 30px;
    //
    //
    //}

  }
}
.no-article {
  color: var(--font-color);
  margin: 10px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.article-header {
  height: 50px;
  color: #888888;
  display: flex;
  justify-content: space-between;
}


.title-hover {
  position: absolute;
  //width: 100%;
  //transform: translate(5%, -100%);
  margin: 0 auto;
  transform: translateY(-100%);
  font-size: 22px;
  //line-height: 48px;
  color: #eee;
  padding: 2px 10px;
  background: #a7a7d4;
  border-radius: 7px;
  text-align: center;
  opacity: 0;
  transition: all .5s;
  overflow: hidden;
  visibility: hidden;
}

.article-info {
  //position: relative;
  padding: 1rem;
  .icon-calendar {
    font-size: 15px;
    color: #b9b9df;
  }
  .meta {
    color: #858585;
    line-height: 1.4;
    font-size: 100%;
    font-weight: 500;
    overflow: hidden;
    .icon-view {
      font-size: 1.1rem;
      margin-bottom: 5px;
      vertical-align: middle;
    }

    &-time {
      font-size: 13px;
      color: #888888;
      font-weight: 600;
    }
    &-title {
      display: table-cell;
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 2;
      &:hover .title-hover {
        opacity: 1;
        visibility: visible;
        transition: all .5s;
      }
    }
    &-some {
      font-size: 13px;
      color: #8a8a8a;
      font-weight: bold;
      .icon-fire {
        font-size: 14px;
        color: #f04c49;
        margin-bottom: 4px;
        //#ff6666
      }
      .myIconStyle{
        margin-left: 10px;
        font-size: 12px;
      }
      .icon-heart {
        font-size: 14px;
        color: #ff6666;
        margin: auto 3px 3px 10px;
      }
    }

    &-description {
      font-family: cursive;
      line-height: 2;
    }
    &-tagAndDesc {
      margin-top: 0.8rem;
      color: #888888;
      font-family: cursive;
    }
    &-category {
      border-radius: 5px;
      min-width: 120px;
      background-color: rgba(245,245,245,0.5);
      padding: 5px;
      transition: all 0.5s;
      margin-right: 1rem;
      font-size: 14px;
      font-family: cursive;
      .icon-folder {
        color: #ffd977;
        transition: all 0.5s;
        font-size: 16px;
        margin-bottom: 4px;
        margin-right: 2px;
      }
      &:hover {
        border-radius: 5px;
        background-color: #a6c47a;
        color: #eee;
        .icon-folder {
          transition: all 0.5s;
        }
        transition: all 0.5s;
      }
    }

    &-tag {
      background-color: #f5f5f5;
      padding: 5px;
      transition: all 0.5s;
      font-size: 14px;
      border-radius: 5px;
      font-family: cursive;
      .mdi-tag {
        color: #66b1ff;
        font-size: 16px!important;
        transition: all 0.5s;
        margin-bottom: 2px;
        margin-right: 2px;
      }
      &:hover {
        border-radius: 5px;
        background-color: #a6c47a;
        color: #eee;
        .mdi-tag {
          transition: all 0.5s;
        }
        transition: all 0.5s;
      }
    }

    &-label {
      padding-right: 0.2rem;
    }

    &-value {
      display: inline;
      padding-right: 0.2rem;
    }

    .article-meta__separator {
      margin: 0 0.4rem;
      font-size: 1.1rem;
      position: relative;

      &::after {
        content: "|";
        position: absolute;
        top: -3px;
        right: 0;
      }
    }

  }
}


/** mobile */
@media screen and (max-width: 768px) {
  @include b(articleBox) {
    //position: relative;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: center;
    width: 30rem;
    height: 30rem;
    overflow: hidden;
  }
  .article-cover {
    width: 100%;
    height: 100%;
    //height: 18rem;
    overflow: hidden;
  }

  .article-info {
    width: 100%;
    padding: 1rem 1.5rem;
    overflow: hidden;
    display: inline-block;
  }
  .title-hover {
    left: 0;
    transform: none;
  }
}

@media screen and (min-width: 768px) {
  @include b(articleBox) {
    //position: relative;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: center;
    overflow: hidden;
    //width: 20rem;
    //height: 20rem;
  }
  .article-cover {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .article-info {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: inline-block;
  }
}
</style>

