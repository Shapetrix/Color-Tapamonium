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
  startGame(){
    //alert('play');
    d3.select('#colorTitleD3ID')
    .attr('transform', 'translate(' + 65 + ',' + 35 + ')')
    .transition('#colorTitleD3ID')
    .duration(1200)
    .attr('transform', 'translate(' + 65 + ',' + -300 + ')');
  },
  quitGame(){
    alert('i quit');
  }

};
