var Giant = function (game, settings) {
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x:150, y:160};
  this.health = 5;

  this.interestRateForce = -0.20;

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.draw = function (ctx) {
    var img = $("#giant").get(0);
    ctx.fillStyle = settings.color;
    ctx.drawImage(img, this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);

  };

  this.update = function () {
    game.score.applyForce('boss', this.interestRateForce);
    this.center.x = Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x/2), this.size.x/2);
    this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y/2), this.size.y/2);
  };

  this.collision = function (other) {
    if (other.id === 'money') {
      this.c.entities.destroy(other);
      this.health--;
      if (this.health < 0) {
        game.score.applyForce('boss', 0);
        this.c.entities.destroy(this);
        game.message.setMessage('Phew.. Crisis over!', 5000);
      }
    }
  };
};