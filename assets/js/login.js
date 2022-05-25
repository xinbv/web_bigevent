$(function() {
    // alert('大事件soeasy')
    $('#link_reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        })
        // 从layui中获取form对象
        // 为什么可以直接从login中获得layui的from对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        repwd: function(value) {
            // []属性选择器
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log('注册成功！');
            layer.msg('注册成功 !请登录');
            $('#link_login').click();
        })
    })

    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                localStorage.setItem('token', res.token)
                layer.msg('登录成功');
                // location.href = '/index.html'
            }
        })
    })
})