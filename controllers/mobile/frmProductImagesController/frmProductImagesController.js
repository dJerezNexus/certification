
define({ 

  onNavigate: function(context){
    this.navigatePreviousFrom(context);
    this.getImages(context.id);
       this.view.lsbxImageOptions.onSelection = ()=>{
      var imgSource = this.view.lsbxImageOptions.selectedKey;
         this.view.imgProduct.src = imgSource;
    };
    this.view.imgProduct.src = context.mediumImage;
  },
  navigatePreviousFrom: function(context){
    this.view.backHeaderComponent.flxBackButton.onTouchStart = ()=>{
      var navigation = new kony.mvc.Navigation("frmProductDetails");
      navigation.navigate(context);
    };
 
  },
  getImages: function(id){
    const serviceName = "BestBuyProductsService";
    const integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "getImages";
    var data= {"id": id};
    const headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.operationSuccess, this.operationFailure);
  },
  operationSuccess:function(res){
    var imageData = res.images;
    var array = [];
    var img = [];
    imageData.forEach(function(element){
      for(var i = 0; element.rel.length > i; element.rel++){
        array.push([element.href, element.rel]);
      }
      var obj = {"img": element.href};
      img.push(obj);
    });
    this.view.lsbxImageOptions.masterData = array; 	
  },
  operationFailure:function(res){
    alert("Failure");
  }

});