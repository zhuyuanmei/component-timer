# component-timer
组件名称：倒计时<br>
组件功能：支持倒计时时间动态配置<br>
组件参数：

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
