import http from 'src/axios/http'

/**
 * 载入文件列表
 * @returns {*}
 */
export function initFiles(logginOrgId) {
  return http({
    url: "/auditchanges/filemanagement/getFileMessageByOrgId",
    method: 'get',
    params: {
      logginOrgId:logginOrgId
    },
  });
}

/**
 * 保存文件夹
 * @param parentFolderId
 * @param folderName
 * @returns {*}
 */
export function saveFolder(parentFolderId ,folderName) {
  return http({
    url: "/auditchanges/filemanagement/createFolder",
    method: 'get',
    params: {
      folderName:folderName ,
      parentFolderId:parentFolderId
    },
  });
}

/**
 * 获取根目录下文件夹
 * @returns {*}
 */
export function getFolderListByOrgId() {
  return http({
    url: "/auditchanges/filemanagement/getFolderListByOrgId",
    method: 'get',
    params: {
    },
  });
}

/**
 * 获取指定目录下文件夹
 * @returns {*}
 */
export function getFolderListByOrgParentId(parentId) {
  return http({
    url: "/auditchanges/filemanagement/getFolderListByOrgParentId",
    method: 'get',
    params: {
      parentId:parentId
    },
  });
}

/**
 * 获取根目录下文件夹及文件
 * @returns {*}
 */
export function getFolderAndFileListByOrgId() {
  return http({
    url: "/auditchanges/filemanagement/getFolderAndFileListByOrgId",
    method: 'get',
    params: {
    },
  });
}

/**
 * 获取指定目录下文件夹及文件
 * @returns {*}
 */
export function getFolderAndFileListByOrgParentId(parentId) {
  return http({
    url: "/auditchanges/filemanagement/getFolderAndFileListByOrgParentId",
    method: 'get',
    params: {
      parentId:parentId
    },
  });
}


export function renameFolder( folderId ,name) {
  return http({
    url: "/auditchanges/filemanagement/renameFolder",
    method: 'get',
    params: {
      folderName:name ,
      folderId:folderId
    },
  });
}


export function openFolder( folderId ) {
  // alert(folderId);
  return http({
    url: "/auditchanges/filemanagement/getFileMessageByOrgIdAndFolderId",
    method: 'get',
    params: {

      folderId:folderId
    },
  });
}
export function deleteFolder( folderId ) {
  // alert(folderId);
  return http({
    url: "/auditchanges/filemanagement/deleteFolder",
    method: 'get',
    params: {
      folderId:folderId
    },
  });
}
//--------------------------文件----------------------------------
export function uploadFile(  files ) {
  // alert(folderId);
  return http({
    url: "/auditchanges/filemanagement/uploadFile",
    method: 'post',
    data: files,
    type:'json'
  });
}
export function renameFile(  fileId , fileName ) {
  // alert(folderId);
  return http({
    url: "/auditchanges/filemanagement/renameFile",
    method: 'get',
    params: {
      fileName:fileName ,
      fileId:fileId
    },
  });
}


export function deleteFile( fileId ) {
  // alert(folderId);
  return http({
    url: "/auditchanges/filemanagement/deleteFile",
    method: 'get',
    params: {
      fileId:fileId
    },
  });
}
export function downloadFile(fileId) {
  return http({
    url: '/auditchanges/filemanagement/downloadFile',
    method: 'get',
    params: {fileId: fileId},
    headers: {
      "Authorization": sessionStorage.getItem('token')
    },
    responseType: 'blob',
    use: 'all'
  })
}

/**
 * 缩略图下载
 * @param fileId
 * @returns {*}
 */
export function downloadThumbnailFile(fileId) {
  return http({
    url: '/auditchanges/filemanagement/downloadThumbnailFile',
    method: 'get',
    params: {fileId: fileId},
    headers: {
      "Authorization": sessionStorage.getItem('token')
    },
    responseType: 'blob',
    use: 'all'
  })
}
/**
 * 移动文件
 * @param folderId  目标文件夹id
 * @param fileId  文件id
 * @returns {*}
 */
export function removeFile(folderId ,fileId) {
  return http({
    url: '/auditchanges/filemanagement/removeFile',
    method: 'get',
    params: {fileId: fileId,
      folderId:folderId
    },

  })
}

/**
 *移动文件夹
 * @param folderIdDestination 目标文件夹
 * @param folderIdOrigin 源文件夹
 * @returns {*}
 */
export function removeFolder(folderIdDestination ,folderIdOrigin) {
  return http({
    url: '/auditchanges/filemanagement/removeFolder',
    method: 'get',
    params: {folderIdDestination: folderIdDestination,
      folderIdOrigin:folderIdOrigin
    },
  })
}

export function removeFilesAndFolders(fileremoveDomain) {
  return http({
    url: '/auditchanges/filemanagement/removeFilesAndFolders',
    method: 'post',
    data :fileremoveDomain

  })
}

export function selectFileAndFolder(query) {
  return http({
    url: '/auditchanges/filemanagement/selectFileAndFolder',
    method: 'get',
    params: {seachData: query
    },

  })
}

/**
 *图片预览图base64下载
 * @param fileId 文件id
 * @returns {*}
 */
export function downloadBase64File(fileId) {
  return http({
    url: '/auditchanges/filemanagement/downloadBase64File',
    method: 'get',
    params: {fileId: fileId},

  })
}

/**
 *文件本地上传
 * @param fileType 文件分类
 * @param files 上传的文件集合
 * @returns {*}
 */
export function uploadFileForWeb(fileType,files,defineNameList) {
  return http({
    url: '/auditchanges/filemanagement/uploadFileForWeb',
    method: 'post',
    data: files,
    params: {
      fileType: fileType,
      newFileNameJson:JSON.stringify(defineNameList)
    },
    type:'json'
  })
}


