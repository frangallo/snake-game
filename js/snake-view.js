(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var SnakeView = SnakeGame.SnakeView = function ($el) {
    this.board = new SnakeGame.Board(15);
    this.$el = $el;
    this.bindEvents();
    this.setupBoard();
    this.intervalId = window.setInterval(
      this.step.bind(this),
      SnakeView.STEP_MILLIS
    );
  }

  SnakeView.STEP_MILLIS = 75;

  SnakeView.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      this.gameReset();
    }
  };

  SnakeView.prototype.gameReset = function (){
    $('body').append("<div>").addClass('m-background')
    $("h3.final-score").html("Final Score: " + this.board.snake.snakeScore + "<br><h4>Too Much Tequilla!</h4>")
    $(".m-content").show();
    $("#play-again-button").click(function(){
      location.reload();
    });
  },

  SnakeView.prototype.intervalTime = function () {
    var level = (Math.floor(this.board.snake.snakeScore/100) + 1);
    return (2000 / level);
  };

  SnakeView.prototype.bindEvents = function () {
    var that = this;
    $(window).on("keydown", function(event) {
      that.handleKeyEvent(event.keyCode);
    });
  };

  SnakeView.prototype.handleKeyEvent = function (key) {
    switch (key) {
      case 38:
        this.board.snake.turn("N");
        break;
      case 37:
        this.board.snake.turn("W");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
      case 78:
        location.reload();
        break;
      case 80:
        this.board.switchPause();
        break;
    }
  };

  SnakeView.prototype.setupBoard = function () {
    for (var i = 0; i < this.board.size; i++) {
      this.$el.append($("<div></div>").addClass("row").attr("data-row-number", i));
    }
  };

  SnakeView.prototype.updateScore= function () {
    $("h3.snake-score").html("Score: " + this.board.snake.snakeScore + "   " +"  Level: " + (Math.floor(this.board.snake.snakeScore/100) + 1));
  };

  SnakeView.prototype.render = function () {
    $(".snake").remove();
    $(".snake-head").remove();
    $(".tile").remove();
    $(".apple").remove();
    $("br").remove();
    this.updateScore();

    this.board.createApples(4);

    for (var i = 0; i < this.board.size; i++){
      var $row = $($(".row")[i])
      for (var j = 0; j < this.board.size; j++) {
        if (this.board.snake.isInSnake(i, j)) {
          var head = [this.board.snake.head().row, this.board.snake.head().col,]
          if (head[0] === i && head[1] === j){
            $row.append($("<div></div>").addClass("snake-head"))
          } else{
            $row.append($("<div></div>").addClass("snake"));
          }
        } else if (this.board.isApple(i, j)) {
          $row.append($("<div></div>").addClass("apple"));
        } else {
          $row.append($("<div></div>").addClass("tile"));
        }
      }
      $row.append($("<br></br>"));
    }
  };

})();
