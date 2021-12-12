import {children} from "../components/com_children.js";
import {render_textured_shaded} from "../components/com_render.js";
import {RigidKind} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {blueprint_climbable} from "./blu_climbable.js";

export function blue_truck(game: Game) {
    return [
        children(
            [
                ...blueprint_climbable(RigidKind.Kinematic, [0.83, 1.01, 1.64]),
                transform([0, 0.5, 0]),
            ],
            [
                transform(),
                render_textured_shaded(
                    game.MaterialTexturedGouraud,
                    game.MeshTruck,
                    game.Textures["truck"]
                ),
            ]
        ),
    ];
}
