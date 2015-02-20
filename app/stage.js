var Stage = function (game, settings) {
  this.c = game.c;
  this.ticks = 0;
  this.bossSizeMultiplier = 1;
  this.bossMessages = {
    begin: 'Oh oh...',
    fight: 'Here comes the financial crisis! Act quickly: reinvest your super to ensure prosperous retirement!'
  };

  this.bossTick = 200;

  this.contributionsTick = 400;
  this.numberOfDollars = 5 * this.bossSizeMultiplier;

  for (var i in settings) {
    this[i] = settings[i];
  }

  this.spawnBoss = function () {
    var that = this;
    game.boss = that.c.entities.create(Giant, {
      sizeMultiplier: this.bossSizeMultiplier,
      stage: that,
      center: {x: game.size.x * .8, y: game.size.y}, color: "#f07"
    });
  };

  this.spawnContributions = function () {
    _.each(_.range(this.numberOfDollars), function () {
      game.c.entities.create(Money, {
        center: {
          x: game.size.x * Math.random() / 2,
          y: 30 + 100 * Math.random()
        },
        velocity: {
          x: 0,
          y: 0
        }
      });
    });
  };

  this.update = function () {
    this.ticks++;

    if (this.ticks === Math.round(this.bossTick / 3)) {
      game.message.setMessage(this.bossMessages.begin);
    }
    if (this.ticks === Math.round(this.bossTick * 2 / 3)) {
      game.message.setMessage(this.bossMessages.fight);
    }

    if (this.ticks === this.bossTick && !this.boss) {
      this.spawnBoss();
    }

    if (this.ticks % this.contributionsTick === 5) {
      this.spawnContributions();
    }
  };

  this.end = function () {
    game.message.setMessage('Phew.. Crisis over!', 5000);
    this.c.entities.destroy(this);
    game.stageOver();
  }
};