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
  .attr('transform', 'translate(' + 65 + ',' + -300 + ')')
  .transition('#colorTitleD3ID')
  .duration(1200)
  .attr('transform', 'translate(' + 65 + ',' + 35 + ')');
});
/*
function startGame(){
  //alert('play');
  d3.select('#colorTitleD3ID')
  .attr('transform', 'translate(' + 65 + ',' + 35 + ')')
  .transition('#colorTitleD3ID')
  .duration(1200)
  .attr('transform', 'translate(' + 65 + ',' + -300 + ')');
}
*/

let colorTM = {
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
  startGame(){
    //alert('play');
    d3.select('#colorTitleD3ID')
    .attr('transform', 'translate(' + 65 + ',' + 35 + ')')
    .transition('#colorTitleD3ID')
    .duration(1200)
    .attr('transform', 'translate(' + 65 + ',' + -300 + ')');
    colorTM.makeBar();
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
