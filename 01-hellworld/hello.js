class coffee {
    name ;
    price ;
    cafeein ;
    constructor(_name,_price,_cafeein){
        this.name  = _name;
        this.price = _price;
        this.cafeein = _cafeein;
    }
    eat(){
        console.log("커피를 마시다");
    }
    throw(){
        console.log("커피를 버리다");
    }
    set(_name){
        this.name = _name;
    }
    getName(){
        return this.name;
    }
}
