var d3;
var gameManager = {
  // this is where all the game code will go

};

var startHub = {
  // this will hold the playBtn and circle hub with title of game
  d3.select(gameStore.selector).selectAll("svg")
    .append("circle")
    .classed("hub", true)
    .attr("r", 50)
    .attr("fill", "white")
    .attr("stroke","green").attr("stroke-width",3)
    .attr('transform', 'translate'+gameStore.hub.hubcenter);
};

var gameHub = {
  // this will hold the streak: and best streak: text with a faded out" disabled" playBtn

};

var gameOverHub = {
  // this will hold the streak: and best streak: text with a active playBtn and a main menuBtn "startHub"

};

var barTimer;
var gameStore = {
  selector: ".gamePlay",
  viewBox: '0 0 300 300',
  score: {
    selectorByID: "Score",
    current: 0,
    maxPlayer: 0,
  },
  hub: {
    selector: ".hub",
    radius: 200,
    hubcenter: '(150,150)'
  },
  bars: {
    width: 20,
    height: 100,
    count: 1,
    timeout: 10000,
    pntValAttr: "pointValue",
    barObjectID: "rect.bar",
    bar: {
      durationTime:1000,
      delayTime:1000,
      degrees: 360,
      pointValue: 5,
    }
  },
};

var scoreBoard = document.getElementById(gameStore.score.selectorByID);
function test (){
  alert('clickme');
  const bob = new gamePlay();
  bob.loadGame();
}
function updateScore(value) {
  //console.log("value: "+value);
  //console.log("current: "+gameStore.score.current);
  gameStore.score.current = gameStore.score.current + parseInt(value);
  scoreBoard.innerHTML = gameStore.score.current;
  //console.log("new current: "+gameStore.score.current);
}
function nextbar() {
  testRadialBars.makeBars();
}

function endGameAnim(){
  console.log("gameEnded");
}


class gamePlay {
   constructor() {
     this.updateGame();
     this.initChart();
   }
   updateGame() {
     scoreBoard.innerHTML = gameStore.score.current;
   }
   initChart() {
     const container = d3.select(gameStore.selector);
     container.selectAll("svg").remove();
     container
      .append("svg")
      .attr("viewBox", gameStore.viewbox);
   }
   makeHub() {
    d3.select(gameStore.selector).selectAll("svg")
      .append("circle")
      .classed("hub", true)
      .attr("r", 50)
      .attr("fill", "white")
      .attr("stroke","green").attr("stroke-width",3)
      .attr('transform', 'translate'+gameStore.hub.hubcenter);
   }
   removeHub() {
     d3.select(".hub").remove();
   }
  makeBars() {
    this.removeHub();
    var i = 0;
    while (i < gameStore.bars.count)  {

      this.makeBar();
      i++;
    };
    this.makeHub();
  }
   makeBar() {
     var degrees = Math.floor(Math.random() * 360);
     d3.select("svg")
      .append("g")
      .classed("bars", true)
      .append("rect")
      .classed("bar", true)
      .attr("height", 10)
      .attr("width", gameStore.bars.width)
      .attr("rx",gameStore.bars.width/2)
      .attr("ry",gameStore.bars.width/2)
      .attr("x", -gameStore.bars.width/2)
      .attr("y", -gameStore.bars.width/2)
      .attr(gameStore.bars.pntValAttr, gameStore.bars.bar.pointValue)
      .attr('transform', 'translate'+gameStore.hub.hubcenter+'rotate('+degrees+')')
      .on("click", this.manageBarClick);
       d3.selectAll("rect").attr("height",10).style("fill","blue").transition().attr("height",gameStore.bars.height).style("fill","green").duration(gameStore.bars.bar.durationTime).transition().attr("height",10).style("fill","green").delay(gameStore.bars.bar.delayTime).duration(gameStore.bars.bar.durationTime);

      barTimer = d3.timer(function(duration) {
            console.log(duration);
            if (duration > 2000) {
              endGameAnim();
              barTimer.stop();
            }
         }, 1000);
   }

   manageBarClick() {
     barTimer.stop();

    updateScore(d3.select(this).attr(gameStore.bars.pntValAttr));
    d3.select(this)
      .attr("height", 10)
      .transition()
      .on('end', function() {  d3.select(this).remove();  nextbar(180); } );
   }

   timeoutBar() {
    d3.select(this)
      .transition()
      .attr("height", 10);
   }
   loadGame() { //alert("loadGame");
    this.makeBars();
    document.getElementById("startgame").disabled = true;
    document.getElementById("startgame").innerHTML = "Level 1";
    var t = d3.timer(
      function(elapsed) {
        //console.log(elapsed);
        document.getElementById("timeout").setAttribute("value", 100 * (elapsed / gameStore.bars.timeout));
        if (elapsed > gameStore.bars.timeout) {
          //alert("End Game");
          d3.select("svg").remove();
          var gameButton = document.getElementById("startgame");
          gameButton.innerHTML = "Game OOVERRRR maaannn...";
          gameButton.style.backgroundImage = 'url(img/colorTapTitle.svg)';
          gameButton.style.backgroundRepeat = "no-repeat";
          gameButton.style.backgroundPosition = "center";
          gameButton.style.backgroundColor = "#c2c2c2";
          gameButton.style.color = 'blue';
          gameButton.style.fontSize = '34px';
          gameButton.style.padding ='180px 30px';
          t.stop()
        };
      }, 1150);
   }
}
const testRadialBars = new gamePlay();
