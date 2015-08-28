(function() {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function(board) {
    this.direction = "E";
    this.segments = [new SnakeGame.Coord(4,3), new SnakeGame.Coord(4,4), new SnakeGame.Coord(4,5)];
    this.snakeLength = this.segments.length;
    this.board = board;
    this.snakeScore = 0;
    this.turning = false;
  }

  Snake.DIRS = {
    "N": new SnakeGame.Coord(-1, 0),
    "E": new SnakeGame.Coord(0, 1),
    "S": new SnakeGame.Coord(1, 0),
    "W": new SnakeGame.Coord(0, -1)
  }

  Snake.prototype.lastEl = function () {
    return this.segments[this.snakeLength-1];
  };

  Snake.prototype.move = function () {
    var delta = Snake.DIRS[this.direction]
    this.segments.push(this.wrap(delta.add(this.lastEl())));
    this.segments = this.segments.slice(1)
    this.turning = false;

    if (!this.isValid()) {
      this.segments = [];
    } else if (this.board.isAppleCoord(this.lastEl())){
      this.buildSnake();
      this.board.removeApple(this.lastEl());
    }
  };

  Snake.prototype.buildSnake = function () {
    var opp = Snake.DIRS[this.direction].opposite();
    var newEl = this.segments[0].add(opp);
    this.segments = [newEl].concat(this.segments);
    this.snakeLength += 1;
    this.snakeScore += 10
  };

  Snake.prototype.turn = function (direction) {
    if (Snake.DIRS[this.direction].isOpposite(Snake.DIRS[direction]) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.direction = direction;
    }

  };

  Snake.prototype.isInSnake = function (row,col) {
    for (var i = 0; i < this.snakeLength; i++) {
      if (new SnakeGame.Coord(row, col).equals(this.segments[i])){
        return true;
      }
    }
    return false;
  };

  Snake.prototype.wrap = function (coord) {
    var row = coord.row % this.board.size;
    var col = coord.col % this.board.size;
    if (row < 0) {
      row += this.board.size;
    }
    if (col < 0) {
      col += this.board.size;
    }
    return new SnakeGame.Coord(row, col);
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  };

})();
