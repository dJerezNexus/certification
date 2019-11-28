define({ 

  onNavigate:function(context){
    if(context.id === ""){

      this.setDataFromProductList(context);

    }else{
      this.getProductDetailData(context.id);
    }
    this.getReviews(context.sku);
    this.view.backHeaderComponent.flxBackButton.onTouchStart = ()=>{
      this.backButton();
    };
    this.showReviewAnimation();
    this.hideReviewAnimation();
    this.navigationToImages(context);
    
    
    
    this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.onClick = ()=>{
      this.menuAnimation();
      this.bodyAnimation();
      this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenuHIde.isVisible = true;
      this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.isVisible= false;
    };
    this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenuHIde.onClick = ()=>{
      this.menuAnimationHide();
      this.bodyAnimationHide();
      this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenuHIde.isVisible = false;
      this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.isVisible= true;
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
    this.setDataFromService(productDetail);
  },
  operationFailure:function(res){
    var errMessage = "Unable to retrieve data";
    alert(errMessage);
  },
  setDataFromService:function(data){
    if(data.name.length > 60){
      var subName = data.name.substring(0, 68);
      this.view.lblProductName.text = subName+"...";
    }else{
      this.view.lblProductName.text = data.name;
    }
    if(data.onSale == "false"){
      this.view.lblProductPrice.text ="$"+ data.regularPrice;
      this.view.lblProductPrice.skin = "";
    }else{
      this.view.lblProductPrice.skin = "sknPriceOnSale";
      this.view.lblProductPrice.text ="On Sale! "+"$"+data.salePrice;
      this.view.lblProductPrice.skin = "";
    }
    if(data.customerReviewAverage.length > 0){
      this.view.lblProductReviews.text = "Avg review: "+ data.customerReviewAverage;
      this.view.lblProductReviews.isVisible = true;
    }else{
      this.view.lblProductReviews.isVisible = false;
    }


    // Section where the img is assigned based on users reviews
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
    this.view.lblDescription.text = data.shortDescription;
  },
  setDataFromProductList: function(data){

    // format product name
    if(data.name.length > 60){
      var subName = data.name.substring(0, 68);
      this.view.lblProductName.text = subName+"...";
    }else{
      this.view.lblProductName.text = data.name;
    }


    this.view.lblProductPrice.text = data.price;
    this.view.lblProductPrice.skin = "";

    if(data.review.length > 13){
      this.view.lblProductReviews.text = data.review;
     // alert(data.review.length)
    }else{
      this.view.lblProductReviews.isVisible = false;
    //  alert(data.review.length)
    }

    var review = data.review;

    var singleNumber = review.substring(17, 18);
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
    this.view.imgProduct.src = data.mediumImage;
    this.view.lblDescription.text = data.shortDescription;
  },

  backButton: function(){
    var navigation = new kony.mvc.Navigation("frmProductList");
    navigation.navigate();
  },
  getReviews: function(productSku){
    const serviceName = "UsersReviews";
    const  integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "getReviews";
    var data= {"sku": productSku};
    var  headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.opSuccess, this.opFailure);
  },
  opSuccess: function(res){
    var response = res.reviews;
    var submitted = "submitted by: ";
    var reviewData = [];

    response.forEach(function(element){
      var obj = {"title":element.title,"name":"Submitted by: "+element.name, "comment":element.comment, "rating":""};
      var rate = element.rating;
      var rating = rate.substring(0, 1);
      if(rating == 1){
        obj.rating = "ratings_star_1.png";
      }else if(rating == 2){
        obj.rating = "ratings_star_2.png";
      }else if(rating == 3){
        obj.rating = "ratings_star_3.png";
      }else if(rating == 4){
        obj.rating = "ratings_star_4.png";
      }else if(rating == 5){
        obj.rating = "ratings_star_5.png";
      }    
      reviewData.push(obj);
    });
    this.view.segReviews.widgetDataMap = {lblReviewTitle: "title", lblAuthor:"name", lblComment:"comment", imgReview:"rating"};
    this.view.segReviews.setData(reviewData);
    if(this.view.segReviews.data === null){
      this.view.lblReviews.text = "Total number of reviews: 0";
      this.view.ArrowUp.isVisible = false;
      this.view.ArrowDown.isVisible = false;
      this.view.segReviews.isVisible = false;
      this.hideReviewAnimation();
    }else{
      this.view.lblReviews.text = "Total number of reviews: "+this.view.segReviews.data.length;
      this.view.segReviews.isVisible = true;
    }

  },
  opFailure:function(res){
    alert("Failure!");
  },

  // Navigation where all different images will be displayed
  navigationToImages: function(dataId){
    this.view.btnMore.onTouchStart = ()=>{
      var navigation = new kony.mvc.Navigation("frmProductImages");
      navigation.navigate(dataId);
    };

  },
//  || Animation section ||
  
  //Animation for reviews
  showReviewAnimation: function(){
    var self = this;
    this.view.ArrowUp.onTouchStart = ()=>{
      self.view.flxProductReview.animate(
        kony.ui.createAnimation({
          "100": {
            "top": "0%",
            "stepConfig": {
              "timingFunction": kony.anim.LINEAR
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 1
        }, {
          "animationEnd": function(){
            self.view.ArrowUp.isVisible = false;
            self.view.ArrowDown.isVisible = true;
          }
        });
    };
  }, 
  hideReviewAnimation(){
    var self = this;
    this.view.ArrowDown.onTouchStart = ()=>{
      self.view.flxProductReview.animate(
        kony.ui.createAnimation({
          "100": {
            "top": "35%",
            "stepConfig": {
              "timingFunction": kony.anim.LINEAR
            }
          }
        }), {
          "delay": 0,
          "iterationCount": 1,
          "fillMode": kony.anim.FILL_MODE_FORWARDS,
          "duration": 1
        }, {
          "animationEnd": function(){
            self.view.ArrowDown.isVisible = false;
            self.view.ArrowUp.isVisible = true;
          }
        });
    };
  },
  //Animation for menu showup
  menuAnimation: function(){
    this.view.MenuComponent.flxMenuContainer.animate(
      kony.ui.createAnimation({
        "100":{"left":"0%", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
      }),
      {duration:1,
       fillMode: kony.anim.FILL_MODE_FORWARDS,
       delay: 0},
      {"animationEnd":function(){}}
    );
  },
  bodyAnimation: function(){
    this.view.flxMain.animate(
      kony.ui.createAnimation({
        "100":{"left":"80%", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
      }),
      {duration:1,
       fillMode: kony.anim.FILL_MODE_FORWARDS,
       delay: 0},
      {"animationEnd":function(){}}
    );
  },

  //Animation for menu hideout
  menuAnimationHide: function(){
    this.view.MenuComponent.flxMenuContainer.animate(
      kony.ui.createAnimation({
        "100":{"left":"-85%", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
      }),
      {duration:1,
       fillMode: kony.anim.FILL_MODE_FORWARDS,
       delay: 0},
      {"animationEnd":function(){}}
    );
  },
  bodyAnimationHide: function(){
    this.view.flxMain.animate(
      kony.ui.createAnimation({
        "100":{"left":"0%", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
      }),
      {duration:1,
       fillMode: kony.anim.FILL_MODE_FORWARDS,
       delay: 0},
      {"animationEnd":function(){}}
    );
  }

});