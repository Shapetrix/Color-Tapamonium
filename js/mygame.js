var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  /*
  d3.xml('img/playBtn.svg').mimeType('image/svg+xml').get(function(error,xml){
    if (error) throw error;
    d3.select('#colorTitleD3ID').node().appendChild(xml.documentElement);
  });
  */
  d3.select('#userBtnD3ID').on("click", colorTM.startGame);
  d3.select('#quitBtnD3ID').on("click", colorTM.quitGame);
  d3.select('#colorTitleD3ID')
  .attr('transform', 'translate(0,-300)')
  .transition('#colorTitleD3ID')
  .duration(1200)
  .attr('transform', 'translate(0,0)');
});

let colorTM = {
  score: {
    current: 0,
  },
  bars: {
    width: 30,
    height: 150,
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
  startGame(){
    //alert('play');
    d3.select('#colorTitleD3ID')
    .attr('transform', 'translate(0,0)')
    .transition('#colorTitleD3ID')
    .duration(1200)
    .attr('transform', 'translate(0,-300)');
    colorTM.makeBar();
  },
  quitGame(){
    //alert('quit');
    d3.select('.bars').remove();
    colorTM.endGameAnim();
  },
  makeBar(){
    var degrees = Math.floor(Math.random() * 360);
    d3.select('.bars')
    .append('rect')
    .on("click", colorTM.manageBarClick)
    .attr('height', colorTM.bars.width)
    .attr('width', colorTM.bars.width)
    .attr('rx', colorTM.bars.width/2)
    .attr('ry', colorTM.bars.width/2)
    .attr('x', -colorTM.bars.width/2)
    .attr('y', -colorTM.bars.width/2)
    .attr(colorTM.bars.pntValAttr,colorTM.bars.bar.pointValue)
    .attr('transform', 'translate(0, 0) rotate('+degrees+')')
    .style('fill', colorTM.bars.bar.attr.fill)
    .attr('height', colorTM.bars.width)
    .transition()
    .attr('height', colorTM.bars.height)
    .duration(colorTM.bars.bar.durationTime)
    .transition()
    .attr('height', colorTM.bars.width)
    .delay(colorTM.bars.bar.delayTime).duration(colorTM.bars.bar.durationTime);
    barTimer = d3.timer(function(duration){
      if (duration > colorTM.bars.bar.durationTime){
        colorTM.quitGame();
        barTimer.stop();
      }
    });
  },
  manageBarClick() {
    barTimer.stop();
    colorTM.updateScore(colorTM.bars.pntValAttr);
    d3.select(this)
     .attr("height", 10)
     .transition()
     .on('end', function() {
       d3.select(this).remove();
       colorTM.makeBar();
      });
  },
  updateScore(value) {
    colorTM.score.current = colorTM.score.current + parseInt(value);
    d3.select('.score').text(colorTM.score.current);
  },
  endGameAnim() {
    d3.select('.level').text("Game Over");
  }
};
