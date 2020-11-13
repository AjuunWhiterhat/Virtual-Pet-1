
var dog, normalDog, happyDog, foodStock, foodS, database

function preload(){

    normalDog = loadImage("dogImg.png");
    happyDog = loadImage("dogImg1.png");

}

function setup(){

    var canvas = createCanvas(500,500);

    dog = createSprite(250,240,10,10);
    dog.addImage(normalDog);
    dog.scale = 0.12;

    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on('value', readStock);
}

function draw(){
    background(46,139,87);

    fill("white");
    textSize(12);
    text("Note: Press UP_ARROW To Feed Drago Milk !",130,20);
    
    text("Food remaining : "+foodS,200,150);



    if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happyDog);
    }

    if(foodS===0){
        dog.addImage(normalDog);
    }

    drawSprites();
}

function readStock(data){
   foodS=data.val(); 
}


function writeStock(x){

    if(x<=0){
        x=0;    
    }

    else{
        x=x-1;
        
   }

    database.ref('/').update({
      Food:x
    })
}



