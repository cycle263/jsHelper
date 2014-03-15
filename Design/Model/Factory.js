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
/*  BicycleShop class(abstract) */
var BicycleShop = function(){
    //...
};
BicycleShop.prototype = {
    sellBicycle: function(model){
        var bicycle = this.createBicycle(model);
        bicycle.assemble();
        bicycle.wash();
        return bicycle;
    },
    createBicycle: function(model){
        throw new Error('Unsupported operation on an abstract class.');
    }
};

/*  GanitBicycleShop class  */
var GanitBicycleShop = function(){};
extend(GanitBicycleShop, BicycleShop);
GanitBicycleShop.prototype.createBicycle = function(model){
    var bicycle;
    
    switch(model){
        case 'The Speedster':
            bicycle = new GanitSpeedster();
            break;
        case 'The Lowrider':
            bicycle = new GanitLowrider();
            break;
        case 'The Flatlander':
            bicycle = new GanitFlatlander();
            break;
        case 'The Comfort Cruiser':
        default:
            bicycle = new GanitComfortCruiser();
    }
    Interface.ensureImplements(bicycle, Bicycle);
    return bicycle;
};

/*  GeneralBicycleShop class  */
var GeneralBicycleShop = function(){};
extend(GeneralBicycleShop, BicycleShop);
GeneralBicycleShop.prototype.createBicycle = function(model){
    var bicycle;
    
    switch(model){
        case 'The Speedster':
            bicycle = new GeneralSpeedster();
            break;
        case 'The Lowrider':
            bicycle = new GeneralLowrider();
            break;
        case 'The Flatlander':
            bicycle = new GeneralFlatlander();
            break;
        case 'The Comfort Cruiser':
        default:
            bicycle = new GeneralComfortCruiser();
    }
    Interface.ensureImplements(bicycle, Bicycle);
    return bicycle;
};
