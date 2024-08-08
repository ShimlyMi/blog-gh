module.exports = {
    userFormatError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户已经存在',
        result: ''
    },
    usernameFormatError: {
        code: '10003',
        message: '用户名只能是数字和字母组成',
        result: ''
    },
    userRegisterError: {
        code: '10004',
        message: '用户注册错误',
        result: ''
    },
    userDoesNotExist: {
        code: '10005',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10006',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10007',
        message: '密码不匹配',
        result: ''
    },
    twoPasswordError: {
        code: '10008',
        message: '两次输入密码不一致',
        result: ''
    },
    updatePasswordError: {
        code: '10009',
        message: '修改密码失败',
        result: ''
    },
    getUserInfoError: {
        code: '10010',
        message: '获取用户信息失败',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        result: ''
    },
    hasSuperAminPermission: {
      code: '10104',
        message: "管理员信息可通过配置修改",
        result: ""
    },
    roleCreateError: {
        code: '10111',
        message: '角色创建失败',
        result: ''
    },
    roleAlreadyExited: {
        code: '10112',
        message: '角色已经存在',
        result: ''
    },
    updateRoleError: {
        code: '10112',
        message: '修改角色失败',
        result: ''
    },
    fileUploadError: {
        code: '10201',
        message: '图片上传失败',
        result: ''
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持文件格式',
        result: ''
    },
    articleFormatError: {
        code: '10203',
        message: '文章参数格式错误',
        result: ''
    },
    publishArticleError: {
        code: '10204',
        message: '文章发布失败',
        result: '',
    },
    invalidArticleID: {
        code: '10205',
        message: '待修改文章的ID不存在',
        result: '',
    },
    invalidArticle: {
        code: '10206',
        message: '无效文章',
        result: '',
    },
    listArticleError: {
        code: '10207',
        message: '查询列表文章失败',
        result: '',
    },
    getWebDetailError: {
        code: '10301',
        message: '获取网站详情失败',
        result: '',
    },
    albumAlreadyExisted: {
        code: '10401',
        message: '该相册已经存在',
        result: '',
    },
    getAlbumListError: {
        code: '10402',
        message: "获取相册列表失败",
        result: ''
    },
    deleteAlbumError: {
        code: '10403',
        message: "删除相册失败",
        result: ''
    },
    addPictureError: {
        code: '10511',
        message: '添加图片失败',
        result: ''
    },
    getPictureListError: {
        code: '10512',
        message: '获取图片失败',
        result: ''
    },
    deletePictureError: {
        code: '10513',
        message: '获取图片失败',
        result: ''
    },
    revertPictureError: {
        code: '10514',
        message: '获取图片失败',
        result: ''
    }

}
