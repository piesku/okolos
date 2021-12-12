import {children} from "../components/com_children.js";
import {render_textured_shaded} from "../components/com_render.js";
import {RigidKind} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {blueprint_climbable} from "./blu_climbable.js";

export function blue_wall(game: Game, type: "A" | "B" | "C") {
    return [
        children(
            [...blueprint_climbable(RigidKind.Kinematic), transform([0, 0.5, 0])],
            [
                transform(),
                render_textured_shaded(
                    game.MaterialTexturedGouraud,
                    game.MeshWallB,
                    game.Textures["wall" + type]
                ),
            ]
        ),
    ];
}
