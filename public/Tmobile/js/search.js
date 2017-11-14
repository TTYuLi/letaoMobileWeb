$(function () {
  var fetchProduct = function () {
    $.ajax({
      type: 'get',
      url: ' /product/queryProduct',
      data:{page:page,pageSize:100}
    })
  }
})