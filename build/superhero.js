var SuperHero = function (game, settings) {
  this.id = 'superhero';
  this.c = game.c;
  this.gameSize = game.size;
  this.size = {x: 35, y: 35};

  this.velocity = {x: 0, y: 0};
  this.gravity = 0.4;
  this.rateOfFire = 300;

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.levelup = function() {
    this.rateOfFire = 50 + this.rateOfFire * 0.5;
  };

  this.draw = function (ctx) {
    var img = $("#superhero").get(0);
    ctx.drawImage(img, this.center.x - this.size.x / 2, this.center.y - this.size.y / 2, this.size.x, this.size.y);
  };

  this.throwMoney = _.debounce(function () {
    var moneyValue = 10;
    if (game.score.score > moneyValue) {
      this.c.entities.create(Money, {
        center: _.cloneDeep(this.center),
        velocity: {
          x: 10 * (this.velocity.x >= 0 ? 1 : -1),
          y: Math.min(this.velocity.y / 2, 0)
        }
      });
      game.score.score -= moneyValue;
    }
  }, this.rateOfFire, {leading: true, trailing: false, maxWait: this.rateOfFire});

  this.update = function () {
    this.velocity.y += this.gravity;
    var speed = 7;

    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.velocity.y = -5;
    }

    if (this.c.inputter.isDown(this.c.inputter.RIGHT_ARROW)) {
      this.velocity.x = speed;
    } else if (this.c.inputter.isDown(this.c.inputter.LEFT_ARROW)) {
      this.velocity.x = -speed;
    } else {
      this.velocity.x = 0;
    }
    this.center.y += this.velocity.y;
    this.center.x += this.velocity.x;

    if (this.c.inputter.isDown(this.c.inputter.SPACE)) {
      this.throwMoney();
    }

    this.center.x = Math.max(Math.min(this.center.x, this.gameSize.x - this.size.x / 2), this.size.x / 2);
    this.center.y = Math.max(Math.min(this.center.y, this.gameSize.y - this.size.y / 2), this.size.y / 2);
  };

  this.collision = function (other) {
  };

};