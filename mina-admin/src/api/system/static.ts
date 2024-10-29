import { getToken } from "@/utils/auth";
import imageCompression from "browser-image-compression";
import instance from "@/utils/http/request"
import { messageError } from "@/utils/messgeBox";
import { SiteResult } from "@/api/model/staticModel";

enum StaticApi {
  UPLOAD = '/api/upload/files'
}

/** 图片上传接口 */
export const imgUpload = async (data: any) => {
  // 文件压缩 太大了上传不了，我的服务器比较垃圾
  let res: any;
  // 没有raw.size 就表示已经压缩过了（多图片上传那里我压缩了一次） 有的话小于800不用压缩
  // console.log(data.raw);
  if (data.raw.size > 820) {
    const file = await conversion(data.raw);
    if (!file) {
      messageError("错误提示","图片上传失败")
      return;
    } else {
      res = file;
    }
  } else {
    res = data.raw;
  }
  const formData = new FormData();
  formData.append("file", res);
  const token = getToken();

  return new Promise<SiteResult>(resolve => {
    instance({
      method: "post",
      url: StaticApi.UPLOAD,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token.token
      }
    }).then(response => {
      resolve(response.data);
    });
  });
};

export const conversion = (file: any) => {
  return new Promise<Blob>(resolve => {
    imageCompression(file, { maxSizeMB: 0.8 }).then(res => {
      resolve(res)
    })
  })
}
