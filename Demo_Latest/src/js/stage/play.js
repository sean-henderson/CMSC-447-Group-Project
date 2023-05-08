import { Stage, game, ColorLayer, BitmapText, level, audio } from 'melonjs';

class PlayScreen extends Stage {
    /*load level on state change*/
    onResetEvent() {
        level.load("area01");
        audio.playTrack("level_one");
    }
    onDestroyEvent() {
        audio.stopTrack();
    }
};

export default PlayScreen;
