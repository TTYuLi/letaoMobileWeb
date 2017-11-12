$(function () {
  // 获取数据
  var getUsersData = function (pageNum) {
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
          $('#pagination').bootstrapPaginator({
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
            getUsersData(page)
            }

            })
      }
    })
  }
  //页面加载完成 调用ajax呈现数据
    getUsersData()
    // 用户禁用功能
    $('tbody').on('click', '.btn', function () {
      var name = $(this).data('name')
      var id = $(this).data('id')
      var isDelete = $(this).hasClass('btn-danger') ? 1 : 0
      //显示禁用启用信息
      if (isDelete == 1) {
        console.log(1)
        $('#modalSet').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要禁用'+name+'吗？')
      }else {

        $('#modalSet').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要启用'+name+'吗？')
      }

      // 点击确定按钮，发出ajax请求，修改数据
    $('#modalSet').on('click', '.btn-primary', function () {
      console.log(2)
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: 'json',
        success: function (data) {
          //console.log(data)
          // 如果请求成功，隐藏模态框，同时重新加载用户信息
          if (data.success == true) {
              $('#modalSet').modal('hide')
              getUsersData()
          }
        }
      })
    })

  })
})