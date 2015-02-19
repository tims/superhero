var Score = function() {
  this.score = 1000;
  this.baseInterestRate = 0.1;
  this.marketForces = {};

  this.updateScore = _.debounce(function() {
    this.score += (this.score * this.interestRate / 20);
  }, 500, {maxWait: 500});

  this.applyForce = function(name, force) {
    this.marketForces[name] = force;
  };

  this.update = function() {
    this.interestRate = this.baseInterestRate + _.reduce(_.values(this.marketForces), function(acc, val) {
      return acc + val;
    }, 0);

    this.updateScore();
    $(".balance").text(this.score.toFixed(2));
    $(".interestRate").text((this.interestRate * 100).toFixed(0));
  };
};