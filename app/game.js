var Game = function () {
  this.size = {x: 1200, y: 400};
  this.c = new Coquette(this, "canvas", this.size.x, this.size.y, "#DDD");
  // super-hero
  this.c.entities.create(SuperHero, {
    center: {x: 0, y: this.size.y}, color: "#f07"
  });

  this.score = this.c.entities.create(Score, {});
  this.scoreChart = this.c.entities.create(ScoreChart, {});
  this.stage = this.c.entities.create(Stage, {});
  this.message = this.c.entities.create(Message, {});
};

window.addEventListener('load', function () {
  new Game();
});