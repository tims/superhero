var Stage = function(game) {
  this.c = game.c;
  this.ticks = 0;
  this.bossMessages = {
    begin: 'Oh oh...',
    fight: 'Here comes the financial crisis!'
  };

  this.bossTick = 200;

  this.contributionsTick = 100;

  this.spawnBoss = function() {
    var that = this;
    game.message.setMessage(that.bossMessages.begin);

    setTimeout(function() {
      game.message.setMessage(that.bossMessages.fight, 5000);
    }, 2000);

    setTimeout(function() {
      game.boss = that.c.entities.create(Giant, {
        center: {x: game.size.x * .8, y: game.size.y}, color: "#f07"
      });
    }, 3000);
  };

  this.spawnContributions = function() {
    this.c.entities.create(Money, {
      center: {
        x: 100,
        y: 30
      },
      velocity: {
        x: 0,
        y: 0
      }
    });
  };

  this.update = function() {
    this.ticks++;
    if (this.ticks === this.bossTick && !this.boss) {
      this.spawnBoss();
    }

    if (this.ticks % this.contributionsTick === 0) {
      this.spawnContributions();
    }
  };
};