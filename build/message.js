var Message = function(game) {
  this.c = game.c;
  this.message = null;

  this.draw = function() {
    $('.message').text(this.message || '...');
  };

  this.setMessage = function(message, timeout) {
    console.log(message, timeout);
    this.message = message;
    if (timeout) {
      var that = this;
      setTimeout(function() {
        that.message = null
      }, timeout);
    }
  };

  this.update = function() {
  };
};