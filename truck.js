class Truck {
  constructor(tempX, tempY, tempR, tempSpeed) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    this.speed = tempSpeed;
  }

  show() {
    image(truck, this.x, this.y, 35, 80);
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
    this.y = this.y + this.speed + 2;
  }
}

