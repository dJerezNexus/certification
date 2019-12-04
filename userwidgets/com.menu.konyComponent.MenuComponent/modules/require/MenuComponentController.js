define(function() {

  return {
    onViewCreated: function(){
 	this.view.flxCart.onTouchStart = ()=>{
      this.navigateToCart();
      
    };
      this.view.flxHome.onTouchStart = ()=>{
      this.navigateToHome();
    };
      this.view.flxStores.onTouchStart = ()=>{
        this.navigationToStores();
      };
    },
    navigateToHome: function(){
      var navigation = new kony.mvc.Navigation("frmHome");
      navigation.navigate();
    },
    navigateToCart: function(){
      var navigation = new kony.mvc.Navigation("frmCart");
      navigation.navigate();
    },
    navigationToStores: function(){
      var navigate = new kony.mvc.Navigation("frmStores");
      navigate.navigate();
    }
  };
});