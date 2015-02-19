var Game = function () {
  this.size = {x: 1000, y: 300};
  this.c = new Coquette(this, "canvas", this.size.x, this.size.y, "#DDD");

  // super-hero
  this.c.entities.create(SuperHero, {
    center: {x: 5, y: 295}, color: "#f07"
  });

  this.c.entities.create(Giant, {
    center: {x: 800, y: 300}, color: "#f07"
  });
};

window.addEventListener('load', function () {
  new Game();
});