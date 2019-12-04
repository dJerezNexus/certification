define({ 

onViewCreated: function(){
	this.view.flxCartImage.onTouchStart = ()=>{
     this.executeOnParent("removeItem"); 
    }
} 

 });