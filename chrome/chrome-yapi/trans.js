
// 生成代码入口
function trans (name = '', data, required = []){
    if(data.type === "object"){
      return resolveObject(name, data.properties, required);
    }else if(data.type === "array"){
      return resolveArray(name, data);
    }else if(data.type === "integer"){
      return `${data.description ? `
       /**
       * ${data.description}
       */` : ""}
      ${name}${required.includes(name) ? "" : "?"}: number`
    }else{
      return `${data.description ? `
      /**
      * ${data.description}
      */ ` : ""} 
      ${name}${required.includes(name) ? "" : "?"}: ${data.type} `
    }
  };

  // 处理object
  function resolveObject (name, data = {}, required){
    let objJson  = `
    ${data.description ? `
    /**
    * ${data.description}
    */` : ""}
   ${name ? name + ":" : ''} {
    `
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          objJson += trans(key, element, required)
        }
      }
    return objJson += `\n }`  
  }

  // 处理array
  function resolveArray (name, data = {}){
    let arrJson = `
        ${data.description ? `
        /**
        * ${data.description}
        */` : ""} `;
      arrJson += trans(name, data.items, data.items.required)
     
      return arrJson += `[]\n`;
  }