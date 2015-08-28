(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function(size) {
    this.size = size;
    this.setupBoard();
    this.snake = new SnakeGame.Snake(this);
    this.apples = [];
  }

  Board.prototype.setupBoard = function () {
    this.grid = [];
    for (var i = 0; i < this.size; i++) {
      this.grid.push([]);
      var row = this.grid[i];
      for (var j = 0; j < this.size; j++) {
        row.push(null);
      }
    }
  };

  Board.prototype.createApples = function (numApples) {
    while (this.apples.length < numApples){
      var coord = new SnakeGame.Coord(Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size));
      if (!this.snake.isInSnake(coord)) {
        this.apples.push(coord);
      }
    }

  };

  Board.prototype.isApple = function (row, col) {
    for (var i = 0; i < this.apples.length; i++) {
      if (new SnakeGame.Coord(row, col).equals(this.apples[i])){
        return true;
      }
    }
    return false;
  };

  Board.prototype.isAppleCoord = function (coord) {
    return this.isApple(coord.row, coord.col);
  };

  Board.prototype.removeApple = function (coord) {
    var index = -1;
    for (var i = 0; i < this.apples.length; i++) {
      if (coord.equals(this.apples[i])){
        index = i;
        break;
      }
    }
    this.apples.splice(index, 1);
  };
})();
