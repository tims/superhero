var Giant = function (game, settings) {
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x:50, y:100};

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.draw = function (ctx) {
    ctx.fillStyle = settings.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y);
  };

  this.update = function () {
    this.center.x = Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x/2), this.size.x/2);
    this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y/2), this.size.y/2);
  };

  this.collision = function (other) {

  };

};