function Resource(){
	var RESOURCE_RADIUS = 4;
	var RESOURCE_COLOR = 0xFFFFFF;

	var agent = new Agent("Resource", RESOURCE_RADIUS, RESOURCE_COLOR);

	var attached = [];

	function handleCollision(collided, physics){
		if(collided.type === "Resource") {
			if(!_.contains(attached, collided)) {
				physics.attachAgents(agent, collided, 1);
				attached.push(collided);
			}
		}
	}
	return extend(agent, {
		handleCollision: handleCollision
	});
}