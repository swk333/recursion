function websitePagination(urls,pageSize,page){
  //ここから書きましょう
  let newArr = [];
  while(urls.length){
    newArr.push(urls.splice(0, pageSize));
  }

  return newArr[page-1];
}




console.log(websitePagination(["url1","url2","url3","url4","url5","url6"],4,1));
// --> [url1,url2,url3,url4] 

console.log(websitePagination(["url1","url2","url3","url4","url5","url6","url7","url8","url9"],3,2));
// --> [url4,url5,url6] 


console.log(websitePagination(["url1","url2","url3","url4","url5","url6","url7","url8","url9"],4,3));
// --> [url9] 