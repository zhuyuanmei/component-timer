/**
 * 移动官网
 * @since 2016.02.03
 */
define(function (require, exports, module) {
    //'倒计时'模块
    if($('#J_Timer').length){
        var Timer  = require('timer');

        $.timer({
            //Cookie唯一键值的标示符(比如:手机号)
            onlyFlag: '13333333333',

            //倒计时时长(单位:秒)
            length: 10,

            //验证码按钮对象
            codeBtn: $('#J_GetCode'),

            //错误信息载体对象
            errorTip: $('#J_ErrorTip')
        });
    }
});