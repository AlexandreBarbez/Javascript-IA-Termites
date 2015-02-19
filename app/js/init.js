function init () {
  var canvasElement = document.querySelector("#canvas");

  var stage = new PIXI.Stage(0xAFAFAF);
  var renderer = new PIXI.autoDetectRenderer(800,600, canvasElement);

  var world = new World();
//team 1
  _.times(20, function(){
    _.tap(new Equipe1(), function(equipe1){
      world.add(equipe1);
      world.setRightPosition(equipe1);
    });
  });
//team 2
  _.times(20, function(){
    _.tap(new Equipe2(), function(equipe2){
      world.add(equipe2);
      world.setLeftPosition(equipe2);
    });
  });
//Ressource
    _.times(10, function(){
    _.tap(new Resource(), function(resource){
      world.add(resource);
      world.setRandomPosition(resource);
    });
  });

  stage.addChild(world.sprite);

  var prevTimestamp = 0;
  function animate(timestamp) {

    var deltaTime = timestamp - prevTimestamp;
    prevTimestamp += deltaTime;

    world.render(deltaTime);
    renderer.render(stage);

    requestAnimFrame(animate);
  }

  requestAnimFrame(animate);
}
