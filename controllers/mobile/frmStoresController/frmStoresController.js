
var locationPins = [];
var pins = {};
var megaPin = []
define({ 

  onNavigate: function(){
    //this.view.mapStores.addPin(pin)
    this.view.backHeaderComponent.flxHamburgerMenu.btnHamburgerMenu.onClick = ()=>{
      this.menuAnimation();
      this.bodyAnimation();
    };
    this.view.MenuComponent.onTouchStart = ()=>{
      this.menuAnimationHide();
      this.bodyAnimationHide();
    };

    this.view.btnSearch.onClick = ()=>{
      locationPins.shift()
      this.getLocationData();
    }
 this.view.flxMain.left = "0%";  
    this.view.MenuComponent.left = "-85%";
  },
  getLocationData: function(){
    var searchingParam = this.view.inputMapSearch.text;
    const  serviceName = "StoreLocation";
    const integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    const operationName =  "storeLocator";
    var    data= {"region": searchingParam};
    var   headers= {};
    integrationObj.invokeOperation(operationName, headers, data, this.operationSuccess, this.operationFailure);

  },
  operationSuccess:function(res){
    var obj = {"latitude": "", "longitude":"", "name":""};
    var mapData=  res.stores;
    mapData.forEach(function(element){
      obj = {"name":element.name, "lat":element.lat, "lon": element.lng, "image": "pinb.png", "focusImage": "slider.png", "showCallout":true,  "meta": {
        "color": "green ",
        "label": "A "
      }, "calloutData":{"lblStoreName":element.name, "lblCurrentAddress":element.address+", "+element.city+", "+element.region+", "+element.postalCode}};
      locationPins.push(obj);
    }.bind(this));
    if(locationPins.length>0){
      this.view.mapStores.locationData =locationPins;
      locationPins.length = 0;
    }else{
      this.view.mapStores.locationData =[];
      alert("Unfortunately there are not stores in the selected area");
    }
  },
  operationFailure:function(res){
    alert("Error");
  },
  // ||Animation Section||
  //Animation for menu showup
  menuAnimation: function(){
    this.view.MenuComponent.animate(
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
    this.view.MenuComponent.animate(
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
  hideMenuAfterClick: function(){
    this.view.MenuComponent.flxMenuContainer.flxMenuOptions.onTouchStart = ()=>{
      this.menuAnimationHide();
      this.bodyAnimationHide();
    };
  }
});