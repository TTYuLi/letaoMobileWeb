$(function () {
  // 获取二级分类信息
  var secondCateDates = function (page) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: { page: page || 1, pageSize: 5 },
      dateType: 'json',
      success: function (data) {
        // console.log(data)
        var secondCateRes = template('secondRes', data)
        $('table tbody').html(secondCateRes)

        // 分页功能
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
          onPageClicked: function (event, originalEtype, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            // console.log(originalEtype)
            // secondCateDates(originalEtype.data.page)
            secondCateDates(page)

            // console.log(1)
          }
        })

      }
    })
  }
  secondCateDates()
  fileUpload()
  initDropDown()

  //表单校验

  $('#secondForm').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // fields: {
    //   // 字段名是name属性的值
    //   brandName: {
    //     validators: {
    //       notEmpty: {
    //         message: '必须填'
    //       }
    //     }
    //   }
    // }
  }).on('success.form.bv', function (e) {
    e.preventDefault()
    // console.log(1)
    var $form = $(e.target)
    //console.log($form)
    // console.log($form.serialize());//categoryId=&brandLogo=

    var bv = $form.data('bootstrapValidator')
    // console.log(bv)
    var data = $form.serialize();
    // console.log(data)
    $.ajax({
      type: 'post',
      url: ' /category/addSecondCategory',
      data: data,
      success: function (data) {
        // console.log(data)
        $('#addCategory2').modal('hide')
        secondCateDates()
      }
    })
  })

})
//下拉菜单数据渲染
var initDropDown = function () {
  var dropdownMenu = $('.dropdown-menu')
  $('.dropdown-text').click(function () {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: { page: 1, pageSize: 100 },
      dataType: 'json',
      success: function (data) {
        // console.log(data)
        //下拉菜单内容
        var dropdownContent = ''
        $.each(data.rows, function (i, item) {
          // console.log(i,item)
          dropdownContent += '<li><a href="javascript:;" data-id=' + item.id + '>' + item.categoryName + '</a></li>'
        })
        // console.log(dropdownContent)
        dropdownMenu.html(dropdownContent).on('click', 'a', function () {
          // console.log(this)
          $('.dropdown-text').html($(this).html())
          $('#categoryId').val($(this).data('id'))
        })
      }
    })
  })
}
// 图片上传
var fileUpload = function () {
  //文件上传控件调用fileload方法
  $('#files').fileupload({
    //图片上传接口
    url: '/category/addSecondCategoryPic',
    done: function (e, data) {
      // console.log(data)
      $('#preview').attr('src', data.result.picAddr)
      $('#brandLogo').val(data.result.picAddr)
    }
  })
}