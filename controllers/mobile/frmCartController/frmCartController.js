var items = [];
var newElem= [];

define({ 

  onNavigate: function(){
    this.setCartData();

    this.view.homeHeaderComponent.btnHamburgerMenu.onClick = ()=>{
      this.menuAnimation();
      this.bodyAnimation();
    };
    this.view.flxMain.left = "0%";  
    this.view.MenuComponent.left = "-85%";
  },
  setCartData: function(){
    var totalPrice = "";
    var arrPrices = [];
    if(cartItems.length > 0){
      cartItems.forEach(function(element){
        var obj = {"name": element.name, "price":element.price,"image": "cartremoveitem.png", template: ""};
        if(element.sale == "true"){
          obj.template = "flxSaleItemsTemplate";
        }else{
          obj.template = "flxCartItems";
        }

        var sub = obj.price.substring(1);
        totalPrice = parseFloat(sub);
        arrPrices.push(totalPrice);
        this.view.lblTotal.text = "$"+totalPrice;
        items.push(obj);
        newElem.push(element.new);

      }.bind(this));


     var reduced = arrPrices.reduce(myFunc);

      function myFunc(total, num) {
        return total + num;
      }
      this.view.lblTotal.text ="Total: $"+reduced
      this.view.segCart.widgetDataMap = {lblProductName: "name", lblPrice: "price", imgRemoveItem: "image"};
      this.view.segCart.setData(items);
      items.length = 0;


    }else{
      this.view.lblProductInfo.text = "Your shopping cart is Empty. please browse Products and add them to your Cart.";
      this.view.flxProductsDetails.skin = "";
      this.view.lblProductInfo.skin = "";
    }
    function test(item){
      return item == "true";
    }
    if(newElem.some(test) === true){
      this.view.lblProductInfo.text = "You have items that are New. Shipping may be delayed.";
      this.view.flxProductsDetails.skin = "CopyslFbox0d522868f16b841";
       this.view.lblProductInfo.skin = "CopydefLabel0f0f91cdbbe444b"; 

    }else{
      this.view.lblProductInfo.text = "Normal Shipping Schedule"
      this.view.flxProductsDetails.skin = "CopyslFbox0dc8dcee1e81841";
      this.view.lblProductInfo.skin = ""; 
    }

  },

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
  //Animation for deleting cart items
  removeItem:function(){
     var selectedRow  = this.view.segCart.selectedRowIndex[0];
//     var animationObj  = kony.ui.createAnimation({
//       "0":{"left":"150%", "stepConfig":{"timingFunction": kony.anim.LINEAR}},
//       "100":{"height":"0dp", "stepConfig":{"timingFunction": kony.anim.LINEAR}}
//     });
//     var configObj = {
//       "duration":1,
//       "fillMode":kony.anim.FILL_MODE_FORWARDS
//     };
//     var animationObject = {animationObj, configObj};

    this.view.segCart.removeAt(selectedRow, 0);
  }


});