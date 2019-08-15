var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  colorTM.makeBoard();
  colorTM.makeHud();
  colorTM.addClassToUserBtn();
  d3.select('.userBtnD3ID').on("click", colorTM.startGame);
  d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
});

let colorTM = {
  mainObject: null,
  mainSelect: '.svg-container',
  viewBox: '0 0 400 600',
  running: true,
  score:{
    selectorByID: "Score",
    current: 0,
    maxPlayer: 0,
  },
  bars: {
    width: 30,
    height: 200,
    spawnRate: 20000,
    hardness: 25,
    count: 1,
    timeout: 10000, // this ends game on bar
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
    .attr('viewBox',colorTM.viewBox)
    .classed('shadow',true);
  },
  makeScoreText(){
    d3.select('svg')
    .append('g')
    .classed('scoreTextD3ID',true)
    .append('text')
    .text('Score')
    .attr('x',170)
    .attr('y',340);
  },
  makeScore(){
    d3.select('svg')
    .append('g')
    .classed('scoreD3ID',true)
    .append('text')
    .text(colorTM.score.current)
    .attr('x',170)
    .attr('y',355);
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
    .attr('width',50)
    .attr('height',50)
    .attr('x',175)
    .attr('y',370);
  },
  addClassToUserBtn(){
    d3.select('.userBtnD3ID')
    .classed('pulseAnim',true);
  },
  removeClassFromUserBtn(){
    d3.select('.userBtnD3ID')
    .classed('pulseAnim',false);
  },
  addOpacityToUserBtn(){
    d3.select('.userBtnD3ID')
    .attr('opacity', 0.5);
  },
  removeOpacityToUserBtn(){
    d3.select('.userBtnD3ID')
    .attr('opacity', null);
  },
  removeOnClickFromUserBtn(){
    d3.select('.userBtnD3ID').on("click", null);
  },
  quitBtn(){
    // quitBtn group
    d3.select('svg')
    .append('g')
    .classed('quitBtnD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/quitBtn.svg')
    .attr('width',30)
    .attr('height',30)
    .attr('x',226)
    .attr('y',375);
  },
  addOpacityToQuitBtn(){
    d3.select('.quitBtnD3ID')
    .attr('opacity', 0.5);
  },
  removeOpacityToQuitBtn(){
    d3.select('.quitBtnD3ID')
    .attr('opacity', null);
  },
  removeOnClickFromQuitBtn(){
    d3.select('.quitBtnD3ID').on("click", null);
  },
  colorTapTitle(){
    // colorTapTitle group
    d3.select('svg')
    .append('g')
    .classed('colorTitleD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/colorTapTitle.svg')
    .attr('width',175)
    .attr('height',75)
    .attr('x',100)
    .attr('y',250);
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
  gameOverTitle(){
    // gameOverTitle group
    d3.select('svg')
    .append('g')
    .classed('gameOverTitleD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/gameOverTitle.svg')
    .attr('width',175)
    .attr('height',75)
    .attr('x',100)
    .attr('y',250);
  },
  gameOverInOutAnim(){
    d3.select('.gameOverTitleD3ID')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
    .transition()
    .duration(500)
    .attr('transform', 'translate(' + 0 + ',' + -350 + ')')
    .transition()
    .on('end',function(){
      d3.select('.gameOverTitleD3ID').remove();
    });
  },
  gameOverOutInAnim(){
  d3.select('.gameOverTitleD3ID')
    .attr('transform', 'translate(' + 0 + ',' + -350 + ')')
    .transition()
    .duration(500)
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')');
  },
  gameOverAnim(){
    //alert('Game Over Screen');
    colorTM.gameOverTitle();
    colorTM.gameOverOutInAnim();
    colorTM.addClassToUserBtn();
    d3.select('.userBtnD3ID').on("click", colorTM.restartGame);
  },
  startGame(){
    colorTM.bars.count = 0;
    colorTM.makeBar();
    colorTM.makeScore();
    colorTM.makeScoreText();
    colorTM.inOutAnim();
    colorTM.removeClassFromUserBtn();
    colorTM.addOpacityToUserBtn();
    colorTM.addOpacityToQuitBtn();
    colorTM.removeOnClickFromUserBtn();
    colorTM.removeOnClickFromQuitBtn();
    console.log('startGame');
  },
  quitGame(){
    colorTM.running = true;
    d3.selectAll('g').remove();
    colorTM.bars.count = 0;
    colorTM.score.current = 0;
    colorTM.makeBarClassed();
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
    colorTM.outInAnim();
    colorTM.addClassToUserBtn();
    d3.select('.userBtnD3ID').on("click", colorTM.startGame);
    d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
  },
  gameOver(){
    if(colorTM.running){
      colorTM.running = false;
      d3.select('rect').remove();
      colorTM.gameOverAnim();
      colorTM.removeOpacityToQuitBtn();
      colorTM.removeOpacityToUserBtn();
      d3.select('.colorTitleD3ID').remove();
      d3.select('.quitBtnD3ID').on("click", colorTM.quitGame);
      colorTM.bars.count = 0;
      console.log('gameOver');
    }
  },
  restartGame(){
    colorTM.running = true;
    d3.select('.scoreD3ID').remove();
    colorTM.bars.count = 0;
    colorTM.score.current = 0;
    colorTM.makeBar();
    colorTM.makeScore();
    colorTM.gameOverInOutAnim();
    colorTM.removeOnClickFromUserBtn();
    colorTM.removeOnClickFromQuitBtn();
    colorTM.addOpacityToQuitBtn();
    colorTM.removeClassFromUserBtn();
    colorTM.addOpacityToUserBtn();
    console.log('restartGame');
  },
  makeBarClassed(){
    d3.select('svg')
    .append('g')
    .classed('barD3ID',true);
  },
  makeBar(){
    colorTM.bars.count++;
    console.log(colorTM.bars.count);
    var degrees = Math.floor(Math.random() * 360);
    colors = [
       '#7f59ab',// purple
       '#7ec434', // green
       '#6cc6ef', // blue
       '#f06622', // orange
       '#e21e56', // red
       '#f3bb34', // yellow
     ];
    var barColors = colors[Math.floor(Math.random() * colors.length)];
    d3.select('.barD3ID')
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
    .style('fill', function(d,colors) {
      console.log(barColors);
      return barColors;
    })
    .attr('height', colorTM.bars.width)
    .transition()
    .attr('height', colorTM.bars.height)
    .duration(colorTM.bars.bar.durationTime)
    .transition()
    .attr('height', colorTM.bars.width)
    .delay(colorTM.bars.bar.delayTime)
    .duration(colorTM.bars.bar.durationTime)
    .on('end',function(){
      colorTM.gameOver();
    });
  },
  barClick(){
    d3.select(this).on("click", null);
    colorTM.updateScore(d3.select(this).attr(colorTM.bars.pntValAttr));
    d3.select(this)
    .transition()
    .attr('height', colorTM.bars.width)
    .duration(colorTM.bars.bar.durationTime)
    .on('end',function(){
      d3.select('.scoreD3ID').remove();
      colorTM.makeScore();
      d3.select(this).remove();
      colorTM.makeBar();
    });
  },
  updateScore(value){
    colorTM.score.current = colorTM.score.current + parseInt(value);
    d3.select('.scoreD3ID').text(colorTM.score.current);
    switch(colorTM.bars.count){
      case 5:
        colorTM.makeBar();
        break;
      case 10:
        colorTM.makeBar();
        break;
      case 25:
        colorTM.makeBar();
        break;
      default:
        console.log('no case found');
    }
  },
  makeHud(){
    // draw order is from top to bottom
    colorTM.makeBarClassed();
    colorTM.startHud();
    colorTM.userBtn();
    colorTM.quitBtn();
    colorTM.colorTapTitle();
    colorTM.outInAnim();
  }
};
