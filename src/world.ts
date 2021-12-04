import {WorldImpl} from "../common/world.js";
import {Camera} from "./components/com_camera.js";
import {Children} from "./components/com_children.js";
import {Collide} from "./components/com_collide.js";
import {ControlPlayer} from "./components/com_control_player.js";
import {ControlXr} from "./components/com_control_xr.js";
import {Light} from "./components/com_light.js";
import {Move} from "./components/com_move.js";
import {Render} from "./components/com_render.js";
import {RigidBody} from "./components/com_rigid_body.js";
import {Transform} from "./components/com_transform.js";

const enum Component {
    Camera,
    Children,
    Collide,
    ControlPlayer,
    ControlXr,
    Light,
    Move,
    Render,
    RigidBody,
    Transform,
}

export const enum Has {
    None = 0,
    Camera = 1 << Component.Camera,
    Children = 1 << Component.Children,
    Collide = 1 << Component.Collide,
    ControlPlayer = 1 << Component.ControlPlayer,
    ControlXr = 1 << Component.ControlXr,
    Light = 1 << Component.Light,
    Move = 1 << Component.Move,
    Render = 1 << Component.Render,
    RigidBody = 1 << Component.RigidBody,
    Transform = 1 << Component.Transform,
}

export class World extends WorldImpl {
    Camera: Array<Camera> = [];
    Children: Array<Children> = [];
    Collide: Array<Collide> = [];
    ControlPlayer: Array<ControlPlayer> = [];
    ControlXr: Array<ControlXr> = [];
    Light: Array<Light> = [];
    Move: Array<Move> = [];
    Render: Array<Render> = [];
    RigidBody: Array<RigidBody> = [];
    Transform: Array<Transform> = [];
}
