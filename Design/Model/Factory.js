/********************** 简单工厂模式 ************************/
/*  BicycleShop class */
var BicycleShop = function(){
  
};

BicycleShop.prototype = {
    sellBicycle: function(model){
        var bicycle = BicycleFactory.createBicycle(model);
        bicycle.assemble();
        bicycle.wash();
        
        return bicycle;
    }
};

/*  BicycleFactory namespace, with more models  */
var BicycleFactory = {
    createBicycle: function(model){
        var bicycle;
        switch(model){
            case 'The Speedster':
                bicycle = new Speedster();
                break;
            case 'The Lowrider':
                bicycle = new Loerider();
                break;
            case 'The Comfort Cruiser':
            default:
                bicycle = new ComfortCruiser();
        }
        Interface.ensureImplements(bicycle, Bicycle); //确保对象实现了接口
        return bicycle;
    }
};

/*  The Bicycle Interface  */
var Bicycle = new Interface('Bicycle', ['assemble', 'wash', 'ride', 'repair']);

/*  Speedster class  */
var speedster = function(){
    //...
};
speerster.prototype = {
    assemble: function(){},
    wash: function(){},
    ride: function(){},
    repair: function(){}
};


/********************** 真正工厂模式 ************************/
/*  BicycleShop class */
