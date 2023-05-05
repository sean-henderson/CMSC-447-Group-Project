import { Stage, event, Sprite, game, loader, input, state } from 'melonjs';

class ButtonEntity extends Sprite {
    constructor(x, y) {
        super(x, y, {image: "player_run01", framewidth: 178, frameheight: 140});
        
        this.anchorPoint.set(0,0);

        input.registerPointerEvent("pointerdown", this, this.pointerDown.bind(this));
    }

    pointerDown () {
        state.change(state.PLAY);
        return false;
      }
}

export default ButtonEntity;