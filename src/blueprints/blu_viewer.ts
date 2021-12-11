import {GL_CCW, GL_CW} from "../../common/webgl.js";
import {Entity} from "../../common/world.js";
import {callback} from "../components/com_callback.js";
import {camera_xr} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {ControlPlayerKind, control_player} from "../components/com_control_player.js";
import {ControlXrKind, control_xr} from "../components/com_control_xr.js";
import {move} from "../components/com_move.js";
import {render_colored_shaded} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform, with_gyroscope} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";

export function blueprint_viewer(game: Game) {
    let player_entity: Entity;
    return [
        callback((game, entity) => (player_entity = entity)),
        control_player(ControlPlayerKind.Motion),
        rigid_body(RigidKind.Dynamic, 0.1),
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
                        children([
                            // Ignore the head's rotation.
                            transform(),
                            with_gyroscope(),
                            children([
                                // Head's collider is below the head.
                                transform([0, -0.5, 0]),
                                collide(true, Layer.Player, Layer.Solid, [0.2, 1, 0.2]),
                                callback((game, entity) => {
                                    // The player's rigis body uses this collider.
                                    let rigid_body = game.World.RigidBody[player_entity];
                                    rigid_body.ColliderId = entity;
                                }),
                            ]),
                        ]),
                    ],
                    [
                        // Left hand (must be Children[2]).
                        transform(),
                        control_xr(ControlXrKind.Left),
                        collide(true, Layer.None, Layer.Climbable, [0.1, 0.1, 0.1]),
                        children([
                            // The hand mesh; must be Children[0].
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
                        // Right hand (must be Children[3]).
                        transform(),
                        control_xr(ControlXrKind.Right),
                        collide(true, Layer.None, Layer.Climbable, [0.1, 0.1, 0.1]),
                        children([
                            // The hand mesh; must be Children[0].
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
