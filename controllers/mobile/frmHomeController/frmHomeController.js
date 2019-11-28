/*Global Variables */

var IdFromInitialSegData = "cat00000";
var cache = [];
var breadcrumbs = [];
var categoryName = "";
var informationToSend = "";


define({ 
  onNavigate:function(){

    this.pauseNavigation();

    this.getCategories();

    this.view.segCategories.onRowClick =()=>{
      this.getdataSubCategories();
      this.getCategories();

      if(cache.length == 1){
        this.view.flxBackButton.isVisible = false;
        this.view.lblBreadscrumb.text = "Home";
      }

    };

    this.view.flxBackButton.onTouchStart =this.backButton;

    this.view.homeHeaderComponent.flxSearch.onTouchStart = this.SearchBoxAnimation;

    this.view.inputSearch.onDone = ()=>{
      this.searchFunction();
    };

    this.setAnimation();

    this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.onClick = ()=>{
      this.menuAnimation();
      this.bodyAnimation();
      this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerHIde.isVisible = true;
      this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.isVisible = false;

    };
    this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerHIde.onClick = ()=>{
      this.menuAnimationHide();
      this.bodyAnimationHide();
      this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.isVisible = true;
      this.view.homeHeaderComponent.flxHamburgerMenu.btnHamburgerHIde.isVisible = false;

    }
  },

  /*Definition of functionalities*/

  //function which retrieves categories data from Fabric Services

  getCategories: function(){
    const serviceName = "BestBuyCategoriesService";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "getCategories";
    var data= {"id":IdFromInitialSegData};
    var headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.operationSuccess, this.operationFailure);

  },
  operationSuccess:function(res){
    cache.push(res.subCategories);

    if(res.categories == ""){
      breadcrumbs.pop();
      alert("Sorry :(' there's not items in this category, please choose another option");

    }else if(this.view.segCategories.data === null || this.view.segCategories.data === ""){
      this.view.segCategories.widgetDataMap = {lblCategoryName:"name"};
      this.view.segCategories.setData(cache[cache.length - 2]);

    }else{

      if(res.subCategories.length <=3){

        var navigateToDetails = new kony.mvc.Navigation("frmProductList");

        informationToSend = categoryName
        navigateToDetails.navigate(informationToSend);

      }else{
        this.view.segCategories.widgetDataMap = {lblCategoryName:"name"};
        this.view.segCategories.setData(cache[cache.length -1]);
        breadcrumbs.push(categoryName);
        if(breadcrumbs <= 1){
          breadcrumbs = [];
          this.view.lblBreadscrumb.text = "Home";
          this.view.flxBackButton.isVisible = false;
        }else{
          this.view.lblBreadscrumb.text = "Home"+">"+ breadcrumbs.join(">");
          this.view.flxBackButton.isVisible = true;
        }
      }

    }


    this.resumeNavigation();
    kony.application.dismissLoadingScreen();
  },  

  operationFailure:function(res){

    alert("Unable to retrieve data");
  },

  //This function manages categoriesId based on user clics and saves breadscrumb data.

  getdataSubCategories: function(){

    IdFromInitialSegData = this.view.segCategories.selectedRowItems[0].id;
    categoryName = this.view.segCategories.selectedRowItems[0].name;

  },

  //This function retrieves the previous data from cache.

  backButton: function(){
    breadcrumbs.pop();
    if(breadcrumbs.length < 1){
      breadcrumbs = [];
      this.view.lblBreadscrumb.text = "Home";
      this.view.flxBackButton.isVisible = false;
    }

    this.view.segCategories.widgetDataMap = {lblCategoryName:"name"};
    this.view.segCategories.setData(cache[cache.length - 2]);


    if(cache.length >= 1){
      this.view.lblBreadscrumb.text = "Home"+" > "+ breadcrumbs.join(" > ");
      this.view.flxBackButton.isVisible = true;
      cache.pop();
    }else{

      this.view.lblBreadscrumb.text = "Home";
      this.view.flxBackButton.isVisible = false;
    }
  },

  // || Searching functionality ||

  searchFunction: function(){
    const serviceName = "BestBuyCategoriesService";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    operationName =  "searchProducts";
    var searchInput = this.view.inputSearch.text;
    data= {"product": searchInput};
    headers= {};
    integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);
    function operationSuccess(res){
      alert(res)
    }
    function operationFailure(res){
      alert("it does not work")
    }
  },





  // || Animations sections ||
  // In this section we will be creating all the animations for the current form

  //Animation for search box
  SearchBoxAnimation: function(){

    var self = this;

    this.view.flxSearch.isVisible = true;

    var trans100 = kony.ui.makeAffineTransform();
    trans100.rotate(90);
    trans100.scale(0.3, 0.3);
    var animationStep1 = {
      "transform": trans100,
    };

    var trans200 = kony.ui.makeAffineTransform();
    trans200.rotate(180);
    trans200.scale(0.5, 0.5);
    var animationStep2 = {
      "transform": trans200,
    };

    var trans300 = kony.ui.makeAffineTransform();
    trans300.rotate(270);
    trans300.scale(0.7, 0.7);
    var animationStep3 =  {
      "transform": trans300,
    };

    var trans400 = kony.ui.makeAffineTransform();
    trans400.rotate(360);
    trans400.scale(1, 1);

    var animationStep4 =  {
      "transform": trans400,
    };

    self.view.flxSearchButton.animate(
      kony.ui.createAnimation({
        "0":{"transform": trans100,"width":"25%", "height":"7.5%","stepConfig": {"timingFunction": kony.anim.LINEAR}},
        "20":{"transform": trans200,
              "width":"50%",
              "height":"15%", "stepConfig": {"timingFunction": kony.anim.LINEAR}},
        "50":{ "transform": trans300,
              "width":"75%",
              "height":"22.5%", "stepConfig": {"timingFunction": kony.anim.LINEAR}},
        "100":{ "transform": trans400,
               "width":"100%",
               "height":"30%", "stepConfig": {"timingFunction": kony.anim.LINEAR}}}),
      { "delay": 0,
       "duration":0.4,
       "iterationCount":1,
       "fillMode":kony.anim.FILL_MODE_FORWARDS
      },
      {"animationEnd": function(){}});

    self.view.lblCancel.onTouchStart = ()=>{
      self.view.flxSearch.isVisible = false;
    };
  },
  setAnimation : function(){
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
    this.view.segCategories.setAnimations({visible:animationDefObject});
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
        "100":{"left":"85%", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
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
  },


});