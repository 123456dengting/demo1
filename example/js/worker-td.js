
//子线程可以用this或者self
//子进程关闭self.close();


self.onmessage = function(event){
    // let d = e.data;
    console.log("11", event)
    setTimeout(() => {
        postMessage(event.data);
    }, 1000)
}


