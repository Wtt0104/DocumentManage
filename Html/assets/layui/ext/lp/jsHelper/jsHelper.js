/**
 * js工具箱
 * 整理：xsq <yisan-sky@qq.com>
 * Date：2018-08-22 12:19:01
**/
top.$=window.$;
layui.define(['layer'], function (exports) {

    var $ = layui.$,
        layer = layui.layer;
    var helper = (function jsHelper() {
        var js = {
            $: $,
            newGuid: function () {
                var guid = "";
                for (var i = 1; i <= 32; i++) {
                    var n = Math.floor(Math.random() * 16).toString(16);
                    guid += n;
                    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                        guid += "-"
                    }
                }
                return guid
            },
            toDecimal: function (num) {
                if (num == null) {
                    num = "0"
                }
                num = num.toString().replace(/\$|\,/g, "");
                if (isNaN(num)) {
                    num = "0"
                }
                var sign = (num == (num = Math.abs(num)));
                num = Math.floor(num * 100 + 0.50000000001);
                var cents = num % 100;
                num = Math.floor(num / 100).toString();
                if (cents < 10) {
                    cents = "0" + cents
                }
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
                    num = num.substring(0, num.length - (4 * i + 3)) + "" + num.substring(num.length - (4 * i + 3))
                }
                return (((sign) ? "" : "-") + num + "." + cents)
            },
            /*千分位处理*/
            commafy: function (num) {
                if (num == null) {
                    num = "0"
                }
                if (isNaN(num)) {
                    return "0"
                }
                num = num + "";
                if (/^.*\..*$/.test(num)) {
                    varpointIndex = num.lastIndexOf(".");
                    varintPart = num.substring(0, pointIndex);
                    varpointPart = num.substring(pointIndex + 1, num.length);
                    intPart = intPart + "";
                    var re = /(-?\d+)(\d{3})/;
                    while (re.test(intPart)) {
                        intPart = intPart.replace(re, "$1,$2")
                    }
                    num = intPart + "." + pointPart
                } else {
                    num = num + "";
                    var re = /(-?\d+)(\d{3})/;
                    while (re.test(num)) {
                        num = num.replace(re, "$1,$2")
                    }
                }
                return num
            },
            isExistImg: function (pathImg) {
                if (!!pathImg) {
                    var ImgObj = new Image();
                    ImgObj.src = pathImg;
                    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            },
            isDebug: true,
            log: function () {
                if (learun.isDebug) {
                    console.log("=====>" + new Date().getTime() + "<=====");
                    var len = arguments.length;
                    for (var i = 0; i < len; i++) {
                        console.log(arguments[i])
                    }
                }
            },
            // newGuid: function () {
            //     var guid = "";
            //     for (var i = 1; i <= 32; i++) {
            //         var n = Math.floor(Math.random() * 16).toString(16);
            //         guid += n;
            //         if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
            //             guid += "-"
            //         }
            //     }
            //     return guid
            // },
            loading: function (isShow, _text) {
                var $loading = $("#lr_loading_bar");
                if (!!_text) {
                    js.language.get(_text, function (text) {
                        $("#lr_loading_bar_message").html(text)
                    })
                } else {
                    js.language.get("正在拼了命为您加载…", function (text) {
                        $("#lr_loading_bar_message").html(text)
                    })
                }
                if (isShow) {
                    $loading.show()
                } else {
                    $loading.hide()
                }
            },
            loadStyles: function (url) {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                document.getElementsByTagName("head")[0].appendChild(link)
            },
            iframe: function (Id, _frames) {
                if (_frames[Id] != undefined) {
                    if (_frames[Id].contentWindow != undefined) {
                        return _frames[Id].contentWindow
                    } else {
                        return _frames[Id]
                    }
                } else {
                    return null
                }
            },
            changeUrlParam: function (url, key, value) {
                var newUrl = "";
                var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
                var tmp = key + "=" + value;
                if (url.match(reg) != null) {
                    newUrl = url.replace(eval(reg), tmp)
                } else {
                    if (url.match("[?]")) {
                        newUrl = url + "&" + tmp
                    } else {
                        newUrl = url + "?" + tmp
                    }
                }
                return newUrl
            },
            // toDecimal: function (num) {
            //     if (num == null) {
            //         num = "0"
            //     }
            //     num = num.toString().replace(/\$|\,/g, "");
            //     if (isNaN(num)) {
            //         num = "0"
            //     }
            //     var sign = (num == (num = Math.abs(num)));
            //     num = Math.floor(num * 100 + 0.50000000001);
            //     var cents = num % 100;
            //     num = Math.floor(num / 100).toString();
            //     if (cents < 10) {
            //         cents = "0" + cents
            //     }
            //     for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
            //         num = num.substring(0, num.length - (4 * i + 3)) + "" + num.substring(num.length - (4 * i + 3))
            //     }
            //     return (((sign) ? "" : "-") + num + "." + cents)
            // },
            countFileSize: function (size) {
                if (size < 1024) {
                    return learun.toDecimal(size) + " 字节"
                } else {
                    if (size >= 1024 && size < 1048576) {
                        return learun.toDecimal(size / 1024) + " KB"
                    } else {
                        if (size >= 1048576 && size < 1073741824) {
                            return learun.toDecimal(size / 1024 / 1024) + " MB"
                        } else {
                            if (size >= 1073741824) {
                                return learun.toDecimal(size / 1024 / 1024 / 1024) + " GB"
                            }
                        }
                    }
                }
            },
            arrayCopy: function (data) {
                return $.map(data, function (obj) {
                    return $.extend(true, {}, obj)
                })
            },
            checkrow: function (id) {
                var isOK = true;
                if (id == undefined || id == "" || id == "null" || id == "undefined") {
                    isOK = false;
                    js.language.get("您没有选中任何数据项,请选中后再操作！", function (text) {
                        learun.alert.warning(text)
                    })
                }
                return isOK
            },
            alert: {
                success: function (msg) {
                    js.language.get(msg, function (text) {
                        toastr.success(text)
                    })
                },
                info: function (msg) {
                    js.language.get(msg, function (text) {
                        toastr.info(text)
                    })
                },
                warning: function (msg) {
                    js.language.get(msg, function (text) {
                        toastr.warning(text)
                    })
                },
                error: function (msg) {
                    js.language.get(msg, function (text) {
                        toastr.warning(msg)
                    })
                }
            },
            download: function (options) {
                var defaults = {
                    method: "GET",
                    url: "",
                    param: []
                };
                var options = $.extend(defaults, options);
                if (options.url && options.param) {
                    var $form = $('<form action="' + options.url + '" method="' + (options.method || "post") + '"></form>');
                    for (var key in options.param) {
                        var $input = $('<input type="hidden" />').attr("name", key).val(options.param[key]);
                        $form.append($input)
                    }
                    $form.appendTo("body").submit().remove()
                }
            },
            /*千分位处理*/
            // commafy: function (num) {
            //     if (num == null) {
            //         num = "0"
            //     }
            //     if (isNaN(num)) {
            //         return "0"
            //     }
            //     num = num + "";
            //     if (/^.*\..*$/.test(num)) {
            //         varpointIndex = num.lastIndexOf(".");
            //         varintPart = num.substring(0, pointIndex);
            //         varpointPart = num.substring(pointIndex + 1, num.length);
            //         intPart = intPart + "";
            //         var re = /(-?\d+)(\d{3})/;
            //         while (re.test(intPart)) {
            //             intPart = intPart.replace(re, "$1,$2")
            //         }
            //         num = intPart + "." + pointPart
            //     } else {
            //         num = num + "";
            //         var re = /(-?\d+)(\d{3})/;
            //         while (re.test(num)) {
            //             num = num.replace(re, "$1,$2")
            //         }
            //     }
            //     return num
            // },
            // isExistImg: function (pathImg) {
            //     if (!!pathImg) {
            //         var ImgObj = new Image();
            //         ImgObj.src = pathImg;
            //         if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
            //             return true
            //         } else {
            //             return false
            //         }
            //     } else {
            //         return false
            //     }
            // }
        };
        //http,browser,validator
        $.extend(js, {
            http: {
                isDebug: true,
                httpErrorLog: function (e) {
                    if (isDebug) {
                        console.log("=====>" + new Date().getTime() + "<=====");
                        var len = arguments.length;
                        for (var i = 0; i < len; i++) {
                            console.log(arguments[i])
                        }
                    }
                },
                httpCode: {
                    success: 200,
                    fail: 400,
                    exception: 500
                },
                err: {
                    code: 500,
                    info: "通信异常，请联系管理员！"
                },
                httpAsyncGet: function (url, callback) {
                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (g) {
                            if (g.code == js.http.httpCode.exception) {

                                js.http.httpErrorLog(g.info);
                                g.info = "系统异常，请联系管理员！"
                            }
                            callback(g)
                        },
                        error: function (i, h, g) {
                            js.http.httpErrorLog(h);
                            callback(this.error)
                        },
                        beforeSend: function () { },
                        complete: function () { }
                    })
                },
                httpGet: function (url, data) {
                    var f = {};
                    $.ajax({
                        url: url,
                        data: data,
                        type: "GET",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (h) {
                            if (h.code == js.http.httpCode.exception) {
                                js.http.httpErrorLog(h.info);
                                h.info = "系统异常，请联系管理员！"
                            }
                            f = h
                        },
                        error: function (j, i, h) {
                            js.http.httpErrorLog(i)
                        },
                        beforeSend: function () { },
                        complete: function () { }
                    });
                    return f
                },
                httpAsyncPost: function (url, data, callback) {
                    $.ajax({
                        url: url,
                        data: data,
                        type: "POST",
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (h) {
                            if (h.code == js.http.httpCode.exception) {
                                js.http.httpErrorLog(h.info);
                                h.info = "系统异常，请联系管理员！"
                            }
                            callback(h)
                        },
                        error: function (j, i, h) {
                            js.http.httpErrorLog(i);
                            callback(this.error)
                        },
                        beforeSend: function () { },
                        complete: function () { }
                    })
                },
                httpPost: function (url, data, callback) {
                    $.ajax({
                        url: url,
                        data: data,
                        type: "POST",
                        dataType: "json",
                        async: false,
                        cache: false,
                        success: function (h) {
                            if (h.code == js.http.httpCode.exception) {
                                js.http.httpErrorLog(h.info);
                                h.info = "系统异常，请联系管理员！"
                            }
                            callback(h)
                        },
                        error: function (j, i, h) {
                            js.http.httpErrorLog(i);
                            callback(this.error)
                        },
                        beforeSend: function () { },
                        complete: function () { }
                    })
                },
                httpAsync: function (type, url, data, callback) {
                    $.ajax({
                        url: url,
                        data: data,
                        type: type,
                        dataType: "json",
                        async: true,
                        cache: false,
                        success: function (i) {
                            // callback(i.data);
                            callback(i);
                            // console.log(i)
                            // if (i.code == js.http.httpCode.success) {
                            //     callback(i.data)
                            // } else {
                            //     js.http.httpErrorLog(i.info);
                            //     callback(null)
                            // }
                        },
                        error: function (k, j, i) {
                            js.http.httpErrorLog(j);
                            callback(null)
                        },
                        beforeSend: function () { },
                        complete: function () { }
                    })
                }
            },
            browser: {
                getProductName: function () {
                    var userAgent = navigator.userAgent;
                    var isOpera = userAgent.indexOf("Opera") > -1;
                    if (isOpera) {
                        return "Opera"
                    };
                    if (userAgent.indexOf("Firefox") > -1) {
                        return "FF";
                    }
                    if (userAgent.indexOf("Chrome") > -1) {
                        if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
                            return "Chrome";
                        } else {
                            return "360";
                        }
                    }
                    if (userAgent.indexOf("Safari") > -1) {
                        return "Safari";
                    }
                    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                        return "IE";
                    };

                },
                getQueryString: function (key) {
                    for (var c = location.search.slice(1).split("&"), a = 0; a < c.length; a++) {
                        var b = c[a].split("=");
                        if (b[0] == key) if ("undefined" == unescape(b[1])) break;
                        else return unescape(b[1])
                    }
                    return ""
                },
                changeUrlParam: function (url, key, value) {
                    var newUrl = "";
                    var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
                    var tmp = key + "=" + value;
                    if (url.match(reg) != null) {
                        newUrl = url.replace(eval(reg), tmp)
                    } else {
                        if (url.match("[?]")) {
                            newUrl = url + "&" + tmp
                        } else {
                            newUrl = url + "?" + tmp
                        }
                    }
                    return newUrl
                },
            },
            validator: {
                validReg: function (d, e, c) {
                    var f = {
                        code: true,
                        msg: ""
                    };
                    if (!e.test(d)) {
                        f.code = false;
                        f.msg = c
                    }
                    return f
                },
                validRegOrNull: function (d, e, c) {
                    var f = {
                        code: true,
                        msg: ""
                    };
                    if (d == null || d == undefined || d.length == 0) {
                        return f
                    }
                    if (!e.test(d)) {
                        f.code = false;
                        f.msg = c
                    }
                    return f
                },
                isNotNull: function (c) {
                    var d = {
                        code: true,
                        msg: ""
                    };
                    c = a.trim(c);
                    if (c == null || c == undefined || c.length == 0) {
                        d.code = false;
                        d.msg = "不能为空"
                    }
                    return d
                },
                isNum: function (c) {
                    return b.validator.validReg(c, /^[-+]?\d+$/, "必须为数字")
                },
                isNumOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^[-+]?\d+$/, "数字或空")
                },
                isEmail: function (c) {
                    return b.validator.validReg(c, /^\w{3,}@\w+(\.\w+)+$/, "必须为E-mail格式")
                },
                isEmailOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^\w{3,}@\w+(\.\w+)+$/, "必须为E-mail格式或空")
                },
                isEnglishStr: function (c) {
                    return b.validator.validReg(c, /^[a-z,A-Z]+$/, "必须为英文字符串")
                },
                isEnglishStrOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^[a-z,A-Z]+$/, "必须为英文字符串或空")
                },
                isTelephone: function (c) {
                    return b.validator.validReg(c, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, "必须为电话格式")
                },
                isTelephoneOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^(\d{3,4}\-)?[1-9]\d{6,7}$/, "必须为电话格式或空")
                },
                isMobile: function (c) {
                    return b.validator.validReg(c, /^(\+\d{2,3}\-)?\d{11}$/, "必须为手机格式")
                },
                isMobileOrnull: function (c) {
                    return b.validator.validRegOrNull(c, /^(\+\d{2,3}\-)?\d{11}$/, "必须为手机格式或空")
                },
                isMobileOrPhone: function (c) {
                    var d = {
                        code: true,
                        msg: ""
                    };
                    if (!b.validator.isTelephone(c).code && !b.validator.isMobile(c).code) {
                        d.code = false;
                        d.msg = "为电话格式或手机格式"
                    }
                    return d
                },
                isMobileOrPhoneOrNull: function (c) {
                    var d = {
                        code: true,
                        msg: ""
                    };
                    if (b.validator.isNotNull(c).code && !b.validator.isTelephone(c).code && !b.validator.isMobile(c).code) {
                        d.code = false;
                        d.msg = "为电话格式或手机格式或空"
                    }
                    return d
                },
                isUri: function (c) {
                    return b.validator.validReg(c, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, "必须为网址格式")
                },
                isUriOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, "必须为网址格式或空")
                },
                isDate: function (c) {
                    return b.validator.validReg(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, "必须为日期格式")
                },
                isDateOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/, "必须为日期格式或空")
                },
                isDateTime: function (c) {
                    return b.validator.validReg(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, "必须为日期时间格式")
                },
                isDateTimeOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, "必须为日期时间格式")
                },
                isTime: function (c) {
                    return b.validator.validReg(c, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, "必须为时间格式")
                },
                isTimeOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/, "必须为时间格式或空")
                },
                isChinese: function (c) {
                    return b.validator.validReg(c, /^[\u0391-\uFFE5]+$/, "必须为中文")
                },
                isChineseOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^[\u0391-\uFFE5]+$/, "必须为中文或空")
                },
                isZip: function (c) {
                    return b.validator.validReg(c, /^\d{6}$/, "必须为邮编格式")
                },
                isZipOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^\d{6}$/, "必须为邮编格式或空")
                },
                isDouble: function (c) {
                    return b.validator.validReg(c, /^[-\+]?\d+(\.\d+)?$/, "必须为小数")
                },
                isDoubleOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^[-\+]?\d+(\.\d+)?$/, "必须为小数或空")
                },
                isIDCard: function (c) {
                    return b.validator.validReg(c, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, "必须为身份证格式")
                },
                isIDCardOrNull: function (c) {
                    return b.validator.validRegOrNull(c, /^\d{15}(\d{2}[A-Za-z0-9;])?$/, "必须为身份证格式或空")
                },
                isIP: function (d) {
                    var f = {
                        code: true,
                        msg: ""
                    };
                    var e = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
                    var c = false;
                    if (e.test(d)) {
                        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                            c = true
                        }
                    }
                    if (!c) {
                        f.code = false;
                        f.msg = "必须为IP格式"
                    }
                    return f
                },
                isIPOrNull: function (c) {
                    var d = {
                        code: true,
                        msg: ""
                    };
                    if (b.validator.isNotNull(c) && !b.validator.isIP(c).code) {
                        d.code = false;
                        d.msg = "必须为IP格式或空"
                    }
                    return d
                },
                isLenNum: function (d, c) {
                    var f = {
                        code: true,
                        msg: ""
                    };
                    var e = /^[0-9]+$/;
                    d = a.trim(d);
                    if (d.length > c || !e.test(d)) {
                        f.code = false;
                        f.msg = "必须为" + c + "位数字"
                    }
                    return f
                },
                isLenNumOrNull: function (d, c) {
                    var e = {
                        code: true,
                        msg: ""
                    };
                    if (b.validator.isNotNull(d).code && !b.validator.isLenNum(d)) {
                        e.code = false;
                        e.msg = "必须为" + c + "位数字或空"
                    }
                    return e
                },
                isLenStr: function (d, c) {
                    var e = {
                        code: true,
                        msg: ""
                    };
                    d = a.trim(d);
                    if (!b.validator.isNotNull(d).code || d.length > c) {
                        e.code = false;
                        e.msg = "必须小于等于" + c + "位字符"
                    }
                    return e
                },
                isLenStrOrNull: function (d, c) {
                    var e = {
                        code: true,
                        msg: ""
                    };
                    d = a.trim(d);
                    if (b.validator.isNotNull(d).code && d.length > c) {
                        e.code = false;
                        e.msg = "必须小于等于" + c + "位字符或空"
                    }
                    return e
                }
            }

        });
        //top.learun.language
        (function (a, c) {
            var h = "no";
            var e = {};
            var f = null;
            var b = {};
            var d = {};
            var g = {
                get: function (i) {
                    if (localStorage) {
                        return JSON.parse(localStorage.getItem("lrlg_" + i)) || {}
                    } else {
                        return d[i] || {}
                    }
                },
                set: function (j, i) {
                    if (localStorage) {
                        localStorage.setItem("lrlg_" + j, JSON.stringify(i))
                    } else {
                        d[j] = i
                    }
                }
            };
            c.language = {
                getMainCode: function () {
                    return f
                },
                get: function (l, i) {
                    if (h != f) {
                        if (b[h] && b[f]) {
                            var k = g.get(f);
                            var j = g.get(h);
                            i(j.data[k.data[l]] || l)
                        } else {
                            setTimeout(function () {
                                c.language.get(l, i)
                            }, 200)
                        }
                    } else {
                        i(l)
                    }
                },
                getSyn: function (k) {
                    if (h != f) {
                        var j = g.get(f);
                        var i = g.get(h);
                        return i.data[j.data[k]] || k
                    } else {
                        return k
                    }
                }
            };

            
        })($, js);

        $.extend(js, {
            layerConfirm: function (c, d) {
                console.log(22);
                js.language.get(c, function (e) {
                    console.log(22);
                    top.layer.confirm(e, {
                        btn: ["确认", "取消"],
                        title: "提示",
                        icon: 0,
                        success: function (g, f) {
                            g.find(".layui-layer-btn a").each(function () {
                                var h = $(this);
                                var i = h.text();
                                top.learun.language.get(i, function (j) {
                                    h.text(j)
                                })
                            });
                            g.find(".layui-layer-title").each(function () {
                                var h = a(this);
                                var i = h.text();
                                top.learun.language.get(i, function (j) {
                                    h.text(j)
                                })
                            })
                        },
                    }, function (f) {
                        d(true, f)
                    }, function (f) {
                        d(false, f);
                        top.layer.close(f)
                    })
                })
            },
            layerForm: function (d) {
                var c = {
                    id: null,
                    title: "系统窗口",
                    width: 550,
                    height: 400,
                    url: "error",
                    btn: ["确认", "关闭"],
                    callBack: false,
                    maxmin: false,
                    end: false,
                };
                $.extend(c, d || {});
                c.width = c.width > $(window).width() ? $(window).width() - 10 : c.width;
                c.height = c.height > $(window).height() ? $(window).height() - 10 : c.height;
                //layer.msg('ok');
                
                var e=layer.open({
                    //id: c.id,
                    maxmin: c.maxmin,
                    type: 2,
                    title: c.title,
                    area: [c.width + "px", c.height + "px"],
                    btn: c.btn,
                    content: d.url,
                    skin: c.btn == null ? "lr-layer-nobtn" : "lr-layer",
                    zIndex: layer.zIndex, //重点1
                    success: function (g, f) {
                        //top["layer_" + c.id] = b.iframe($(g).find("iframe").attr("id"), top.frames);
                        //g[0].learun_layerid = "layer_" + c.id;
                        //if (!!c.btn && g.find(".lr-layer-btn-cb").length == 0) {
                        //    top.learun.language.get("确认并关闭窗口", function (h) {
                        //        g.find(".layui-layer-btn").append('<div class="checkbox lr-layer-btn-cb" myIframeId="layer_' + c.id + '" ><label><input checked="checked" type="checkbox" >' + h + "</label></div>")
                        //    });
                        //    g.find(".layui-layer-btn a").each(function () {
                        //        var h = $(this);
                        //        var i = h.text();
                        //        top.learun.language.get(i, function (j) {
                        //            h.text(j)
                        //        })
                        //    })
                        //}
                        //g.find(".layui-layer-title").each(function () {
                        //    var h = $(this);
                        //    var i = h.text();
                        //    top.learun.language.get(i, function (j) {
                        //        h.text(j)
                        //    })
                        //})
                    },
                    yes: function (g) {
                        //var f = true;
                        //if (!!c.callBack) {
                        //    f = c.callBack("layer_" + c.id)
                        //}
                        //if (!!f) {
                        //    b.layerClose("", g)
                        //}
                    },
                    end: function () {
                        //top["layer_" + c.id] = null;
                        //if (!!c.end) {
                        //    c.end()
                        //}
                    }
                })
            },
            layerClose: function (h, e) {
                var d;
                if (!!e) {
                    d = e
                } else {
                    d = top.layer.getFrameIndex(h)
                }
                var g = top.$("#layui-layer" + d);
                var c = g.find(".layui-layer-btn").find(".lr-layer-btn-cb input");
                var f = c.is(":checked");
                if (c.length == 0) {
                    f = true
                }
                if (f) {
                    top.layer.close(d)
                } else {
                    top[g[0].learun_layerid].location.reload()
                }
            }
        });

        return js;
    })();

    //$ 扩展 mousewheel
    if (typeof ($.fn.mousewheel) == undefined || $.fn.lrscroll == null) {
        (function (l,t,o) {
            var m = l([]),
                q = l.resize = l.extend(l.resize, {}),
                u, w = "setTimeout",
                v = "resize",
                p = v + "-special-event",
                n = "delay",
                r = "throttleWindow";
            q[n] = 250;
            q[r] = true;
            l.event.special[v] = {
                setup: function () {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var a = l(this);
                    m = m.add(a);
                    l.data(this, p, {
                        w: a.width(),
                        h: a.height()
                    });
                    if (m.length === 1) {
                        s()
                    }
                },
                teardown: function () {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var a = l(this);
                    m = m.not(a);
                    a.removeData(p);
                    if (!m.length) {
                        clearTimeout(u)
                    }
                },
                add: function (a) {
                    if (!q[r] && this[w]) {
                        return false
                    }
                    var c;

                    function b(h, d, e) {
                        var f = l(this),
                            g = l.data(this, p);
                        g.w = d !== o ? d : f.width();
                        g.h = e !== o ? e : f.height();
                        c.apply(this, arguments)
                    }
                    if (l.isFunction(a)) {
                        c = a;
                        return b
                    } else {
                        c = a.handler;
                        a.handler = b
                    }
                }
            };

            function s() {
                u = t[w](function () {
                    m.each(function () {
                        var c = l(this),
                            b = c.width(),
                            a = c.height(),
                            d = l.data(this, p);
                        if (b !== d.w || a !== d.h) {
                            c.trigger(v, [d.w = b, d.h = a])
                        }
                    });
                    s()
                }, q[n])
            }
        })($,window);
        //wheel
        (function (a) {
            var l = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                k = ("onwheel" in document || document.documentMode >= 9) ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                h = Array.prototype.slice,
                f, d;
            if (a.event.fixHooks) {
                for (var c = l.length; c;) {
                    a.event.fixHooks[l[--c]] = a.event.mouseHooks
                }
            }
            var j = a.event.special.mousewheel = {
                setup: function () {
                    if (this.addEventListener) {
                        for (var m = k.length; m;) {
                            this.addEventListener(k[--m], b, false)
                        }
                    } else {
                        this.onmousewheel = b
                    }
                    a.data(this, "mousewheel-line-height", j.getLineHeight(this));
                    a.data(this, "mousewheel-page-height", j.getPageHeight(this))
                },
                teardown: function () {
                    if (this.removeEventListener) {
                        for (var m = k.length; m;) {
                            this.removeEventListener(k[--m], b, false)
                        }
                    } else {
                        this.onmousewheel = null
                    }
                },
                getLineHeight: function (i) {
                    return parseInt(a(i)["offsetParent" in a.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
                },
                getPageHeight: function (i) {
                    return a(i).height()
                },
                settings: {
                    adjustOldDeltas: true
                }
            };
            a.fn.extend({
                mousewheel: function (i) {
                    return i ? this.bind("mousewheel", i) : this.trigger("mousewheel")
                },
                unmousewheel: function (i) {
                    return this.unbind("mousewheel", i)
                }
            });

            function b(q) {
                var s = q || window.event,
                    m = h.call(arguments, 1),
                    n = 0,
                    o = 0,
                    p = 0,
                    i = 0;
                q = a.event.fix(s);
                q.type = "mousewheel";
                if ("detail" in s) {
                    p = s.detail * -1
                }
                if ("wheelDelta" in s) {
                    p = s.wheelDelta
                }
                if ("wheelDeltaY" in s) {
                    p = s.wheelDeltaY
                }
                if ("wheelDeltaX" in s) {
                    o = s.wheelDeltaX * -1
                }
                if ("axis" in s && s.axis === s.HORIZONTAL_AXIS) {
                    o = p * -1;
                    p = 0
                }
                n = p === 0 ? o : p;
                if ("deltaY" in s) {
                    p = s.deltaY * -1;
                    n = p
                }
                if ("deltaX" in s) {
                    o = s.deltaX;
                    if (p === 0) {
                        n = o * -1
                    }
                }
                if (p === 0 && o === 0) {
                    return
                }
                if (s.deltaMode === 1) {
                    var r = a.data(this, "mousewheel-line-height");
                    n *= r;
                    p *= r;
                    o *= r
                } else {
                    if (s.deltaMode === 2) {
                        var t = a.data(this, "mousewheel-page-height");
                        n *= t;
                        p *= t;
                        o *= t
                    }
                }
                i = Math.max(Math.abs(p), Math.abs(o));
                if (!d || i < d) {
                    d = i;
                    if (g(s, i)) {
                        d /= 40
                    }
                }
                if (g(s, i)) {
                    n /= 40;
                    o /= 40;
                    p /= 40
                }
                n = Math[n >= 1 ? "floor" : "ceil"](n / d);
                o = Math[o >= 1 ? "floor" : "ceil"](o / d);
                p = Math[p >= 1 ? "floor" : "ceil"](p / d);
                q.deltaX = o;
                q.deltaY = p;
                q.deltaFactor = d;
                q.deltaMode = 0;
                m.unshift(q, n, o, p);
                if (f) {
                    clearTimeout(f)
                }
                f = setTimeout(e, 200);
                return (a.event.dispatch || a.event.handle).apply(this, m)
            }
            function e() {
                d = null
            }
            function g(m, i) {
                return j.settings.adjustOldDeltas && m.type === "mousewheel" && i % 120 === 0
            }
        })($);
    }
    //$ 扩展 scroll
    if (typeof ($.lrscroll) == undefined || $.lrscroll == null) {
        layui.link(layui.cache.base + 'lp/jsHelper/jsScroll.css');
        //lrscroll
        (function (a, c) {
            var b = null;
            var d = {
                init: function (j, l) {
                    var o = j.attr("id");
                    if (!o) {
                        o = "lr_" + c.newGuid();
                        j.attr("id", o)
                    }
                    j.addClass("lr-scroll-wrap");
                    var f = j.children();
                    var i = a('<div class="lr-scroll-box" id="' + o + '_box" ></div>');
                    j.append(i);
                    i.append(f);
                    var k = a('<div class="lr-scroll-vertical"   ><div class="lr-scroll-vertical-block" id="' + o + '_vertical"></div></div>');
                    j.append(k);
                    var g = a('<div class="lr-scroll-horizontal" ><div class="lr-scroll-horizontal-block" id="' + o + '_horizontal"></div></div>');
                    j.append(g);
                    if (b === null) {
                        b = a('<div style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;cursor: pointer;" ></div>');
                        a("body").append(b)
                    }
                    var p = i.innerHeight();
                    var q = i.innerWidth();
                    var n = j.height();
                    var r = j.width();
                    var m = {
                        id: o,
                        sy: 0,
                        sx: 0,
                        sh: p,
                        sw: q,
                        h: n,
                        w: r,
                        yh: 0,
                        xw: 0,
                        callback: l
                    };
                    j[0].op = m;
                    d.update(j);
                    d.bindEvent(j, i, k, g);
                    i = null;
                    f = null;
                    k = null;
                    g = null;
                    j = null
                },
                bindEvent: function (h, g, i, f) {
                    h.resize(function () {
                        var j = a(this);
                        var l = j[0].op;
                        var k = j.height();
                        var m = j.width();
                        if (k != l.h) {
                            l.h = k;
                            d.updateY(j)
                        }
                        if (m != l.w) {
                            l.w = m;
                            d.updateX(j)
                        }
                        j = null
                    });
                    g.resize(function () {
                        var k = a(this);
                        var j = k.parent();
                        var l = j[0].op;
                        var m = k.innerHeight();
                        var n = k.innerWidth();
                        if (m != l.sh) {
                            l.sh = m;
                            d.updateY(j)
                        }
                        if (n != l.sw) {
                            l.sw = n;
                            d.updateX(j)
                        }
                        k = null;
                        j = null
                    });
                    h.mousewheel(function (o, l, m, n) {
                        var j = a(this);
                        var p = j[0].op;
                        var k = l * 4;
                        if (p.sh > p.h) {
                            p.oldsy = p.sy;
                            p.sy = p.sy - k;
                            d.moveY(j, true);
                            j = null;
                            return false
                        } else {
                            if (p.sw > p.w) {
                                p.oldsx = p.sx;
                                p.sx = p.sx - k;
                                d.moveX(j, true);
                                j = null;
                                return false
                            }
                        }
                    });
                    i.find(".lr-scroll-vertical-block").on("mousedown", function (k) {
                        b.show();
                        var j = a(this).parent().parent();
                        var l = j[0].op;
                        l.isYMousedown = true;
                        l.yMousedown = k.pageY;
                        j.addClass("lr-scroll-active");
                        j = null
                    });
                    f.find(".lr-scroll-horizontal-block").on("mousedown", function (k) {
                        b.show();
                        var j = a(this).parent().parent();
                        var l = j[0].op;
                        l.isXMousedown = true;
                        l.xMousedown = k.pageX;
                        j.addClass("lr-scroll-active");
                        j = null
                    });
                    //top.
                    $(document).on("mousemove", {
                        $obj: h
                    }, function (l) {
                        var m = l.data.$obj[0].op;
                        if (m.isYMousedown) {
                            var o = l.pageY;
                            var k = o - m.yMousedown;
                            m.yMousedown = o;
                            m.oldsy = m.sy;
                            m.blockY = m.blockY + k;
                            if ((m.blockY + m.yh) > m.h) {
                                m.blockY = m.h - m.yh
                            }
                            if (m.blockY < 0) {
                                m.blockY = 0
                            }
                            d.getY(m);
                            d.moveY(l.data.$obj)
                        } else {
                            if (m.isXMousedown) {
                                var m = l.data.$obj[0].op;
                                var n = l.pageX;
                                var j = n - m.xMousedown;
                                m.xMousedown = n;
                                m.oldsx = m.sx;
                                m.blockX = m.blockX + j;
                                if ((m.blockX + m.xw) > m.w) {
                                    m.blockX = m.w - m.xw
                                }
                                if (m.blockX < 0) {
                                    m.blockX = 0
                                }
                                d.getX(m);
                                d.moveX(l.data.$obj)
                            }
                        }
                    }).on("mouseup", {
                        $obj: h
                    }, function (j) {
                        j.data.$obj[0].op.isYMousedown = false;
                        j.data.$obj[0].op.isXMousedown = false;
                        b.hide();
                        j.data.$obj.removeClass("lr-scroll-active")
                    })
                },
                update: function (f) {
                    d.updateY(f);
                    d.updateX(f)
                },
                updateY: function (g) {
                    var k = g[0].op;
                    var f = g.find("#" + k.id + "_box");
                    var h = g.find("#" + k.id + "_vertical");
                    if (k.sh > k.h) {
                        if ((k.sh - k.sy) < k.h) {
                            var i = 0;
                            k.sy = k.sh - k.h;
                            if (k.sy < 0) {
                                k.sy = 0
                            } else {
                                i = 0 - k.sy
                            }
                            f.css("top", i + "px")
                        }
                        var l = parseInt(k.h * k.h / k.sh);
                        l = (l < 30 ? 30 : l);
                        k.yh = l;
                        var j = parseInt(k.sy * (k.h - l) / (k.sh - k.h));
                        if ((j + l) > k.h) {
                            j = k.h - l
                        }
                        if (j < 0) {
                            j = 0
                        }
                        k.blockY = j;
                        h.css({
                            top: j + "px",
                            height: l + "px"
                        })
                    } else {
                        k.blockY = 0;
                        k.sy = 0;
                        f.css("top", "0px");
                        h.css({
                            top: "0px",
                            height: "0px"
                        })
                    }
                    k.callback && k.callback(k.sx, k.sy);
                    f = null;
                    h = null
                },
                updateX: function (h) {
                    var k = h[0].op;
                    var g = h.find("#" + k.id + "_box");
                    var f = h.find("#" + k.id + "_horizontal");
                    if (k.sw > k.w) {
                        if ((k.sw - k.sx) < k.w) {
                            var i = 0;
                            k.sx = k.sw - k.w;
                            if (k.sx < 0) {
                                k.sx = 0
                            } else {
                                i = 0 - k.sx
                            }
                            g.css("left", i + "px")
                        }
                        var l = parseInt(k.w * k.w / k.sw);
                        l = (l < 30 ? 30 : l);
                        k.xw = l;
                        var j = parseInt(k.sx * (k.w - l) / (k.sw - k.w));
                        if ((j + l) > k.w) {
                            j = k.w - l
                        }
                        if (j < 0) {
                            j = 0
                        }
                        k.blockX = j;
                        f.css({
                            left: j + "px",
                            width: l + "px"
                        })
                    } else {
                        k.sx = 0;
                        k.blockX = 0;
                        g.css("left", "0px");
                        f.css({
                            left: "0px",
                            width: "0px"
                        })
                    }
                    k.callback && k.callback(k.sx, k.sy);
                    g = null;
                    f = null
                },
                moveY: function (g, k) {
                    var l = g[0].op;
                    var f = g.find("#" + l.id + "_box");
                    var h = g.find("#" + l.id + "_vertical");
                    var i = 0;
                    if (l.sy < 0) {
                        l.sy = 0
                    } else {
                        if (l.sy + l.h > l.sh) {
                            l.sy = l.sh - l.h;
                            i = 0 - l.sy
                        } else {
                            i = 0 - l.sy
                        }
                    }
                    if (k) {
                        var j = d.getBlockY(l);
                        if (j == 0 && l.sy != 0) {
                            l.sy = 0;
                            i = 0
                        }
                        l.blockY = j;
                        f.css({
                            top: i + "px"
                        });
                        h.css({
                            top: j + "px"
                        })
                    } else {
                        f.css({
                            top: i + "px"
                        });
                        h.css({
                            top: l.blockY + "px"
                        })
                    }
                    l.callback && l.callback(l.sx, l.sy);
                    f = null;
                    h = null
                },
                moveX: function (h, k) {
                    var l = h[0].op;
                    var g = h.find("#" + l.id + "_box");
                    var f = h.find("#" + l.id + "_horizontal");
                    var i = 0;
                    if (l.sx < 0) {
                        l.sx = 0
                    } else {
                        if (l.sx + l.w > l.sw) {
                            l.sx = l.sw - l.w;
                            i = 0 - l.sx
                        } else {
                            i = 0 - l.sx
                        }
                    }
                    if (k) {
                        var j = d.getBlockX(l);
                        if (j == 0 && l.sx != 0) {
                            l.sx = 0;
                            i = 0
                        }
                        l.blockX = j;
                        g.css({
                            left: i + "px"
                        });
                        f.css({
                            left: j + "px"
                        })
                    } else {
                        g.css({
                            left: i + "px"
                        });
                        f.css({
                            left: l.blockX + "px"
                        })
                    }
                    l.callback && l.callback(l.sx, l.sy);
                    g = null;
                    f = null
                },
                getBlockY: function (g) {
                    var f = parseFloat(g.sy * (g.h - g.yh) / (g.sh - g.h));
                    if ((f + g.yh) > g.h) {
                        f = g.h - g.yh
                    }
                    if (f < 0) {
                        f = 0
                    }
                    return f
                },
                getY: function (f) {
                    f.sy = parseInt(f.blockY * (f.sh - f.h) / (f.h - f.yh));
                    if ((f.sy + f.h) > f.sh) {
                        f.sy = f.sh - f.h
                    }
                    if (f.sy < 0) {
                        f.sy = 0
                    }
                },
                getBlockX: function (g) {
                    var f = parseFloat(g.sx * (g.w - g.xw) / (g.sw - g.w));
                    if ((f + g.xw) > g.w) {
                        f = g.w - g.xw
                    }
                    if (f < 0) {
                        f = 0
                    }
                    return f
                },
                getX: function (f) {
                    f.sx = parseInt(f.blockX * (f.sw - f.w) / (f.w - f.xw));
                    if ((f.sx + f.w) > f.sw) {
                        f.sx = f.sw - f.w
                    }
                    if (f.sx < 0) {
                        f.sx = 0
                    }
                },
            };
            a.fn.lrscroll = function (f) {
                a(this).each(function () {
                    var g = a(this);
                    d.init(g, f)
                })
            };
            a.fn.lrscrollSet = function (h, g) {
                switch (h) {
                    case "moveRight":
                        var f = a(this);
                        setTimeout(function () {
                            var i = f[0].op;
                            i.oldsx = i.sx;
                            i.sx = i.sw - i.w;
                            d.moveX(f, true);
                            f = null
                        }, 250);
                        break;
                    case "moveBottom":
                        var f = a(this);
                        setTimeout(function () {
                            var i = f[0].op;
                            i.oldsy = i.sx;
                            i.sy = i.sh - i.h;
                            d.moveY(f, true);
                            f = null
                        }, 250);
                        break
                }
            }
        })($, helper);
    }

    //$扩展date
    if (typeof ($.DateAdd) == undefined || $.DateAdd == null) {
    (function (a, b) {
        a.extend(b, {
            parseDate: function (d) {
                var c;
                if (d.indexOf("/Date(") > -1) {
                    c = new Date(parseInt(d.replace("/Date(", "").replace(")/", ""), 10))
                } else {
                    c = new Date(Date.parse(d.replace(/-/g, "/").replace("T", " ").split(".")[0]))
                }
                return c
            },
            formatDate: function (h, e) {
                if (!h) {
                    return ""
                }
                var c = h;
                if (typeof h === "string") {
                    if (h.indexOf("/Date(") > -1) {
                        c = new Date(parseInt(h.replace("/Date(", "").replace(")/", ""), 10))
                    } else {
                        c = new Date(Date.parse(h.replace(/-/g, "/").replace("T", " ").split(".")[0]))
                    }
                }
                var g = {
                    "M+": c.getMonth() + 1,
                    "d+": c.getDate(),
                    "h+": c.getHours(),
                    "m+": c.getMinutes(),
                    "s+": c.getSeconds(),
                    "q+": Math.floor((c.getMonth() + 3) / 3),
                    S: c.getMilliseconds()
                };
                if (/(y+)/.test(e)) {
                    e = e.replace(RegExp.$1, (c.getFullYear() + "").substr(4 - RegExp.$1.length))
                }
                for (var f in g) {
                    if (new RegExp("(" + f + ")").test(e)) {
                        e = e.replace(RegExp.$1, RegExp.$1.length == 1 ? g[f] : ("00" + g[f]).substr(("" + g[f]).length))
                    }
                }
                return e
            },
            getDate: function (c, g, e) {
                var d = new Date();
                if (!!g) {
                    d = d.DateAdd(g, e)
                }
                var f = b.formatDate(d, c);
                return f
            },
            getMonth: function () {
                var e = {
                    begin: "",
                    end: ""
                };
                var c = b.parseDate(b.formatDate(new Date(), "yyyy-MM-01"));
                var d = c.DateAdd("m", 1).DateAdd("d", -1);
                e.begin = b.formatDate(c, "yyyy-MM-dd 00:00:00");
                e.end = b.formatDate(d, "yyyy-MM-dd 23:59:59");
                return e
            },
            getPreMonth: function () {
                var e = {
                    begin: "",
                    end: ""
                };
                var c = b.parseDate(b.formatDate(new Date(), "yyyy-MM-01"));
                var d = c.DateAdd("d", -1);
                e.begin = b.formatDate(d, "yyyy-MM-01 00:00:00");
                e.end = b.formatDate(d, "yyyy-MM-dd 23:59:59");
                return e
            },
            getCurrentQuarter: function () {
                var c = new Date();
                return b.getQuarter(c.getFullYear(), c.getMonth())
            },
            getPreQuarter: function () {
                var c = new Date().DateAdd("q", -1);
                return b.getQuarter(c.getFullYear(), c.getMonth())
            },
            getQuarter: function (e, c) {
                var d = {
                    begin: "",
                    end: ""
                };
                switch (c) {
                    case 0:
                    case 1:
                    case 2:
                        d.begin = e + "-01-01 00:00:00";
                        d.end = e + "-03-31 23:59:59";
                        break;
                    case 3:
                    case 4:
                    case 5:
                        d.begin = e + "-04-01 00:00:00";
                        d.end = e + "-06-30 23:59:59";
                        break;
                    case 6:
                    case 7:
                    case 8:
                        d.begin = e + "-07-01 00:00:00";
                        d.end = e + "-09-30 23:59:59";
                        break;
                    case 9:
                    case 10:
                    case 11:
                        d.begin = e + "-10-01 00:00:00";
                        d.end = e + "-12-31 23:59:59";
                        break
                }
                return d
            },
            getYear: function () {
                var c = new Date();
                var d = {
                    begin: "",
                    end: ""
                };
                var e = c.getFullYear();
                d.begin = e + "-01-01 00:00:00";
                d.end = e + "-12-31 23:59:59";
                return d
            },
            getPreYear: function () {
                var c = new Date();
                var d = {
                    begin: "",
                    end: ""
                };
                var e = c.getFullYear() - 1;
                d.begin = e + "-01-01 00:00:00";
                d.end = e + "-12-31 23:59:59";
                return d
            },
            getFirstHalfYear: function () {
                var c = new Date();
                var d = {
                    begin: "",
                    end: ""
                };
                var e = c.getFullYear();
                d.begin = e + "-01-01 00:00:00";
                d.end = e + "-06-30 23:59:59";
                return d
            },
            getSecondHalfYear: function () {
                var c = new Date();
                var d = {
                    begin: "",
                    end: ""
                };
                var e = c.getFullYear();
                d.begin = e + "-07-01 00:00:00";
                d.end = e + "-12-31 23:59:59";
                return d
            }
        });
        Date.prototype.DateAdd = function (e, d) {
            var c = this;
            switch (e) {
                case "s":
                    return new Date(Date.parse(c) + (1000 * d));
                case "n":
                    return new Date(Date.parse(c) + (60000 * d));
                case "h":
                    return new Date(Date.parse(c) + (3600000 * d));
                case "d":
                    return new Date(Date.parse(c) + (86400000 * d));
                case "w":
                    return new Date(Date.parse(c) + ((86400000 * 7) * d));
                case "q":
                    return new Date(c.getFullYear(), (c.getMonth()) + d * 3, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());
                case "m":
                    return new Date(c.getFullYear(), (c.getMonth()) + d, c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());
                case "y":
                    return new Date((c.getFullYear() + d), c.getMonth(), c.getDate(), c.getHours(), c.getMinutes(), c.getSeconds())
            }
        };
        Date.prototype.DateDiff = function (e, c) {
            var d = this;
            if (typeof c == "string") {
                c = b.parseDate(c)
            }
            switch (e) {
                case "s":
                    return parseInt((c - d) / 1000);
                case "n":
                    return parseInt((c - d) / 60000);
                case "h":
                    return parseInt((c - d) / 3600000);
                case "d":
                    return parseInt((c - d) / 86400000);
                case "w":
                    return parseInt((c - d) / (86400000 * 7));
                case "m":
                    return (c.getMonth() + 1) + ((c.getFullYear() - d.getFullYear()) * 12) - (d.getMonth() + 1);
                case "y":
                    return c.getFullYear() - d.getFullYear()
            }
        };
        Date.prototype.MaxDayOfDate = function () {
            var f = this;
            var c = f.toArray();
            var d = (new Date(c[0], c[1] + 1, 1));
            var e = d.DateAdd("m", 1);
            var g = dateDiff(d.Format("yyyy-MM-dd"), e.Format("yyyy-MM-dd"));
            return g
        };
        Date.prototype.isLeapYear = function () {
            return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)))
        }
    })($, helper);
    }
    exports('jsHelper', helper);
});