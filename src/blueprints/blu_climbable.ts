import {Vec3} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {RigidKind, rigid_body} from "../components/com_rigid_body.js";
import {Layer} from "../game.js";

export function blueprint_climbable(rigid_kind: RigidKind, size: Vec3 = [1, 1, 1]) {
    return [
        collide(rigid_kind !== RigidKind.Static, Layer.Solid | Layer.Climbable, Layer.None, size),
        rigid_body(rigid_kind),
        // Required for attaching to the climbable.
        children(),
    ];
}
