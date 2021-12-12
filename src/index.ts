import {create_texture_from, fetch_image} from "../common/texture.js";
import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {scene_stage2} from "./scenes/sce_stage2.js";

let game = new Game();

Promise.all([
    load_texture(game, "roofA"),
    load_texture(game, "roofB"),
    load_texture(game, "roofC"),

    load_texture(game, "roadA"),
    load_texture(game, "roadB"),
    load_texture(game, "roadC"),
    load_texture(game, "roadD"),

    load_texture(game, "wallA"),
    load_texture(game, "wallB"),
    load_texture(game, "wallC"),

    load_texture(game, "tree"),
    load_texture(game, "truck"),
]).then(() => {
    false && scene_stage(game);
    scene_stage2(game);
    game.Start();
});

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;

async function load_texture(game: Game, name: string) {
    let image = await fetch_image("../textures/" + name + ".png");
    game.Textures[name] = create_texture_from(game.Gl, image);
}
