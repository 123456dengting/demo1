 /**
  * 滚动动画
  * @param {*} dom    滚动的元素
  * @param {*} attr   属性必须是StylesConfig包含的属性, 可使用addStylesConfig参数自行扩展
  * @param {*} target 目标值
  * @param {*} type   动画类型 uniform 匀速  buffer缓冲(越来越慢) type = buffer 的时候, speed不用传
  * @param {*} speed  匀速运动的速度
  * @param {*} rate   缓冲运动的系数
  * @param {*} callback  动画完成的回调函数
  * @param {*} addStylesConfig  可自行扩展动画属性
  * 
  */
 const animitionMove = function({ dom, attr = "scrollTop", target = 0, type = "uniform", speed = 50, rate = 10, callback, addStylesConfig = {} }) {
     if (type === "uniform" && (isNaN(speed)) || !dom) {
         return;
     }

     window.cancelAnimationFrame(window.animitionMoveing);
     window.requestAnimFrame = (function() {
         return (
             window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             function(callback) {
                 window.setTimeout(callback, 6000 / 60);
             }
         );
     })();


     //可自行配置想要的属性动画
     let StylesConfig = {
         left: {
             getStyle: (dom) => { return getComputedStyle(dom)[attr].split("px")[0] },
             setStyle: (dom, value) => { dom.style[attr] = value + "px" },
             getNextValue: (selfTarget) => {
                 let nextValue = (+selfTarget) + speed;
                 if (Math.abs(target - nextValue) <= Math.abs(speed)) {
                     nextValue = target
                 };
                 return nextValue
             }
         },
         right: {
             getStyle: (dom) => { return getComputedStyle(dom)[attr].split("px")[0] },
             setStyle: (dom, value) => { dom.style[attr] = value + "px" },
             getNextValue: (selfTarget) => {
                 let nextValue = (+selfTarget) + speed;
                 if (Math.abs(target - nextValue) <= Math.abs(speed)) {
                     nextValue = target
                 };
                 return nextValue
             }

         },
         scrollLeft: {
             getStyle: (dom) => { return dom.scrollLeft },
             setStyle: (dom, value) => {
                 dom.scrollTo({
                     left: value
                 })
             },
             getNextValue: (selfTarget) => {
                 if (target > selfTarget) {
                     return selfTarget + speed > target ? target : selfTarget + speed;
                 } else {
                     return selfTarget - speed < target ? target : selfTarget - speed;
                 }
             },
         },
         scrollTop: {
             getStyle: () => { return dom.scrollTop },
             setStyle: (dom, value) => {
                 dom.scrollTo({
                     top: value
                 })
             },
             getNextValue: (selfTarget) => {
                 if (target > selfTarget) {
                     return selfTarget + speed > target ? target : selfTarget + speed;
                 } else {
                     return selfTarget - speed < target ? target : selfTarget - speed;
                 }
             },
         },
         opacity: {
             getStyle: () => { return getComputedStyle(dom)[attr] },
             setStyle: (dom, value) => { dom.style[attr] = +value },
             getNextValue: (selfTarget) => {
                 let nextValue = (selfTarget - speed).toFixed(4);
                 if (Math.abs(target - nextValue) <= Math.abs(speed)) {
                     nextValue = target
                 };
                 return nextValue
             },
         },
     };

     StylesConfig = {
         ...StylesConfig,
         ...addStylesConfig
     }



     if (!StylesConfig[attr]) {
         return
     }

     console.log("111111111")


     function styleMove() {
         try {
            let selfTarget = StylesConfig[attr].getStyle(dom);
            if (target != selfTarget) {
                let nextValue = StylesConfig[attr].getNextValue(selfTarget);
                console.log("111111, ", selfTarget, nextValue)
                StylesConfig[attr].setStyle(dom, nextValue)
                window.animitionMoveing = window.requestAnimationFrame(styleMove);
            } else {
                callback && callback()
                return
            }
         } catch (error) {
             console.log("error", error)
         }

     }

     window.animitionMoveing = window.requestAnimationFrame(styleMove);
 }