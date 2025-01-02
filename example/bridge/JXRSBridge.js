(function () {
	'use strict';

	// api操作对象集合
	var api = {
		version: 1.0
	};

	// JSApi.wrap("on.{操作名称}")的action规则来注入的事件处理器列表
	var messageHandlers = {};

	// 所有回调事件的列表
	var callbackBuckets = {};

	// 获取当前浏览器的基础信息: 内核、版本、操作系统
	var ua = navigator.userAgent.toLowerCase();

	// 是否是iphone客户端
	var isIPhone = ~ua.indexOf("iphone");

	// 是否是Android客户端
	var isAndroid = ~ua.indexOf("android");

	/**
	 * Native通知web,主要是为了用来处理回调函数
	 *
	 * @param {String} jsonStr
	 */
	function notify(callbackid, jsonStr) {
		try {
			if (!callbackid) return;

			var fn = callbackBuckets[callbackid];

			jsonStr = JSON.parse(jsonStr);

			fn && fn(jsonStr.err, jsonStr.respData);
		} catch (ex) {
			throw new Error(ex);
		}
	}

	/**
	 *
	 * Native主动调用H5的事件
	 *
	 * @param {string} actionName 操作名称
	 * @param {String} dataJSONStr JSON字符串形式的数据对象
	 */
	function invoke(actionName, dataJSONStr) {
		var fn = messageHandlers[actionName];

		if (!fn) return;

		try {
			dataJSONStr = JSON.parse(dataJSONStr);
			fn(dataJSONStr);
		} catch (ex) {
			throw new Error("invoke: JSON字符串解析失败");
		}
	}

	function createCallbackID(action) {
		return "cb_" + action + "_" + new Date().getTime();
	}

	function isFn(obj) {
		return Object.prototype.toString.call(obj) === "[object Function]";
	}

	/**
	 * 判断是否是IOS7以上的版本
	 */
	function canUseIOSWK() {
		if (!isIPhone) return false;

		var version = ua.match(/os [\d._]+/gi)[0];

		version = (version + "").replace(/[^0-9|_.]/gi, "");

		version = version.split("_")[0];

		return version > 7;
	}

	// 当前Hybird应用中App端注入的JSContext上下文的名称
	var appJSContextName = "JSBridge";

	/**
	 *
	 * 包装api方法
	 *
	 * @param {String} action 业务操作全部名称
	 * @param {Function} handler 业务操作方法
	 */
	function wrap(action, handler) {
		var names = action.split(".");

		if (names.length === 1) {
			api[names[0]] = handler;
			return;
		}

		var name = names.shift(),
		    kv = void 0;

		if (name === "on") {
			// on开头的都是实现事件注册
			messageHandlers[names.join(".")] = handler;
			return;
		}

		if (!kv) {
			kv = api[name] || (api[name] = {});
			name = names.shift();
		}

		while (name) {
			if (!kv[name]) {
				kv[name] = names.length === 0 ? handler : kv = {};
			} else {
				kv = kv[name];
			}
			name = names.shift();
		}
	}

	/**
	 *
	 * 调用原生功能
	 *
	 * @param {String} action 业务操作名称
	 * @param {Object} [params] 业务操作需要的参数
	 * @param {*} callback 针对当前操作的H5端回调函数
	 */
	function invokeApp(action, params, callback) {
		if (arguments.length === 2 && isFn(params)) {
			callback = params;
			params = null;
		}

		var callbackid = void 0;

		if (callback) {
			callbackBuckets[callbackid = createCallbackID(action)] = callback;
		}

		params = params ? JSON.stringify(params) : "";
		callbackid = callbackid || "";

		if (canUseIOSWK()) {
			window.webkit.messageHandlers[appJSContextName].postMessage({
				action: action,
				data: params,
				callbackid: callbackid
			});
		} else {
			//window[appJSContextName].invoke(action, params, callbackid);
			  window[appJSContextName].postMessage(JSON.stringify({action: action,data: params,callbackid: callbackid}));
		}
	}

	/**
	 *
	 * 考虑到有些应用需要个性化的api名称
	 *
	 * @param {String} newContextName 新的全局上下文名称
	 */
	function alias(newContextName) {
		if (newContextName === "JSApi") return false;

		window[newContextName] = api;

		if ("JSApi" in window) {
			delete window.JSApi;
		}
	}

	/**
	 *
	 * 绑定App端注入的JSContext上下文
	 *
	 * @param {String} name App端注入的JSContext上下文名称
	 */
	function aliasBridge(name) {
		if (!name) return;

		if (!(name in window)) {
			console.warn && console.warn("\u4E0D\u5B58\u5728App\u6CE8\u5165\u7684\u540D\u79F0\u4E3A" + name + "\u7684JSContext\u4E0A\u4E0B\u6587");
		}

		appJSContextName = name;
	}

	var _isDebug = false;

	function setDebug(fn) {
	  _isDebug = isFn(fn) ? fn(ua) : false;
	}

	/**
	 * 判断当前环境是否是debug环境
	 */
	function isDebug() {
	  return _isDebug;
	}

	function analyicScript() {
		var doc = document;
		var scripts = doc.getElementsByTagName("script");
		var query = null,
		    src = void 0;
		for (var i = 0, l = scripts.length; i < l; i++) {
			src = scripts[i].getAttribute("src");
			if (~src.indexOf("jsapi.")) {
				query = src.substring(src.indexOf("?") + 1);
				if (query) {
					query = query.split("&");
				}
			}
		}

		return query;
	}

	function ACMD(target) {
		/// //////////////////////// CommonJS /////////////////////////////////
		if (typeof define === "function" && (define.amd || define.cmd)) {
			if (define.amd) {
				// AMD 规范，for：requirejs
				define(function () {
					return target;
				});
			} else if (define.cmd) {
				// CMD 规范，for：seajs
				define(function (require, exports, module) {
					module.exports = target;
				});
			}
		}
	}

	var ACTION = "device.getLocation";

	/**
	 * 获取设备的当前位置
	 *
	 * @param {Function} cb 回调函数
	 *
	 *		longitude	String	经度
	 *		latitude	String	纬度
	 *		accuracy	Number	精度，单位米
	 *		speed	Number	速度，单位毫秒
	 *		country	String	国家名
	 *		countryCode	string	国家编号
	 *		province	String	省份名
	 *		city	String	城市名
	 *		cityCode	String	城市编码
	 *		adCode	String	区域编码
	 *		streetNumber	Object	街道门牌信息，结构是：{street, number}
	 *		pois	Object Array	定位点附近的 POI 信息，结构是：{name, address}
	 */
	wrap(ACTION, function (cb) {
	  return invokeApp(ACTION, cb);
	});

	var ACTION$1 = "device.getNetworkType";

	/**
	 * 获取设备的当前网络状态
	 *
	 * @param {Function} cb 回调函数
	 *
	 *  network_type:wifi     wifi网络
	 * 	network_type:edge     非wifi,包含3G/2G
	 * 	network_type:fail     网络断开连接
	 * 	network_type:wwan     2g或者3g
	 *
	 */
	wrap(ACTION$1, function (cb) {
	  return invokeApp(ACTION$1, cb);
	});

	var ACTION$2 = "device.makePhoneCall";

	/**
	 * 拨打电话
	 *
	 * @param {String} number 电话号码
	 */
	wrap(ACTION$2, function (number) {
	  return invokeApp(ACTION$2, { number: number });
	});

	var ACTION$3 = "device.scan";

	/**
	 * 扫码
	 *
	 * @param {Function} callback 回调函数
	 *
	 *   参数:
	 * 		code : 扫码得到的内容
	 */
	wrap(ACTION$3, function (cb) {
	  return invokeApp(ACTION$3, cb);
	});

	var ACTION$4 = "ui.alert";

	/**
	 * 调用原生Alert弹框
	 *
	 * @param {String} title 标题
	 * @param {String | Object} msg 消息内容
	 */
	wrap(ACTION$4, function (title, msg) {
		if (isDebug()) {
			alert(JSON.stringify({
				title: title,
				msg: msg
			}));
			return;
		}

		invokeApp(ACTION$4, { title: title, msg: msg });
	});

	var ACTION$5 = "ui.confirm";

	/**
	 * 调用原生Alert弹框
	 *
	 * @param {String} title 标题
	 * @param {String | Object} msg 消息内容
	 *
	 */
	wrap(ACTION$5, function (title, msg, cb) {
		/**
	  * cb形式 : cb(err,res)
	  * res:
	  *  {
	  *    "button":"点击的按钮 OK或CANCEL"
	  *  }
	  */
		invokeApp(ACTION$5, { title: title, msg: msg }, cb);
	});

	var ACTION$6 = "ui.prompt";

	/**
	 * 弹出系统交互框
	 *
	 * @params {Object} kv 参数键值对
	 * 	kv:
	 *  {
	 * 		title: 标题,
	 * 		msg: 消息内容,
	 * 		placeholder: 默认文本
	 * 	}
	 * @params {Function} cb 回调函数
	 *
	 * 	参数:
	 * 		content: 输入框中的内容
	 */
	wrap(ACTION$6, function (kv, cb) {
	  // 针对null可能会引起App端的异常,采用空字符串形式
	  kv.title = kv.title || "";
	  kv.msg = kv.msg || "";
	  kv.placeholder = kv.placeholder || "";

	  invokeApp(ACTION$6, kv, cb);
	});

	var ACTION_SHOW = "ui.showToast";
	var ACTION_HIDE = "ui.hideToast";

	wrap(ACTION_SHOW, function (msg) {
		invokeApp(ACTION_SHOW, { msg: msg });
	});

	wrap(ACTION_HIDE, function () {
		invokeApp(ACTION_HIDE);
	});

	var ACTION_SHOW$1 = "ui.showLoading";
	var ACTION_HIDE$1 = "ui.hideLoading";

	wrap(ACTION_SHOW$1, function (content) {
		var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

		content = content || "";
		invokeApp(ACTION_SHOW$1, { content: content, delay: delay });
	});

	wrap(ACTION_HIDE$1, function () {
		invokeApp(ACTION_HIDE$1);
	});

	var ACTION$7 = "view.close";

	/**
	 * 页面关闭
	 */
	wrap(ACTION$7, function () {
	  invokeApp(ACTION$7);
	});

	var ACTION$8 = "view.back";

	/**
	 * 页面回退
	 */
	wrap(ACTION$8, function () {
	  invokeApp(ACTION$8);
	});

	var ACTION$9 = "view.forward";

	/**
	 * 页面前进
	 */
	wrap(ACTION$9, function () {
	  invokeApp(ACTION$9);
	});

	var ACTION$a = "view.fullScreen";

	/**
	 * 页面全屏
	 */
	wrap(ACTION$a, function () {
	  invokeApp(ACTION$a);
	});

	var ACTION$b = "view.goto";

	/**
	 * 页面跳转
	 *
	 * @params {Object} kv 键值对参数
	 * {
	 * 		title: title,
	 * 		url: url,
	 * 		isNative: isNative
	 * }
	 */
	wrap(ACTION$b, function (kv) {
	  kv.title = kv.title || "";
	  kv.url = kv.url || "";
	  invokeApp(ACTION$b, kv);
	});

	var ACTION_SHOW$2 = "view.showOptionMenu";
	var ACTION_HIDE$2 = "view.hideOptionMenu";

	/**
	 * 显示页面右上角按钮
	 */
	wrap(ACTION_SHOW$2, function () {
	  invokeApp(ACTION_SHOW$2);
	});

	/**
	 * 隐藏页面右上角按钮
	 */
	wrap(ACTION_HIDE$2, function () {
	  invokeApp(ACTION_HIDE$2);
	});

	var ACTION_CHANGETITLE = "view.changeTitle";
	var ACTION_TITLECLICK = "view.onTitleClick";

	/**
	 * 改变顶部标题
	 */
	wrap(ACTION_CHANGETITLE, function (title) {
	  invokeApp(ACTION_CHANGETITLE, { title: title });
	});

	/**
	 * 点击顶部标题
	 */
	wrap(ACTION_TITLECLICK, function (cb) {
	  invokeApp(ACTION_TITLECLICK, cb);
	});

	var ACTION$c = "image.choose";

	/**
	 * count: 最大可选照片数,上限9张
	 * sourceType: 相册选取或者拍照，默认 ['camera','album']
	 *
	 * cb:回调函数
	 *   参数:
	 *      filePaths
	 *   错误信息:
	 * 		code: 错误码  10: 用户取消操作 , 11	操作失败（权限不够）
	 */
	wrap(ACTION$c, function (count, sourceType, cb) {
		if (isFn(count)) {
			cb = count;
			count = 9;
			sourceType = ["camera", "album"];
		} else {
			count = !count || count > 9 ? 9 : Math.abs(count);
			if (isFn(sourceType)) {
				cb = sourceType;
				sourceType = ["camera", "album"];
			} else {
				sourceType = !sourceType ? ["camera", "album"] : sourceType;
			}
		}

		invokeApp(ACTION$c, { count: count, sourceType: sourceType }, cb);
	});

	var ACTION$d = "video.choose";

	/**
	 * {
	 *  count: 最大可选照片数,上限9张
	 *  sourceType: 相册选取或者拍照，默认 ['camera','album']
	 *  camera: 前置或者后置摄像头，默认前后都有，即：[‘front’, ‘back’]
	 * }
	 * cb:回调函数
	 *   参数:
	 *      filePaths
	 *   错误信息:
	 * 		code: 错误码  10: 用户取消操作 , 11	操作失败（权限不够）
	 */
	wrap(ACTION$d, function (_ref, cb) {
	  var count = _ref.count,
	      sourceType = _ref.sourceType,
	      camera = _ref.camera;

	  count = !count || count > 9 ? 9 : Math.abs(count);
	  sourceType = !sourceType ? ["camera", "album"] : sourceType;
	  camera = !camera ? ["front", "back"] : camera;

	  invokeApp(ACTION$d, { count: count, sourceType: sourceType, camera: camera }, cb);
	});

	ACMD(api);

	// 对外定义的API
	api.invoke = invoke;
	api.notify = notify;
	api.debug = setDebug;

	// 对外输出此方法,用于特定项目去开发各自应用的专属交互操作
	api.wrap = function (action) {
		wrap(action, function (kv, callback) {
			invokeApp(action, kv, callback);
		});
		return api;
	};

	// 注册事件action，主要提供App端简化
	api.on = function (action, handler) {
		wrap("on." + action, handler);
		return api;
	};

	window.JSApi = api;

	var query = analyicScript();

	if (query && query.length) {
		query[0] !== "_" && query[0] !== "JSApi" && alias.call(api, query[0]);

		if (query.length === 2) {
			aliasBridge.call(api, query[1]);
		}
	}

}());