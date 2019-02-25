import http from 'src/axios/http'

/**
 * 加载当前用户所有假删文件
 * @returns {*}
 */
export function initFiles() {
  return http({
    url: "/auditchanges/filemanagement/getDeleteFileMessageByOrgId",
    method: 'get',
    params: {

    },
  });
}

/**
 * 恢复文件
 * @param fileId
 * @returns {*}
 */
export function recycleFile(fileId) {
  return http({
    url: "/auditchanges/filemanagement/recycleFile",
    method: 'get',
    params: {
      fileId:fileId
    },
  });
}

/**
 * 恢复文件夹
 * @param folderId
 * @returns {*}
 */
export function recycleFolder(folderId) {
  return http({
    url: "/auditchanges/filemanagement/recycleFolder",
    method: 'get',
    params: {
      folderId:folderId
    },
  });
}

export function recycleFilesAndFolders(fileremoveDomain) {
  return http({
    url: "/auditchanges/filemanagement/recycleFilesAndFolders",
    method: 'post',
    params: {
      fileremoveDomain:fileremoveDomain
    },
  });
}
