import {element} from "../../common/random.js";
import {children} from "../components/com_children.js";
import {render_textured_shaded} from "../components/com_render.js";
import {RigidKind} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {blueprint_climbable} from "./blu_climbable.js";

export function blue_roof_2(game: Game) {
    return [
        children(
            [...blueprint_climbable(RigidKind.Kinematic, [1, 0.5, 1]), transform([0, 0.25, 0])],
            [
                transform(),
                render_textured_shaded(
                    game.MaterialTexturedGouraud,
                    game.MeshWallBRoof,
                    element([
                        game.Textures["roofA"],
                        game.Textures["roofB"],
                        game.Textures["roofC"],
                    ])
                ),
            ]
        ),
    ];
}

// export function blue_roof_1(game: Game) {
//     return [
//         transform(),
//         render_textured_shaded(
//             game.MaterialTexturedGouraud,
//             game.MeshWallBGarage,
//             element([game.Textures["roofA"], game.Textures["roofB"], game.Textures["roofC"]])
//         ),
//     ];
// }
