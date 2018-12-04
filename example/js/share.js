//import $ from 'jquery';
//import { isLogin as userIsLogin } from 'js/controller/user.js';
//import './share.css';

const { DOMAIN_LOGIN } = window.GLOBAL || {};

/** 每个页面的分享需要继承Share 类，然后扩展自己的 分享后操作函数shareFunc
 *  {
 *      type: 'facebook',
 *      selector: '.js-fb',
 *      url: '',
 *      platform: 'pc',
 *      options: {
 *          appId: 123123123,
 *      }
 * }
 *
 * @class Share
 */

class Share {
    static TYPES = { // 默认每个分享方式的type, 可以自由扩展
        facebook: 1,
        twitter: 2,
        vk: 3,
        google: 4,
        reddit: 5,
        pinterest: 6,
        telegram: 7
    }
    static loginState = true; // 登录状态为true,则是已登录
    static loginUrl = `${DOMAIN_LOGIN}/m-users-a-sign.htm?type=1&ref=${window.location.href}`
    shareFunc() { // 扩展自己的 分享后操作函数shareFunc
        // console.log(this);
    }
    diyLoginCall() {}
    static async goLoginPage(isLogin, diyLogin, diyLoginCall) {
        if (isLogin) {
            await userIsLogin().then((curIsLogin) => {
                if (!curIsLogin) {
                    if (diyLogin) {
                        diyLoginCall();
                        Share.loginState = false;
                        return;
                    }
                    Share.loginState = false; // 需要登录则登录状态为false
                    window.location.href = this.loginUrl;
                }
            });
        }
    }
    static positon(height, width) {
        const w = $(window).width();
        const h = $(window).height();
        return {
            left: (w - width) / 2,
            top: (h - height) / 2,
        };
    }
    static encode({ ...rest }) {
        const result = {};
        Object.entries(rest).forEach(([key, val]) => {
            result[key] = encodeURIComponent(val);
        });
        return result;
    }
    static detectWindow(frame) {
        return new Promise((resolve) => {
            const handler = setInterval(() => { // eslint-disable-line
                if (frame.closed) {
                    clearInterval(handler);
                    resolve({
                        closed: true,
                    });
                }
            }, 1000);
        });
    }
    // 优化fecebook分享，避免同一页面有两次FB分享时只有一个分享有效
    async eventClick(selector, onClick, isLogin, url, platform, rest, onSuccess, diyLogin, diyLoginCall) {
        $(document).on('click', selector, async () => {
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    FB.ui({ // eslint-disable-line
                        method: 'share',
                        href: url,
                        mobile_iframe: platform === 'mobile',
                        ...rest,
                    }, (res) => {
                        onSuccess(res);
                        if (res !== undefined) {
                            this.shareFunc(selector);
                        }
                    });
                }
            });
        });
    }
    facebook({ // 分享的数据要使用开放图谱标签
        selector,
        url = window.location.href,
        platform = 'pc',
        appId,
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        version = 'v2.7',
        onClick = () => {},
        onSuccess = () => {},
        ...rest
    } = {}) {
        const fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById('facebook-jssdk')) {
            this.eventClick(selector, onClick, isLogin, url, platform, rest, onSuccess, diyLogin, this.diyLoginCall);
            return;
        }
        const js = document.createElement('script');
        js.id = 'facebook-jssdk';
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
        window.fbAsyncInit = () => {
            FB.init({ appId, status: true, cookie: true, oauth: true, xfbml: true, version, }); // eslint-disable-line
            this.eventClick(selector, onClick, isLogin, url, platform, rest, onSuccess, diyLogin, this.diyLoginCall);
        };
    }
    twitter({
        selector,
        url = window.location.href,
        desc = '',
        title = '',
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => { },
        onClose = () => { },
        // onSuccess = () => {},
    } = {}) {
        let owner;
        const h = 540;
        const w = 650;
        const { left, top } = Share.positon(h, w);
        const { url: gUrl, desc: gDesc, title: gTitle } = Share.encode({ url, desc, title });
        $(document).on('click', selector, async () => {
            onClick();
            if (owner) return;
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    owner = window.open(
                        `https://twitter.com/intent/tweet?text=${gTitle} ${gDesc}&url=${gUrl}`,
                        '_blank',
                        `location=yes,left=${left},top=${top},height=540,width=650,scrollbars=yes,status=yes`,
                    );
                    Share.detectWindow(owner).then((data) => {
                        owner = null;
                        onClose(data);
                        this.shareFunc(selector);
                    });
                }
            });
        });
    }
    vk({
        selector,
        url = window.location.href,
        title = '',
        img = '',
        desc = '',
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => { },
        onClose = () => { },
        // onSuccess = () => {},
    } = {}) {
        let owner;
        const h = 540;
        const w = 650;
        const { left, top } = Share.positon(h, w);
        const {
            url: gUrl, title: gTitle, desc: gDesc, img: gImg
        } = Share.encode({
            url, title, desc, img
        });
        $(document).on('click', selector, async () => {
            onClick();
            if (owner) return;
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    owner = window.open(
                        `http://vk.com/share.php?url=${gUrl}&title=${gTitle} ${gDesc}&image=${gImg}`,
                        '_blank',
                        `location=yes,left=${left},top=${top},height=540,width=650,scrollbars=yes,status=yes`,
                    );
                    Share.detectWindow(owner).then((data) => {
                        owner = null;
                        onClose(data);
                        this.shareFunc(selector);
                    });
                }
            });
        });
    }
    google({
        selector,
        url = window.location.href,
        title = '',
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => { },
        onClose = () => { },
    } = {}) {
        let owner;
        const h = 540;
        const w = 650;
        const { left, top } = Share.positon(h, w);
        const { url: gUrl, title: gTitle } = Share.encode({ url, title });
        $(document).on('click', selector, async () => {
            onClick();
            if (owner) return;
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    owner = window.open(
                        `https://plus.google.com/share?url=${gUrl}&t=${gTitle}`,
                        '_blank',
                        `location=yes,left=${left},top=${top},height=540,width=650,scrollbars=yes,status=yes`,
                    );
                    Share.detectWindow(owner).then((data) => {
                        owner = null;
                        onClose(data);
                        this.shareFunc(selector);
                    });
                }
            });
        });
    }
    reddit({
        selector,
        url = window.location.href,
        title = '',
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => { },
        onClose = () => { },
    } = {}) {
        let owner;
        const h = 540;
        const w = 650;
        const { left, top } = Share.positon(h, w);
        const { url: gUrl, title: gTitle } = Share.encode({ url, title });
        $(document).on('click', selector, async () => {
            onClick();
            if (owner) return;
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    owner = window.open(
                        `https://www.reddit.com/submit?url=${gUrl}&title=${gTitle}`,
                        '_blank',
                        `location=yes,left=${left},top=${top},height=540,width=650,scrollbars=yes,status=yes`,
                    );
                    Share.detectWindow(owner).then((data) => {
                        owner = null;
                        onClose(data);
                        this.shareFunc(selector);
                    });
                }
            });
        });
    }
    pinterest({
        selector,
        url,
        img,
        desc,
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => {},
    } = {}) {
        const fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById('pinterest-jssdk')) return;
        const js = document.createElement('script');
        js.id = 'pinterest-jssdk';
        js.src = '//assets.pinterest.com/js/pinit.js';
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = () => {
            $(document).on('click', selector, async () => {
                onClick();
                Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                    if (Share.loginState) {
                        PinUtils.pinAny(); // eslint-disable-line
                    }
                    if (img) {
                        PinUtils.pinOne({ // eslint-disable-line
                            media: img,
                            url,
                            description: desc,
                        });
                    } else {
	                    PinUtils.pinAny() // eslint-disable-line
                    }
                });
            });
        };
    }
    telegram({
        selector,
        url = window.location.href,
        desc = '',
        diyLogin = false, // 自定义登录
        isLogin = false, // 是否需要登录
        onClick = () => {},
        onClose = () => {},
    } = {}) {
        let owner;
        const h = 540;
        const w = 650;
        const { left, top } = Share.positon(h, w);
        const { url: gUrl, desc: gDesc } = Share.encode({ url, desc });
        $(document).on('click', selector, async () => {
            onClick();
            if (owner) return;
            Share.goLoginPage(isLogin, diyLogin, this.diyLoginCall).then(() => {
                if (Share.loginState) {
                    owner = window.open(
                        `https://telegram.me/share/url?url=${gUrl}&text=${gDesc}`,
                        '_blank',
                        `location=yes,left=${left},top=${top},height=540,width=650,scrollbars=yes,status=yes`,
                    );
                    Share.detectWindow(owner).then((data) => {
                        owner = null;
                        onClose(data);
                        this.shareFunc(selector);
                    });
                }
            });
        });
    }
}

export default Share;
