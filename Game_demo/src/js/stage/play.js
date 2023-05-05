import { Stage, game, ColorLayer, BitmapText, level  } from 'melonjs';

class PlayScreen extends Stage {
    /*load level on state change*/
    onResetEvent() {
        level.load("area01");
    }
};

export default PlayScreen;
