
define({ 

  onNavigate: function(context){
    this.navigatePreviousFrom(context);
    this.getImages(context.id);
       this.view.lsbxImageOptions.onSelection = ()=>{
      var imgSource = this.view.lsbxImageOptions.selectedKey;
         this.view.imgProduct.src = imgSource;
    };
    this.view.imgProduct.src = context.mediumImage;
    
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
    };
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
  },
  
  // || Animations section ||
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