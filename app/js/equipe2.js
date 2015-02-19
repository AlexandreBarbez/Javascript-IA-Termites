function Equipe2() {
  var BOT_RADIUS = 4;
  var BOT_COLOR = 0x22780F;
  
  var agent = new Agent("Equipe2", BOT_RADIUS, BOT_COLOR);

  function setRandomVelocity(){
  	Matter.Body.setVelocity(agent.getBody(), {x: -2.5 + Math.random() *5, y: -2.5 + Math.random()*5}
  )}

  var delay = 0;
  function update(timestamp) {
    agent.update(timestamp);

    delay -= timestamp;
    if(delay <=0){
    	setRandomVelocity();
    	delay = 500 + Math.random() * 100;
    }
  }
  var attached = [];
  var isTired = false;
  function handleCollision(collided, physics){
    if(collided.type === "Resource" && !isTired) {
      if(!_.contains(attached, collided)) {
        var constraint = physics.attachAgents(agent, collided, 1);
        attached.push(collided);
        isTired = true;
        Matter.Body.setVelocity(agent.getBody(), {x: 20, y: 0});
        _.delay(function(){
          isTired = false;
          attached.pop();
          physics.detachAgents(constraint);
        }, 1000);
        
      }
    }
  }
  return extend(agent, {
    update: update,
    handleCollision: handleCollision

 });
}
