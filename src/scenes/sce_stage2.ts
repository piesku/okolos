import {instantiate} from "../../common/game.js";
import {set_seed} from "../../common/random.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_viewer} from "../blueprints/blu_viewer.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {light_directional} from "../components/com_light.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {transform} from "../components/com_transform.js";
import {Game, Layer} from "../game.js";
import {map_city} from "../maps/map_city.js";
import {World} from "../world.js";

export function scene_stage2(game: Game) {
    set_seed(Date.now());

    game.World = new World();
    game.Cameras = [];
    game.ViewportResized = true;
    game.Gl.clearColor(game.ClearColor[0], game.ClearColor[1], game.ClearColor[2], 1);

    // Camera.
    instantiate(game, [...blueprint_camera(game), transform([0, 2, 0], [0, 1, 0, 0])]);

    // VR Camera.
    instantiate(game, [...blueprint_viewer(game), transform([0, 2, 0], [0, 1, 0, 0])]);

    // Light.
    instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);

    let ground_x = 10;
    let ground_z = 10;
    let ground_size = 50;

    instantiate(game, [
        transform(undefined, undefined, [ground_x * ground_size, 3, ground_z * ground_size]),
        collide(false, Layer.Solid, Layer.None),
        rigid_body(RigidKind.Static),
    ]);

    instantiate(game, [transform([0, 0, 0], undefined, [4, 4, 4]), children(...map_city(game))]);
}
