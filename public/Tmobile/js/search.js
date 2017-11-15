$(function () {
  //初始化页面
  historyInit()
  //点击搜索 添加历史记录功能
  $('#search-btn').on('click', function () {
    var value = $('[type="text"]').val().trim()
    console.log(value)
    storeHistory(value)
    historyInit()
    location.href='./searchList.html?proName='+value;
  })
  //单个删除功能
  $('search-history-list').on('click', 'i', function () {
    console.log(1)
    var deleteValue = $(this).sibling('span')
    deleteItem(deleteValue)
    historyInit()
  })

  //清空历史记录
  $('.clearHistory').on('click', function () {
    localStorage.removeItem('historyValue')
    historyInit()
  })
  // // 点击搜索跳转
  // $('').on()

  
})
/*1 从localstroge拿数据渲染页面 */
function historyInit () {
  var data = JSON.parse(localStorage.getItem('historyValue')) || []
  console.log(data.length)
  var historyRes = template('historyTemplate',{data:data})
  $('.search-history-list').html(historyRes)
}
// 2 取到input中的值放入localstrage中
function storeHistory(value) {
  var data = JSON.parse(localStorage.getItem('historyValue')) || []
  
  $.each(data, function (i, item) {
    if (value = '') {
      return
    }else if (value == item) {
      data.splice(i,1)
    } 
 })
  data.push(value)
   
  localStorage.setItem('historyValue', JSON.stringify(data))
}

// 3删除功能 
function deleteItem (deleteValue) {
  var data = JSON.parse(localStorage.getItem('historyValue')) || []
  $.each(data, function () {
    if (value == item) {
      data.splice(i, 1)
    }
  })
  localStorage.setItem('historyValue', JSON.stringify(data))
}