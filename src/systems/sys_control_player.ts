import {get_translation} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {from_axis, multiply as quat_multiply} from "../../common/quat.js";
import {
    add,
    copy as vec3_copy,
    length,
    subtract,
    transform_direction,
    transform_position,
} from "../../common/vec3.js";
import {Entity} from "../../common/world.js";
import {ControlPlayerKind} from "../components/com_control_player.js";
import {RigidKind} from "../components/com_rigid_body.js";
import {TransformKind} from "../components/com_transform.js";
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

const AXIS_Y: Vec3 = [0, 1, 0];

let left_climbing = false;
let left_last_position: Vec3 = [0, 0, 0];
let left_curr_position: Vec3 = [0, 0, 0];
let left_offset: Vec3 = [0, 0, 0];

let right_climbing = false;
let right_last_position: Vec3 = [0, 0, 0];
let right_curr_position: Vec3 = [0, 0, 0];
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
            let axis_strafe = left.gamepad.axes[2];
            if (axis_strafe) {
                let direction: Vec3 = [axis_strafe, 0, 0];
                transform_direction(direction, direction, head_transform.World);
                transform_direction(direction, direction, transform.Self);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
            }

            let axis_forward = left.gamepad.axes[3];
            if (axis_forward) {
                let direction: Vec3 = [0, 0, axis_forward];
                transform_direction(direction, direction, head_transform.World);
                transform_direction(direction, direction, transform.Self);
                direction[1] = 0;
                add(move.Direction, move.Direction, direction);
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

        // Rotating the player.
        let right = game.XrInputs["right"];
        if (right?.gamepad) {
            let axis_rotate = -right.gamepad.axes[2];
            if (axis_rotate) {
                let amount = axis_rotate * Math.PI;
                let rotation = from_axis([0, 0, 0, 1], AXIS_Y, amount);
                quat_multiply(move.LocalRotation, move.LocalRotation, rotation);
            }
        }

        let left_hand_entity = bob_children.Children[2];
        let left_hand_control = game.World.ControlXr[left_hand_entity];
        let right_hand_entity = bob_children.Children[3];
        let right_hand_control = game.World.ControlXr[right_hand_entity];

        // Climbing with the left hand.
        if (left_hand_entity && left_hand_control?.Squeezed) {
            let hand_transform = game.World.Transform[left_hand_entity];
            let hand_collide = game.World.Collide[left_hand_entity];

            if (hand_collide.Collisions.length > 0) {
                let climb_entity = hand_collide.Collisions[0].Other;
                let climb_transform = game.World.Transform[climb_entity];
                let climb_children = game.World.Children[climb_entity];

                if (!left_climbing) {
                    left_climbing = true;
                    get_translation(left_last_position, hand_transform.World);
                    transform_position(left_last_position, left_last_position, transform.Self);

                    if (transform.Parent) {
                        // Release the player from the previous climb.
                        let another_climbed_children = game.World.Children[transform.Parent];
                        another_climbed_children.Children.pop();
                    }

                    // Parent the player to the climb.
                    climb_children.Children.push(entity);
                    transform.Parent = climb_entity;

                    // Compute player's world translation in case they were attached before.
                    get_translation(transform.Translation, transform.World);
                    transform_position(
                        transform.Translation,
                        transform.Translation,
                        climb_transform.Self
                    );

                    transform.Kind = TransformKind.Gyroscope;
                    transform.Dirty = true;
                } else {
                    get_translation(left_curr_position, hand_transform.World);
                    transform_position(left_curr_position, left_curr_position, transform.Self);
                    subtract(left_offset, left_last_position, left_curr_position);
                    vec3_copy(left_last_position, left_curr_position);

                    transform_direction(left_offset, left_offset, transform.World);
                    transform_direction(left_offset, left_offset, climb_transform.Self);
                    add(transform.Translation, transform.Translation, left_offset);
                    transform.Dirty = true;
                }
            }
        } else if (left_climbing) {
            left_climbing = false;
        }

        // Climbing with the right hand.
        if (right_hand_entity && right_hand_control?.Squeezed) {
            //if (right_hand_entity) {
            let hand_transform = game.World.Transform[right_hand_entity];
            let hand_collide = game.World.Collide[right_hand_entity];

            if (hand_collide.Collisions.length > 0) {
                let climb_entity = hand_collide.Collisions[0].Other;
                let climb_transform = game.World.Transform[climb_entity];
                let climb_children = game.World.Children[climb_entity];

                if (!right_climbing) {
                    right_climbing = true;
                    get_translation(right_last_position, hand_transform.World);
                    transform_position(right_last_position, right_last_position, transform.Self);

                    if (transform.Parent) {
                        // Release the player from the previous climb.
                        let another_climbed_children = game.World.Children[transform.Parent];
                        another_climbed_children.Children.pop();
                    }

                    // Parent the player to the climb.
                    climb_children.Children.push(entity);
                    transform.Parent = climb_entity;

                    // Compute player's world translation in case they were attached before.
                    get_translation(transform.Translation, transform.World);
                    transform_position(
                        transform.Translation,
                        transform.Translation,
                        climb_transform.Self
                    );

                    transform.Kind = TransformKind.Gyroscope;
                    transform.Dirty = true;
                } else {
                    get_translation(right_curr_position, hand_transform.World);
                    transform_position(right_curr_position, right_curr_position, transform.Self);
                    subtract(right_offset, right_last_position, right_curr_position);
                    vec3_copy(right_last_position, right_curr_position);

                    transform_direction(right_offset, right_offset, transform.World);
                    transform_direction(right_offset, right_offset, climb_transform.Self);
                    add(transform.Translation, transform.Translation, right_offset);
                    transform.Dirty = true;
                }
            }
        } else if (right_climbing) {
            right_climbing = false;
        }

        let rigid_body = game.World.RigidBody[entity];
        if (left_climbing || right_climbing) {
            rigid_body.Kind = RigidKind.Kinematic;
        } else {
            rigid_body.Kind = RigidKind.Dynamic;

            if (transform.Parent) {
                // Release the player.
                let climbed_entity = transform.Parent;
                let climbed_children = game.World.Children[climbed_entity];

                // Un-parent the player.
                climbed_children.Children.pop();
                transform.Parent = undefined;

                // Move the player into the world space.
                get_translation(transform.Translation, transform.World);

                transform.Kind = TransformKind.Regular;
                transform.Dirty = true;
            }
        }
    }
}
