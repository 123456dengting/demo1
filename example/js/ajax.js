
function Ajax(config){
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  config.method = config.method.toLocalUpperCase()
  let url = config.method === 'GET' ? config.url + '?' +  config.data : config.url

  if (config.method === 'GET') {
    xhr.open(config.method, url, true)
    xhr.send()
  }else{
    xhr.open(config.method, url, true)
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencold');
    xhr.send(config.data)
  }

  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
      config.fn(xhr.responseText)
    }
  }

}