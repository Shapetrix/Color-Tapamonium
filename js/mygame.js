var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  colorTM.makeBoard();
  colorTM.makeHud();
  colorTM.outInAnim();
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
    width: 20,
    height: 200,
    count: 1,
    timeout: 10000,
    pntValAttr: "pointValue",
    barObjectID: "rect.bar",
    bar: {
      durationTime:2000,
      delayTime:1000,
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
    //alert('lets Play!');
    colorTM.makeBar();
    colorTM.inOutAnim();
    d3.select('.userBtnD3ID').remove();
    colorTM.pauseBtn();
    d3.select('.pauseBtnD3ID').on("click", colorTM.pauseGame);
  },
  makeScore(){
    d3.select('svg')
    .append('g')
    .classed('scoreD3ID',true)
    .append('text')
    .text(colorTM.score.current)
    .attr('x',160)
    .attr('y',350);
  },
  makeHud(){
    // draw order is from top to bottom
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
    colorTM.makeScore();
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
    colorTM.outInAnim();
  },
  inOutAnim(){
    d3.select('.colorTitleD3ID')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
    .transition()
    .duration(500)
    .attr('transform', 'translate(' + 0 + ',' + -350 + ')');
  },
  outInAnim(){
    d3.select('.colorTitleD3ID')
    .attr('transform', 'translate(' + 0 + ',' + -350 + ')')
    .transition()
    .duration(500)
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')');
  },
  quitGame(){
    //alert('i quit');
    d3.select('.barD3ID').remove();
    d3.select('.startHudD3ID').remove();
    d3.select('.colorTitleD3ID').remove();
    d3.select('.pauseBtnD3ID').remove();
    d3.select('.userBtnD3ID').remove();
    d3.select('.quitBtnD3ID').remove();
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
    d3.select('.userBtnD3ID').on("click", colorTM.startGame);
    d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
  },
  pauseGame(){
    alert('pause game!');
    barTimer.stop();
  },
  gameOver(){
    alert('game over!');
    colorTM.gameOverAnim()
  },
  makeBar(){
    var degrees = Math.floor(Math.random() * 360);
    d3.select('svg')
    .append('g')
    .classed('barD3ID',true)
    .append('rect')
    .on('click', colorTM.barClick)
    .attr('height', colorTM.bars.width)
    .attr('width', colorTM.bars.width)
    .attr('rx', colorTM.bars.width/2)
    .attr('ry', colorTM.bars.width/2)
    .attr('x', -colorTM.bars.width/2)
    .attr('y', -colorTM.bars.width/2)
    .attr(colorTM.bars.pntValAttr,colorTM.bars.bar.pointValue)
    .attr('transform', 'translate(' + 195 + ',' + 337 + ') rotate('+degrees+')')
    .style('fill', colorTM.bars.bar.attr.fill);
    d3.selectAll('rect')
    .attr('height', colorTM.bars.width)
    .transition()
    .attr('height', colorTM.bars.height)
    .duration(colorTM.bars.bar.durationTime)
    .transition()
    .attr('height', colorTM.bars.width)
    .delay(colorTM.bars.bar.delayTime).duration(colorTM.bars.bar.durationTime);
    barTimer = d3.timer(function(duration){
      if (duration > colorTM.bars.bar.durationTime){
        colorTM.gameOver();
        barTimer.stop();
      }
    });
  },
  barClick(){
    barTimer.stop();
    colorTM.updateScore(d3.select(this).attr(colorTM.bars.pntValAttr));
    d3.select(this)
    .attr('height',10)
    .transition()
    .on('end',function(){
      d3.select(this).remove();
      d3.select('.barD3ID').remove();
      colorTM.makeBar();
    });
  },
  updateScore(value){
    colorTM.score.current = colorTM.score.current + parseInt(value);
    d3.select('.scoreD3ID').text(colorTM.score.current);
  },
  gameOverAnim(){

  }
};
