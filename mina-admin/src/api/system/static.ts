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
    console.log("data", data)
    const formData = new FormData();
    formData.append("files", data);
    const token = getToken();
    console.log("formData", formData)
    console.log("formDataGet", formData.get('files'))
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
