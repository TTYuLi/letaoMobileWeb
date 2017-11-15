$(function () {
  var url = new URLSearchParams(location.search)
  var proName = url.get('proName')
  getSearchData(proName)
})
 function getSearchData (proName,page,pageSize,price,num) {
   $.ajax({
     type:'get',
     url: '/product/queryProduct',
     data: { 
       proName: proName||'',
       price: price||1,
       num: num||1,
       page: page||1,
       pageSize: pageSize||6
    },
    success: function (data) {
      console.log(data)
      var resTemplate= template('searchTemplate',data)
      $('.search-result-list').html(resTemplate)
    }
   })
 }