import {get_translation} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {add, copy, length, subtract, transform_direction} from "../../common/vec3.js";
import {Entity} from "../../common/world.js";
import {ControlPlayerKind} from "../components/com_control_player.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.ControlPlayer;

export function sys_control_player(game: Game, delta: number) {
    if (!game.XrFrame) {
        return;
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

let left_climbing = false;
let left_last_position: Vec3 = [0, 0, 0];
let left_current_position: Vec3 = [0, 0, 0];
let left_offset: Vec3 = [0, 0, 0];

let right_climbing = false;
let right_last_position: Vec3 = [0, 0, 0];
let right_current_position: Vec3 = [0, 0, 0];
let right_offset: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform[entity];
    let children = game.World.Children[entity];
    let control = game.World.ControlPlayer[entity];

    if (control.Kind === ControlPlayerKind.Motion) {
        let move = game.World.Move[entity];

        let bob_entity = children.Children[0];
        let bob_transform = game.World.Transform[bob_entity];
        let bob_children = game.World.Children[bob_entity];
        let head_entity = bob_children.Children[1];
        let head_transform = game.World.Transform[head_entity];

        // Walking in the direction of looking.
        let left = game.XrInputs["left"];
        if (left?.gamepad) {
            let axis_strafe = -left.gamepad.axes[2];
            if (axis_strafe) {
                let direction: Vec3 = [axis_strafe, 0, 0];
                transform_direction(direction, direction, head_transform.World);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
            }

            let axis_forward = -left.gamepad.axes[3];
            if (axis_forward) {
                let direction: Vec3 = [0, 0, axis_forward];
                transform_direction(direction, direction, head_transform.World);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
            }

            let squeeze = left.gamepad.buttons[1];
            if (squeeze && squeeze.value > 0.5) {
                let pose = game.XrFrame!.getPose(left.gripSpace!, game.XrSpace!);

                if (!left_climbing) {
                    left_climbing = true;
                    get_translation(left_last_position, pose.transform.matrix);
                } else {
                    get_translation(left_current_position, pose.transform.matrix);
                    subtract(left_offset, left_last_position, left_current_position);
                    copy(left_last_position, left_current_position);

                    add(transform.Translation, transform.Translation, left_offset);
                    transform.Dirty = true;
                }
            } else if (left_climbing) {
                left_climbing = false;
            }
        }

        let right = game.XrInputs["right"];
        if (right?.gamepad) {
            let axis_strafe = -right.gamepad.axes[2];
            if (axis_strafe) {
                let direction: Vec3 = [axis_strafe, 0, 0];
                transform_direction(direction, direction, head_transform.World);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
            }

            let axis_forward = -right.gamepad.axes[3];
            if (axis_forward) {
                let direction: Vec3 = [0, 0, axis_forward];
                transform_direction(direction, direction, head_transform.World);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
            }

            let squeeze = right.gamepad.buttons[1];
            if (squeeze && squeeze.value > 0.5) {
                let pose = game.XrFrame!.getPose(right.gripSpace!, game.XrSpace!);

                if (!right_climbing) {
                    right_climbing = true;
                    get_translation(right_last_position, pose.transform.matrix);
                } else {
                    get_translation(right_current_position, pose.transform.matrix);
                    subtract(right_offset, right_last_position, right_current_position);
                    copy(right_last_position, right_current_position);

                    add(transform.Translation, transform.Translation, right_offset);
                    transform.Dirty = true;
                }
            } else if (right_climbing) {
                right_climbing = false;
            }
        }

        // Bobbing while walking.
        if (length(move.Direction) > 0) {
            let bobbing_amplitude = 0.03;
            let bobbing_frequency = 5;
            let bobbing =
                (Math.sin(bobbing_frequency * transform.Translation[0]) +
                    Math.sin(bobbing_frequency * transform.Translation[2])) *
                bobbing_amplitude;
            bob_transform.Translation[1] = bobbing;
            bob_transform.Dirty = true;
        }
    }
}