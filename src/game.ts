import {create_depth_target} from "../common/framebuffer.js";
import {Game3D} from "../common/game.js";
import {Vec4} from "../common/math.js";
import {Entity} from "../common/world.js";
import {mat_forward_colored_gouraud} from "../materials/mat_forward_colored_gouraud.js";
import {mat_forward_colored_shadows} from "../materials/mat_forward_colored_shadows.js";
import {mat_forward_colored_wireframe} from "../materials/mat_forward_colored_unlit.js";
import {mat_forward_depth} from "../materials/mat_forward_depth.js";
import {mat_forward_depth_instanced} from "../materials/mat_forward_depth_instanced.js";
import {mat_forward_instanced} from "../materials/mat_forward_instanced.js";
import {mesh_cube} from "../meshes/cube.js";
import {mesh_hand} from "../meshes/hand.js";
import {sys_animate} from "./systems/sys_animate.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_always} from "./systems/sys_control_always.js";
import {sys_control_player} from "./systems/sys_control_player.js";
import {sys_control_pose} from "./systems/sys_control_pose.js";
import {sys_debug} from "./systems/sys_debug.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_physics_integrate} from "./systems/sys_physics_integrate.js";
import {sys_physics_kinematic} from "./systems/sys_physics_kinematic.js";
import {sys_physics_resolve} from "./systems/sys_physics_resolve.js";
import {sys_render_depth} from "./systems/sys_render_depth.js";
import {sys_render_forward} from "./systems/sys_render_forward.js";
import {sys_resize} from "./systems/sys_resize.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_ui} from "./systems/sys_ui.js";
import {World} from "./world.js";
import {xr_init} from "./xr.js";

export class Game extends Game3D {
    World = new World();

    XrSupported = false;
    XrSession?: XRSession;
    XrSpace?: XRReferenceSpace;
    // XrFrame can be used to check whether we're presenting to a VR display.
    XrFrame?: XRFrame;
    XrInputs: Record<string, XRInputSource> = {};

    MaterialColoredWireframe = mat_forward_colored_wireframe(this.Gl);
    MaterialColoredGouraud = mat_forward_colored_gouraud(this.Gl);
    MaterialColoredShadows = mat_forward_colored_shadows(this.Gl);
    MaterialInstanced = mat_forward_instanced(this.Gl);
    MaterialDepth = mat_forward_depth(this.Gl);
    MaterialDepthInstanced = mat_forward_depth_instanced(this.Gl);
    MeshCube = mesh_cube(this.Gl);
    MeshHand = mesh_hand(this.Gl);

    Cameras: Array<Entity> = [];
    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);
    Targets = {
        Sun: create_depth_target(this.Gl, 2048, 2048),
    };

    ClearColor: Vec4 = [1, 1, 1, 1.0];
    FogDistance = 150;

    constructor() {
        super();

        if (navigator.xr) {
            xr_init(this);
        }
    }

    override Start() {
        let last = performance.now();

        let tick = (now: number, frame?: XRFrame) => {
            let delta = (now - last) / 1000;
            last = now;

            if (frame) {
                this.XrFrame = frame;
                this.Running = this.XrFrame.session.requestAnimationFrame(tick);
            } else {
                this.XrFrame = undefined;
                this.Running = requestAnimationFrame(tick);
            }

            this.FrameSetup(delta);
            this.FrameUpdate(delta);
            this.FrameReset(delta);
        };

        if (this.XrSession) {
            this.Running = this.XrSession.requestAnimationFrame(tick);
        } else {
            this.Running = requestAnimationFrame(tick);
        }
    }

    override Stop() {
        if (this.XrSession) {
            this.XrSession.cancelAnimationFrame(this.Running);
        } else {
            cancelAnimationFrame(this.Running);
        }
        this.Running = 0;
    }

    override FrameSetup(delta: number) {
        super.FrameSetup(delta);

        if (this.XrFrame) {
            this.XrInputs = {};
            for (let input of this.XrFrame.session.inputSources) {
                if (input.gripSpace) {
                    this.XrInputs[input.handedness] = input;
                }
            }
        }
    }

    override FrameUpdate(delta: number) {
        // User input.
        sys_control_pose(this, delta);
        sys_control_player(this, delta);

        sys_control_always(this, delta);

        // Game logic.
        sys_animate(this, delta);
        sys_move(this, delta);

        // Physics and collisions.
        sys_physics_integrate(this, delta);
        sys_transform(this, delta);
        sys_physics_kinematic(this, delta);
        sys_collide(this, delta);
        sys_physics_resolve(this, delta);
        sys_transform(this, delta);

        if (false) {
            sys_debug(this, delta);
        }

        sys_resize(this, delta);
        sys_camera(this, delta);
        sys_light(this, delta);
        sys_render_depth(this, delta);
        sys_render_forward(this, delta);
        sys_ui(this, delta);
    }
}

export const enum Layer {
    None = 0,
    Player = 1,
    Solid = 2,
    Climbable = 4,
}
