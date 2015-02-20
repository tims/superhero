var Tax = function (game, settings) {
  this.id = 'tax';
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x: 25, y: 10};
  this.gravity = 0.1;
  this.ticks = 0;
  this.value = settings.value || 10;
  this.maxTicks = 300;

  this.velocity = {
    x: 6,
    y: settings.velocity.y
  };

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.draw = function (ctx) {
    ctx.font = "30px Georgia";
    ctx.fillStyle = '#FF0000';
    ctx.fillText(this.text, this.center.x - this.size.x / 2, this.center.y + this.size.y / 2);
  };

  this.update = function () {
    this.ticks ++;
    this.velocity.y += this.gravity;

    if (this.ticks > this.maxTicks) {
      this.c.entities.destroy(this);
    }

    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
    if (this.center.x != Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x / 2), this.size.x / 2)) {
      this.c.entities.destroy(this);
      console.log("destroyed");
    }
    if (this.center.y != Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y / 2), this.size.y / 2)) {
      this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y / 2), this.size.y / 2);
      if (this.ticks > 5) {
        this.velocity = {
          x: 0,
          y: 0
        };
        this.dead = true;
      }
    }
  };

  this.collision = function (other) {
    if (other.id === 'superhero') {
      game.score.score -= this.value;
      this.c.entities.destroy(this);
    }
  };

};