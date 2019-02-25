export function downloadExcel(response){
  let headers = response.headers;
  let title = ""
  if (!title) {
    const fileName = headers['content-disposition'];
    console.info(fileName)
    title = fileName.includes('filename=') ? decodeURI(fileName.split('=')[1]) : '下载的文件';
  }
  var exportContent = "data:application/vnd.ms-excel;base64,"+response.data;
  // // fileDownload(exportContent, title,"application/vnd.ms-excel");
  var tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = exportContent;
  tempLink.setAttribute('download', title);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}
