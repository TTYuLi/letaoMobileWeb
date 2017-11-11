 // 登录表单验证
 $(function () {
  $('#login').bootstrapValidator({
    // 基本验证
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 4,
            max: 16,
            message: '用户名长度在1到16位之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 16,
            message: '密码长度在6到16之间'
          },
          different: {
            field: 'username',
            message: '密码不能和用户名相同'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // 业务验证
    // 阻止默认提交
    e.preventDefault();
    var $form = $(e.target);
    // console.log($form)
    var bv = $form.data('bootstrapValidator');
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      dateType:'json',
      success: function (data) {
        console.log(data)
        //成功验证用户信息
        if (data.success == true) {

          location.href = './index.html';
          // 密码错误
        }else if (data.error == 1001) {
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", 'callback');
        }else if (data.error == 1000) {
          //用户名不存在
          $('#login').data("bootstrapValidator").updateStatus("username", "INVALID", 'callback');
        }
      }
    })
  })
 })