$(function () {
  //获取分页后的产品数据信息
  var getProductsData = function (page) {
    //调接口
    $.ajax({
      type: 'get',
      url: ' /product/queryProductDetailList',
      data: {page:page||1, pageSize:4},
      dataType: 'json',
      success: function (data) {
        // console.log(data)
        //引擎模板
        var content = template('productsRes', data)
        $('table tbody').html(content)
        //分页功能
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
          onPageClicked: function (event, originalEtype, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            // console.log(originalEtype)
            // secondCateDates(originalEtype.data.page)
            getProductsData(page)

            // console.log(1)
          }
        })


      }
    })
  }

  getProductsData()
  fileUpload()
  //表单校验
  $('#productform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      }, 
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    console.log(1)
    e.preventDefault()
    var $form = $(e.target)
    var data = $form.serialize()
    console.log(data)
    $.each(picList,function(i,item){
      // console.log(i,item);
      data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
    })
    data = data+'&brandId=4';
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: data,
      success: function (data) {
        $('#addProduct').modal('hide')
        getProductsData()
         
        
      }
    })
  })
 
})

//图片上传
var picList = []
var fileUpload = function () {
  //文件上传控件调用fileload方法
  $('#pic').fileupload({
    //图片上传接口
    url: '/product/addProductPic',
    done: function (e, data) {
      console.log(data)
       $('.fileUPload').append('<img src="'+data.result.picAddr+'">')
      // $('#preview').attr('src', data.result.picAddr)
      // $('#brandLogo').val(data.result.picAddr)
      picList.push(data.result)
    }
  })
}