import {instantiate} from "../../common/game.js";
import {from_rotation_translation_scale} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {from_euler} from "../../common/quat.js";
import {float} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_viewer} from "../blueprints/blu_viewer.js";
import {light_directional} from "../components/com_light.js";
import {render_colored_shaded, render_instanced} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.Gl.clearColor(0.9, 0.9, 0.9, 1);

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([1, 2, 5], [0, 1, 0, 0])]);

    // VR Camera.
    instantiate(game, [...blueprint_viewer(game), transform([1, 2, 5], [0, 1, 0, 0])]);

    // Light.
    instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);

    // Ground.
    instantiate(game, [
        transform(undefined, undefined, [7, 1, 7]),
        render_colored_shaded(game.MaterialColoredGouraud, game.MeshCube, [1, 1, 0.3, 1]),
    ]);

    // ORB
    let radius = 5; //float(0.5, 0.9);
    let leaf_count = 30;
    let matrices = new Float32Array(leaf_count * 16);
    for (let i = 0; i < leaf_count; i++) {
        let offset: Vec3 = [float(-radius, radius), float(-radius, radius), float(-radius, radius)];
        let rotation = from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90));
        let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        from_rotation_translation_scale(view, rotation, offset, [0.1, 0.1, 0.1]);
    }

    instantiate(game, [transform([0, 1, 0]), render_instanced(game.MeshCube, matrices)]);
}
