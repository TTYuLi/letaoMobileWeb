// ------进度条功能
// 不显示转圈功能
NProgress.configure({showSpinner: false})
// 在ajax发出请求的时候 显示进度条
$(window).ajaxStart(function () {
    NProgress.start()
})
// ajax请求结束时， 进度条完成
$(window).ajaxComplete(function () {
    NProgress.done()
})

// ====顶部导航中的显示隐藏功能===
$('.toggleMenu').on('click', function () {
    $('.side-bar').toggle()
    $('.main').toggleClass('screen')
})



// 退出登陆模态框
//点击退出，发出ajax请求
$('#logout_model').on('click', '.btn-primary', function () {
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        data: {},
        dataType: "json",
        success: function (data) {
            //如果发送请求成
            if (data.success == true) {
                $('#logout_model').model('hide');
                setTimeout(function () {
                    location.href = './login.html';
                }, 500)
            }
        }
    })
})
//分类管理
$('.menu').on('click', 'a', function () {
    console.log($(this))
    $(this).siblings('.son').slideToggle()
})
