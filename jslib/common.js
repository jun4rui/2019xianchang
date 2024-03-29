var _SERVER = '//www.hnrcsc.com/api';

//查询url参数函数
//有则返回参数列表list
//没有则返回空串
function getParameters(inUrl/*完整的URL字符串*/) {
  //url中有?号才继续
  if (inUrl.indexOf('\?') >= 0) {
    return inUrl.substring(inUrl.indexOf('?') + 1).split('&');    //有则返回所有参数的list
  } else {
    return '';  //没有则返回''
  }
}

//获得url中某个参数的值
//有则返回参数的值
//没有则返回空串
function getParameterValue(inUrl/*输入Url*/, inName/*参数名*/) {
  var paraList = getParameters(inUrl);
  for (var i = 0; i < paraList.length; i++) {
    //如果没有'='则跳过
    if (paraList[i].indexOf('=') < 0) {
      continue;
    }
    //如果参数名=inName则返回参数值
    var tempVal = paraList[i].split('=');
    if (tempVal[0] == inName) {
      return tempVal[1];
    }
  }
  return '';
}

//TEST: getParameterValue('http://www.htyou.com/index.html?q=北京&asdf=123&zxcv=123&a=fasdf','q');

//检查浏览器版本
function checkBrowser() {
  var userAgent = navigator.userAgent,
      rMsie     = /(msie\s|trident.*rv:)([\w.]+)/,
      rFirefox  = /(firefox)\/([\w.]+)/,
      rOpera    = /(opera).+version\/([\w.]+)/,
      rChrome   = /(chrome)\/([\w.]+)/,
      rSafari   = /version\/([\w.]+).*(safari)/;
  var browser;
  var version;
  var ua        = userAgent.toLowerCase();

  function uaMatch(ua) {
    var match = rMsie.exec(ua);
    if (match != null) {
      return {browser: 'IE', version: match[2] || '0'};
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
      return {browser: match[1] || '', version: match[2] || '0'};
    }
    var match = rOpera.exec(ua);
    if (match != null) {
      return {browser: match[1] || '', version: match[2] || '0'};
    }
    var match = rChrome.exec(ua);
    if (match != null) {
      return {browser: match[1] || '', version: match[2] || '0'};
    }
    var match = rSafari.exec(ua);
    if (match != null) {
      return {browser: match[2] || '', version: match[1] || '0'};
    }
    /* 微信下面会报错导致后续的js都无法执行，Fuck！只能再无法解析后强制返回一个参数
     if (match != null) {
     return {browser: "", version: "0"};
     }*/
    return {browser: '', version: '0'};
  }

  var browserMatch = uaMatch(userAgent.toLowerCase());
  if (browserMatch.browser) {
    browser = browserMatch.browser;
    version = browserMatch.version;
  }

  return {
    'browser': browser,
    'version': version
  };
}

requirejs(['jquery'], function($) {
  //首先检查用户浏览器
  //根据浏览器结果判断是否调用提醒信息的函数
  var _browser = checkBrowser();
  if (_browser.browser === 'IE' && parseInt(_browser.version) < 8) {
    $('body').
        append('<div style="position: fixed;top: 0;left: 0;width: 100%;background-color: #FFD100;color: #4A4A4A;text-align: center;z-index: 9999999999;box-shadow: 0 1px 3px #CCC;opacity:0.9; line-height:28px;height:28px;">hi，您当前的浏览器版本过低，可能有安全风险，建议升级浏览器：<a href="https://www.google.cn/intl/zh-CN/chrome/browser/desktop/" target="_blank" style="color:#F00;opacity: 0.9;">谷歌Chrome</a> 或 <a href="http://www.uc.cn/ucbrowser/download/" target="_blank" style="color:#F00;">UC浏览器</a></div>');
  }
});

// 加载百度计数器
(function() {
  // 百度计数器脚本
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?d54225656d7eaddee0c32a6b5e36eee8';
    var s  = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
})();

/**
 * 页面卷动到指定位置的函数
 * inSelector: String 选择器
 */
var scrollTo = function(inSelector) {
  if (typeof ($) === 'function') {
    $('html,body').animate({
      scrollTop: $(inSelector).offset().top
    });
  }
};

/**
 * 将输入的字符串固定替换成指定符号
 * inStr: 输入字符串
 * inStartPos: 开始替换的位置，0开始
 * inReplaceNum: 替换字符个数
 * inChar: 用来替换的字符
 */
function strReplaceChar(inStr, inStartPos, inReplaceNum, inChar) {
  // 先判断输入是不是有值
  if (inStr === '' || inChar === '') return inStr;
  // 如果位置和长度大于字符串长度，则自动缩减到字符串末尾
  var _strList = inStr.split('');
  var _counter = 0;
  for (var i = 0; i < _strList.length; i++) {
    console.log(_strList[i], inStartPos, inReplaceNum);
    if (i > inStartPos && _counter < inReplaceNum) {
      _strList[i] = inChar;
      _counter++;
    }
  }
  return _strList.join('');
}

// 加载header
function addHeader() {
  $(document).ready(function() {
    $('body').prepend('<div id="header-section"></div>');
    $('#header-section').load('header.html');
  });
}

// 加载footer
function addFooter() {
  $(document).ready(function() {
    $('body').append('<div id="footer-section"></div>');
    $('#footer-section').load('footer.html');
  });
}

// 加载assistant
function addAssistant() {
  $(document).ready(function() {
    $('body').append('<div id="assistant-section"></div>');
    $('#assistant-section').load('assistant.html');
  });
}

// 跳转到页面顶部
function toPageTop() {
  requirejs(['jquery'], function($) {
    $('body,html').animate({scrollTop: 0}, 1000);
  });
}