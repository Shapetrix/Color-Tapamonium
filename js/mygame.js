var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  d3.select('#userBtnD3ID').on("click", function(){
    d3.select('#colorTitleD3ID')
    .attr('transform', 'translate(' + 65 + ',' + 35 + ')')
    .transition('#colorTitleD3ID')
    .duration(1200)
    .attr('transform', 'translate(' + 65 + ',' + -300 + ')');
  });
  d3.select('#quitBtnD3ID').on("click", function(){alert('i quit')});
  d3.select('#colorTitleD3ID').attr('transform', 'translate(' + 65 + ',' + -300 + ')').transition('#colorTitleD3ID')
  .duration(1200)
  .attr('transform', 'translate(' + 65 + ',' + 35 + ')');
});

function startGame(){
  alert('play');
}
