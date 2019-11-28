var categoryId = "";
var totalPages  = "";
var value = [];
var page = "1";
var productsCurated = [];


define({ 
  onNavigate:function(context){	
    this.pauseNavigation();
    //  kony.application.showLoadingScreen();
    this.getProductListData(context);
    this.view.segProductList.onRowClick = ()=>{
      var navigation = new kony.mvc.Navigation("frmProductDetails");
      navigation.navigate(this.view.segProductList.selectedRowItems[0]);
    };

    this.view.backHeaderComponent.flxBackButton.onTouchStart = ()=>{
      cache.pop();
      this.backNavigation();

    };

    //   cache.pop();
    this.segAnimation();
    this.view.lstBxPagination.onSelection = ()=>{
      page = this.view.lstBxPagination.selectedKey;
      this.getProductListData();
    };
    this.resumeNavigation();

  },

  backNavigation: function(){
    page = "1";

    var navigateBackwards = new kony.mvc.Navigation("frmHome");
    navigateBackwards.navigate();


  },

  getProductListData: function(inputData){
    const serviceName = "BestBuyProductsService";
    const integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "getProductsByCategoryId";
    var data= {"categoryName":informationToSend, "page": page,"productAmount": "10"};
    const headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.operationSuccess, this.operationFailure);

  },
  operationSuccess:function(res){

    var products = res.products;
    totalPages  = res.totalPages;

    products.forEach(function(element){

      var price = "";
      const saleTemplate = "flxSaleProductList";
      const normalTemplate = "flxProductList";
      const fullProductList = "flxFullProductList";
      const newItemProductList = "flxFullProductList";

      var obj = {"mediumImage": element.image, "name":element.name, "price":"", "review":"", template: "", id:element.productId, "shortDescription":element.shortDescription, "sku":element.sku};

      // set of conditions to determinate which template will be used based on data received

      //Apply assigned template when the product price is on sale.
      if(element.onSale === "true"){
        price = "$"+element.salePrice;
        obj.template = saleTemplate;
      } 
      //Apply assigned template when the product is a new Item.
      else if(element.new === "true"){
        obj.template = newItemProductList;
      } 
      //Apply assigned template when product is both; new item and is on Sale
      else if(element.onSale == "true" && element.new == "true"){
        obj.template = fullProductList;
      }
      else{
        price = "$"+element.regularPrice;
        obj.template = normalTemplate;
      }
      //Add price to data array based on how it was recieved
      obj.price = price;
      //Determine if User Review Exists
      if(element.customerReviewAverage){
        obj.review = "Avg User Rating: "+element.customerReviewAverage;
      }else{
        obj.review = "";
      }
      productsCurated.push(obj);
    }.bind(this));

    this.view.lblResults.text = "Results for: "+informationToSend;

    this.view.segProductList.widgetDataMap = {imgThumbnail:"mediumImage", lblProductName: "name", lblProductPrice: "price", lblProductRating:"review"};

    if(productsCurated.length > 0){
      var totalNumberPages = parseInt(totalPages);

      for(var i = 1; i <= totalNumberPages; i++){
        value.push([i.toString(),i.toString()]);
      }
      if(totalNumberPages ==1){
        this.view.lstBxPagination.isVisible = false;
      }else{
        this.view.lstBxPagination.masterData = value;
        value.length = 0;
      }
      this.view.lstBxPagination.selectedKey = page;
      this.view.lblResultPagination.text = "Page "+this.view.lstBxPagination.selectedKey+" of "+totalNumberPages;
      this.view.segProductList.setData(productsCurated);
      productsCurated.length = 0;
      this.view.lblResults.isVisible = true;
      this.view.lblNoProducts.isVisible = false;
      this.view.segProductList.isVisible = true;
      this.view.lstBxPagination.isVisible = true;
      this.view.lblResultPagination.isVisible = true;
    }

    else
    {
      this.view.lblResults.isVisible = false;
      this.view.lblNoProducts.isVisible = true;
      this.view.segProductList.isVisible = false;
      this.view.lstBxPagination.isVisible = false;
      this.view.lblResultPagination.isVisible = false;

    }

    kony.application.dismissLoadingScreen();
  },
  operationFailure:function(res){
    alert("Failed to retrieve your data");
  },

  //Setting Segment animation
  segAnimation : function(){
    var transformObject1 = kony.ui.makeAffineTransform();
    var transformObject2 = kony.ui.makeAffineTransform();

    transformObject1.translate(200, 0);
    transformObject2.translate(0, 0);

    var animationObject = kony.ui.createAnimation(
      {"0":{"transform":transformObject1,"stepConfig":{"timingFunction":kony.anim.LINEAR}},
       "100":{"transform":transformObject2,"stepConfig":{"timingFunction":kony.anim.LINEAR}}});
    var animationConfig = {
      duration: 1,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var animationCallbacks = {"animationEnd":function(){kony.print("animation END");}};
    var animationDefObject={definition:animationObject,config:animationConfig,callbacks:animationCallbacks};
    this.view.segProductList.setAnimations({visible:animationDefObject});
  }

});