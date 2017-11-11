$(function () {
  // 获取数据
  var getUsersDate = function (pageNum) {
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: pageNum||1,
        pageSize: 5
      },
      success: function (data) {
          // console.log(data)
          var userRes = template('usersTemplate',data)
          $('table tbody').html(userRes)
          $('.pagination').bootstrapPaginator({
          /*当前使用的是3版本的bootstrap*/
            bootstrapMajorVersion: 3,
          /*配置的字体大小是小号*/
            size: 'small',
          /*当前页*/
            currentPage: data.page,
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
            totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
            onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            getUsersDate(page)
            }

          })
  }
  //页面加载完成 调用ajax呈现数据
  getUsersDate(page)
  // 用户禁用功能
})