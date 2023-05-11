import { Collectable, game, collision, audio } from 'melonjs';
import data from './../../data/data.js';

class CoinEntity extends Collectable {
    // constructor
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);

        // this item collides ONLY with PLAYER_OBJECT
        this.body.setCollisionMask(collision.types.PLAYER_OBJECT);
    }


    // handles the removal of a coin when player collides with it
    onCollision() {
        // do something when collected
        data.coins += 1;
        // make sure it cannot be collected "again"
        this.body.setCollisionMask(collision.types.NO_OBJECT);

        // remove it and play a sound
        audio.play("cling")
        game.world.removeChild(this);

        return false
    }
}

export default CoinEntity;
