import {camera_depth_ortho} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {light_directional} from "../components/com_light.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function blueprint_sun(game: Game) {
    return [
        // control_always(null, [0, 1, 0, 0]),
        // move(0, 0.5),
        children([
            transform([0, 0, 64]),
            light_directional([1, 1, 1], 0.9),
            camera_depth_ortho(game.Targets.Sun, 32, 4, 64),
        ]),
    ];
}
