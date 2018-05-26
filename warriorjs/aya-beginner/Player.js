class Player {
  
  playTurn(warrior) {
	// Cool code goes here.
	if (warrior.feel().isWall()) {
		warrior.pivot();
	} else {
		if (warrior.feel().isUnit()) {
			if ((IsDecreasing(warrior))&&(warrior.health()<10)) {
				warrior.walk("backward");
				GoFoward = false;
			} else 
				warrior.attack();
		} else {
			if (health == -1) {
				if (CheckMyBack(warrior))
					warrior.pivot();
				else {
					if (!CheckEnemy(warrior)) {
						warrior.walk();
					} else {
						warrior.shoot();
					}	
				}
			} else { 
				if (!GoFoward && (IsDecreasing(warrior)) ) {
					warrior.walk("backward");
				} else {
					if ((IsDecreasing(warrior)) || (warrior.health()==20)) {
						if (!CheckEnemy(warrior)) {
							if (GotBackAttack) {
								warrior.pivot();
								GotBackAttack = false;
							} else {
								warrior.walk();
								GoFoward = true;
							}
						} else {
							warrior.shoot();
						}
					} else {
						if (warrior.health()<20) {
							warrior.rest();
						}
					} 
				}
			}

		}
	}
    health = warrior.health();
  }
}

var health = -1;
var GoFoward = true;
var GotBackAttack = false;

function IsDecreasing(warrior) {
	if (warrior.health() < health) {
		return  true;
	} else {
		return  false;
	}
}

function CheckEnemy(warrior) {
	let direction = (GoFoward ? 'forward' : 'backward');
	const spaceWithUnit = warrior.look(direction).find(space => space.isUnit());
	return spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
}

function CheckMyBack(warrior) {
	let spaceWithUnit = warrior.look('backward').find(
		space => space.isUnit()
	);
	GotBackAttack = spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
	return spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
}