class Coin {
  constructor(tempX, tempY, tempR, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    this.speed = tempSpeed;
  }

  show() {
    image(coin, this.x, this.y, 15, 15);
  }

  overlap(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.y = this.y + this.speed + 1;
  }
  
//   collide(px, py){
//     let d = dist(other.x, other.y, this.x, this.y);

//     if (d < 30) {
//       console.log("Works");
//     }
//   }
  
}

