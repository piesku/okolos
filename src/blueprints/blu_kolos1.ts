import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {animate} from "../components/com_animate.js";
import {kolos1_anims} from "./animation_blu_kolos1.js";

export function prop_body(game: Game) {
    return [
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 4, 4.8]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 2, 0], [0, 0.71, 0, 0.71], [3.6, 4, 8.4]),
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
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 0, 1.9], [0, 0.71, 0, 0.71], [0.2, 0.6, 3.6]),
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
            transform([0, -6.6, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 5.2, 1.2]),
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
            transform([0, -6.6, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -7.8, 1.3], [0, 0.71, 0, 0.71], [0.6, 1.6, 1.6]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -8, 1.55], [0, 0.92, 0, 0.38], [1, 1.2, 1]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 5.2, 1.2]),
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
            transform([0, -6.6, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 5.2, 1.2]),
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
            transform([0, -6.6, 0], [0, 0.71, 0, 0.71], [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -7.8, 1.3], [0, 0.71, 0, 0.71], [0.6, 1.6, 1.6]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -8, 1.55], [0, 0.92, 0, 0.38], [1, 1.2, 1]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], [0, 0.71, 0, 0.71], [1.2, 5.2, 1.2]),
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
                transform([0, 12, 0], undefined, undefined),
                children(...prop_body(game)),
                animate(kolos1_anims.body),
            ],

            [transform([0, 18.5, 0], undefined, undefined), children(...prop_head(game))],

            [
                transform([5, 14.5, 0], undefined, undefined),
                children(...prop_left_hand(game)),
                animate(kolos1_anims.left_hand),
            ],

            [
                transform([3, 8.5, 0], undefined, undefined),
                children(...prop_left_leg(game)),
                animate(kolos1_anims.left_leg),
            ],

            [
                transform([-5, 14.5, 0], undefined, undefined),
                children(...prop_right_hand(game)),
                animate(kolos1_anims.right_hand),
            ],

            [
                transform([-3, 8.5, 0], undefined, undefined),
                children(...prop_right_leg(game)),
                animate(kolos1_anims.right_leg),
            ]
        ),
    ];
}
