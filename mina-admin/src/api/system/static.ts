import {getToken} from "@/utils/auth";
import imageCompression from "browser-image-compression";
import instance from "@/utils/http/request"
import {messageError} from "@/utils/messgeBox";
import {SiteResult} from "@/api/model/staticModel";

enum StaticApi {
  UPLOAD = '/api/upload/files'
}

export const uploadApi = async (data) => {
  let res;
  console.log(data.raw);
  if (data.size > 820) {
    const files = await conversion(data.raw)
    if (!files) {
      return messageError('错误提示', '图片上传失败')
    } else {
      res = files
    }
  } else {
    res = data.raw
  }

  const formData = new FormData()
  formData.append('files',res)
  const token = getToken()
  console.log(token)
  return new Promise<SiteResult>(resolve => {
    instance({
      method: 'post',
      url: StaticApi.UPLOAD,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token
      }
    }).then(response =>{
      resolve(response.data);
    })
  })
}

export const conversion = file => {
  return new Promise<Blob>(resolve => {
    imageCompression(file, { maxSizeMB: 0.8 }).then(res => {
      resolve(res)
    })
  })
}
