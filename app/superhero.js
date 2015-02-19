var SuperHero = function (game, settings) {
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x: 9, y: 9};

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.draw = function (ctx) {
    var img = $("#superhero").get(0);
    //ctx.drawImage(img, this.center.x, this.center.y);
    ctx.fillStyle = settings.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y);
  };

  this.update = function () {
    var speed = 2 * 0.8;
    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.center.y -= speed;
    }
    if (this.c.inputter.isDown(this.c.inputter.DOWN_ARROW)) {
      this.center.y += speed;
    }
    if (this.c.inputter.isDown(this.c.inputter.RIGHT_ARROW)) {
      this.center.x += speed;
    }
    if (this.c.inputter.isDown(this.c.inputter.LEFT_ARROW)) {
      this.center.x -= speed;
    }

    this.center.x = Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x/2), this.size.x/2);
    this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y/2), this.size.y/2);
  };

  this.collision = function (other) {

    other.center.y = this.center.y; // follow the player
  };

};