class Cell {
  
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.colorRandomzer = Math.floor(random(6));
    this.c = color(red[this.colorRandomzer], green[this.colorRandomzer], blue[this.colorRandomzer]);
    this.changeAble = false;
    this.colorCode = this.colorRandomzer;
  }
  show() {
    //stroke(0);
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, this.w);
  }
}


