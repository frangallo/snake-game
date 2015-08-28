(function (){
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {}
  }

  var Coord = SnakeGame.Coord = function (row, col){
    this.row = row;
    this.col = col;
  }

  Coord.prototype.add = function (otherCoord) {
    return new Coord((this.row + otherCoord.row), (this.col + otherCoord.col));
  };

  Coord.prototype.equals = function (otherCoords) {
    return otherCoords != null && this.row === otherCoords.row && this.col === otherCoords.col;
  };

  Coord.prototype.opposite = function () {
    return new Coord((-1 * this.row), (-1 * this.col))
  };
  Coord.prototype.isOpposite = function (coord2) {
    return (this.row == (-1 * coord2.row)) && (this.col == (-1 * coord2.col));
  };
})();
