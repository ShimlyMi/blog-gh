import { getToken } from "@/utils/auth";
import instance from "@/utils/http/request"
import { messageError } from "@/utils/messgeBox";
import { SiteResult } from "@/api/model/staticModel";
import Compressor from "compressorjs";
import {file} from "@babel/types";

enum StaticApi {
  UPLOAD = '/api/upload/files'
}

/** 图片上传接口 */
export const imgUpload = async (data: File[]) => {
    console.log("data", data)
  console.log(typeof data)
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
          success: (result: File) => {
              resolve(result);
          },
          error(err) {
              reject(err.message);
          },
      });
  })
}

// 写一个压缩文件方法，返回值为File对象


export const compressImages = (file: File): Promise<File> => {
  return new Promise<File>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.width = img.width / 2;
        canvas.height = img.height / 2;

        canvas.toBlob((blob) => {
          const compressFile = new File([blob], file.name, {
            type: 'image/jpeg',
          })
          resolve(compressFile);
        }, 'image/jpeg', 0.8);
      }
      img.src = e.target.result as string;
    }
    reader.readAsDataURL(file);
  })
}
