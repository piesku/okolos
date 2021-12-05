import {instantiate} from "../../common/game.js";
import {from_rotation_translation_scale} from "../../common/mat4.js";
import {Quat, Vec3} from "../../common/math.js";
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
    instantiate(game, [...blueprint_camera(game), transform([1, 2, 5], [0, 1, 0, 0])]);

    // VR Camera.
    instantiate(game, [...blueprint_viewer(game), transform([1, 2, 5], [0, 1, 0, 0])]);

    // Light.
    instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);

    let box_count = 10000;
    let ground_x = 30;
    let ground_y = 30;
    let ground_size = 5;
    let radius = ground_size * ground_x;
    let element_count = box_count + ground_x * ground_y;
    let matrices = new Float32Array(element_count * 16);
    let off = 0;
    for (let x = 0; x < ground_x; x++) {
        for (let y = 0; y < ground_x; y++) {
            let tx = -ground_x / 2 + x;
            let ty = -ground_y / 2 + y;
            let view = new Float32Array(matrices.buffer, off * 4 * 16, 16);
            off++;
            from_rotation_translation_scale(
                view,
                [0, 0, 0, 1],
                [tx, -1, ty],
                [ground_size, 1, ground_size]
            );
        }
    }

    for (let i = ground_x * ground_y; i < element_count; i++) {
        let offset: Vec3 = [float(-radius, radius), 0, float(-radius, radius)];
        let rotation: Quat = [0, 0, 0, 1]; //from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90));
        let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        from_rotation_translation_scale(view, rotation, offset, [
            float(0.1, 0.5),
            float(0.5, 5),
            float(0.1, 0.5),
        ]);
    }

    instantiate(game, [transform([0, 1, 0]), render_instanced(game.MeshCube, matrices)]);
}
