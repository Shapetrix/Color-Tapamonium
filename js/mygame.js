var d3;
document.addEventListener('DOMContentLoaded', function(event) {
//  colorTM.makeHud();
  colorTM.makeBoard();
//  colorTM.startGame();
});

let colorTM = {
  mainObject: null,
  mainSelect: '.svg-container',
  viewBox: '0 0 400 800',
  score:{
    selectorByID: "Score",
    current: 0,
    maxPlayer: 0,
  },
  hub: {
    center:'(200,400)'
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

    colorTM.main = d3.select(colorTM.mainSelect);
    colorTM.svg = colorTM.main.append('svg')
    colorTM.svg.attr('viewBox',colorTM.viewBox)

    colorTM.svg.append('g')
    .classed('colorTitleD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/startHud.svg')
    .attr('width',300)
    .attr('height',300)
    .attr('x',0)
    .attr('y',0)

    colorTM.svg.append('g')
    .classed('colorTitleD3ID',true)
    .append('svg:image')
    .attr('xlink:href', './img/colorTapTitle.svg')
    .attr('width',300)
    .attr('height',200)
    .attr('x',50)
    .attr('y',0);

  },
  makeHud(){

  },
  startGame(){

  },
  quitGame(){
    alert('i quit');
  },
  makeBar(){
    var degrees = Math.floor(Math.random() * 360);
    d3.select('svg')
    .append('rect')
    .attr('height', 10)
    .attr('width', colorTM.bars.width)
    .attr('rx', colorTM.bars.width/2)
    .attr('ry', colorTM.bars.width/2)
    .attr('x', -colorTM.bars.width/2)
    .attr('y', -colorTM.bars.width/2)
    .attr(colorTM.bars.pntValAttr,colorTM.bars.bar.pointValue)
    .attr('transform', "translate(0, 0) rotate("+degrees+")")
    .style('fill', colorTM.bars.bar.attr.fill);
    d3.selectAll('rect')
    .attr('height', 10)
    .transition()
    .attr('height', colorTM.bars.height)
    .duration(colorTM.bars.bar.durationTime)
    .transition()
    .attr('height', 10)
    .delay(colorTM.bars.bar.delayTime).duration(colorTM.bars.bar.durationTime);
    barTimer = d3.timer(function(duration){
      if (duration > colorTM.bars.bar.durationTime){
        colorTM.quitGame();
        barTimer.stop();
      }
    });
  }
};
