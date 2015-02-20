var Giant = function (game, settings) {
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x: 100 * settings.sizeMultiplier, y: 120 * settings.sizeMultiplier};
  this.health = 5 * settings.sizeMultiplier;
  this.gravity = 0.6;
  this.velocity = {x: 0, y: 0};
  this.interestRateForce = -0.1;
  this.stage = settings.stage;

  for (var i in settings) {
    this[i] = settings[i];
  }
  this.currentHealth = this.health;

  this.draw = function (ctx) {
    var img = $("#giant").get(0);
    ctx.fillStyle = settings.color;
    ctx.drawImage(img, this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);

  };

  this.update = function () {
    this.velocity.y += this.gravity;

    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

    game.score.applyForce('boss', this.interestRateForce * this.sizeMultiplier);
    this.center.x = Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x / 2), this.size.x / 2);
    this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y / 2), this.size.y / 2);
  };

  this.collision = function (other) {
    var that = this;
    if (other.id === 'money') {
      this.c.entities.destroy(other);
      this.velocity.y = -10;
      this.currentHealth--;
      if (this.currentHealth < 0) {
        game.score.applyForce('boss', 0);
        this.c.entities.destroy(this);
        _.each(_.range(this.health * 1.5), function () {
          game.c.entities.create(Money, {
            center: _.cloneDeep(that.center),
            velocity: {
              x: 10 * Math.random() - 5,
              y: -3 - 5 * Math.random()
            }
          });
        });
        this.stage.end();
      }
    }
  };
};