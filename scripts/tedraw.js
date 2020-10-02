module.exports = {
  drawcol(col){
    Draw.color(Color.valueOf(col));
  },
  getcol(col){
    return Color.valueOf(col);
  }
};