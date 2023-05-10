// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    /* Bitmap Text */
    //Images
    {name: "Tiles",             type:"image", src: "data/img/Tiles.png"},
    {name: "Background",        type:"image", src: "data/img/Background.png"},
    {name: "Buildings",         type:"image", src: "data/img/Buildings.png"},
    {name: "Interior-01",       type:"image", src: "data/img/Interior-01.png"},
    {name: "Tree-Assets",       type:"image", src: "data/img/Tree-Assets.png"},
    {name: "coin",              type:"image", src: "data/img/coin.png"},

    //Tile sets
    {name: "Tiles",             type:"tsx", src: "data/img/Tiles.tsx"},
    {name: "Background",        type:"tsx", src: "data/img/Background.tsx"},
    {name: "Buildings",         type:"tsx", src: "data/img/Buildings.tsx"},
    {name: "Interior-01",       type:"tsx", src: "data/img/Interior-01.tsx"},
    {name: "Tree-Assets",       type:"tsx", src: "data/img/Tree-Assets.tsx"},

    //Levels
    {name: "area01",            type: "tmx",	src: "data/map/area01.tmx"},
    {name: "area02",            type: "tmx",	src: "data/map/area02.tmx"},
    {name: "area03",            type: "tmx",	src: "data/map/area03.tmx"},
    {name: "test_area01",       type: "tmx",	src: "data/map/test_area01.tmx"},
    {name: "test_area02",       type: "tmx",	src: "data/map/test_area02.tmx"},

    //Fonts
    { name: "PressStart2P",     type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P",     type:"binary", src: "data/fnt/PressStart2P.fnt"},
    
    //Player Entity
    {name: "player_running",    type: "image", src: "data/img/Run-Sheet.png"},
    {name: "player_run01",      type: "image", src: "data/img/player_run01.png"},

    //Music
    {name: "level_one",         type: "audio", src: "data/bgm/", channel: 1},
    {name: "level_two",         type: "audio", src: "data/bgm/", channel: 1},
    {name: "level_three",       type: "audio", src: "data/bgm/", channel: 1},

    //Sfx
    {name: "jump",              type: "audio", src: "data/sfx/", channel: 2},
    {name: "cling",             type: "audio", src: "data/sfx/", channel: 2},
    {name: "level_complete", type: "audio", src: "data/sfx/", channel: 2},
    {name: "game_complete", type: "audio", src: "data/sfx/", channel: 2},

    //Menus
    {name: "title_screen",      type: "image", src: "data/img/title_screen.png"},
    {name: "Jump_Lite",         type: "image", src: "data/img/Jump_Lite.png"},
    {name: "New_Game",          type: "image", src: "data/img/New_Game.png"},
    {name: "Load_Game",         type: "image", src: "data/img/Load_Game.png"},
    {name: "Leaderboard",       type: "image", src: "data/img/Leaderboard.png"}
];

export default DataManifest;
