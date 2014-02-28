/**
* CREATED BY BYTEANDAHALF [12-8-13]
* DO NOT DISTRIBUTE!
*/


ModPE.setItem(331, 3, 8, "Redstone");

var BlockRedwire = [55, 23];
var BlockInput = [69, 77];

var BlockRedwireColour = [0x440000];
var PoweredRedwireColour = [0xFD0000];

var TransparentBlockList = [0, 6, 18, 20, 23, 26, 30, 31, 32, 37, 38, 39, 40, 44, 46, 50, 51, 53, 54, 55, 59, 60, 63, 64, 65, 67, 68, 71, 75, 76, 78, 79, 81, 83, 85, 89, 92, 96, 102, 103, 105, 107, 108, 109, 114, 126, 127, 128, 134, 135, 136, 156, 158];
var fallingBlocks = [6, 12, 13, 23, 27, 31, 32, 37, 38, 39, 40, 50, 55, 59, 63, 64, 66, 69, 70, 71, 72, 75, 76, 81, 83, 104, 105, 141, 142, 171];
var redstoneUtils = [23, 55, 75, 76];
var unswappableBlocks = [6, 23, 27, 31, 32, 37, 38, 39, 40, 50, 55, 59, 63, 64, 66, 69, 70, 71, 72, 75, 76, 81, 83, 104, 105, 141, 142, 171];
var emptyBlocks = [0, 8, 9, 10, 11];

function selectLevelHook() {
  Block.defineBlock(BlockRedwire[0], "Redstone Wire", [164, 164, 164, 164, 164, 164], 50, false, 10);
  Block.setRenderLayer(BlockRedwire[0], 1);
  Block.setShape(BlockRedwire[0], 0, 0, 0, 1, 0.001, 1);
  Block.setColor(BlockRedwire[0], BlockRedwireColour);
  Block.setExplosionResistance(55, 18000000);
  Block.setDestroyTime(55, 0);

  Block.defineBlock(BlockRedwire[1], "Powered Redstone", [164, 164, 164, 164, 164, 164], 50, false, 10);
  Block.setRenderLayer(BlockRedwire[1], 1);
  Block.setShape(BlockRedwire[1], 0, 0, 0, 1, 0.001, 1);
  Block.setColor(BlockRedwire[1], PoweredRedwireColour);
  Block.setLightLevel(BlockRedwire[1], 5);
   Block.setExplosionResistance(23, 18000000);
  Block.setDestroyTime(23, 0);

  Block.defineBlock(33, "Piston", [109, 107, 108, 108, 108, 108], 0, false, 10);

  Block.defineBlock(149, "Redstone Capacitor", [234, 234, 232, 233, 233, 233], 50, false, 10);
  Block.setRenderLayer(149, 1);
  Block.setShape(0, 0, 0, 1, 0.5, 1);

  Block.defineBlock(70, "Pressure Plate", [1, 1, 1, 1, 1, 1], 50, false, 10);
  Block.setRenderLayer(70, 1);
  Block.setShape(70, 0, 0, 0, 1, 0.09, 1);

  Block.defineBlock(BlockInput[1], "Powered Lever", [96, 96, 96, 96, 96, 96], 50, false, 10);
  Block.setRenderLayer(BlockInput[1], 1);

  Block.defineBlock(BlockInput[1], "Pressure Plate", [1, 1, 1, 1, 1, 1], 0, false, 10);
  Block.setShape(BlockInput[1], 0, 0, 0, 1, 0.09, 1);
  Block.setRenderLayer(BlockInput[1], 1);

  Block.defineBlock(76, "Redstone Torch", [99, 99, 99, 99, 99, 99], 50, false, 2);
  Block.setRenderLayer(76, 1);
  Block.setLightLevel(76, 8);
  Block.setExplosionResistance(76, 18000000);
  Block.setDestroyTime(76, 0);

  Block.defineBlock(75, "Redstone Torch", [115, 115, 115, 115, 115, 115], 50, false, 2);
  Block.setRenderLayer(75, 1);
  Block.setExplosionResistance(75, 18000000);
  Block.setDestroyTime(75, 0);
}

function useItem(x, y, z, itemId, blockId, side) {
	if(itemId == 331 && side == 1) {
  		if(Level.getTile(x, y + 1, z) == 0) {
	  		if(TransparentBlockList.indexOf(blockId) == -1) {
	  			updateDiag(x, y + 1, z);
      			Level.playSound(x, y, z, "step.stone", 1, 1);
      			if(Level.getTile(x + 1, y + 1, z) == 23 || Level.getTile(x - 1, y + 1, z) == 23 || Level.getTile(x, y + 1, z + 1) == 23 || Level.getTile(x, y + 1, z - 1) == 23) {
        			updateReddust(x, y + 1, z, 0);
       				Level.setTile(x, y + 1, z, 23);
       			} else if(Level.getTile(x + 1, y + 1, z) == 76 || Level.getTile(x - 1, y + 1, z) == 76 || Level.getTile(x, y + 1, z + 1) == 76 || Level.getTile(x, y + 1, z - 1) == 76) {
        			Level.setTile(x, y + 1, z, 23);
        			updateReddust(x, y + 1, z, 0);
      			} else Level.setTile(x, y + 1, z, 55);
	  		}
	  	}
  		else if(Level.getTile(x, y + 1, z) == 8 || Level.getTile(x, y + 1, z) == 9 || Level.getTile(x, y + 1, z) == 10 || Level.getTile(x, y + 1, z) == 11 && TransparentBlockList.indexOf(blockId) == -1) {
  			Level.setTile(x, y + 1, z, 0);
  			Level.dropItem(x, y + 1, z, 0.5, 331, 1, 0);
  		}
 	}
  	if(itemId == 76 && side == 1) {
    	preventDefault();
    	if(Math.floor(Player.getX()) == x && Math.floor(Player.getZ()) == z) {
    		if(Math.floor(Player.getY()) - 2 != y) {
    			if(TransparentBlockList.indexOf(blockId) == -1) {
        			if(Level.getTile(x, y + 1, z) == 8 || Level.getTile(x, y + 1, z) == 9 || Level.getTile(x, y + 1, z) == 10 || Level.getTile(x, y + 1, z) == 11) {
        				Level.setTile(x, y + 1, z, 0);
        				Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
        			} else {
          				Level.playSound(x, y + 1, z, "step.stone", 1, 1);
          				if(Level.getTile(x, y - 1, z) == 76) { Level.setTile(x, y + 1, z, 75); torchHandler(x, y + 1, z, 1); }
        				else { Level.setTile(x, y + 1, z, 76); torchHandler(x, y + 1, z, 0); }
          			}
        		}
      		}
    	} else {
    		if(TransparentBlockList.indexOf(blockId) == -1) {
      			if(Level.getTile(x, y + 1, z) == 8 || Level.getTile(x, y + 1, z) == 9 || Level.getTile(x, y + 1, z) == 10 || Level.getTile(x, y + 1, z) == 11) {
      				Level.setTile(x, y + 1, z, 0);
  					Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
      			} else {
        			Level.playSound(x, y + 1, z, "step.stone", 1, 1);
        			if(Level.getTile(x, y - 1, z) == 76) { Level.setTile(x, y + 1, z, 75); torchHandler(x, y + 1, z, 1); }
        			else { Level.setTile(x, y + 1, z, 76); torchHandler(x, y + 1, z, 0); }
      			}
    		}
  		}
	} else if(itemId == 76 && side != 1) preventDefault();
     if(itemId == 29) {
          preventDefault();
          if(side == 2) Level.setTile(x, y, z - 1, 29, 1);
          if(side == 3) Level.setTile(x, y, z + 1, 29, 1);
          if(side == 4) Level.setTile(x - 1, y, z, 29, 0);
          if(side == 5) Level.setTile(x + 1, y, z, 29, 0);
     }
}

function canPlace(x, y, z) {
	if(Math.floor(Player.getX()) == x && Math.floor(Player.getZ()) == z) {
    	if(Math.floor(Player.getY()) - 2 == y) return false;
    	else return true;
  	}
  	else return false;
}

function updateReddust(X, Y, Z, type) {
  	if(type == 0) {
    	explodeTntNearLocation(X, Y, Z);

    if(Level.getTile(X + 1, Y, Z) == 55) {
      	Level.setTile(X + 1, Y, Z, 23);
      	updateReddust(X + 1, Y, Z, 0);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X + 1, Y, Z)) == -1) updateBlock(X + 1, Y, Z, true);
    if(Level.getTile(X + 1, Y, Z) == 0) updateBlock(X + 1, Y, Z, 2);
    if(Level.getTile(X + 1, Y, Z) == 64) toggleDoor(X + 1, Y, Z, Level.getData(X + 1, Y, Z), 64);
    if(Level.getTile(X + 1, Y, Z) == 71) toggleDoor(X + 1, Y, Z, Level.getData(X + 1, Y, Z), 71);
    if(Level.getTile(X + 1, Y - 1, Z) == 96) toggleDoor(X + 1, Y - 1, Z, Level.getData(X + 1, Y - 1, Z), 96);
    if(Level.getTile(X + 1, Y, Z) == 29 && Level.getData(X + 1, Y, Z) == 1) swapperHandler(X + 1, Y, Z, 2);


    if(Level.getTile(X - 1, Y, Z) == 55) {
      	Level.setTile(X - 1, Y, Z, 23);
      	updateReddust(X - 1, Y, Z, 0);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X - 1, Y, Z)) == -1) updateBlock(X - 1, Y, Z, true);
    if(Level.getTile(X - 1, Y, Z) == 0) updateBlock(X - 1, Y, Z, 2);
    if(Level.getTile(X - 1, Y, Z) == 64) toggleDoor(X - 1, Y, Z, Level.getData(X - 1, Y, Z), 64);
    if(Level.getTile(X - 1, Y, Z) == 71) toggleDoor(X - 1, Y, Z, Level.getData(X - 1, Y, Z), 71);
    if(Level.getTile(X - 1, Y - 1, Z) == 96) toggleDoor(X - 1, Y - 1, Z, Level.getData(X - 1, Y - 1, Z), 96);


    if(Level.getTile(X, Y, Z + 1) == 55) {
    	Level.setTile(X, Y, Z + 1, 23);
      	updateReddust(X, Y, Z + 1, 0);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X, Y, Z + 1)) == -1) updateBlock(X, Y, Z + 1, true);
    if(Level.getTile(X, Y, Z + 1) == 0) updateBlock(X, Y, Z + 1, 2);
    if(Level.getTile(X, Y, Z + 1) == 64) toggleDoor(X, Y, Z + 1, Level.getData(X, Y, Z + 1), 64);
    if(Level.getTile(X, Y, Z + 1) == 71) toggleDoor(X, Y, Z + 1, Level.getData(X, Y, Z + 1), 71);
    if(Level.getTile(X, Y - 1, Z + 1) == 96) toggleDoor(X, Y - 1, Z + 1, Level.getData(X, Y - 1, Z + 1), 96);

    if(Level.getTile(X, Y, Z - 1) == 55) {
      	Level.setTile(X, Y, Z - 1, 23);
      	updateReddust(X, Y, Z - 1, 0);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X, Y, Z - 1)) == -1) updateBlock(X, Y, Z - 1, true);
    if(Level.getTile(X, Y, Z - 1) == 0) updateBlock(X, Y, Z - 1, 2);
    if(Level.getTile(X, Y, Z - 1) == 64) toggleDoor(X, Y, Z - 1, Level.getData(X, Y, Z - 1), 64);
    if(Level.getTile(X, Y, Z - 1) == 71) toggleDoor(X, Y, Z - 1, Level.getData(X, Y, Z - 1), 71);
    if(Level.getTile(X, Y - 1, Z - 1) == 96) toggleDoor(X, Y - 1, Z - 1, Level.getData(X, Y - 1, Z - 1), 96);
  } else {
    if(Level.getTile(X + 1, Y, Z) == 23) {
        Level.setTile(X + 1, Y, Z, 55);
        updateReddust(X + 1, Y, Z, 1);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X + 1, Y, Z)) == -1) updateBlock(X + 1, Y, Z, false);
    if(Level.getTile(X + 1, Y, Z) == 0) updateBlock(X + 1, Y, Z, 3);
    if(Level.getTile(X + 1, Y, Z) == 64) toggleDoor(X + 1, Y, Z, Level.getData(X + 1, Y, Z), 64);
    if(Level.getTile(X + 1, Y, Z) == 71) toggleDoor(X + 1, Y, Z, Level.getData(X + 1, Y, Z), 71);
    if(Level.getTile(X + 1, Y - 1, Z) == 96) toggleDoor(X + 1, Y - 1, Z, Level.getData(X + 1, Y - 1, Z), 96);

    if(Level.getTile(X - 1, Y, Z) == 23) {
        Level.setTile(X - 1, Y, Z, 55);
        updateReddust(X - 1, Y, Z, 1);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X - 1, Y, Z)) == -1) updateBlock(X - 1, Y, Z, false);
    if(Level.getTile(X - 1, Y, Z) == 0) updateBlock(X - 1, Y, Z, 3);
    if(Level.getTile(X - 1, Y, Z) == 64) toggleDoor(X - 1, Y, Z, Level.getData(X - 1, Y, Z), 64);
    if(Level.getTile(X - 1, Y, Z) == 71) toggleDoor(X - 1, Y, Z, Level.getData(X - 1, Y, Z), 71);
    if(Level.getTile(X - 1, Y - 1, Z) == 96) toggleDoor(X - 1, Y - 1, Z, Level.getData(X - 1, Y - 1, Z), 96);

    if(Level.getTile(X, Y, Z + 1) == 23) {
        Level.setTile(X, Y, Z + 1, 55);
        updateReddust(X, Y, Z + 1, 1);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X, Y, Z + 1)) == -1) updateBlock(X, Y, Z + 1, false);
    if(Level.getTile(X, Y, Z + 1) == 0) updateBlock(X, Y, Z + 1, 3);
    if(Level.getTile(X, Y, Z + 1) == 64) toggleDoor(X, Y, Z + 1, Level.getData(X, Y, Z + 1), 64);
    if(Level.getTile(X, Y, Z + 1) == 71) toggleDoor(X, Y, Z + 1, Level.getData(X, Y, Z + 1), 71);
    if(Level.getTile(X, Y - 1, Z + 1) == 96) toggleDoor(X, Y - 1, Z + 1, Level.getData(X, Y - 1, Z + 1), 96);

    if(Level.getTile(X, Y, Z - 1) == 23) {
        Level.setTile(X, Y, Z - 1, 55);
        updateReddust(X, Y, Z - 1, 1);
    }
    if(TransparentBlockList.indexOf(Level.getTile(X, Y, Z - 1)) == -1) updateBlock(X, Y, Z - 1, false);
    if(Level.getTile(X, Y, Z - 1) == 0) updateBlock(X, Y, Z - 1, 3);
    if(Level.getTile(X, Y, Z - 1) == 64) toggleDoor(X, Y, Z - 1, Level.getData(X, Y, Z - 1), 64);
    if(Level.getTile(X, Y, Z - 1) == 71) toggleDoor(X, Y, Z - 1, Level.getData(X, Y, Z - 1), 71);
    if(Level.getTile(X, Y - 1, Z - 1) == 96) toggleDoor(X, Y - 1, Z - 1, Level.getData(X, Y - 1, Z - 1), 96);
  }
}

function torchHandler(x, y, z, type) {
	if(type == 0) {
  		switch(Level.getTile(x + 1, y, z)) {
      		case 55:
        		Level.setTile(x + 1, y, z, 23);
        		updateReddust(x + 1, y, z, 0);
        		break;
    	}
    	switch(Level.getTile(x - 1, y, z)) {
      		case 55:
        		Level.setTile(x - 1, y, z, 23);
        		updateReddust(x - 1, y, z, 0);
        		break;
    	}
    	switch(Level.getTile(x, y, z + 1)) {
      		case 55:
        		Level.setTile(x, y, z + 1, 23);
        		updateReddust(x, y, z + 1, 0);
        		break;
    	}
    	switch(Level.getTile(x, y, z - 1)) {
      		case 55:
        		Level.setTile(x, y, z - 1, 23);
        		updateReddust(x, y, z - 1, 0);
        		break;
    	}
    	switch(Level.getTile(x, y + 1, z)) {
    		default:
        		if(TransparentBlockList.indexOf(Level.getTile(x, y + 1, z)) == -1) {
          			switch(Level.getTile(x, y + 2, z)) {
            			case 76:
              				Level.setTile(x, y + 2, z, 75);
             				torchHandler(x, y + 2, z, 1);
              				break;
            			case 64:
              				toggleDoor(x, y + 2, z, Level.getData(x, y + 2, z), 64);
              				break;
            			case 71:
             				toggleDoor(x, y + 2, z, Level.getData(x, y + 2, z), 71);
             				break;
            			case 55:
              				Level.setTile(x, y + 2, z, 23);
              				updateReddust(x, y + 2, z, 0);
              				break;
            			case 46:
              				explodeTntNearLocation(x, y + 2, z, 1);
              				break;
          			}
          			if(Level.getTile(x + 1, y + 1, z) == 96) toggleDoor(x + 1, y + 1, z, Level.getData(x + 1, y + 1, z), 96);
          			if(Level.getTile(x - 1, y + 1, z) == 96) toggleDoor(x - 1, y + 1, z, Level.getData(x - 1, y + 1, z), 96);
          			if(Level.getTile(x, y + 1, z + 1) == 96) toggleDoor(x, y + 1, z + 1, Level.getData(x, y + 1, z + 1), 96);
          			if(Level.getTile(x, y + 1, z - 1) == 96) toggleDoor(x, y + 1, z - 1, Level.getData(x, y + 1, z - 1), 96);
        		}
        		break;
    	}
  	} else if(type == 1) {
   		switch(Level.getTile(x + 1, y, z)) {
      		case 23:
        		Level.setTile(x + 1, y, z, 55);
        		updateReddust(x + 1, y, z, 1);
        		break;
    	}
    	switch(Level.getTile(x - 1, y, z)) {
      		case 23:
        		Level.setTile(x - 1, y, z, 55);
        		updateReddust(x - 1, y, z, 1);
        		break;
    	}
    	switch(Level.getTile(x, y, z + 1)) {
      		case 23:
        		Level.setTile(x, y, z + 1, 55);
        		updateReddust(x, y, z + 1, 1);
        		break;
    	}
    	switch(Level.getTile(x, y, z - 1)) {
    	  	case 23:
        		Level.setTile(x, y, z - 1, 55);
        		updateReddust(x, y, z - 1, 1);
        		break;
    	}
    	switch(Level.getTile(x, y + 1, z)) {
      		default:
        		if(TransparentBlockList.indexOf(Level.getTile(x, y + 1, z)) == -1) {
          			switch(Level.getTile(x, y + 2, z)) {
            			case 75:
              				Level.setTile(x, y + 2, z, 76);
              				torchHandler(x, y + 2, z, 0);
              				break;
            			case 64:
              				toggleDoor(x, y + 2, z, Level.getData(x, y + 2, z), 64);
              				break;
            			case 71:
             				toggleDoor(x, y + 2, z, Level.getData(x, y + 2, z), 71);
             				break;
            			case 23:
               				Level.setTile(x, y + 2, z, 55);
               				updateReddust(x, y + 2, z, 1);
               				break;
          			}
          			if(Level.getTile(x + 1, y + 1, z) == 96) toggleDoor(x + 1, y + 1, z, Level.getData(x + 1, y + 1, z), 96);
          			if(Level.getTile(x - 1, y + 1, z) == 96) toggleDoor(x - 1, y + 1, z, Level.getData(x - 1, y + 1, z), 96);
          			if(Level.getTile(x, y + 1, z + 1) == 96) toggleDoor(x, y + 1, z + 1, Level.getData(x, y + 1, z + 1), 96);
          			if(Level.getTile(x, y + 1, z - 1) == 96) toggleDoor(x, y + 1, z - 1, Level.getData(x, y + 1, z - 1), 96);
        		}
    	}
  	} else if(type == 2) {
  		switch(Level.getTile(x + 1, y, z)) {
  			case 76:
  				updateReddust(x + 1, y, z, 0);
  				break;
  		}
  		switch(Level.getTile(x - 1, y, z)) {
  			case 76:
  				updateReddust(x - 1, y, z, 0);
  				break;
  		}
  		switch(Level.getTile(x, y, z + 1)) {
  			case 76:
  				updateReddust(x, y, z + 1, 0);
  				break;
  		}
  		switch(Level.getTile(x, y, z - 1)) {
  			case 76:
  				updateReddust(x, y, z - 1, 0);
  				break;
  		}
  	}
}

function updateBlock(datX, datY, datZ, power) {
  	if(Level.getTile(datX, datY + 1, datZ) == 64) toggleDoor(datX, datY + 1, datZ, Level.getData(datX, datY + 1, datZ), 64);
  	if(Level.getTile(datX, datY + 1, datZ) == 71) toggleDoor(datX, datY + 1, datZ, Level.getData(datX, datY + 1, datZ), 71);
  	if(Level.getTile(datX, datY + 1, datZ) == 46){Level.spawnMob(datX + 0.5, datY + 1.5, datZ +0.5, 65);Level.setTile(datX, datY+1, datZ, 0);}
  	if(Level.getTile(datX, datY + 1, datZ) == 55 || Level.getTile(datX, datY + 1, datZ) == 23) {
    	Level.setTile(datX, datY + 1, datZ, power? 23: 55);
    	updateReddust(datX, datY + 1, datZ, power? 0: 1);
	}
  	if(Level.getTile(datX, datY + 1, datZ) == 76 || Level.getTile(datX, datY + 1, datZ) == 75) {
    	Level.setTile(datX, datY + 1, datZ, power? 75: 76);
    	torchHandler(datX, datY + 1, datZ, power? 1: 0);
  	}

  	if(Level.getTile(datX + 1, datY, datZ) == 96) {
  		if(Level.getTile(datX, datY + 1, datZ) == 23) toggleDoor(datX + 1, datY, datZ, Level.getData(datX + 1, datY, datZ), 96);
  		else toggleDoor(datX + 1, datY, datZ, Level.getData(datX + 1, datY, datZ), 96);
  	}
  	if(Level.getTile(datX - 1, datY, datZ) == 96) {
  		if(Level.getTile(datX, datY + 1, datZ) == 23) toggleDoor(datX - 1, datY, datZ, Level.getData(datX - 1, datY, datZ), 96);
  		else toggleDoor(datX - 1, datY, datZ, Level.getData(datX - 1, datY, datZ), 96);
	}
  	if(Level.getTile(datX, datY, datZ + 1) == 96) {
	  	if(Level.getTile(datX, datY + 1, datZ) == 23) toggleDoor(datX, datY, datZ + 1, Level.getData(datX, datY, datZ + 1), 96);
	  	else toggleDoor(datX, datY, datZ + 1, Level.getData(datX, datY, datZ + 1), 96);
	}
  	if(Level.getTile(datX, datY, datZ - 1) == 96) {
	  	if(Level.getTile(datX, datY + 1, datZ) == 23) toggleDoor(datX, datY, datZ - 1, Level.getData(datX, datY, datZ - 1), 96);
	  	else toggleDoor(datX, datY, datZ - 1, Level.getData(datX, datY, datZ - 1), 96);
	}
/*  if(Level.getTile(datX + 1, datY, datZ) == 55 || Level.getTile(datX + 1, datY, datZ) == 23) {
    Level.setTile(datX + 1, datY, datZ, power? 23: 55);
    updateReddust(datX + 1, datY, datZ, power? 0: 1);
  }
  if(Level.getTile(datX - 1, datY, datZ) == 55 || Level.getTile(datX - 1, datY, datZ) == 23) {
    Level.setTile(datX - 1, datY, datZ, power? 23: 55);
    updateReddust(datX - 1, datY, datZ, power? 0: 1);
  }
  if(Level.getTile(datX, datY, datZ + 1) == 55 || Level.getTile(datX + 1, datY, datZ + 1) == 23) {
    Level.getTile(datX, datY, datZ + 1, power? 23: 55);
    updateReddust(datX, datY, datZ + 1, power? 0: 1);
  }
  if(Level.getTile(datX, datY, datZ - 1) == 55 || Level.getTile(datX, datY, datZ - 1) == 23) {
    Level.getTile(datX, datY, datZ - 1, power? 23: 55);
    updateReddust(datX, datY, datZ - 1, power? 0: 1);
  }*/
  if(power == 2) {
    if(Level.getTile(datX, datY - 1, datZ) == 55) {
        Level.setTile(datX, datY - 1, datZ, 23);
        updateReddust(datX, datY - 1, datZ, 0);
    }
  } else if(power == 3) {
    if(Level.getTile(datX, datY - 1, datZ) == 23) {
      Level.setTile(datX, datY - 1, datZ, 55);
      updateReddust(datX, datY - 1, datZ, 1);
    }
  }
}








//BETA ONLY
var windowwrap = android.view.ViewGroup.LayoutParams.WRAP_CONTENT;
function dp(ctx, dp){
 return Math.ceil(dp * ctx.getResources().getDisplayMetrics().density);
}
var introWindow = null;
var changelogWindow = null;
function newLevel() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try {
			var introLayout = new android.widget.RelativeLayout(ctx);
			var introText = new android.widget.TextView(ctx);
			introText.setTextSize(16);

			introText.setText("Welcome to Byteandahalf's Redstone Mod Beta! :D\nIf you're reading this, that means you're\nin the Beta Group! Congrats!\nPost bugs on the Google+ Page,\nif you'd please.\nTo obtain the Redstone items, open\nthe menu in the bottom right of\nthe screen. :D");
			introLayout.addView(introText);

			dismissButton = new android.widget.Button(ctx);
			dismissButton.setText("DISMISS");
			dismissButton.setTranslationX(dp(ctx, 150));
			dismissButton.setTranslationY(dp(ctx, 150));

			dismissButton.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(introWindow != null) {introWindow.dismiss(); introWindow = null;}
                         addMenu();
				}
			}));

			introLayout.addView(dismissButton);

			var introWindow = new android.widget.PopupWindow(introLayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight());
			introWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			introWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.LEFT, 0, 0);
		} catch(err) {
			print(err);
		}
	}}));
}
menuBtnWindow = null;
function addMenu() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try {
			var menuBtnLayout = new android.widget.RelativeLayout(ctx);
			menuBtn = new android.widget.Button(ctx);
			menuBtn.setText("Menu");
			menuBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					openMenu();
				}
			}));
			menuBtnLayout.addView(menuBtn);

			menuBtnWindow = new android.widget.PopupWindow(menuBtnLayout, windowwrap, windowwrap);
			menuBtnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
			menuBtnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
		} catch(err){
			print(err);
		}
	}}));
}
var menuWindow = null;
function openMenu() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try {
			var menuLayout = new android.widget.RelativeLayout(ctx);

			var reddustBtn = new android.widget.Button(ctx);
			reddustBtn.setText("Redstone");
               reddustBtn.setTranslationX(dp(ctx, 130));
			reddustBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(Level.getGameMode() == 0) addItemInventory(331, 64, 0); else Entity.setCarriedItem(Player.getEntity(), 331);
				}
			}));

			var torchBtn = new android.widget.Button(ctx);
			torchBtn.setText("Torch");
               torchBtn.setTranslationX(dp(ctx, 65));
			torchBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(Level.getGameMode() == 0) addItemInventory(76, 64, 0); else Entity.setCarriedItem(Player.getEntity(), 76);
				}
			}));

			var doorBtn = new android.widget.Button(ctx);
		     doorBtn.setText("Door");
               doorBtn.setTranslationX(dp(ctx, 2));
			doorBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(Level.getGameMode() == 0) addItemInventory(330, 64, 0); else Entity.setCarriedItem(Player.getEntity(), 29);
				}
			}));

			menuLayout.addView(reddustBtn);
               menuLayout.addView(torchBtn);
               menuLayout.addView(doorBtn);

			menuWindow = new android.widget.PopupWindow(menuLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight()/2);
			menuWindow.setFocusable(true);
			menuWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			menuWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.LEFT, 0, 0);
		} catch(err){
			print(err);
		}
	}}));
}

function leaveGame() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try {
              if(menuWindow != null) { menuWindow.dismiss(); menuWindow = null; }
              if(menuBtnWindow != null) { menuBtnWindow.dismiss(); menuBtnWindow = null; }
          } catch(eep) { print(eep); }
    }}));
}
//






function toggleDoor(x, y, z, data, type) {
  	if(data < 4) { 
  		if(type == 64 || type == 71) {
    		if(Level.getTile(x, y + 1, z) == type) {
        		Level.setTile(x, y, z, type, data + 4); 
        		Level.playSound(x, y, z, "random.door_open", 1.0, 1.0);
    		} /*else if(Level.getTile(x, y - 1, z) == type) {
    			Level.setTile(x, y - 1, z, type, Level.getData(x, y - 1, z) + 4);
    			Level.playSound(x, y - 1, z, "random.door_open", 1.0, 1.0);
    		}*/
		} else {
			Level.setTile(x, y, z, type, data + 4);
			Level.playSound(x, y, z, "random.door_open", 1.0, 1.0);
		}
  	}
 	if(data > 3) { 
  		if(type == 64 || type == 71) {
    		if(Level.getTile(x, y + 1, z) == type) {
    			Level.setTile(x, y, z, type, data - 4); 
      			Level.playSound(x, y, z, "random.door_close", 1.0, 1.0);
    		} /*else if(Level.getTile(x, y - 1, z) == type) {
    			Level.setTile(x, y - 1, z, type, Level.getData(x, y - 1, z) - 4);
    			Level.playSound(x, y - 1, z, "random.door_close", 1.0, 1.0);
    		}*/
  		} else {
  			Level.setTile(x, y, z, type, data - 4);
  			Level.playSound(x, y, z, "random.door_close", 1.0, 1.0);
  		}
  	}
}

function explodeTntNearLocation(X, Y, Z, type) {
   if(Level.getTile(X, Y, Z + 1) == 46) {
     Level.setTile(X, Y, Z + 1, 0);
     Level.spawnMob(X + 0.5, Y + 0.5, Z + 1.5, 65);
     Level.playSound(X, Y, Z + 1, "random.fuse", 1, 1);
   }
   if(Level.getTile(X, Y, Z - 1) == 46) {
    Level.setTile(X, Y, Z - 1, 0);
    Level.spawnMob(X + 0.5, Y + 0.5, Z - 0.5, 65);
    Level.playSound(X, Y, Z - 1, "random.fuse", 1, 1);
   }
  if(Level.getTile(X + 1, Y, Z) == 46) {
    Level.setTile(X + 1, Y, Z, 0);
    Level.spawnMob(X + 1.5, Y + 0.5, Z + 0.5, 65);
    Level.playSound(X + 1, Y, Z, "random.fuse", 1, 1);
   }
  if(Level.getTile(X - 1, Y, Z) == 46) {
    Level.setTile(X - 1, Y, Z, 0);
    Level.spawnMob(X - 0.5, Y + 0.5, Z + 0.5, 65);
    Level.playSound(X - 1, Y, Z, "random.fuse", 1, 1);
   }
   if(type == 1) {
     //Explode TNT at location
    Level.setTile(X, Y, Z, 0);
    Level.spawnMob(X + 0.5, Y + 0.5, Z + 0.5, 65);
    Level.playSound(X, Y, Z, "random.fuse", 1, 1);
   }
}

function entityRemovedHook(entity) { //This should fix explosions doing wrong things.
	if(Entity.getEntityTypeId(entity) == 65) {
		var rangeX = Math.floor(Entity.getX(entity));
		var rangeY = Math.floor(Entity.getY(entity));
		var rangeZ = Math.floor(Entity.getZ(entity));
		for(i = rangeX - 4; i < rangeX + 4; i++) {
			for(a = rangeZ - 4; a < rangeZ + 4; a++) {
				for(p = rangeY - 4; p < rangeY + 4; p++) {
					destroyRedBlock(i, p, a, false);
				}
			}
		}
	}
}

function setTileIfSolid(value, x, y, z, tile) {
  if(TransparentBlockList.indexOf(value) == -1) {
    if(tile == 55) {
      Level.playSound(x, y, z, "step.stone", 1, 1);
      if(Level.getTile(x+1, y, z) == 23 || Level.getTile(x-1, y, z) == 23 || Level.getTile(x, y, z + 1) == 23 || Level.getTile(x, y, z-1) == 23) {
        updateReddust(x, y, z, 0);
        Level.setTile(x, y, z, 23);
      } else
      if(Level.getTile(x+1, y, z) == 76 || Level.getTile(x-1, y, z) == 76 || Level.getTile(x, y, z + 1) == 76 || Level.getTile(x, y, z-1) == 76) {
        Level.setTile(x, y, z, 23);
        updateReddust(x, y, z, 0);
      } else Level.setTile(x, y, z, 55);
    }

  }
}

function destroyBlock(x, y, z, side) {
  /*if(Level.getTile(x, y, z) == 73) {
    Level.dropItem(x, y + 1, z, 0, 331, 1, 0);
    Entity.setCarriedItem(Player.getEntity(), 331);
  }
  if(Level.getTile(x, y, z) == 1) {
    Level.dropItem(x, y, z, 0.5, 76, 1, 0);
    Entity.setCarriedItem(Player.getEntity(), 76);
  }*/
  if(Level.getTile(x, y, z) == 76) {
    torchHandler(x, y, z, 1);
    torchHandler(x, y, z, 2);
  }
  if(Level.getTile(x, y, z) == 75) {
    preventDefault();
    Level.destroyBlock(x, y, z, false);
    if(Level.getGameMode() == 0) Level.dropItem(x, y, z, 0.5, 76, 1, 0);
  }
  if(Level.getTile(x, y, z) == 23) {
    preventDefault();
    Level.destroyBlock(x, y, z, false);
    if(Level.getGameMode() == 0) Level.dropItem(x, y, z, 0.5, 331, 1, 0);
    updateReddust(x + 1, y, z, 1);
    //crashHandler(x, y, z);
  }
  if(Level.getTile(x, y, z) == 55) {
    preventDefault();
    Level.destroyBlock(x, y, z, false);
    if(Level.getGameMode() == 0) Level.dropItem(x, y, z, 0.5, 331, 1, 0);
  }
  if(fallingBlocks.indexOf(Level.getTile(x, y + 1, z)) != -1) fallingBlockHandler(x, y, z);
}

function fallingBlockHandler(x, y, z) {
	if(fallingBlocks.indexOf(Level.getTile(x, y + 1, z)) != -1) {
		if(Level.getTile(x, y + 1, z) == 50) {
			if(Level.getData(x, y + 1, z) == 5) fallingBlockHandler(x, y + 1, z);
			else return;
		} else if(redstoneUtils.indexOf(Level.getTile(x, y + 1, z)) != -1) { destroyRedBlock(x, y, z); fallingBlockHandler(x, y + 1, z); }
		else fallingBlockHandler(x, y + 1, z);
	} else return;
}

function updateDiag(x, y, z) {
	//DOWN
	if(Level.getTile(x + 1, y, z) == 0 && Level.getTile(x + 1, y - 1, z) == 23 && TransparentBlockList.indexOf(Level.getTile(x, y - 1, z)) == -1) { Level.setTile(x, y, z, 23); updateReddust(x, y, z, 0); }
	if(Level.getTile(x - 1, y, z) == 0 && Level.getTile(x - 1, y - 1, z) == 23 && TransparentBlockList.indexOf(Level.getTile(x, y - 1, z)) == -1) { Level.setTile(x, y, z, 23); updateReddust(x, y, z, 0); }
	if(Level.getTile(x, y, z + 1) == 0 && Level.getTile(x, y - 1, z + 1) == 23 && TransparentBlockList.indexOf(Level.getTile(x, y - 1, z)) == -1) { Level.setTile(x, y, z, 23); updateReddust(x, y, z, 0); }
	if(Level.getTile(x, y, z - 1) == 0 && Level.getTile(x, y - 1, z - 1) == 23 && TransparentBlockList.indexOf(Level.getTile(x, y - 1, z)) == -1) { Level.setTile(x, y, z, 23); updateReddust(x, y, z, 0); }
	//UP
	if(Level.getTile(x, y + 1, z) == 0) {
		if(Level.getTile(x + 1, y + 1, z) == 23) updateReddust(x, y, z, 0);
		if(Level.getTile(x - 1, y + 1, z) == 23) updateReddust(x, y, z, 0);
		if(Level.getTile(x, y + 1, z + 1) == 23) updateReddust(x, y, z, 0);
		if(Level.getTile(x, y + 1, z - 1) == 23) updateReddust(x, y, z, 0);
	}
}
/*function crashHandler(x, y, z) {		//NOT IMPLEMENTED: I'm hoping this will soon fix some of the crashes I've been experiencing.
  switch(Level.getTile(x + 1, y, z)) {
    case 76:
      Level.setTile(x, y, z, 23);
      break;
  }
}*/

function destroyRedBlock(x, y, z, particles) {
  if(particles) {
	switch(Level.getTile(x, y + 1, z)) {
  		case 55:
  			Level.destroyBlock(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 331, 1, 0);
  			break;
  		case 23:
  			Level.destroyBlock(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 331, 1, 0);
  			break;
  		case 76:
  	  		Level.destroyBlock(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
  			break;
  		case 75:
  			Level.destroyBlock(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
  			break;
  	}
  } else {
	switch(Level.getTile(x, y + 1, z)) {
  		case 55:
  			Level.setTile(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 331, 1, 0);
  			break;
  		case 23:
  			Level.setTile(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 331, 1, 0);
  			break;
  		case 76:
  	  		Level.setTile(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
  			break;
  		case 75:
  			Level.setTile(x, y + 1, z);
  			Level.dropItem(x, y + 1, z, 0.5, 76, 1, 0);
  			break;
  	}
  }
}
