var Game = function () {
  this.size = {x: 1000, y: 400};
  this.c = new Coquette(this, "canvas", this.size.x, this.size.y, "#DDD");
  // super-hero

  var that = this;
  var running = false;

  function getGameOverImage(score) {
    return 'images/gameover-1.jpg'
  }

  this.hero = this.c.entities.create(SuperHero, {
    center: {x: 0, y: this.size.y}, color: "#f07"
  });

  this.score = this.c.entities.create(Score, {});
  this.scoreChart = this.c.entities.create(ScoreChart, {});
  this.stage = this.c.entities.create(Stage, {});
  this.message = this.c.entities.create(Message, {});
  this.completedStages = 0;
  this.totalStages = 4;

  function gameOver() {
    var finalScore = that.score.score;
    _.map(that.c.entities.all(), function (entity) {
      that.c.entities.destroy(entity);
    });
    $('.gameover').css('display', 'block');
    $('.game').css('display', 'none');
    $('.gameover-image').attr('src', getGameOverImage(finalScore));
  }

  this.stageOver = function () {
    this.completedStages++;

    if (this.completedStages >= this.totalStages) {
      setTimeout(gameOver, 4000);
    } else {
      this.hero.levelup();
      this.stage = this.c.entities.create(Stage, {
        bossTick: 400,
        bossSizeMultiplier: this.stage.bossSizeMultiplier + .5,
        contributionsTick: 400
      });
    }
  };

};

window.addEventListener('load', function () {
  new Game();
});