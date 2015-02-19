function Equipe1() {
  var BOT_RADIUS = 4;
  var BOT_COLOR = 0x357AB7;
  
  var agent = new Agent("Equipe1", BOT_RADIUS, BOT_COLOR);

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
        Matter.Body.setVelocity(agent.getBody(), {x: -20, y: 0});
        isTired = true;
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
    handleCollision:handleCollision
 });
}
