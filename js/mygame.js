var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  colorTM.makeBoard();
  colorTM.makeHud();
  d3.select('.userBtnD3ID').on("click", colorTM.startGame);
  d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
});

let colorTM = {
  mainObject: null,
  mainSelect: '.svg-container',
  viewBox: '0 0 400 600',
  score:{
    selectorByID: "Score",
    current: 0,
    maxPlayer: 0,
  },
  bars: {
    width: 30,
    height: 200,
    count: 1,
    timeout: 10000,
    pntValAttr: "pointValue",
    barObjectID: "rect.bar",
    bar: {
      durationTime:800,
      delayTime:350,
      degrees: 360,
      pointValue: 5,
      attr:{
        fill: '#6cc6ef'
      }
    }
  },
  makeBoard(){
    // selects the svg-container and appends an svg tag and sets a viewBox
    colorTM.main = d3.select(colorTM.mainSelect);
    colorTM.main.append('svg')
    .attr('viewBox',colorTM.viewBox);
  },
  startGame(){
    colorTM.makeBar();
    colorTM.makeScore();
    colorTM.makeScoreText();
    colorTM.addAnimationClass();
    colorTM.addBarD3IDAnimClass();
  },
  addAnimationClass(){
    d3.select('.colorTitleD3ID')
    .classed('colorTitleD3ID', false)
    .classed('colorTitleD3IDOut',true);
  },
  addBarD3IDAnimClass(){
    d3.select('rect')
    .classed('barD3IDAnim',true);
  },
  makeScoreText(){
    d3.select('svg')
    .append('g')
    .classed('scoreTextD3ID',true)
    .append('text')
    .text('Score')
    .attr('x',160)
    .attr('y',300);
  },
  makeScore(){
    d3.select('svg')
    .append('g')
    .classed('scoreD3ID',true)
    .append('text')
    .text(colorTM.score.current)
    .attr('x',160)
    .attr('y',325);
  },
  startHud(){
    // startHud group
    d3.select('svg')
    .append('g')
    .classed('startHudD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/startHud.svg')
    .attr('width',175)
    .attr('height',175)
    .attr('x',110)
    .attr('y',250);
  },
  userBtn(){
    // userBtn group
    d3.select('svg')
    .append('g')
    .classed('userBtnD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/playBtn.svg')
    .attr('width',55)
    .attr('height',55)
    .attr('x',170)
    .attr('y',365);
  },
  quitBtn(){
    // quitBtn group
    d3.select('svg')
    .append('g')
    .classed('quitBtnD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/quitBtn.svg')
    .attr('width',35)
    .attr('height',35)
    .attr('x',225)
    .attr('y',368);
  },
  pauseBtn(){
    // pauseBtn group
    d3.select('svg')
    .append('g')
    .classed('pauseBtnD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/pauseBtn.svg')
    .attr('width',55)
    .attr('height',55)
    .attr('x',170)
    .attr('y',365);
  },
  colorTapTitle(){
    // colorTapTitle group
    d3.select('svg')
    .append('g')
    .classed('colorTitleD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/colorTapTitle.svg')
    .attr('width',200)
    .attr('height',100)
    .attr('x',90)
    .attr('y',245);
  },
  quitGame(){
    d3.selectAll('g').remove();
    colorTM.score.current = 0;
    colorTM.makeBarClassed();
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
    d3.select('.userBtnD3ID').on("click", colorTM.startGame);
    d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
  },
  pauseGame(){
    alert('pause game!');

  },
  gameOver(){
    alert('game over!');
    colorTM.gameOverAnim();
  },
  makeBarClassed(){
    d3.select('svg')
    .append('g')
    .classed('barD3ID',true);
  },
  makeBar(){
    var degrees = Math.floor(Math.random() * 360);
    d3.select('.barD3ID')
    .append('rect')
    .on('click', colorTM.barClick)
    .attr('rx', colorTM.bars.width/2)
    .attr('ry', colorTM.bars.width/2)
    .attr('x', -colorTM.bars.width/2)
    .attr('y', -colorTM.bars.width/2)
    .attr(colorTM.bars.pntValAttr,colorTM.bars.bar.pointValue)
    .attr('transform', 'translate(' + 195 + ',' + 337 + ') rotate('+degrees+')')
    .style('fill', colorTM.bars.bar.attr.fill)
    .on('end', function(){
      colorTM.gameOver();
    });
  },
  barClick(){
    colorTM.updateScore(d3.select(this).attr(colorTM.bars.pntValAttr))
    d3.select('.scoreD3ID').remove();
    colorTM.makeScore();
  },
  updateScore(value){
    colorTM.score.current = colorTM.score.current + parseInt(value);
    d3.select('.scoreD3ID').text(colorTM.score.current);
  },
  makeHud(){
    // draw order is from top to bottom
    colorTM.makeBarClassed();
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
  },
  gameOverAnim(){

  }
};
