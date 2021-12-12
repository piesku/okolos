import {children} from "../components/com_children.js";
import {render_textured_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blue_road(game: Game, type: "A" | "B" | "C" | "D") {
    return [
        children([
            transform(),
            render_textured_shaded(
                game.MaterialTexturedGouraud,
                game.MeshRoad,
                game.Textures["road" + type]
            ),
        ]),
    ];
}
