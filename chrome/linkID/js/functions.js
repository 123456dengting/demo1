String.prototype.trim= function(){  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}

/*String.prototype.replaceAll  = function(s1,s2){    
    return this.replace(new RegExp(s1,"gm"),s2);    
}*/
String.prototype.replaceAll  = function(s1,s2){    
    return this.split(s1).join(s2);   
}

//判断是否存在类名
function hasClass (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
//添加类名
function addClass (obj, cls) {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
}
//删除类名
function removeClass (obj, cls) {
  if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
  }
}


function loadXML(text)
 {
    var parser = new DOMParser();
    var xmlDocument = parser.parseFromString(text, "text/xml");

    return xmlDocument;
}

function SelectSingleNode(xmlDoc, elementPath)
{
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
    var results = xpe.evaluate(elementPath,xmlDoc,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return results.singleNodeValue; 
}

function SelectNodes(xmlDoc,elementPath)  
{
    var xpe = new XPathEvaluator();
    var oNSResolver = xpe.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
    var aItems = xpe.evaluate(elementPath, xmlDoc, oNSResolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var aResult = [];
    for( var i = 0; i < aItems.snapshotLength; i++)     
    {
        aResult[i] =  aItems.snapshotItem(i);
    }
    return aResult;
}

function XMLToString(oXML) 
{   
    return (new XMLSerializer()).serializeToString(oXML);
}

   
function RemoveTableRows(table,startIndex)
{
    for(var ni=table.rows.length-1;ni>=startIndex;ni--)
        table.deleteRow(ni);
}

function RemoveOptions(select,startIndex)
{
    for(var ni=select.options.length-1;ni>=startIndex;ni--)
        select.remove(ni);
}

function UrlReader(pFunDone,token)
{
    var object=new XMLHttpRequest();
    var onready=pFunDone;
    var tok=null;
    if(token)
        tok="Bearer " + token;

    function onreadystatechange()
    {
        if (object.readyState == 4) {
          if (object.status == 200) {
            if(onready!=null)
            var result = JSON.parse(object.responseText)
            onready( JSON.parse(object.responseText));
          }else if(object.status == 401){
            var result = JSON.parse(object.responseText)
            //token失效,重新登录
            chrome.runtime.sendMessage({target:10,typeid:10, data: result});
          }else{
            console.log('err')
          }
            
        }
    }
        
    object.onreadystatechange = onreadystatechange;//onreadystatechange.bind(this);
    
    this.Read=function(method,url,params,basync)
    {//basync true:异步 false:同步
        object.open(method,url,basync);
        method=method.toLowerCase();
        params=(params==null)?"":params.trim();
          if(tok!=null)
            object.setRequestHeader("Authorization",tok);
        
          if(method=="post"&&params!="")
          {
              object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          }
          object.send(params);
          
          if(!basync)
              return object.responseText;
        
    }
    
    return this;
}

function WrapFunction(obj,objmethod,param)
{
    var a=new Array();
    for(var ni=2;ni<arguments.length;ni++)
        a[a.length]=arguments[ni];
        
    return function() {return objmethod.apply(obj,a);}
} 

function SwapXmlNodes(obj)
{
    var node1=obj["node1"],node2=obj["node2"];
    var doc=node1.ownerDocument.documentElement;
    var tmp_node=node1.cloneNode(),tmp_node2=node2.cloneNode();
    tmp_node2=doc.insertBefore(tmp_node2,node1);
    node1.parentNode.removeChild(node1);
    tmp_node=doc.insertBefore(tmp_node,node2);
    node2.parentNode.removeChild(node2);
    obj["node1"]=tmp_node2;
    obj["node2"]=tmp_node;
}

function ArrayMove(array, fromIndex, toIndex) {
    var element = array[fromIndex]
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
} 

function SafeValue(obj)
{
    var value="";
    
    if(typeof obj != "undefined")
        value=obj;
        
    return value;
}

function object2XML(object,name)
{//convert object to xml data
    var result="<"+name+" ",type=null;
    //先处理普通属性，然后处理内置的对象
    
    for (var prop in object) 
        if (object.hasOwnProperty(prop))
        {
            type=typeof object[prop];
            if(type!== "function"&&type!="object"&&object[prop]!=null)
                result+=prop+"=\""+escape(object[prop])+"\" "
        }
            
    result+="></"+name+">";
    
    return result;
}
    
function Object2XML(object,name,props,propsExclude)
{//convert object to xml data
    var result="<"+name+" ",type=null;
    //先处理普通属性，然后处理内置的对象
    
    for (var prop in object) 
        if (object.hasOwnProperty(prop))
            if(props==null||(props!=null&&props.indexOf("["+prop+"]")!=-1)||(propsExclude!=null&&props.indexOf("["+prop+"]")==-1))
            {
                type=typeof object[prop];
                if(type!== "function"&&type!="object"&&object[prop]!=null)
                    result+=prop+"=\""+escape(object[prop])+"\" "
            }
            
    result+=">";

    for (var prop in object) 
        if (object.hasOwnProperty(prop))
            if(props==null||(props!=null&&props.indexOf("["+prop+"]")!=-1)||(propsExclude!=null&&props.indexOf("["+prop+"]")==-1))
                if(typeof object[prop]=="object")
                    result+=Object2XML(object[prop],prop);
                
    return result+"</"+name+">";
}

function ObjectCopy(objSource,objTarget,arrayAtts,arrayAttsNot)
{//将objSource中的属性复制到objTarget上,重复的属性将忽略
    for (var prop in objSource) 
        if (objSource.hasOwnProperty(prop))
            if(typeof objSource[prop]!="function")
                if((arrayAtts==null||arrayAtts.indexOf(prop)!=-1)&&(arrayAttsNot==null||arrayAttsNot.indexOf(prop)==-1))
                    objTarget[prop]=objSource[prop];
}

function Control_Common(holder,content,type,funReady,timestamp)
{/*通用控件，从fileurl加载内容，然后填充到holder中 timestamp为统一的时间戳
   type 0: content 为url 10:content为string
    */
    this.controls=null;
    this.container=holder;
    this.onready=funReady;
    this.content=null;
    
    this.load=function(str)
    {
        this.content=str;
        this.controls=null;
        this.controls=new Object();
        var ni=str.indexOf("controlid=\"holder\""),nj=str.indexOf("</body>");
        if(ni!=-1)
        {
            ni=str.lastIndexOf("<",ni);
            str=str.substring(ni,nj);
            
            if(this.container!=null)
            {
                this.container.innerHTML="";
                this.container.innerHTML=str;
            }
            else
                this.container=this.CreateElement(str);
                            
            var collect=this.container.getElementsByTagName("*");
            for(var nj=0;nj<collect.length;nj++)
            {
                if(collect[nj].getAttribute("controlid")!=null)
                    this.controls[collect[nj].getAttribute("controlid")]=collect[nj];
            }
        }
        
        if(this.onready!=null)
            this.onready.call();
    }
    
    this.Reload=function(holder)
    {
        if(holder!=null)
            this.container=holder;
        
        this.load(this.content);
    }
    
    this.CreateElement=function(html)
    {//从html创建控件
        var obj=document.createElement("div");
        obj.innerHTML=html;
        obj=obj.children[0];
        document.body.appendChild(obj);
        return obj;
    }
    
    if(type==null||type==0)
    {
        var reader=new UrlReader();
        reader.fromobject=this;
        reader.onready=this.load;
        if(timestamp==null)
            timestamp=(new Date()).getTime();
        reader.Read("get",content+"?t="+timestamp);
    }
    else if(type==10)
        this.load(content);
}

function getTagName(key)
{
    var result=null;
    var ni=key.lastIndexOf("_");
    if(ni!=-1)
        result=key.substring(ni+1);
        
    return result;
}
        
function getObjectFromDefine(PARAMLIST,holder,key)
{//根据定义从holder中找到对应的对象
    if(!holder)
        holder=document;

    var value=PARAMLIST[key],value_prop;
    var query=getTagName(key),bwild=false;
    
    for(var prop in value)
        if (value.hasOwnProperty(prop)&&prop!="comment")
        {
            value_prop=value[prop];
            if(value_prop[0]=='*')
            {
                bwild=true;
                value_prop=value_prop.substring(1);
            }
            else
                bwild=false;

            query+="["+prop+(bwild?'*':'')+"='"+value_prop+"']";
        }
        
    return holder.querySelectorAll(query);
}


function widToWid2(key){
  var soure = {
    1: null,   
    2:4,
    4:1,
    8:12,
    9:7,
    11:17,
    14:40,
    15:21,
    16:18,
    17:14,
    27:33,
    30:39,
    33:41,
    35:42,
    37:43,
    38:60,
    40:45,
    50:48,
    52:50,
    54:52,
    55:55,
    351:351,
    575:53,
    1783:345,
    1811:56,
    1831:62,
    1836:65,
    1865: 64,
  }

  return soure[key] ? soure[key] : undefined

}
