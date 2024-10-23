<script setup lang="ts">
import { onMounted, ref } from "vue";
import {_decrypt} from "@/utils/encipher";
import {sessionCache} from "@/utils/auth";
import {USER_INFO_KEY} from "@/enums/cacheEnum";
import Chart from './components/boxChart.vue'

defineOptions({
  name: 'Home'
})
const data = sessionCache.getCache(USER_INFO_KEY)
const userInfo = _decrypt(data)

const options = {
  title: {
    text: 'Rainfall vs Evaporation',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Rainfall', 'Evaporation']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // prettier-ignore
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Rainfall',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'Evaporation',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    }
  ]
}

console.log(userInfo)
onMounted(
  () => data
)
</script>

<template>
  <v-row class="pageIndex" justify="center">
    <v-col cols="9">
      <v-card>
        <v-container class="mi-home">
          <h2>欢迎回来！<span>{{ userInfo.nickname }}</span></h2>
          <v-divider class="divider" />
          <v-row align="center" justify="center" class="basic-data">
            <v-col>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="2" class="left-icon">
                    <v-icon icon="mdi-note-text"></v-icon>
                  </v-col>
                  <v-col cols="5" class="data-box">
                      <span class="data-content d-flex flex-column justify-center">
                        <span style="font-size: 14px;">博客文章</span>
                        <span style="font-size: 18px;">111</span>
                      </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="2" class="left-icon">
                    <v-icon icon="mdi-chat-processing"></v-icon>
                  </v-col>
                  <v-col cols="5" class="data-box">
                    <span class="data-content d-flex flex-column justify-center">
                      <span style="font-size: 14px;">说说随笔</span>
                      <span style="font-size: 18px;">111</span>
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="2" class="left-icon">
                    <v-icon icon="mdi-image"></v-icon>
                  </v-col>
                  <v-col cols="5" class="data-box">
                    <span class="data-content d-flex flex-column justify-center">
                      <span style="font-size: 14px;">相册图库</span>
                      <span style="font-size: 18px;">111</span>
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col>
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="2" class="left-icon">
                    <v-icon icon="mdi-message-reply-text"></v-icon>
                  </v-col>
                  <v-col cols="5" class="data-box">
                    <span class="data-content d-flex flex-column justify-center">
                      <span style="font-size: 14px;">新增留言</span>
                      <span style="font-size: 18px;">111</span>
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-divider class="divider" />
          <Chart :options="options" />
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card>
        <v-container>
          222
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.pageIndex {
  //background-color: #fff;
  margin: 10px;
}
.basic-data {
  margin: auto 20px;
}
.data-content {
  //height: 45px;
  margin-top: 8px;
}
.divider {
  margin: 10px auto;
}
.left-icon {
  //margin-right: 5px;
  background-color: #f8f8f8;
  box-shadow:
    0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14));
  border-radius: 50%;
  width: 45px;
  height: 45px;
  vertical-align: center;
  .v-icon {
    padding-right: 6px;
    padding-bottom: 2px;
  }
  .mdi-note-text {
    color: #a7a7d4;
  }
  .mdi-chat-processing {
    color: #8fbf7d;
  }
  .mdi-image {
    color: #66b1ff;
  }
  .mdi-message-reply-text {
    color: #dfbeed;
  }
}

</style>
