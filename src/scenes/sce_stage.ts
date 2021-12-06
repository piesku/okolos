import {instantiate} from "../../common/game.js";
import {from_rotation_translation_scale} from "../../common/mat4.js";
import {from_euler} from "../../common/quat.js";
import {float, set_seed} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blue_kolos1} from "../blueprints/blu_kolos1.js";
import {blueprint_viewer} from "../blueprints/blu_viewer.js";
import {collide} from "../components/com_collide.js";
import {control_always} from "../components/com_control_always.js";
import {light_directional} from "../components/com_light.js";
import {move} from "../components/com_move.js";
import {render_instanced} from "../components/com_render.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    set_seed(Date.now());

    game.World = new World();
    game.Cameras = [];
    game.ViewportResized = true;
    game.Gl.clearColor(game.ClearColor[0], game.ClearColor[1], game.ClearColor[2], 1);

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([0, 2, 0], [0, 1, 0, 0])]);

    // VR Camera.
    instantiate(game, [...blueprint_viewer(game), transform([0, 50, 0], [0, 1, 0, 0])]);

    // Light.
    instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);

    let rubble_count = 20_000;
    let floating_count = 50;
    let ground_x = 10;
    let ground_z = 10;
    let ground_size = 10;

    instantiate(game, [
        transform(undefined, undefined, [ground_x * ground_size, 3, ground_z * ground_size]),
        collide(false, Layer.Terrain, Layer.None),
        rigid_body(RigidKind.Static),
    ]);

    let element_count = rubble_count + ground_x * ground_z;
    let matrices = new Float32Array(element_count * 16);
    let colors = new Float32Array(element_count * 3);
    let off = 0;
    for (let x = 0; x < ground_x; x++) {
        for (let z = 0; z < ground_z; z++) {
            let tx = (x - ground_x / 2 + 0.5) * ground_size;
            let ty = (z - ground_z / 2 + 0.5) * ground_size;
            let view = new Float32Array(matrices.buffer, off * 4 * 16, 16);
            off++;
            from_rotation_translation_scale(
                view,
                [0, 0, 0, 1],
                [tx, -1, ty],
                [ground_size, 1, ground_size]
            );

            let color = new Float32Array(colors.buffer, off * 4 * 3, 3);
            color[0] = float(0, 1);
            color[1] = float(0, 1);
            color[2] = float(0, 1);
        }
    }

    // Rubble on the ground.
    for (let i = ground_x * ground_z; i < element_count; i++) {
        let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        from_rotation_translation_scale(
            view,
            from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90)),
            [
                float((-ground_size * ground_x) / 2, (ground_size * ground_x) / 2),
                0,
                float((-ground_size * ground_z) / 2, (ground_size * ground_z) / 2),
            ],
            [float(0.1, 0.5), float(0.5, 5), float(0.1, 0.5)]
        );

        let color = new Float32Array(colors.buffer, i * 4 * 3, 3);
        color[0] = float(0, 1);
        color[1] = float(0, 1);
        color[2] = float(0, 1);
    }

    instantiate(game, [transform([0, 1, 0]), render_instanced(game.MeshCube, matrices, colors)]);

    // // Floating boxes.
    // for (let i = 0; i < floating_count; i++) {
    //     let s = float(5, 10);
    //     instantiate(game, [
    //         transform(
    //             [
    //                 float((-ground_size * ground_x) / 2, (ground_size * ground_x) / 2),
    //                 float(3, 25),
    //                 float((-ground_size * ground_z) / 2, (ground_size * ground_z) / 2),
    //             ],
    //             from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90)),
    //             [s, s, s]
    //         ),
    //         render_colored_shaded(game.MaterialColoredGouraud, game.MeshCube, [
    //             float(0, 1),
    //             float(0, 1),
    //             float(0, 1),
    //             1,
    //         ]),
    //         collide(false, Layer.Terrain, Layer.None),
    //         rigid_body(RigidKind.Static),
    //     ]);
    // }

    instantiate(game, [transform([10, -2, -10]), ...blue_kolos1(game)]);

    instantiate(game, [
        transform([-20, -2, 30], from_euler([0, 0, 0, 1], 0, 180, 0)),
        move(2, 0),
        ...blue_kolos1(game),
        control_always([0, 0, 1], null, "walk"),
    ]);

    instantiate(game, [
        transform([-20, -2, 100], from_euler([0, 0, 0, 1], 0, 180, 0)),
        move(2, 0),
        ...blue_kolos1(game),
        control_always([0, 0, 1], null, "walk"),
    ]);
}
