let x;
let road, car, coin, truck, barrel;
let startmenu, gameover;
let crash, skid, coinpickup, startsound, carengine;
let barrels = [];
let trucks = [];
let coins = [];
let timer = 100;
let barrelCount = 0;
let truckCount = 0;
let coinCount = 0;
let carY = 450;

var racingmusic = new Audio("racingmusic.wav");
var racingstart = new Audio("racingstart.wav");

function preload() {
  road = loadImage("Road.png");
  truck = loadImage("Truck.png");
  barrel = loadImage("Oil_barrel.png");
  coin = loadImage("Coin.png");
  car = loadImage("Car.png");
  startmenu = loadImage("startmenu.png");
  gameover = loadImage("gameover.png");
  crash = loadSound("crash.wav");
  skid = loadSound("skid.wav");
  coinpickup = loadSound("coinpickup.wav");
  startsound = loadSound("startsound.wav");
  carengine = loadSound("carengine.wav");
  // racingstart = loadSound("racingstart.wav");
  // racingmusic = loadSound("RacingMusic.wav");
}

function setup() {
  var canvas = createCanvas(500, 700);
  canvas.parent("game");
  x = 230;
  mode = 0;
}

function draw() {
  if (mode == 0) {
    background(startmenu);
    racingstart.play();
    racingstart.loop = false;

    textAlign(CENTER);
    fill(255);
    // text("Press Space to Play", width / 2, height / 2 + 50);
  }

  if (mode == 1) {
    background(road);
    racingmusic.play();
    racingmusic.loop = false;

    //car
    image(car, x, carY, 40, 70);
    if (keyIsDown(RIGHT_ARROW)) {
      x = x + 2;
    } else if (keyIsDown(LEFT_ARROW)) {
      x = x - 2;
    }

    //barrel
    for (let i = 0; i < barrels.length; i++) {
      barrels[i].show();
      barrels[i].move();
      barrels[i].overlap(x, carY);
    }

    collectBarrel();
    barrelSpawner();
    barrelCounter();

    //truck
    for (let i = 0; i < trucks.length; i++) {
      trucks[i].show();
      trucks[i].move();
      trucks[i].overlap(x, carY);
    }

    collectTruck();
    truckSpawner();
    truckCounter();

    //coins
    for (let i = 0; i < coins.length; i++) {
      coins[i].show();
      coins[i].move();
      // coins[i].overlap(mouseX, mouseY);
    }

    collectCoin();
    coinSpawner();
    coinCounter();

    timer--;
  }

  //barrel functions
  function collectBarrel() {
    for (let i = 0; i < barrels.length; i++) {
      if (barrels[i].overlap(x, carY)) {
        // skid.setVolume(0.2);
        // skid.play();

        crash.setVolume(0.2);
        crash.play();
        mode = 2;
        // barrels.splice(i, 1);
        // barrelCount++;
      }
    }
  }

  function barrelSpawner() {
    if (timer < 0) {
      let barrel = new Barrel(random(width), 0, 50, 1);
      barrels.push(barrel);

      //timer = 25;
    }
  }

  function barrelCounter() {
    fill(0);
    textSize(20);
    //text("total barrel = " + barrelCount, 25, 25);
  }

  //coin functions
  function collectCoin() {
    for (let i = 0; i < coins.length; i++) {
      if (coins[i].overlap(x, carY)) {
        coinpickup.setVolume(0.03);
        coinpickup.play();
        coins.splice(i, 1);
        coinCount++;
      }
    }
  }

  function coinSpawner() {
    if (timer < 0) {
      let coin = new Coin(random(width), 0, 50, 1);
      coins.push(coin);

      timer = 25;
    }
  }

  function coinCounter() {
    fill(255);
    textSize(20);
    text("Coins collected: " + coinCount, width / 2, 695);
  }

  //truck functions
  function collectTruck() {
    for (let i = 0; i < trucks.length; i++) {
      if (trucks[i].overlap(x, carY)) {
        // trucks.splice(i, 1);
        // truckCount++;
        // skid.setVolume(0.2);
        // skid.play();
        crash.setVolume(0.01);
        crash.play();
        mode = 2;
      }
    }
  }

  function truckSpawner() {
    if (timer < 0) {
      let truck = new Truck(random(width), 0, 50, 1);
      trucks.push(truck);

      //timer = 25;
    }
  }

  function truckCounter() {
    fill(0);
    textSize(20);
  }

  if (mode == 2) {
    background(gameover);
    racingmusic.pause();
    fill(255);
    textAlign(CENTER);
    // text("Game Over", width / 2, height / 2);
    text("Coins collected: " + coinCount, width / 2, 220);
  }
}

function keyPressed() {
  if (mode === 0) {
    if (keyCode === UP_ARROW) {
      carengine.setVolume(0.3);
      carengine.play();
    }
    mode = 1;
  }

  //this is reset code i haven't figured out yet -mason
  // if (mode === 2){
  //   if (keyCode === 13) {
  //     mode = 0;
  //   }
  // }
}
