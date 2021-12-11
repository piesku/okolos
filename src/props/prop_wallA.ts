import {render_textured_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_wallA(game: Game) {
    return [
        transform(),
        render_textured_shaded(
            game.MaterialTexturedGouraud,
            game.MeshWallA,
            game.Textures["wall_lines"]
        ),
    ];
}
