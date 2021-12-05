import {GL_CCW, GL_CW} from "../../common/webgl.js";
import {camera_xr} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {ControlPlayerKind, control_player} from "../components/com_control_player.js";
import {ControlXrKind, control_xr} from "../components/com_control_xr.js";
import {move} from "../components/com_move.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_viewer(game: Game) {
    return [
        control_player(ControlPlayerKind.Motion),
        move(2, 1),
        children(
            // An intermediate entity for walk bobbing.
            [
                transform(undefined, [0, 1, 0, 0]),
                children(
                    [
                        // Headset.
                        transform(),
                        camera_xr(),
                    ],
                    [
                        // Head (must be Children[1]).
                        transform(),
                        control_xr(ControlXrKind.Head),
                    ],
                    [
                        // Left hand.
                        transform(),
                        control_xr(ControlXrKind.Left),
                        children([
                            transform(undefined, undefined, [-1, 1, 1]),
                            render_colored_shaded(
                                game.MaterialColoredGouraud,
                                game.MeshHand,
                                [1, 1, 0.3, 1],
                                0,
                                [1, 1, 1, 1],
                                GL_CCW
                            ),
                        ]),
                    ],
                    [
                        // Right hand.
                        transform(),
                        control_xr(ControlXrKind.Right),
                        children([
                            transform(),
                            render_colored_shaded(
                                game.MaterialColoredGouraud,
                                game.MeshHand,
                                [1, 1, 0.3, 1],
                                0,
                                [1, 1, 1, 1],
                                GL_CW
                            ),
                        ]),
                    ]
                ),
            ]
        ),
    ];
}
