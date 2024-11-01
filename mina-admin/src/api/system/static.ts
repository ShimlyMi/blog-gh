import { getToken } from "@/utils/auth";
import instance from "@/utils/http/request"
import { messageError } from "@/utils/messgeBox";
import { SiteResult } from "@/api/model/staticModel";
import Compressor from "compressorjs";

enum StaticApi {
  UPLOAD = '/api/upload/files'
}

/** 图片上传接口 */
export const imgUpload = async (data: any) => {

    // 文件压缩 太大了上传不了，我的服务器比较垃圾
    let res;
    // 没有raw.size 就表示已经压缩过了（多图片上传那里我压缩了一次） 有的话小于820不用压缩
    if (data.size > 820) {
        const file = await conversion(data);
        if (!file) {
            messageError('错误警告', '图片上传失败')
            return;
        } else {
            res = file;
        }
    } else {
        res = data;
    }
    const formData = new FormData();
    formData.append("files", res);
    const token = getToken();
    console.log("formData", formData)
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


export const conversion = (file: File) => {
  return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
          quality: 0.6,
          success: (result) => {
              resolve(result as File);
          },
          error(err) {
              reject(err.message);
          },
      });
  })
}
