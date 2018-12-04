var watermark =  (settings) => {
	this.settings = settings;
	//默认设置
	var defaultSettings = {
		watermark_txt: "text",
		watermark_x: 20, //水印起始位置x轴坐标
		watermark_y: 20, //水印起始位置Y轴坐标
		watermark_rows: 3, //水印行数
		watermark_cols: 5, //水印列数
		watermark_x_space: 100, //水印x轴间隔
		watermark_y_space: 50, //水印y轴间隔
		watermark_color: '#aaa', //水印字体颜色
		watermark_alpha: 0.15, //水印透明度
		watermark_fontsize: '36px', //水印字体大小
		watermark_font: '微软雅黑', //水印字体
		watermark_width: 400, //水印宽度
		watermark_height: 200, //水印长度
		watermark_angle: 15, //水印倾斜度数
	};


	// var oTemp = document.createDocumentFragment();
	this.oTemp = document.createElement("div");
	this.waters=[];

	document.body.appendChild(this.oTemp);

	var  createWaters = (text='') => {
		console.log("text1",text);
		if(!text) text=defaultSettings.watermark_txt;
		//获取页面最大宽度
		var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
		var cutWidth = page_width * 0.0150;
		var page_width = page_width - cutWidth;
		//获取页面最大高度
		var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);
		// var page_height = document.body.scrollHeight+document.body.scrollTop;
		//如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
		if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
			defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
			defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
		}
		//如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
		if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
			defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
			defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
		}
		var x;
		var y;
		for (var i = 0; i < defaultSettings.watermark_rows; i++) {
			y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
			for (var j = 0; j < defaultSettings.watermark_cols; j++) {
				x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

				var mask_div = document.createElement('div');

				mask_div.innerHTML = '<div class="water" style="text-algin:center"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDNmZTgwZS04MDIwLWQxNDUtYTM3ZC0yODYwZWExYzEwMTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU3NUIxRjM3MUFBMTFFN0EzMEZFNzYxOUE0RkU3RjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU3NUIxRjI3MUFBMTFFN0EzMEZFNzYxOUE0RkU3RjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzBCNDE0QTQ2OUNEMTFFN0EzNEFEMUIyODU1OEFGNzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzBCNDE0QTU2OUNEMTFFN0EzNEFEMUIyODU1OEFGNzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6E1vgcAAADnUlEQVR42uSXe0yNYRzHO6fjlusIG9NfEo1ZMy1rhclsGpvL8YesDcmQXMqlmFlIrNxmcmuS0XRaaBm5zGVKzHXkOtKIUZZRWXLK97d93+3ds+e8Hf7pD7/ts+o873m+7+/6PNna2tp8OsLsPh1kHSbscLlc3j4bAqaDcDAcDASdQSN4DW6AS6DU6XS629vMVlBQYLXuC+aBZDDSyxd8B1Ihnv+vwqHgID1V7Rk4C+6CLqAr6At6g1bQAD4BlyfvHR5Ek0CGsi7lXwSyKBAPVgI/zfd/gcv0vsJbj+PAEeWzeyARDAFpIEizl5tC1fy9OxgKToG18LzFk8c24AQl4DvoxbDt4JcPgAhFrJkhLwQtrIMRYAD4Am6BDyAKXPDkcQrYBsLABLCJhSWb7AHdTN/7CQ6Bk3xmLuhvUUtvJH3w+pwqLJ5cYxVLTiaCYG6YpGxynVUeC5aATpqQi6floI4hdzAa5RDPMoTlw8cUMiwGvAc3lQ1TwUuGfZAi+BXsB4/ADDAJDDatPwEXQTbEq2RyzVJExbaD++AK//4GokE/cEYR/Q32sZBy2V6xiqjYKLAGZGJo+dqZI9UCGM5VoAZMBcukOlmE5mERAQ9W4Od6Ti55sTKLfM8ECXYOCp2to6cyQLaAacq6VGkIRCvgQQafDwTL2d9Wx168nRNHZ34MubTUGGUtmy/SCNEcihom3VAF8iyEg0T4ucUDMczdZtNn4v1S0AecBws0VS/p2MDRqbMfInzYapazh8XDFxQVjyJZvZOV5yW/O8FT4M/ho7PbDm4ayamlszCuSXs0gb1SHMpZ3srhc4e57wl2sygXsVjNlmtnf0r1poOHSlG8BUcpmMDcJSqi1cy3tFUxRX04hMayE8wm0Sg0ZnUNB0At2Mq528BeDGce7Zo5Lf2bT+/GK+vpPKWK2V7hdHIxOqHVfEjsApXcbJhF3j/y0HBxUFTwJmJYE3u+kYWWxvaSNKRAtFx3HpcyJ8GcTgGctfXgFcdlDzCH81id01eBDJP5YDWLU8bsMTCbJ5nHi0AZi2Ih81fPl5iiKRLDJFIbwWeeWKNNa/Ki0fA0p70biJvjL4+VGq3xzDgU5JZxnOFNYpGZR6rUSrIqanX18WFoi3j7cLNlmllkdSy+cayJQM33pUPiIPrgb+5cxqlzgrlJ97C5zkQoE5yW6vV4r/Zio0JOpCiGMpQ592cEajl2pdhKIFbpzdvZ/rv/nf4IMACeDAauqa/kBwAAAABJRU5ErkJggg=="/> </div>' + text;
				//设置水印div倾斜显示
				mask_div.style.webkitTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				mask_div.style.MozTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				mask_div.style.msTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				mask_div.style.OTransform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				mask_div.style.transform = "rotate(-" + Math.floor(Math.random() * 360) + "deg)";
				mask_div.style.visibility = "";
				mask_div.style.position = "fixed";
				mask_div.style.left = Math.floor(Math.random() * page_width) + 'px';
				mask_div.style.top = Math.floor(Math.random() * page_height) + 'px';
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
		console.log("text",text);
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

//export default watermark;