import {render_textured_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blue_wall(game: Game, type: "A" | "B" | "C") {
    return [
        transform(),
        render_textured_shaded(
            game.MaterialTexturedGouraud,
            game.MeshWallB,
            game.Textures["wall" + type]
        ),
    ];
}
