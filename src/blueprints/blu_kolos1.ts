import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function prop_head(game: Game) {
    return [
        [
            transform(undefined, undefined, [3.6, 5, 4]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([-1.9, 0, 0], undefined, [0.2, 0.6, 3.6]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
    ];
}

export function prop_body(game: Game) {
    return [
        [
            transform([0, -2, 0], undefined, [1.2, 4, 4.8]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 2, 0], undefined, [3.6, 4, 8.4]),
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
            transform([0, 2, 0], undefined, [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([-1.3, 0.8, 0], undefined, [0.6, 1.6, 1.6]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([-1.55, 0.6, 0], [0, 0.38, 0, 0.92], [1, 1.2, 1]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 6.6, 0], undefined, [1.2, 5.2, 1.2]),
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
            transform([0, 2, 0], undefined, [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([-1.3, 0.8, 0], undefined, [0.6, 1.6, 1.6]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([-1.55, 0.6, 0], [0, 0.38, 0, 0.92], [1, 1.2, 1]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, 6.6, 0], undefined, [1.2, 5.2, 1.2]),
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
            transform([0, -6.6, 0], undefined, [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], undefined, [1.2, 5.2, 1.2]),
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
            transform([0, -6.6, 0], undefined, [2, 4, 2]),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.MeshCube,
                [0.33, 0.33, 0.33, 1]
            ),
        ],
        [
            transform([0, -2, 0], undefined, [1.2, 5.2, 1.2]),
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
            [transform([0, 18.5, 0], undefined, undefined), children(...prop_head(game))],

            [transform([0, 12, 0], undefined, undefined), children(...prop_body(game))],

            [transform([0, 0, 3], undefined, undefined), children(...prop_left_leg(game))],

            [transform([0, 0, -3], undefined, undefined), children(...prop_right_leg(game))],

            [transform([0, 14.5, 5], undefined, undefined), children(...prop_left_hand(game))],

            [transform([0, 14.5, -5], undefined, undefined), children(...prop_right_hand(game))]
        ),
    ];
}
