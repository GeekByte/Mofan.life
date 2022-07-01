$(function () {
    // 判断是否为chome，如果不是则提示使用chrome或者下载chrome
    ischrome();
    //判断浏览器是否为edge浏览器，如果是则显示提示
    getBrowser();
}())

// 判断是否为chome，如果不是则提示使用chrome或者下载chrome
function ischrome() {
    var isChrome = navigator.userAgent.toLowerCase();
    if (!isChrome.match(/chrome/)) {
        nochrome();
    } else {
        var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
        function _mime(option, value) {
            var mimeTypes = navigator.mimeTypes;
            for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {
                    return true;
                }
            }
            return false;
        }
        // 判断你是否是360浏览器
        if(is360){
            nochrome();
        }
            // 是否为Edge浏览器
        /*        else if(navigator.userAgent.indexOf("Microsoft Edge")) {
                    nochrome();
                }*/
        else{
            yeschrome();
        }
    }
}

// 判断浏览器是否为edge浏览器，如果是则显示提示
function getBrowser(getVersion) {
    var ua_str = navigator.userAgent.toLowerCase(), ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
    if("ActiveXObject" in self){
        ie_aer_rv= (match_str = ua_str.match(/msie ([\d.]+)/)) ?match_str[1] :
            (match_str = ua_str.match(/rv:([\d.]+)/)) ?match_str[1] : 0;
        ie_Tridents = {"trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8};
        trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ?match_str[1] : undefined;
        browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
    }else{
        browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "edge" :
            (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
                (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
                    (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
                        (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
    }

    var verNum, verStr;
    verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];

    verStr = (getVersion != undefined) ? browser_chi_Type+"/"+verNum : browser_chi_Type;
    console.log(verStr);
    if(verStr == 'edge') {
        nochrome();
    }

}

// 显示浏览器版本提示
function nochrome() {
    var bodys = $('body');
    bodys.find('.dbw-login-container').remove();
    bodys.css('background','none');
    $('.dbw-internet-tips').show();
    $('.dbw-btn-download').click(function() {
        location.href='root/googlechromexp_49.0.2623.112.exe';
    });
}
// 隐藏浏览器版本提示
function yeschrome() {
    $('.dbw-internet-tips').hide();
}
