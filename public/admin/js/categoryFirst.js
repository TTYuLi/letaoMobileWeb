$(function () {
  //获取一级分类数据
  var getCateFirstDatas = function (page) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {page:page||1,pageSize:5},
      dateType: 'json',
      success: function (data) {
        // console.log(data)
        var CateFirstRes = template('firstCate',data)
        $('table tbody').html(CateFirstRes)

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
            onPageClicked: function (event, originalEtype, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
              getCateFirstDatas(data)
            }
        })

      }
    })

  }
  getCateFirstDatas()


  // // 表单验证
  // $('#firstForm').bootstrapValidator({
  //   feedbackIcons: {
  //     valid: 'glyphicon glyphicon-ok',
  //     invalid: 'glyphicon glyphicon-remove',
  //     validating: 'glyphicon glyphicon-refresh'
  //   },
  //   fields: {
  //     // 字段名是name属性的值
  //     categoryName: {
  //       validators: {
  //         notEmpty: {
  //           message: '不能为空哦！'
  //         }
  //       }
  //     }

  //   }
  // }).on('success.form.bv', function (e) {
  //     console.log(1)
  //     e.preventDefault();
  // })

  //新增功能
  $('#firstForm').on('click', '#save', function () {
    var categoryName = $('#firstForm').serialize()
    console.log(categoryName)
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: categoryName,
      dataType: 'json',
      success: function (data) {
        console.log(data)
        if (data.success == true) {
            $('#addCategory').modal('hide')
            getCateFirstDatas()
        }
      }
    })

  })


})