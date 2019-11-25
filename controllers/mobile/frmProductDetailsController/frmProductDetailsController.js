define({ 

  onNavigate:function(context){
    this.getProductDetailData(context);
    
    this.view.backHeaderComponent.flxBackButton.onTouchStart = ()=>{
      this.backButton();
    }
  },
  getProductDetailData: function(productId){
    const serviceName = "BestBuyProductsService";
    const integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "getProductDetails";
    const data= {"id": productId};
    const headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.operationSuccess, this.operationFailure);

  },
  operationSuccess:function(res){
    var productDetail = res.product;
    this.setDataFromProductList(productDetail);
  },
  operationFailure:function(res){
    var errMessage = "No data bro";
    alert(errMessage);
  },
  setDataFromProductList:function(data){
    this.view.lblProductName.text = data.name;
    if(data.salePrice == "false"){
      this.view.lblProductPrice.text ="$"+ data.regularPrice;
    }else{
      this.view.lblProductPrice.skin = "sknPriceOnSale";
      this.view.lblProductPrice.text ="On Sale! "+"$"+data.salePrice;
    }

    this.view.lblProductReviews.text = "Avg review: "+ data.customerReviewAverage;
    
	// Section where the img is assigned based on users reviews
    var imgRating = this.view.imgProductRating.src;
    var review = data.customerReviewAverage;
    var singleNumber = review.substring(0, 1);
    if(singleNumber == 1){
      this.view.imgProductRating.isVisible = true;
      this.view.imgProductRating2.isVisible = false;
      this.view.imgProductRating3.isVisible = false;
      this.view.imgProductRating4.isVisible = false;
      this.view.imgProductRating5.isVisible = false;
    }
    else if(singleNumber == 2){
      this.view.imgProductRating.isVisible = false;
      this.view.imgProductRating2.isVisible = true;
      this.view.imgProductRating3.isVisible = false;
      this.view.imgProductRating4.isVisible = false;
      this.view.imgProductRating5.isVisible = false;
    }
    else if(singleNumber == 3){
      this.view.imgProductRating.isVisible = false;
      this.view.imgProductRating2.isVisible = false;
      this.view.imgProductRating3.isVisible = true;
      this.view.imgProductRating4.isVisible = false;
      this.view.imgProductRating5.isVisible = false;
    }
    else if(singleNumber == 4){
      this.view.imgProductRating.isVisible = false;
      this.view.imgProductRating2.isVisible = false;
      this.view.imgProductRating3.isVisible = false;
      this.view.imgProductRating4.isVisible = true;
      this.view.imgProductRating5.isVisible = false;
    }
    else if(singleNumber == 5){
      this.view.imgProductRating.isVisible = false;
      this.view.imgProductRating2.isVisible = false;
      this.view.imgProductRating3.isVisible = false;
      this.view.imgProductRating4.isVisible = false;
      this.view.imgProductRating5.isVisible = true;
    }
    else{
      this.view.imgProductRating.isVisible = false;
      this.view.imgProductRating2.isVisible = false;
      this.view.imgProductRating3.isVisible = false;
      this.view.imgProductRating4.isVisible = false;
      this.view.imgProductRating5.isVisible = false;
    }
    this.view.imgProduct.src = data.image;
    this.view.lblDescription.text = data.longDescription;
  },
  backButton: function(){
    var navigation = new kony.mvc.Navigation("frmProductList");
    navigation.navigate();
  }

});