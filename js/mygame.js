var d3;
document.addEventListener('DOMContentLoaded', function(event) {
  d3.select('#Play').on("click", function(){alert('play')});
});

function fishFunction(){
  alert('fishFunction');
  d3.select('#Play').on("click", function(){alert('play')});
  d3.select('#title-2').attr('transform', 'translate(' + 300 + ',' + 300 + ')');
};
