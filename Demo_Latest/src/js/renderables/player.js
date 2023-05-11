import { Entity, game, input, Rect, sprite, collision, audio, level } from 'melonjs';
import data from './../../data/data.js';
import { newUser, getUser, delUser, scrUser } from '../../data/api';

class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y, settings);

        this.body.collisionType = collision.types.PLAYER_OBJECT;

        // max walking & jumping speed
        this.body.setMaxVelocity(5, 15);
        this.body.setFriction(.4, 0);

        // set the display to follow our position on both axis
        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 1);

        // initialize the timer
        this.timer = 0;

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

        this.multipleJump = 1;

        // map walk
        input.bindKey(input.KEY.LEFT,   "left");
        input.bindKey(input.KEY.RIGHT,  "right");
        input.bindKey(input.KEY.A,      "left");
        input.bindKey(input.KEY.D,      "right");
        // map jump
        input.bindKey(input.KEY.X,      "jump", true);
        input.bindKey(input.KEY.UP,     "jump", true);
        input.bindKey(input.KEY.W,      "jump", true);
        input.bindKey(input.KEY.SPACE,  "jump", true);
        //map fall
        input.bindKey(input.KEY.DOWN,   "down");
        input.bindKey(input.KEY.S,      "down");

        // define a basic walking animation (using all frames)
        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);

        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);

        this.renderable.addAnimation("jump",  [0]);

        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");

        this.anchorPoint.set(0.5, 0);
    }

    /**
     * update the entity
     */
    update(dt) {
        // update the timer, dt is in milliseconds
        // so update it by dt / 100 for 
        // decisecond equivalent
        this.timer += (dt / 100);

        // change body force based on inputs
        //....
        // call the parent method
        if (input.isKeyPressed('left')) {

            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the default force
            this.body.force.x = -this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (input.isKeyPressed('right')) {

            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.force.x = this.body.maxVel.x;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (input.isKeyPressed('jump')) {

            if (!this.body.jumping && !this.body.falling && !this.renderable.isFloating){
                this.body.force.y = -this.body.maxVel.y
                this.renderable.setCurrentAnimation("jump")
            }
        } else {
            this.body.force.y = 0;
        }

        if (!this.inViewport) {
            // if yes reset the game
            game.world.removeChild(this);
            game.viewport.fadeIn("#fff", 150, function(){
                level.reload();
                game.viewport.fadeOut("#fff", 150);
            });
            return true;
        }

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        if (other.type === "platform") {
            if (this.body.falling &&
                !input.isKeyPressed("down") &&
                // Shortest overlap would move the player upward
                (response.overlapV.y > 0) &&
                // The velocity is reasonably fast enough to have penetrated to the overlap depth
                (~~this.body.vel.y >= ~~response.overlapV.y)
            ) {
                // Disable collision on the x axis
                response.overlapV.x = 0;
                // Repond to the platform (it is solid)
                return true;
            }
            // Do not respond to the platform (pass through)
            return false;
        }

        // Custom collision response for slopes
        else if (other.type === "slope") {
            // Always adjust the collision response upward
            response.overlapV.y = Math.abs(response.overlap);
            response.overlapV.x = 0;

            // Respond to the slope (it is solid)
            return true;
        }

        // Change music upon level transition, also stopping previous song.
        // Stores timer value per level, resets timer.
        else if (other.type === "transition") {
            // Create case for starting level two music
            if (level.getCurrentLevelId() === "area01") {
                // Handles audio transition
                audio.stopTrack();
                audio.play("level_complete");
                audio.playTrack("level_two");

                // Handles time for the level
                if (this.timer > 10) {
                    // Perform arithmetic for total completion time
                    data.lvl_1_time = this.timer - (data.coins * 5);
                    data.coins_1 = data.coins;
                    data.coins = 0;
                    scrUser(data.player_name, data.lvl_1_time, 1).then(response => {
                        console.log(response);
                    });
                }
                
                this.timer = 0;

                // Removes the trigger so that the audio
                // does not overlap and the timer does
                // not get screwed up
                game.world.removeChild(other);
            }

            // Create case for starting level three music
            else if (level.getCurrentLevelId() === "area02") {
                audio.stopTrack();
                audio.play("level_complete");
                audio.playTrack("level_three");

                // Handles time for the level
                if (this.timer > 10) {
                    // Perform arithmetic for total completion time
                    data.lvl_2_time = this.timer - (data.coins * 5);
                    data.coins_2 = data.coins;
                    data.coins = 0;
                    scrUser(data.player_name, data.lvl_2_time, 2).then(response => {
                        console.log(response);
                    });
                }
                
                this.timer = 0;

                // Removes the trigger so that the audio
                // does not overlap and the timer does
                // not get screwed up
                game.world.removeChild(other);
            }

            else if (level.getCurrentLevelId() === "area03") {
                // Handles audio transition
                audio.stopTrack();
                audio.play("game_complete");

                // Handles time for the level
                if (this.timer > 10) {
                    // Perform arithmetic for total completion time
                    data.lvl_3_time = this.timer - (data.coins * 5);
                    data.coins_3 = data.coins;
                    data.coins = 0;
                    scrUser(data.player_name, data.lvl_3_time, 2).then(response => {
                        console.log(response);
                    });
                }

                this.timer = 0;

                // Removes the trigger so that the audio
                // does not overlap and the timer does
                // not get screwed up
                game.world.removeChild(other);
            }
        }
    }
};

export default PlayerEntity;
