/**
 * 倒计时模块
 * @author zym
 * @version 1.0
 * @since 2016-02-03
 */

define(function(require, exports, module) {
    //设置Cookie的方法集合
    var Cookie = {
        add:function(name,value,expiresHours){
            var cookieString=name+"="+escape(value);
            //判断是否设置过期时间,0代表关闭浏览器时失效
            if(expiresHours>0){
                var date=new Date();
                date.setTime(date.getTime()+expiresHours*1000);
                cookieString=cookieString+";expires=" + date.toUTCString();
            }
            document.cookie=cookieString;
        },
        edit:function(name,value,expiresHours){
            var cookieString=name+"="+escape(value);
            if(expiresHours>0){
                var date=new Date();
                date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
                cookieString=cookieString+";expires=" + date.toGMTString();
            }
            document.cookie=cookieString;
        },
        get: function(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr) {
                return window.unescape(arr[2]);
            }
            return '';
        }
    };



    var Timer = function(options) {
        this.settings = $.extend({}, Timer.defaults, options);
        this.init();
    };

    Timer.prototype = {
        /**
         * 初始化
         */
        init : function() {
            this.create();
        },

        /**
         * 创建
         */
        create : function() {
            var _this = this;

            var $codeBtn = _this.settings.codeBtn,
                $errorTip = _this.settings.errorTip;

            var onlyFlag = _this.settings.onlyFlag,
                timeLength = typeof(_this.settings.length) === 'string' ? parseInt(_this.settings.length) : _this.settings.length;

            $codeBtn.on('click',function(){
                var $this = $(this);

                if(!$this.hasClass('disabled-code')){
                    $.ajax({
                        type: 'post',
                        url: $this.attr('data-url'),
                        data: {},
                        dataType: 'json',
                        success: function (res) {
                            if(res.flag){
                                $codeBtn.addClass('disabled-code');

                                var timerCookieName = 'timerRemained' + onlyFlag;
                                Cookie.add(timerCookieName, timeLength, 60);//添加cookie记录
                                _this.setCountDown($codeBtn, timerCookieName);//开始倒计时
                            }else{
                                _this.errorTip($errorTip, res.msg);
                            }
                        },
                        error: function (xhr, type) {
                            _this.errorTip($errorTip, '请求服务器异常,稍后再试');
                        }
                    });
                }
            });
        },

        /**
         * 设置倒计时函数
         */
        setCountDown : function(obj,cookieName) {
            var _this = this;

            var countdown = parseInt(Cookie.get(cookieName));

            if (!countdown) {
                obj.removeClass('disabled-code');
                obj.val('短信获取');
                return false;
            } else {
                obj.addClass('disabled-code');
                obj.val(countdown + 's后重新发送');
                countdown--;

                Cookie.edit(cookieName,countdown,countdown+1);
            }
            setTimeout(function(){ _this.setCountDown(obj,cookieName) },1000); //每秒执行一次
        },

        /**
         * 错误提示语函数
         */
        errorTip : function($target,tip) {
            $target.show();
            $target.text(tip);

            setTimeout(function(){
                $target.removeClass('error-tip');
                $target.addClass('error-tip-fade');

                setTimeout(function(){
                    $target.removeClass('error-tip-fade');
                    $target.addClass('error-tip');

                    $target.hide();
                },500);
            },2000);
        }
    };

    /**
     * 默认配置
     */
    Timer.defaults = {
        //Cookie唯一键值的标示符(比如:手机号)
        onlyFlag: '18888888888',

        //倒计时时长(单位:秒)
        length: 60,

        //验证码按钮对象
        codeBtn: null,

        //错误信息载体对象
        errorTip: null
    };

    var rTimer = function(options) {
        new Timer(options);
    };

    window.rTimer = $.rTimer = $.timer = rTimer;
});