import {
    from_rotation_translation_scale,
    get_translation,
    invert,
    multiply,
} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Transform, TransformKind} from "../components/com_transform.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform;

export function sys_transform(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let transform = game.World.Transform[i];
            if (transform.Dirty) {
                update_transform(game, i, transform);
            }
        }
    }
}

const world_position: Vec3 = [0, 0, 0];

function update_transform(game: Game, entity: Entity, transform: Transform) {
    transform.Dirty = false;

    from_rotation_translation_scale(
        transform.World,
        transform.Rotation,
        transform.Translation,
        transform.Scale
    );

    if (transform.Parent !== undefined) {
        let parent_transform = game.World.Transform[transform.Parent];
        multiply(transform.World, parent_transform.World, transform.World);

        if (transform.Kind === TransformKind.Gyroscope) {
            get_translation(world_position, transform.World);
            from_rotation_translation_scale(
                transform.World,
                transform.Rotation,
                world_position,
                transform.Scale
            );
        }
    }

    invert(transform.Self, transform.World);

    if (game.World.Signature[entity] & Has.Children) {
        let children = game.World.Children[entity];
        for (let child of children.Children) {
            if (game.World.Signature[child] & Has.Transform) {
                let child_transform = game.World.Transform[child];
                child_transform.Parent = entity;
                update_transform(game, child, child_transform);
            }
        }
    }
}
