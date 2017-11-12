$(function () {
  // 获取二级分类信息
  var secondCateDates = function (page) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {page: page||1,pageSize: 5},
      dateType: 'json',
      success: function (data) {
        console.log(data)
        var secondCateRes = template('secondRes',data)
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
      onPageClicked: function (event, originalEtype, page) {
      /*改变当前页再渲染 page当前点击的按钮的页面*/
        secondCateDates(page)
      }
  })
      }
    })
  }
  secondCateDates()

})