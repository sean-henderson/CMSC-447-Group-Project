import { Entity, game, input, Rect, sprite, collision } from 'melonjs';

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

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;

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
        this.renderable.addAnimation("walk",  [0]);

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

            if (!this.body.jumping && !this.body.falling && !this.renderable.isFloating)
            {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.force.y = -this.body.maxVel.y
                this.renderable.setCurrentAnimation("jump")
            }
        } else {
            this.body.force.y = 0;
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
    }
};

export default PlayerEntity;

/*
update(dt) {

        if (input.isKeyPressed("left")){
            if (this.body.vel.y === 0) {
                this.renderable.setCurrentAnimation("walk");
            }
            this.body.force.x = -this.body.maxVel.x;
            this.renderable.flipX(true);
        } else if (input.isKeyPressed("right")) {
            if (this.body.vel.y === 0) {
                this.renderable.setCurrentAnimation("walk");
            }
            this.body.force.x = this.body.maxVel.x;
            this.renderable.flipX(false);
        }

        if (input.isKeyPressed("jump")) {
            this.renderable.setCurrentAnimation("jump");
            this.body.jumping = true;
            if (this.multipleJump <= 2) {
                // easy "math" for double jump
                this.body.force.y = -this.body.maxVel.y * this.multipleJump++;
            }
        } else {
            if (!this.body.falling && !this.body.jumping) {
                // reset the multipleJump flag if on the ground
                this.multipleJump = 1;
            }
            else if (this.body.falling && this.multipleJump < 2) {
                // reset the multipleJump flag if falling
                this.multipleJump = 2;
            }
        }


        if (this.body.force.x === 0 && this.body.force.y === 0) {
            this.renderable.setCurrentAnimation("stand");
        }

        // check if we fell into a hole
        if (!this.inViewport && (this.pos.y > video.renderer.getHeight())) {
            // if yes reset the game
            game.world.removeChild(this);
            game.viewport.fadeIn("#fff", 150, function(){
                level.reload();
                game.viewport.fadeOut("#fff", 150);
            });
            return true;
        }

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering())
        ) {
            super.update(dt);
            return true;
        }
        return false;
    }
*/