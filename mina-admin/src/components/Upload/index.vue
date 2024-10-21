<script>
export default {
  props: ['orgData', 'orgImgList', 'showAdd'],
  data() {
    return {
      imgSrc: '@/assets/avatar.jpg', // 默认显示的图片（例如加号图标）
      imgWide: '50px',
      imgList: [], // 存储已上传的图片列表
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.orgImgList) {
        Array.from(this.orgImgList).forEach((item) => {
          const imgObj = {
            imgObj: '', // 图片对象
            imgSrc: '', // 图片可用链接
            imgBaseCode: '', // 图片对象base64码
            imgName: '', // 图片名称
          };
          imgObj.imgSrc = item.url;
          this.imgList.push(imgObj);
        });
      }
    },
    del(key) {
      this.imgList.splice(key, 1);
      const emitData = {
        orgData: this.orgData,
        imgList: this.imgList,
      };
      this.$emit('getImg', emitData);
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
    getFile(event) {
      const curfile = event.target.files[0];
      const filename = curfile.name;
      const imgObj = {
        imgObj: curfile, // 图片对象
        imgSrc: '', // 图片可用链接
        imgBaseCode: '', // 图片对象base64码
        imgName: filename, // 图片名称
      };
      if (filename.lastIndexOf('.') <= 0) {
        throw new Error('Please add a valid image!'); // 判断图片是否有效
      }
      const fileReader = new FileReader(); // 内置方法new FileReader()读取文件
      fileReader.readAsDataURL(curfile);
      fileReader.onload = (e) => {
        imgObj.imgSrc = e.target.result;
        imgObj.imgBaseCode = e.target.result;
      };
      this.imgList.push(imgObj);
      const emitData = {
        orgData: this.orgData,
        imgList: this.imgList,
      };
      this.$emit('getImg', emitData);
    },
  },
};
</script>
<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="(item, key) in imgList" :key="key" class="ma-2">
        <v-sheet color="white" elevation="1" width="200" :height="showAdd ? 240 : 200">
          <v-row justify="center" align="center" style="height:100%">
            <div align="center">
              <v-img height="200px" width="200px" :src="item.imgSrc"></v-img>
            </div>
            <v-btn color="primary" outlined @click="del(key)" v-if="showAdd">删除</v-btn>
          </v-row>
        </v-sheet>
      </div>
      <div class="ma-2" v-if="showAdd">
        <v-sheet color="white" elevation="1" width="200" height="200" @click="chooseFile">
          <v-row justify="center" align="center" style="height:100%">
            <div align="center">
              <v-img :height="imgWide" :width="imgWide" :src="imgSrc"></v-img>
            </div>
          </v-row>
        </v-sheet>
      </div>
    </div>
    <input type="file" ref="fileInput" accept="image/*" @change="getFile" style="display: none" />
  </div>
</template>

<style scoped lang="less">

</style>
