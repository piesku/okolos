import {children} from "../components/com_children.js";
import {render_textured_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blue_tree(game: Game) {
    return [
        children([
            transform(),
            render_textured_shaded(
                game.MaterialTexturedGouraud,
                game.MeshTree,
                game.Textures["tree"]
            ),
        ]),
    ];
}
