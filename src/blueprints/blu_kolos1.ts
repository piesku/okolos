import {animate} from "../components/com_animate.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {render_colored_shaded} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {kolos1_anims} from "./animation_blu_kolos1.js";

export function prop_body(game: Game) {
    return [
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 4, 4.8]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 2, 0], [0, 0.71, 0, 0.71], [3.6, 4, 8.4]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_head(game: Game) {
    return [
        [
            transform(undefined, [0, 0.71, 0, 0.71], [3.6, 5, 4]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 0, 1.9], [0, 0.71, 0, 0.71], [0.2, 0.6, 3.6]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_left_hand(game: Game) {
    return [
        [
            transform([0, -9.8, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -3.8, 0], [0, 0.71, 0, 0.71], [1.2, 8, 1.2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_left_leg(game: Game) {
    return [
        [
            transform([0, -9.1, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -10.3, 1.3], [0, 0.71, 0, 0.71], [0.6, 1.6, 1.6]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -10.5, 1.55], [0, 0.92, 0, 0.38], [1, 1.2, 1]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -3.1, 0], [0, 0.71, 0, 0.71], [1.2, 8, 1.2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_right_hand(game: Game) {
    return [
        [
            transform([0, -9.8, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -3.8, 0], [0, 0.71, 0, 0.71], [1.2, 8, 1.2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_right_leg(game: Game) {
    return [
        [
            transform([0, -9.1, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -10.3, 1.3], [0, 0.71, 0, 0.71], [0.6, 1.6, 1.6]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -10.5, 1.55], [0, 0.92, 0, 0.38], [1, 1.2, 1]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -3.1, 0], [0, 0.71, 0, 0.71], [1.2, 8, 1.2]),
            collide(true, Layer.Solid | Layer.Climbable, Layer.None),
            rigid_body(RigidKind.Static),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function blue_kolos1(game: Game) {
    return [
        children(
            [
                transform([0, 14.5, 0], undefined, undefined),
                children(...prop_body(game)),
                animate(kolos1_anims.body),
            ],

            [transform([0, 21, 0], undefined, undefined), children(...prop_head(game))],

            [
                transform([5, 18, 0], undefined, undefined),
                children(...prop_left_hand(game)),
                animate(kolos1_anims.left_hand),
            ],

            [
                transform([3, 11, 0], undefined, undefined),
                children(...prop_left_leg(game)),
                animate(kolos1_anims.left_leg),
            ],

            [
                transform([-5, 18, 0], undefined, undefined),
                children(...prop_right_hand(game)),
                animate(kolos1_anims.right_hand),
            ],

            [
                transform([-3, 11, 0], undefined, undefined),
                children(...prop_right_leg(game)),
                animate(kolos1_anims.right_leg),
            ]
        ),
    ];
}
