var watermark =  (settings) => {
	this.settings = settings;
	//默认设置
	var defaultSettings = {
		watermark_txt: "text",
		watermark_x:  0, //水印起始位置x轴坐标
		watermark_y: 250, //水印起始位置Y轴坐标
		watermark_rows: 5, //水印行数
		watermark_cols: 5, //水印列数
		watermark_x_space: 80, //水印x轴间隔
		watermark_y_space: 200, //水印y轴间隔
		watermark_color: '#aaa', //水印字体颜色
		watermark_alpha: 0.15, //水印透明度
		watermark_fontsize: '14px', //水印字体大小
		watermark_font: '微软雅黑', //水印字体
		watermark_width: 400, //水印宽度
		watermark_height: 200, //水印长度
		watermark_angle: 45, //水印倾斜度数
	};


	// var oTemp = document.createDocumentFragment();
	this.oTemp = document.createElement("div");
	this.waters=[];


	document.body.appendChild(this.oTemp);

	var  createWaters = (text='') => {
		if(!text) text=defaultSettings.watermark_txt;
		//获取页面最大宽度
		var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
		var cutWidth = page_width * 0.20;
		var page_width = page_width - cutWidth;
		//获取页面最大高度
		var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
		// var page_height = document.body.scrollHeight+document.body.scrollTop;
		//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
		// if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
		// 	defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
		// 	defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
		// }
		// //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
		// if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
		// 	defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
		// 	defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
		// }
		var x;
		var y;
		for (var i = 0; i < defaultSettings.watermark_rows; i++) {
			y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
			for (var j = 0; j < defaultSettings.watermark_cols; j++) {
				x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

				var mask_div = document.createElement('div');

				mask_div.innerHTML = '<div class="water" style="text-algin:center"> </div>' + text;
				//设置水印div倾斜显示
				// mask_div.style.webkitTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				// mask_div.style.MozTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				// mask_div.style.msTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				// mask_div.style.OTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				// mask_div.style.transform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				
				mask_div.style.webkitTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.MozTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.msTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.OTransform = "rotate(" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.transform = "rotate(" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.visibility = "";
				mask_div.style.position = "fixed";
				// mask_div.style.left = Math.floor(Math.random() * page_width) + 'px';
				// mask_div.style.top = Math.floor(Math.random() * page_height) + 'px';
				mask_div.style.left = (page_width / 5) * i + 'px';
				mask_div.style.top = defaultSettings.watermark_y_space * j  + 'px';
				mask_div.style.overflow = "hidden";
				mask_div.style.zIndex = "9999";
				mask_div.style.pointerEvents = 'none'; //pointer-events:none  让水印不遮挡页面的点击事件
				//mask_div.style.border="solid #eee 1px";
				mask_div.style.opacity = defaultSettings.watermark_alpha;
				mask_div.style.fontSize = defaultSettings.watermark_fontsize;
				mask_div.style.fontFamily = defaultSettings.watermark_font;
				mask_div.style.color = defaultSettings.watermark_color;
				mask_div.style.textAlign = "center";
				mask_div.style.width = defaultSettings.watermark_width + 'px';
				mask_div.style.height = defaultSettings.watermark_height + 'px';
				mask_div.style.display = "block";
				this.oTemp.appendChild(mask_div);
			};
		};
	}

	this.load = (text) => {
		var IETester = function (userAgent) {
			var UA = userAgent || navigator.userAgent;
			if (/msie/i.test(UA)) {
				return UA.match(/msie (\d+\.\d+)/i)[1];
			} else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
				return UA.match(/rv:(\d+\.\d+)/)[1];
			}
			return false;
		}
	
		if (!IETester() || IETester() - 0 >= 11) { } else {
			alert("你的IE浏览器版本太低了，请使用谷歌或者火狐浏览器获得更好的用户体验")
		}

		//采用配置项替换默认值，作用类似jquery.extend
		if (typeof this.settings === "object") {
			var src = this.settings || {};
			for (let key in src) {
				if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
					continue;
				else if (src[key])
					defaultSettings[key] = src[key];
			}
		}
		createWaters(text);
	}

	this.refresh = (text) => {
		while(this.oTemp.hasChildNodes()){
			this.oTemp.removeChild(this.oTemp.firstChild);
		}
		this.waters.length=0;
		this.load(text);
	};

	return this;
}
// watermark({
// 	watermark_alpha:0.15,
// 	watermark_txt: 'xxxxxx' + '张三' + (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + ((new Date()).getDate())
// })

window.watermark = watermark;

// export default watermark;