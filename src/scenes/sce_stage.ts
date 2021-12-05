import {instantiate} from "../../common/game.js";
import {from_rotation_translation_scale} from "../../common/mat4.js";
import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_viewer} from "../blueprints/blu_viewer.js";
import {light_directional} from "../components/com_light.js";
import {render_instanced} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(game.ClearColor[0], game.ClearColor[1], game.ClearColor[2], 1);

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([0, 2, 0], [0, 1, 0, 0])]);

    // VR Camera.
    instantiate(game, [...blueprint_viewer(game), transform([0, 2, 0], [0, 1, 0, 0])]);

    // Light.
    instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);

    let box_count = 20000;
    let ground_x = 10;
    let ground_z = 10;
    let ground_size = 10;

    let element_count = box_count + ground_x * ground_z;
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

    for (let i = ground_x * ground_z; i < element_count; i++) {
        let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        let r = float();
        if (r < 0.99) {
            // Rubble on the ground.
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
        } else {
            // Floating boxes.
            let s = float(1, 5);
            from_rotation_translation_scale(
                view,
                from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90)),
                [
                    float((-ground_size * ground_x) / 2, (ground_size * ground_x) / 2),
                    float(s, 15),
                    float((-ground_size * ground_z) / 2, (ground_size * ground_z) / 2),
                ],
                [s, s, s]
            );
        }

        let color = new Float32Array(colors.buffer, i * 4 * 3, 3);
        color[0] = float(0, 1);
        color[1] = float(0, 1);
        color[2] = float(0, 1);
    }

    instantiate(game, [transform([0, 1, 0]), render_instanced(game.MeshCube, matrices, colors)]);
}
