import { Stage, event, Sprite, game, loader, input, state, UISpriteElement} from 'melonjs';
import { newGame, loadGame, getLeaderboard } from '../../data/frontend';

class ButtonEntity extends UISpriteElement {
    constructor(x, y, picture, ID) {
        super(x, y, {image: picture});
        this.ID = ID;
    }

    // function for when button its clicked
    onClick (event) {
        //Nothing
        if (this.ID === 0){
            null
        }
        //New_game
        else if (this.ID === 1){
            newGame();
        }
        //Load_game
        else if (this.ID === 2){
            loadGame();
        }
        //Leaderboard
        else if (this.ID === 3){
            getLeaderboard();
        }
        return false;
    }
}



class TitleScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // initialize background
        var backgroundImage = new Sprite(game.viewport.width / 2, game.viewport.height / 2, 
        {image: loader.getImage('title_screen')});

        // scale to fit with the viewport size
        backgroundImage.scale(game.viewport.width / backgroundImage.width, game.viewport.height / backgroundImage.height);

        // initialize menu items
        var title = new ButtonEntity(800, 300, "Jump_Lite", 0);
        var button_new_game = new ButtonEntity(800, 480, "New_Game", 1 );
        var button_load_game = new ButtonEntity(800, 580, "Load_Game", 2);
        var button_leaderboard = new ButtonEntity(800, 680, "Leaderboard", 3);
        
        // add to the world container
        game.world.addChild(backgroundImage, 1);
        game.world.addChild (title, 2);
        game.world.addChild (button_new_game, 2);
        game.world.addChild (button_load_game, 2);
        game.world.addChild (button_leaderboard, 2);
    }

    /*action to perform when leaving this screen (state change)*/
    onDestroyEvent() {
        input.unbindKey(input.KEY.ENTER);
        input.unbindPointer(input.pointer.LEFT);
        event.off(event.KEYDOWN, this.handler);
    }
};

export default TitleScreen;
