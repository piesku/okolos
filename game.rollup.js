(function () {
    'use strict';

    async function xr_init(game) {
        await game.Gl.makeXRCompatible();
        game.XrSupported = await navigator.xr.isSessionSupported("immersive-vr");
    }
    async function xr_enter(game) {
        let session = await navigator.xr.requestSession("immersive-vr");
        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, game.Gl),
            depthFar: game.FogDistance,
        });
        game.XrSpace = await session.requestReferenceSpace("local");
        game.Stop();
        game.XrSession = session;
        game.Start();
        game.XrSession.addEventListener("end", () => {
            game.Stop();
            game.XrSession = undefined;
            game.XrSpace = undefined;
            game.XrFrame = undefined;
            game.ViewportResized = true;
            game.Start();
        });
    }

    function dispatch(game, action, args) {
        switch (action) {
            case 0 /* EnterVr */: {
                if (game.XrSupported) {
                    xr_enter(game);
                }
                break;
            }
            case 1 /* ExitVr */: {
                if (game.XrFrame) {
                    game.XrFrame.session.end();
                }
                break;
            }
        }
    }

    // The following defined constants and descriptions are directly ported from
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants.
    // Any copyright is dedicated to the Public Domain.
    // http://creativecommons.org/publicdomain/zero/1.0/.
    // Contributors
    // https://developer.mozilla.org/en-US/profiles/Sheppy
    // https://developer.mozilla.org/en-US/profiles/fscholz
    // https://developer.mozilla.org/en-US/profiles/AtiX
    // https://developer.mozilla.org/en-US/profiles/Sebastianz
    // WebGLRenderingContext
    // ==============
    // Clearing buffers
    // Constants passed to WebGLRenderingContext.clear() to clear buffer masks.
    /**
     * Passed to clear to clear the current depth buffer.
     * @constant {number}
     */
    const GL_DEPTH_BUFFER_BIT = 0x00000100;
    /**
     * Passed to clear to clear the current color buffer.
     * @constant {number}
     */
    const GL_COLOR_BUFFER_BIT = 0x00004000;
    /**
     * Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment.
     * @constant {number}
     */
    const GL_LINE_LOOP = 0x0002;
    /**
     * Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle.
     * @constant {number}
     */
    const GL_TRIANGLES = 0x0004;
    /**
     * Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha.
     * @constant {number}
     */
    const GL_SRC_ALPHA = 0x0302;
    /**
     * Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha.
     * @constant {number}
     */
    const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
    // Buffers
    // Constants passed to WebGLRenderingContext.bufferData(), WebGLRenderingContext.bufferSubData(), WebGLRenderingContext.bindBuffer(), or WebGLRenderingContext.getBufferParameter().
    /**
     * Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often.
     * @constant {number}
     */
    const GL_STATIC_DRAW = 0x88e4;
    /**
     * Passed to bindBuffer or bufferData to specify the type of buffer being used.
     * @constant {number}
     */
    const GL_ARRAY_BUFFER = 0x8892;
    /**
     * Passed to bindBuffer or bufferData to specify the type of buffer being used.
     * @constant {number}
     */
    const GL_ELEMENT_ARRAY_BUFFER = 0x8893;
    // Culling
    // Constants passed to WebGLRenderingContext.cullFace().
    /**
     * Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method.
     * @constant {number}
     */
    const GL_CULL_FACE = 0x0b44;
    // Enabling and disabling
    // Constants passed to WebGLRenderingContext.enable() or WebGLRenderingContext.disable().
    /**
     * Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method.
     * @constant {number}
     */
    const GL_BLEND = 0x0be2;
    /**
     * Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test.
     * @constant {number}
     */
    const GL_DEPTH_TEST = 0x0b71;
    // Front face directions
    // Constants passed to WebGLRenderingContext.frontFace().
    /**
     * Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction,
     * @constant {number}
     */
    const GL_CW = 0x0900;
    /**
     * Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction.
     * @constant {number}
     */
    const GL_CCW = 0x0901;
    // Shaders
    // Constants passed to WebGLRenderingContext.getShaderParameter().
    /**
     * Passed to createShader to define a fragment shader.
     * @constant {number}
     */
    const GL_FRAGMENT_SHADER = 0x8b30;
    /**
     * Passed to createShader to define a vertex shader.
     * @constant {number}
     */
    const GL_VERTEX_SHADER = 0x8b31;
    /**
     * Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error.
     * @constant {number}
     */
    const GL_COMPILE_STATUS = 0x8b81;
    /**
     * Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error.
     * @constant {number}
     */
    const GL_LINK_STATUS = 0x8b82;
    /**
     * @constant {number}
     */
    const GL_TEXTURE_2D = 0x0de1;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE0 = 0x84c0;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE1 = 0x84c1;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE2 = 0x84c2;
    /**
     * A texture unit.
     * @constant {number}
     */
    const GL_TEXTURE3 = 0x84c3;
    // Framebuffers and renderbuffers
    /**
     * @constant {number}
     */
    const GL_FRAMEBUFFER = 0x8d40;
    // WebGL2RenderingContext
    // ==============
    const GL_UNSIGNED_SHORT = 0x1403;
    const GL_FLOAT = 0x1406;

    const update_span = document.getElementById("update");
    const delta_span = document.getElementById("delta");
    const fps_span = document.getElementById("fps");
    const step = 1 / 60;
    class GameImpl {
        constructor() {
            this.Running = 0;
            this.Now = 0;
            this.ViewportWidth = window.innerWidth;
            this.ViewportHeight = window.innerHeight;
            this.ViewportResized = true;
            // State of input during this frame.
            // 1 = down, 0 = up, or any number for analog inputs.
            this.InputState = {
                MouseX: 0,
                MouseY: 0,
            };
            // Changes of InputState that happened right before this frame.
            // 1 = pressed, -1 = released, 0 = no change.
            this.InputDelta = {
                MouseX: 0,
                MouseY: 0,
            };
            // Pixels traveled while mouse/touch was down.
            this.InputDistance = {
                Mouse: 0,
                Mouse0: 0,
                Mouse1: 0,
                Mouse2: 0,
                Touch0: 0,
                Touch1: 0,
            };
            // Map of touch ids to touch indices. In particular, Firefox assigns high
            // ints as ids. Chrome usually starts at 0, so id === index.
            this.InputTouches = {};
            this.Ui = document.querySelector("main");
            document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
            this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());
            this.Ui.addEventListener("mousedown", (evt) => {
                this.InputState[`Mouse${evt.button}`] = 1;
                this.InputDelta[`Mouse${evt.button}`] = 1;
            });
            this.Ui.addEventListener("mouseup", (evt) => {
                this.InputState[`Mouse${evt.button}`] = 0;
                this.InputDelta[`Mouse${evt.button}`] = -1;
            });
            this.Ui.addEventListener("mousemove", (evt) => {
                this.InputState["MouseX"] = evt.clientX;
                this.InputState["MouseY"] = evt.clientY;
                this.InputDelta["MouseX"] = evt.movementX;
                this.InputDelta["MouseY"] = evt.movementY;
            });
            this.Ui.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                this.InputDelta["WheelY"] = evt.deltaY;
            });
            this.Ui.addEventListener("touchstart", (evt) => {
                if (evt.target === this.Ui) {
                    // Prevent browsers from interpreting touch gestures as navigation input.
                    evt.preventDefault();
                }
                if (evt.touches.length === 1) {
                    // It's a new gesture.
                    this.InputTouches = {};
                }
                for (let i = 0; i < evt.touches.length; i++) {
                    let touch = evt.touches[i];
                    this.InputTouches[touch.identifier] = i;
                }
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputState[`Touch${index}`] = 1;
                    this.InputState[`Touch${index}X`] = touch.clientX;
                    this.InputState[`Touch${index}Y`] = touch.clientY;
                    this.InputDelta[`Touch${index}`] = 1;
                    this.InputDelta[`Touch${index}X`] = 0;
                    this.InputDelta[`Touch${index}Y`] = 0;
                }
            });
            this.Ui.addEventListener("touchmove", (evt) => {
                if (evt.target === this.Ui) {
                    // Prevent browsers from interpreting touch gestures as navigation input.
                    evt.preventDefault();
                }
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputDelta[`Touch${index}X`] =
                        touch.clientX - this.InputState[`Touch${index}X`];
                    this.InputDelta[`Touch${index}Y`] =
                        touch.clientY - this.InputState[`Touch${index}Y`];
                    this.InputState[`Touch${index}X`] = touch.clientX;
                    this.InputState[`Touch${index}Y`] = touch.clientY;
                }
            });
            this.Ui.addEventListener("touchend", (evt) => {
                if (evt.target === this.Ui) {
                    // Prevent browsers from interpreting touch gestures as navigation input.
                    evt.preventDefault();
                }
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputState[`Touch${index}`] = 0;
                    this.InputDelta[`Touch${index}`] = -1;
                }
            });
            this.Ui.addEventListener("touchcancel", (evt) => {
                for (let i = 0; i < evt.changedTouches.length; i++) {
                    let touch = evt.changedTouches[i];
                    let index = this.InputTouches[touch.identifier];
                    this.InputState[`Touch${index}`] = 0;
                    this.InputDelta[`Touch${index}`] = -1;
                }
            });
            window.addEventListener("keydown", (evt) => {
                if (!evt.repeat) {
                    this.InputState[evt.code] = 1;
                    this.InputDelta[evt.code] = 1;
                }
            });
            window.addEventListener("keyup", (evt) => {
                this.InputState[evt.code] = 0;
                this.InputDelta[evt.code] = -1;
            });
        }
        Start() {
            let accumulator = 0;
            let last = performance.now();
            let tick = (now) => {
                let delta = (now - last) / 1000;
                this.FrameSetup(delta);
                accumulator += delta;
                while (accumulator >= step) {
                    accumulator -= step;
                    // TODO Adjust InputDelta and InputDistance.
                    this.FixedUpdate(step);
                }
                this.FrameUpdate(delta);
                this.FrameReset(delta);
                last = now;
                this.Running = requestAnimationFrame(tick);
            };
            this.Stop();
            tick(last);
        }
        Stop() {
            cancelAnimationFrame(this.Running);
            this.Running = 0;
        }
        FrameSetup(delta) {
            this.Now = performance.now();
            let mouse_distance = Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
            this.InputDistance["Mouse"] += mouse_distance;
            if (this.InputState["Mouse0"] === 1) {
                this.InputDistance["Mouse0"] += mouse_distance;
            }
            if (this.InputState["Mouse1"] === 1) {
                this.InputDistance["Mouse1"] += mouse_distance;
            }
            if (this.InputState["Mouse2"] === 1) {
                this.InputDistance["Mouse2"] += mouse_distance;
            }
            if (this.InputState["Touch0"] === 1) {
                this.InputDistance["Touch0"] +=
                    Math.abs(this.InputDelta["Touch0X"]) + Math.abs(this.InputDelta["Touch0Y"]);
            }
            if (this.InputState["Touch1"] === 1) {
                this.InputDistance["Touch1"] +=
                    Math.abs(this.InputDelta["Touch1X"]) + Math.abs(this.InputDelta["Touch1Y"]);
            }
        }
        FixedUpdate(step) { }
        FrameUpdate(delta) { }
        FrameReset(delta) {
            this.ViewportResized = false;
            if (this.InputDelta["Mouse0"] === -1) {
                this.InputDistance["Mouse0"] = 0;
            }
            if (this.InputDelta["Mouse1"] === -1) {
                this.InputDistance["Mouse1"] = 0;
            }
            if (this.InputDelta["Mouse2"] === -1) {
                this.InputDistance["Mouse2"] = 0;
            }
            if (this.InputDelta["Touch0"] === -1) {
                this.InputDistance["Touch0"] = 0;
            }
            if (this.InputDelta["Touch1"] === -1) {
                this.InputDistance["Touch1"] = 0;
            }
            for (let name in this.InputDelta) {
                this.InputDelta[name] = 0;
            }
            let update = performance.now() - this.Now;
            if (update_span) {
                update_span.textContent = update.toFixed(1);
            }
            if (delta_span) {
                delta_span.textContent = (delta * 1000).toFixed(1);
            }
            if (fps_span) {
                fps_span.textContent = (1 / delta).toFixed();
            }
        }
    }
    class Game3D extends GameImpl {
        constructor() {
            super();
            this.Canvas2D = document.querySelector("#billboard");
            this.Context2D = this.Canvas2D.getContext("2d");
            this.Canvas3D = document.querySelector("#scene");
            this.Gl = this.Canvas3D.getContext("webgl2");
            this.Audio = new AudioContext();
            this.Gl.enable(GL_DEPTH_TEST);
            this.Gl.enable(GL_CULL_FACE);
            this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        }
    }
    function instantiate(game, blueprint) {
        let entity = game.World.CreateEntity();
        for (let mixin of blueprint) {
            mixin(game, entity);
        }
        return entity;
    }

    function link(gl, vertex, fragment) {
        let program = gl.createProgram();
        gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex));
        gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, GL_LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program));
        }
        return program;
    }
    function compile(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, GL_COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    let vertex$2 = `#version 300 es\n

    // See Game.LightPositions and Game.LightDetails.
    const int MAX_LIGHTS = 8;

    uniform mat4 pv;
    uniform mat4 world;
    uniform mat4 self;
    uniform vec3 eye;
    uniform vec4 diffuse_color;
    uniform vec4 specular_color;
    uniform float shininess;
    uniform vec4 light_positions[MAX_LIGHTS];
    uniform vec4 light_details[MAX_LIGHTS];
    uniform vec4 fog_color;
    uniform float fog_distance;

    in vec4 attr_position;
    in vec3 attr_normal;

    out vec4 vert_color;

    void main() {
        vec4 vert_position = world * attr_position;
        vec3 vert_normal = normalize((vec4(attr_normal, 0.0) * self).xyz);
        gl_Position = pv * vert_position;

        vec3 view_dir = eye - vert_position.xyz;
        vec3 view_normal = normalize(view_dir);

        // Ambient light.
        vec3 light_acc = diffuse_color.rgb * 0.1;

        for (int i = 0; i < MAX_LIGHTS; i++) {
            if (light_positions[i].w == 0.0) {
                break;
            }

            vec3 light_color = light_details[i].rgb;
            float light_intensity = light_details[i].a;

            vec3 light_normal;
            if (light_positions[i].w == 1.0) {
                // Directional light.
                light_normal = light_positions[i].xyz;
            } else {
                vec3 light_dir = light_positions[i].xyz - vert_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(vert_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += diffuse_color.rgb * diffuse_factor * light_color * light_intensity;

                if (shininess > 0.0) {
                    // Blinn-Phong reflection model.
                    vec3 h = normalize(light_normal + view_normal);
                    float specular_angle = max(dot(h, vert_normal), 0.0);
                    float specular_factor = pow(specular_angle, shininess);

                    // Specular color.
                    light_acc += specular_color.rgb * specular_factor * light_color * light_intensity;
                }
            }
        }

        vert_color = vec4(light_acc, diffuse_color.a);

        float eye_distance = length(eye - vert_position.xyz);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        vert_color = mix(vert_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }
`;
    let fragment$2 = `#version 300 es\n
    precision mediump float;

    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        frag_color = vert_color;
    }
`;
    function mat_forward_colored_gouraud(gl) {
        let program = link(gl, vertex$2, fragment$2);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Self: gl.getUniformLocation(program, "self"),
                DiffuseColor: gl.getUniformLocation(program, "diffuse_color"),
                SpecularColor: gl.getUniformLocation(program, "specular_color"),
                Shininess: gl.getUniformLocation(program, "shininess"),
                Eye: gl.getUniformLocation(program, "eye"),
                LightPositions: gl.getUniformLocation(program, "light_positions"),
                LightDetails: gl.getUniformLocation(program, "light_details"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                VertexNormal: gl.getAttribLocation(program, "attr_normal"),
            },
        };
    }

    let vertex$1 = `#version 300 es\n
    uniform mat4 pv;
    uniform mat4 world;

    in vec4 attr_position;

    void main() {
        gl_Position = pv * world * attr_position;
    }
`;
    let fragment$1 = `#version 300 es\n
    precision mediump float;

    uniform vec4 color;

    out vec4 frag_color;

    void main() {
        frag_color = color;
    }
`;
    function mat_forward_colored_unlit(gl, mode = GL_TRIANGLES) {
        let program = link(gl, vertex$1, fragment$1);
        return {
            Mode: mode,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Color: gl.getUniformLocation(program, "color"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
            },
        };
    }
    function mat_forward_colored_wireframe(gl) {
        return mat_forward_colored_unlit(gl, GL_LINE_LOOP);
    }

    let vertex = `#version 300 es\n
    uniform mat4 pv;
    uniform mat4 world;
    uniform vec3 eye;
    uniform vec4 fog_color;
    uniform float fog_distance;

    in vec4 attr_position;
    in vec4 attr_column1;
    in vec4 attr_column2;
    in vec4 attr_column3;
    in vec4 attr_column4;
    in vec3 attr_color;
    out vec4 vert_color;

    void main() {
        mat4 instance = mat4(
            attr_column1,
            attr_column2,
            attr_column3,
            attr_column4
        );

        vec4 vert_position = world * instance * attr_position;
        gl_Position = pv * vert_position;

        vert_color = vec4(attr_color, 1.0);

        float eye_distance = length(eye - vert_position.xyz);
        float fog_amount = clamp(0.0, 1.0, eye_distance / fog_distance);
        vert_color = mix(vert_color, fog_color, smoothstep(0.0, 1.0, fog_amount));
    }
`;
    let fragment = `#version 300 es\n
    precision mediump float;
    in vec4 vert_color;
    out vec4 frag_color;
    void main() {
        frag_color = vert_color;
    }
`;
    function mat_forward_instanced(gl) {
        let program = link(gl, vertex, fragment);
        return {
            Mode: GL_TRIANGLES,
            Program: program,
            Locations: {
                Pv: gl.getUniformLocation(program, "pv"),
                World: gl.getUniformLocation(program, "world"),
                Eye: gl.getUniformLocation(program, "eye"),
                FogColor: gl.getUniformLocation(program, "fog_color"),
                FogDistance: gl.getUniformLocation(program, "fog_distance"),
                VertexPosition: gl.getAttribLocation(program, "attr_position"),
                InstanceColumn1: gl.getAttribLocation(program, "attr_column1"),
                InstanceColumn2: gl.getAttribLocation(program, "attr_column2"),
                InstanceColumn3: gl.getAttribLocation(program, "attr_column3"),
                InstanceColumn4: gl.getAttribLocation(program, "attr_column4"),
                InstanceColor: gl.getAttribLocation(program, "attr_color"),
            },
        };
    }

    function mesh_cube(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr$1, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr$1, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr$1, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr$1, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr$1, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr$1,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr$1,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr$1,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr$1,
            IndexBuffer: index_buf,
            IndexArray: index_arr$1,
            IndexCount: index_arr$1.length,
        };
    }
    // prettier-ignore
    let vertex_arr$1 = Float32Array.from([
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5
    ]);
    // prettier-ignore
    let normal_arr$1 = Float32Array.from([
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ]);
    // prettier-ignore
    let texcoord_arr$1 = Float32Array.from([
        0.666667, 0.333333,
        0.333333, 0.333333,
        0.333333, 0,
        0.666667, 0,
        0.333333, 0.666667,
        0, 0.666667,
        0, 0.333333,
        0.333333, 0.333333,
        0.333333, 0.333333,
        0, 0.333333,
        0, 0,
        0.333333, 0,
        0.333333, 0.666667,
        0.333333, 0.333333,
        0.666667, 0.333333,
        0.666667, 0.666667,
        1, 0.333333,
        0.666667, 0.333333,
        0.666667, 0,
        1, 0,
        0.333333, 0.666667,
        0.333333, 1,
        0, 1,
        0, 0.666667
    ]);
    // prettier-ignore
    let weights_arr$1 = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
    ]);
    // prettier-ignore
    let index_arr$1 = Uint16Array.from([
        23, 22, 20,
        22, 21, 20,
        19, 18, 16,
        18, 17, 16,
        15, 14, 12,
        14, 13, 12,
        11, 10, 8,
        10, 9, 8,
        7, 6, 4,
        6, 5, 4,
        3, 2, 0,
        2, 1, 0
    ]);

    function mesh_hand(gl) {
        let vertex_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
        let normal_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
        gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);
        let texcoord_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
        gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr, GL_STATIC_DRAW);
        let weights_buf = gl.createBuffer();
        gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
        gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);
        let index_buf = gl.createBuffer();
        gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
        gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);
        return {
            VertexBuffer: vertex_buf,
            VertexArray: vertex_arr,
            NormalBuffer: normal_buf,
            NormalArray: normal_arr,
            TexCoordBuffer: texcoord_buf,
            TexCoordArray: texcoord_arr,
            WeightsBuffer: weights_buf,
            WeightsArray: weights_arr,
            IndexBuffer: index_buf,
            IndexArray: index_arr,
            IndexCount: index_arr.length,
        };
    }
    // prettier-ignore
    let vertex_arr = Float32Array.from([
        -0.001385, 0.0289, 0.08506,
        0.012262, 0.02891, 0.084294,
        0.008816, 0.03592, -0.006425,
        -0.008054, 0.035631, -0.005256,
        -0.008054, 0.035631, -0.005256,
        0.008816, 0.03592, -0.006425,
        0.010208, -0.054815, -0.008776,
        -0.006663, -0.055104, -0.007608,
        -0.006663, -0.055104, -0.007608,
        0.010208, -0.054815, -0.008776,
        0.012769, -0.050857, 0.082463,
        -0.000877, -0.050867, 0.083229,
        -0.000877, -0.050867, 0.083229,
        0.012769, -0.050857, 0.082463,
        0.012262, 0.02891, 0.084294,
        -0.001385, 0.0289, 0.08506,
        -0.008054, 0.035631, -0.005256,
        -0.006663, -0.055104, -0.007608,
        -0.000877, -0.050867, 0.083229,
        -0.001385, 0.0289, 0.08506,
        0.010208, -0.054815, -0.008776,
        0.008816, 0.03592, -0.006425,
        0.012262, 0.02891, 0.084294,
        0.012769, -0.050857, 0.082463,
        -0.010561, 0.034481, -0.00819,
        0.005581, 0.036289, -0.012904,
        -0.007908, 0.039624, -0.057817,
        -0.02405, 0.037816, -0.053103,
        -0.02405, 0.037816, -0.053103,
        -0.007908, 0.039624, -0.057817,
        -0.006305, 0.020333, -0.059731,
        -0.022448, 0.018524, -0.055017,
        -0.022448, 0.018524, -0.055017,
        -0.006305, 0.020333, -0.059731,
        0.007184, 0.016998, -0.014818,
        -0.008958, 0.015189, -0.010104,
        -0.008958, 0.015189, -0.010104,
        0.007184, 0.016998, -0.014818,
        0.005581, 0.036289, -0.012904,
        -0.010561, 0.034481, -0.00819,
        -0.02405, 0.037816, -0.053103,
        -0.022448, 0.018524, -0.055017,
        -0.008958, 0.015189, -0.010104,
        -0.010561, 0.034481, -0.00819,
        -0.006305, 0.020333, -0.059731,
        -0.007908, 0.039624, -0.057817,
        0.005581, 0.036289, -0.012904,
        0.007184, 0.016998, -0.014818,
        -0.008492, 0.008946, -0.009729,
        0.007589, 0.010819, -0.014622,
        -0.008373, 0.012793, -0.066324,
        -0.024454, 0.01092, -0.06143,
        -0.024454, 0.01092, -0.06143,
        -0.008373, 0.012793, -0.066324,
        -0.006521, -0.006527, -0.067633,
        -0.022602, -0.0084, -0.06274,
        -0.022602, -0.0084, -0.06274,
        -0.006521, -0.006527, -0.067633,
        0.009441, -0.008501, -0.015931,
        -0.006641, -0.010374, -0.011038,
        -0.006641, -0.010374, -0.011038,
        0.009441, -0.008501, -0.015931,
        0.007589, 0.010819, -0.014622,
        -0.008492, 0.008946, -0.009729,
        -0.024454, 0.01092, -0.06143,
        -0.022602, -0.0084, -0.06274,
        -0.006641, -0.010374, -0.011038,
        -0.008492, 0.008946, -0.009729,
        -0.006521, -0.006527, -0.067633,
        -0.008373, 0.012793, -0.066324,
        0.007589, 0.010819, -0.014622,
        0.009441, -0.008501, -0.015931,
        -0.007242, -0.014884, -0.010548,
        0.009032, -0.014337, -0.015124,
        -0.002639, -0.013896, -0.05658,
        -0.018912, -0.014444, -0.052005,
        -0.018912, -0.014444, -0.052005,
        -0.002639, -0.013896, -0.05658,
        -0.002139, -0.03151, -0.056908,
        -0.018412, -0.032057, -0.052333,
        -0.018412, -0.032057, -0.052333,
        -0.002139, -0.03151, -0.056908,
        0.009532, -0.031951, -0.015452,
        -0.006741, -0.032498, -0.010876,
        -0.006741, -0.032498, -0.010876,
        0.009532, -0.031951, -0.015452,
        0.009032, -0.014337, -0.015124,
        -0.007242, -0.014884, -0.010548,
        -0.018912, -0.014444, -0.052005,
        -0.018412, -0.032057, -0.052333,
        -0.006741, -0.032498, -0.010876,
        -0.007242, -0.014884, -0.010548,
        -0.002139, -0.03151, -0.056908,
        -0.002639, -0.013896, -0.05658,
        0.009032, -0.014337, -0.015124,
        0.009532, -0.031951, -0.015452,
        -0.025175, 0.037965, -0.05345,
        -0.01111, 0.03996, -0.06263,
        -0.033807, 0.04235, -0.096885,
        -0.047871, 0.040354, -0.087705,
        -0.047871, 0.040354, -0.087705,
        -0.033807, 0.04235, -0.096885,
        -0.03251, 0.023066, -0.09909,
        -0.046574, 0.021071, -0.08991,
        -0.046574, 0.021071, -0.08991,
        -0.03251, 0.023066, -0.09909,
        -0.009813, 0.020677, -0.064835,
        -0.023878, 0.018681, -0.055655,
        -0.023878, 0.018681, -0.055655,
        -0.009813, 0.020677, -0.064835,
        -0.01111, 0.03996, -0.06263,
        -0.025175, 0.037965, -0.05345,
        -0.047871, 0.040354, -0.087705,
        -0.046574, 0.021071, -0.08991,
        -0.023878, 0.018681, -0.055655,
        -0.025175, 0.037965, -0.05345,
        -0.03251, 0.023066, -0.09909,
        -0.033807, 0.04235, -0.096885,
        -0.01111, 0.03996, -0.06263,
        -0.009813, 0.020677, -0.064835,
        -0.025824, 0.011507, -0.061474,
        -0.011587, 0.013391, -0.070407,
        -0.034379, 0.014488, -0.106501,
        -0.048617, 0.012604, -0.097568,
        -0.048617, 0.012604, -0.097568,
        -0.034379, 0.014488, -0.106501,
        -0.032811, -0.004837, -0.108078,
        -0.047049, -0.006721, -0.099145,
        -0.047049, -0.006721, -0.099145,
        -0.032811, -0.004837, -0.108078,
        -0.010019, -0.005934, -0.071984,
        -0.024257, -0.007818, -0.063051,
        -0.024257, -0.007818, -0.063051,
        -0.010019, -0.005934, -0.071984,
        -0.011587, 0.013391, -0.070407,
        -0.025824, 0.011507, -0.061474,
        -0.048617, 0.012604, -0.097568,
        -0.047049, -0.006721, -0.099145,
        -0.024257, -0.007818, -0.063051,
        -0.025824, 0.011507, -0.061474,
        -0.032811, -0.004837, -0.108078,
        -0.034379, 0.014488, -0.106501,
        -0.011587, 0.013391, -0.070407,
        -0.010019, -0.005934, -0.071984,
        -0.019676, -0.014397, -0.052382,
        -0.005143, -0.013823, -0.061015,
        -0.025188, -0.013764, -0.094755,
        -0.039721, -0.014337, -0.086122,
        -0.039721, -0.014337, -0.086122,
        -0.025188, -0.013764, -0.094755,
        -0.024684, -0.031529, -0.095086,
        -0.039217, -0.032102, -0.086453,
        -0.039217, -0.032102, -0.086453,
        -0.024684, -0.031529, -0.095086,
        -0.004639, -0.031588, -0.061346,
        -0.019171, -0.032161, -0.052713,
        -0.019171, -0.032161, -0.052713,
        -0.004639, -0.031588, -0.061346,
        -0.005143, -0.013823, -0.061015,
        -0.019676, -0.014397, -0.052382,
        -0.039721, -0.014337, -0.086122,
        -0.039217, -0.032102, -0.086453,
        -0.019171, -0.032161, -0.052713,
        -0.019676, -0.014397, -0.052382,
        -0.024684, -0.031529, -0.095086,
        -0.025188, -0.013764, -0.094755,
        -0.005143, -0.013823, -0.061015,
        -0.004639, -0.031588, -0.061346,
        -0.009989, 0.051511, 0.065661,
        -0.000561, 0.065343, 0.064337,
        -0.015486, 0.071823, 0.02576,
        -0.024915, 0.057991, 0.027085,
        -0.024915, 0.057991, 0.027085,
        -0.015486, 0.071823, 0.02576,
        0.000815, 0.059916, 0.017453,
        -0.008614, 0.046083, 0.018777,
        -0.008614, 0.046083, 0.018777,
        0.000815, 0.059916, 0.017453,
        0.015741, 0.053436, 0.056029,
        0.006312, 0.039604, 0.057354,
        0.006312, 0.039604, 0.057354,
        0.015741, 0.053436, 0.056029,
        -0.000561, 0.065343, 0.064337,
        -0.009989, 0.051511, 0.065661,
        -0.024915, 0.057991, 0.027085,
        -0.008614, 0.046083, 0.018777,
        0.006312, 0.039604, 0.057354,
        -0.009989, 0.051511, 0.065661,
        0.000815, 0.059916, 0.017453,
        -0.015486, 0.071823, 0.02576,
        -0.000561, 0.065343, 0.064337,
        0.015741, 0.053436, 0.056029,
        -0.006725, -0.038551, -0.010014,
        0.009467, -0.038227, -0.01489,
        -0.001353, -0.039097, -0.050876,
        -0.017545, -0.039421, -0.046,
        -0.017545, -0.039421, -0.046,
        -0.001353, -0.039097, -0.050876,
        -0.000955, -0.054994, -0.050612,
        -0.017147, -0.055318, -0.045736,
        -0.017147, -0.055318, -0.045736,
        -0.000955, -0.054994, -0.050612,
        0.009864, -0.054125, -0.014626,
        -0.006328, -0.054449, -0.009749,
        -0.006328, -0.054449, -0.009749,
        0.009864, -0.054125, -0.014626,
        0.009467, -0.038227, -0.01489,
        -0.006725, -0.038551, -0.010014,
        -0.017545, -0.039421, -0.046,
        -0.017147, -0.055318, -0.045736,
        -0.006328, -0.054449, -0.009749,
        -0.006725, -0.038551, -0.010014,
        -0.000955, -0.054994, -0.050612,
        -0.001353, -0.039097, -0.050876,
        0.009467, -0.038227, -0.01489,
        0.009864, -0.054125, -0.014626,
        -0.017719, -0.039433, -0.047417,
        -0.002918, -0.039345, -0.055601,
        -0.018668, -0.039437, -0.084087,
        -0.033469, -0.039526, -0.075902,
        -0.033469, -0.039526, -0.075902,
        -0.018668, -0.039437, -0.084087,
        -0.018572, -0.055552, -0.084087,
        -0.033373, -0.05564, -0.075903,
        -0.033373, -0.05564, -0.075903,
        -0.018572, -0.055552, -0.084087,
        -0.002821, -0.055459, -0.055602,
        -0.017623, -0.055548, -0.047418,
        -0.017623, -0.055548, -0.047418,
        -0.002821, -0.055459, -0.055602,
        -0.002918, -0.039345, -0.055601,
        -0.017719, -0.039433, -0.047417,
        -0.033469, -0.039526, -0.075902,
        -0.033373, -0.05564, -0.075903,
        -0.017623, -0.055548, -0.047418,
        -0.017719, -0.039433, -0.047417,
        -0.018572, -0.055552, -0.084087,
        -0.018668, -0.039437, -0.084087,
        -0.002918, -0.039345, -0.055601,
        -0.002821, -0.055459, -0.055602,
        -0.025987, 0.058941, 0.023445,
        -0.01855, 0.073332, 0.019022,
        -0.036803, 0.072894, -0.013094,
        -0.04424, 0.058503, -0.008671,
        -0.04424, 0.058503, -0.008671,
        -0.036803, 0.072894, -0.013094,
        -0.020471, 0.061648, -0.022223,
        -0.027908, 0.047257, -0.017799,
        -0.027908, 0.047257, -0.017799,
        -0.020471, 0.061648, -0.022223,
        -0.002218, 0.062086, 0.009893,
        -0.009655, 0.047695, 0.014317,
        -0.009655, 0.047695, 0.014317,
        -0.002218, 0.062086, 0.009893,
        -0.01855, 0.073332, 0.019022,
        -0.025987, 0.058941, 0.023445,
        -0.04424, 0.058503, -0.008671,
        -0.027908, 0.047257, -0.017799,
        -0.009655, 0.047695, 0.014317,
        -0.025987, 0.058941, 0.023445,
        -0.020471, 0.061648, -0.022223,
        -0.036803, 0.072894, -0.013094,
        -0.01855, 0.073332, 0.019022,
        -0.002218, 0.062086, 0.009893
    ]);
    // prettier-ignore
    let normal_arr = Float32Array.from([
        -0.005, 0.9971, 0.076,
        -0.005, 0.9971, 0.076,
        -0.005, 0.9971, 0.076,
        -0.005, 0.9971, 0.076,
        -0.0695, 0.0248, -0.9973,
        -0.0695, 0.0248, -0.9973,
        -0.0695, 0.0248, -0.9973,
        -0.0695, 0.0248, -0.9973,
        0.0126, -0.9989, 0.0444,
        0.0126, -0.9989, 0.0444,
        0.0126, -0.9989, 0.0444,
        0.0126, -0.9989, 0.0444,
        0.056, -0.0226, 0.9982,
        0.056, -0.0226, 0.9982,
        0.056, -0.0226, 0.9982,
        0.056, -0.0226, 0.9982,
        -0.9976, -0.0128, 0.0684,
        -0.9976, -0.0128, 0.0684,
        -0.9976, -0.0128, 0.0684,
        -0.9976, -0.0128, 0.0684,
        0.9994, 0.0119, -0.0328,
        0.9994, 0.0119, -0.0328,
        0.9994, 0.0119, -0.0328,
        0.9994, 0.0119, -0.0328,
        -0.0824, 0.9917, 0.0984,
        -0.0824, 0.9917, 0.0984,
        -0.0824, 0.9917, 0.0984,
        -0.0824, 0.9917, 0.0984,
        -0.2869, 0.0709, -0.9553,
        -0.2869, 0.0709, -0.9553,
        -0.2869, 0.0709, -0.9553,
        -0.2869, 0.0709, -0.9553,
        0.0824, -0.9917, -0.0984,
        0.0824, -0.9917, -0.0984,
        0.0824, -0.9917, -0.0984,
        0.0824, -0.9917, -0.0984,
        0.2869, -0.0709, 0.9553,
        0.2869, -0.0709, 0.9553,
        0.2869, -0.0709, 0.9553,
        0.2869, -0.0709, 0.9553,
        -0.9544, -0.1069, 0.2787,
        -0.9544, -0.1069, 0.2787,
        -0.9544, -0.1069, 0.2787,
        -0.9544, -0.1069, 0.2787,
        0.9544, 0.1069, -0.2787,
        0.9544, 0.1069, -0.2787,
        0.9544, 0.1069, -0.2787,
        0.9544, 0.1069, -0.2787,
        -0.0952, 0.9932, 0.0673,
        -0.0952, 0.9932, 0.0673,
        -0.0952, 0.9932, 0.0673,
        -0.0952, 0.9932, 0.0673,
        -0.2948, 0.0365, -0.9549,
        -0.2948, 0.0365, -0.9549,
        -0.2948, 0.0365, -0.9549,
        -0.2948, 0.0365, -0.9549,
        0.0952, -0.9932, -0.0673,
        0.0952, -0.9932, -0.0673,
        0.0952, -0.9932, -0.0673,
        0.0952, -0.9932, -0.0673,
        0.2948, -0.0365, 0.9549,
        0.2948, -0.0365, 0.9549,
        0.2948, -0.0365, 0.9549,
        0.2948, -0.0365, 0.9549,
        -0.9508, -0.1107, 0.2893,
        -0.9508, -0.1107, 0.2893,
        -0.9508, -0.1107, 0.2893,
        -0.9508, -0.1107, 0.2893,
        0.9508, 0.1107, -0.2893,
        0.9508, 0.1107, -0.2893,
        0.9508, 0.1107, -0.2893,
        0.9508, 0.1107, -0.2893,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.271, 0.0102, -0.9625,
        -0.271, 0.0102, -0.9625,
        -0.271, 0.0102, -0.9625,
        -0.271, 0.0102, -0.9625,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.271, -0.0102, 0.9625,
        0.271, -0.0102, 0.9625,
        0.271, -0.0102, 0.9625,
        0.271, -0.0102, 0.9625,
        -0.9622, -0.0324, 0.2705,
        -0.9622, -0.0324, 0.2705,
        -0.9622, -0.0324, 0.2705,
        -0.9622, -0.0324, 0.2705,
        0.9622, 0.0324, -0.2705,
        0.9622, 0.0324, -0.2705,
        0.9622, 0.0324, -0.2705,
        0.9622, 0.0324, -0.2705,
        -0.0667, 0.9913, 0.1133,
        -0.0667, 0.9913, 0.1133,
        -0.0667, 0.9913, 0.1133,
        -0.0667, 0.9913, 0.1133,
        -0.5514, 0.0581, -0.8322,
        -0.5514, 0.0581, -0.8322,
        -0.5514, 0.0581, -0.8322,
        -0.5514, 0.0581, -0.8322,
        0.0667, -0.9913, -0.1133,
        0.0667, -0.9913, -0.1133,
        0.0667, -0.9913, -0.1133,
        0.0667, -0.9913, -0.1133,
        0.5514, -0.0581, 0.8322,
        0.5514, -0.0581, 0.8322,
        0.5514, -0.0581, 0.8322,
        0.5514, -0.0581, 0.8322,
        -0.8316, -0.118, 0.5427,
        -0.8316, -0.118, 0.5427,
        -0.8316, -0.118, 0.5427,
        -0.8316, -0.118, 0.5427,
        0.8316, 0.118, -0.5427,
        0.8316, 0.118, -0.5427,
        0.8316, 0.118, -0.5427,
        0.8316, 0.118, -0.5427,
        -0.0806, 0.9934, 0.0811,
        -0.0806, 0.9934, 0.0811,
        -0.0806, 0.9934, 0.0811,
        -0.0806, 0.9934, 0.0811,
        -0.5338, 0.0257, -0.8453,
        -0.5338, 0.0257, -0.8453,
        -0.5338, 0.0257, -0.8453,
        -0.5338, 0.0257, -0.8453,
        0.0806, -0.9934, -0.0811,
        0.0806, -0.9934, -0.0811,
        0.0806, -0.9934, -0.0811,
        0.0806, -0.9934, -0.0811,
        0.5338, -0.0257, 0.8453,
        0.5338, -0.0257, 0.8453,
        0.5338, -0.0257, 0.8453,
        0.5338, -0.0257, 0.8453,
        -0.8418, -0.1114, 0.5282,
        -0.8418, -0.1114, 0.5282,
        -0.8418, -0.1114, 0.5282,
        -0.8418, -0.1114, 0.5282,
        0.8418, 0.1114, -0.5282,
        0.8418, 0.1114, -0.5282,
        0.8418, 0.1114, -0.5282,
        0.8418, 0.1114, -0.5282,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.0284, 0.9994, 0.0186,
        -0.5108, 0.0015, -0.8597,
        -0.5108, 0.0015, -0.8597,
        -0.5108, 0.0015, -0.8597,
        -0.5108, 0.0015, -0.8597,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.0284, -0.9994, -0.0186,
        0.5108, -0.0015, 0.8597,
        0.5108, -0.0015, 0.8597,
        0.5108, -0.0015, 0.8597,
        0.5108, -0.0015, 0.8597,
        -0.8592, -0.0339, 0.5104,
        -0.8592, -0.0339, 0.5104,
        -0.8592, -0.0339, 0.5104,
        -0.8592, -0.0339, 0.5104,
        0.8592, 0.0339, -0.5104,
        0.8592, 0.0339, -0.5104,
        0.8592, 0.0339, -0.5104,
        0.8592, 0.0339, -0.5104,
        -0.7468, 0.5455, 0.3806,
        -0.7468, 0.5455, 0.3806,
        -0.7468, 0.5455, 0.3806,
        -0.7468, 0.5455, 0.3806,
        -0.3565, 0.1548, -0.9214,
        -0.3565, 0.1548, -0.9214,
        -0.3565, 0.1548, -0.9214,
        -0.3565, 0.1548, -0.9214,
        0.7468, -0.5455, -0.3806,
        0.7468, -0.5455, -0.3806,
        0.7468, -0.5455, -0.3806,
        0.7468, -0.5455, -0.3806,
        0.3565, -0.1548, 0.9214,
        0.3565, -0.1548, 0.9214,
        0.3565, -0.1548, 0.9214,
        0.3565, -0.1548, 0.9214,
        -0.5615, -0.8237, 0.0789,
        -0.5615, -0.8237, 0.0789,
        -0.5615, -0.8237, 0.0789,
        -0.5615, -0.8237, 0.0789,
        0.5615, 0.8237, -0.0789,
        0.5615, 0.8237, -0.0789,
        0.5615, 0.8237, -0.0789,
        0.5615, 0.8237, -0.0789,
        -0.025, 0.9995, -0.0166,
        -0.025, 0.9995, -0.0166,
        -0.025, 0.9995, -0.0166,
        -0.025, 0.9995, -0.0166,
        -0.2879, -0.0231, -0.9574,
        -0.2879, -0.0231, -0.9574,
        -0.2879, -0.0231, -0.9574,
        -0.2879, -0.0231, -0.9574,
        0.025, -0.9995, 0.0166,
        0.025, -0.9995, 0.0166,
        0.025, -0.9995, 0.0166,
        0.025, -0.9995, 0.0166,
        0.2879, 0.0231, 0.9574,
        0.2879, 0.0231, 0.9574,
        0.2879, 0.0231, 0.9574,
        0.2879, 0.0231, 0.9574,
        -0.9573, -0.0191, 0.2883,
        -0.9573, -0.0191, 0.2883,
        -0.9573, -0.0191, 0.2883,
        -0.9573, -0.0191, 0.2883,
        0.9573, 0.0191, -0.2883,
        0.9573, 0.0191, -0.2883,
        0.9573, 0.0191, -0.2883,
        0.9573, 0.0191, -0.2883,
        -0.006, 1, 0.0001,
        -0.006, 1, 0.0001,
        -0.006, 1, 0.0001,
        -0.006, 1, 0.0001,
        -0.4839, -0.0028, -0.8751,
        -0.4839, -0.0028, -0.8751,
        -0.4839, -0.0028, -0.8751,
        -0.4839, -0.0028, -0.8751,
        0.006, -1, -0.0001,
        0.006, -1, -0.0001,
        0.006, -1, -0.0001,
        0.006, -1, -0.0001,
        0.4839, 0.0028, 0.8751,
        0.4839, 0.0028, 0.8751,
        0.4839, 0.0028, 0.8751,
        0.4839, 0.0028, 0.8751,
        -0.8751, -0.0052, 0.4839,
        -0.8751, -0.0052, 0.4839,
        -0.8751, -0.0052, 0.4839,
        -0.8751, -0.0052, 0.4839,
        0.8751, 0.0052, -0.4839,
        0.8751, 0.0052, -0.4839,
        0.8751, 0.0052, -0.4839,
        0.8751, 0.0052, -0.4839,
        -0.7482, 0.5152, 0.4182,
        -0.7482, 0.5152, 0.4182,
        -0.7482, 0.5152, 0.4182,
        -0.7482, 0.5152, 0.4182,
        -0.4941, -0.0119, -0.8693,
        -0.4941, -0.0119, -0.8693,
        -0.4941, -0.0119, -0.8693,
        -0.4941, -0.0119, -0.8693,
        0.7482, -0.5152, -0.4182,
        0.7482, -0.5152, -0.4182,
        0.7482, -0.5152, -0.4182,
        0.7482, -0.5152, -0.4182,
        0.4941, 0.0119, 0.8693,
        0.4941, 0.0119, 0.8693,
        0.4941, 0.0119, 0.8693,
        0.4941, 0.0119, 0.8693,
        -0.4429, -0.857, 0.2634,
        -0.4429, -0.857, 0.2634,
        -0.4429, -0.857, 0.2634,
        -0.4429, -0.857, 0.2634,
        0.4429, 0.857, -0.2634,
        0.4429, 0.857, -0.2634,
        0.4429, 0.857, -0.2634,
        0.4429, 0.857, -0.2634
    ]);
    // prettier-ignore
    let texcoord_arr = Float32Array.from([
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75,
        0.375, 0,
        0.625, 0,
        0.625, 0.25,
        0.375, 0.25,
        0.375, 0.25,
        0.625, 0.25,
        0.625, 0.5,
        0.375, 0.5,
        0.375, 0.5,
        0.625, 0.5,
        0.625, 0.75,
        0.375, 0.75,
        0.375, 0.75,
        0.625, 0.75,
        0.625, 1,
        0.375, 1,
        0.125, 0.5,
        0.375, 0.5,
        0.375, 0.75,
        0.125, 0.75,
        0.625, 0.5,
        0.875, 0.5,
        0.875, 0.75,
        0.625, 0.75
    ]);
    // prettier-ignore
    let weights_arr = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
    ]);
    // prettier-ignore
    let index_arr = Uint16Array.from([
        263, 262, 260,
        262, 261, 260,
        259, 258, 256,
        258, 257, 256,
        255, 254, 252,
        254, 253, 252,
        251, 250, 248,
        250, 249, 248,
        247, 246, 244,
        246, 245, 244,
        243, 242, 240,
        242, 241, 240,
        239, 238, 236,
        238, 237, 236,
        235, 234, 232,
        234, 233, 232,
        231, 230, 228,
        230, 229, 228,
        227, 226, 224,
        226, 225, 224,
        223, 222, 220,
        222, 221, 220,
        219, 218, 216,
        218, 217, 216,
        215, 214, 212,
        214, 213, 212,
        211, 210, 208,
        210, 209, 208,
        207, 206, 204,
        206, 205, 204,
        203, 202, 200,
        202, 201, 200,
        199, 198, 196,
        198, 197, 196,
        195, 194, 192,
        194, 193, 192,
        191, 190, 188,
        190, 189, 188,
        187, 186, 184,
        186, 185, 184,
        183, 182, 180,
        182, 181, 180,
        179, 178, 176,
        178, 177, 176,
        175, 174, 172,
        174, 173, 172,
        171, 170, 168,
        170, 169, 168,
        167, 166, 164,
        166, 165, 164,
        163, 162, 160,
        162, 161, 160,
        159, 158, 156,
        158, 157, 156,
        155, 154, 152,
        154, 153, 152,
        151, 150, 148,
        150, 149, 148,
        147, 146, 144,
        146, 145, 144,
        143, 142, 140,
        142, 141, 140,
        139, 138, 136,
        138, 137, 136,
        135, 134, 132,
        134, 133, 132,
        131, 130, 128,
        130, 129, 128,
        127, 126, 124,
        126, 125, 124,
        123, 122, 120,
        122, 121, 120,
        119, 118, 116,
        118, 117, 116,
        115, 114, 112,
        114, 113, 112,
        111, 110, 108,
        110, 109, 108,
        107, 106, 104,
        106, 105, 104,
        103, 102, 100,
        102, 101, 100,
        99, 98, 96,
        98, 97, 96,
        95, 94, 92,
        94, 93, 92,
        91, 90, 88,
        90, 89, 88,
        87, 86, 84,
        86, 85, 84,
        83, 82, 80,
        82, 81, 80,
        79, 78, 76,
        78, 77, 76,
        75, 74, 72,
        74, 73, 72,
        71, 70, 68,
        70, 69, 68,
        67, 66, 64,
        66, 65, 64,
        63, 62, 60,
        62, 61, 60,
        59, 58, 56,
        58, 57, 56,
        55, 54, 52,
        54, 53, 52,
        51, 50, 48,
        50, 49, 48,
        47, 46, 44,
        46, 45, 44,
        43, 42, 40,
        42, 41, 40,
        39, 38, 36,
        38, 37, 36,
        35, 34, 32,
        34, 33, 32,
        31, 30, 28,
        30, 29, 28,
        27, 26, 24,
        26, 25, 24,
        23, 22, 20,
        22, 21, 20,
        19, 18, 16,
        18, 17, 16,
        15, 14, 12,
        14, 13, 12,
        11, 10, 8,
        10, 9, 8,
        7, 6, 4,
        6, 5, 4,
        3, 2, 0,
        2, 1, 0
    ]);

    const EPSILON = 0.000001;
    const DEG_TO_RAD = Math.PI / 180;

    function map_range(value, old_min, old_max, new_min, new_max) {
        return ((value - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;
    }

    function set$1(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
    }
    function copy$1(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
    }
    function add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
    }
    function subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
    }
    function scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
    }
    function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
    }
    function normalize(out, a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let len = x * x + y * y + z * z;
        if (len > 0) {
            //TODO: evaluate use of glm_invsqrt here?
            len = 1 / Math.sqrt(len);
        }
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        return out;
    }
    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function transform_position(out, a, m) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
    }
    function transform_direction(out, a, m) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        out[0] = m[0] * x + m[4] * y + m[8] * z;
        out[1] = m[1] * x + m[5] * y + m[9] * z;
        out[2] = m[2] * x + m[6] * y + m[10] * z;
        return out;
    }
    function length(a) {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        return Math.hypot(x, y, z);
    }
    function lerp(out, a, b, t) {
        let ax = a[0];
        let ay = a[1];
        let az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
    }

    function set(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }
    function multiply$1(out, a, b) {
        let ax = a[0], ay = a[1], az = a[2], aw = a[3];
        let bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }
    function conjugate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
    }
    /**
     * Compute a quaternion out of three Euler angles given in degrees. The order of rotation is YXZ.
     * @param out Quaternion to write to.
     * @param x Rotation about the X axis, in degrees.
     * @param y Rotation around the Y axis, in degress.
     * @param z Rotation around the Z axis, in degress.
     */
    function from_euler(out, x, y, z) {
        let sx = Math.sin((x / 2) * DEG_TO_RAD);
        let cx = Math.cos((x / 2) * DEG_TO_RAD);
        let sy = Math.sin((y / 2) * DEG_TO_RAD);
        let cy = Math.cos((y / 2) * DEG_TO_RAD);
        let sz = Math.sin((z / 2) * DEG_TO_RAD);
        let cz = Math.cos((z / 2) * DEG_TO_RAD);
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        return out;
    }
    /**
     * Compute a quaternion from an axis and an angle of rotation around the axis.
     * @param out Quaternion to write to.
     * @param axis Axis of rotation.
     * @param angle Rotation in radians.
     */
    function from_axis(out, axis, angle) {
        let half = angle / 2;
        out[0] = Math.sin(half) * axis[0];
        out[1] = Math.sin(half) * axis[1];
        out[2] = Math.sin(half) * axis[2];
        out[3] = Math.cos(half);
        return out;
    }
    /**
     * Performs a spherical linear interpolation between two quat
     *
     * @param out - the receiving quaternion
     * @param a - the first operand
     * @param b - the second operand
     * @param t - interpolation amount, in the range [0-1], between the two inputs
     */
    function slerp(out, a, b, t) {
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations
        let ax = a[0], ay = a[1], az = a[2], aw = a[3];
        let bx = b[0], by = b[1], bz = b[2], bw = b[3];
        let omega, cosom, sinom, scale0, scale1;
        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > EPSILON) {
            // standard case (slerp)
            omega = Math.acos(cosom);
            sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
    }

    /**
     * @module systems/sys_animate
     */
    const QUERY$c = 2048 /* Transform */ | 1 /* Animate */;
    function sys_animate(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$c) === QUERY$c) {
                update$8(game, i, delta);
            }
        }
    }
    function update$8(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let animate = game.World.Animate[entity];
        // 1. Switch to the trigger if the clip has completed or early exits are allowed.
        if (animate.Trigger) {
            let next = animate.States[animate.Trigger];
            if (next && next !== animate.Current) {
                if (animate.Current.Time === 0) {
                    // If the current clip has completed last frame, switch to the trigger.
                    animate.Current = next;
                }
                else if (animate.Current.Flags & 1 /* EarlyExit */) {
                    // If the current clip allows early exits, reset its timer so
                    // that the next time it plays it starts from the beginning,
                    // and then switch to the trigger.
                    animate.Current.Time = 0;
                    animate.Current = next;
                }
            }
            animate.Trigger = undefined;
        }
        // 2. Find the current and the next keyframe.
        let current_keyframe = null;
        let next_keyframe = null;
        for (let keyframe of animate.Current.Keyframes) {
            if (animate.Current.Time < keyframe.Timestamp) {
                next_keyframe = keyframe;
                break;
            }
            else {
                current_keyframe = keyframe;
            }
        }
        // 3. Interpolate transform properties between keyframes.
        if (current_keyframe && next_keyframe) {
            let keyframe_duration = next_keyframe.Timestamp - current_keyframe.Timestamp;
            let current_keyframe_time = animate.Current.Time - current_keyframe.Timestamp;
            let interpolant = current_keyframe_time / keyframe_duration;
            if (next_keyframe.Ease) {
                interpolant = next_keyframe.Ease(interpolant);
            }
            if (current_keyframe.Translation && next_keyframe.Translation) {
                lerp(transform.Translation, current_keyframe.Translation, next_keyframe.Translation, interpolant);
                transform.Dirty = true;
            }
            if (current_keyframe.Rotation && next_keyframe.Rotation) {
                slerp(transform.Rotation, current_keyframe.Rotation, next_keyframe.Rotation, interpolant);
                transform.Dirty = true;
            }
            if (current_keyframe.Scale && next_keyframe.Scale) {
                lerp(transform.Scale, current_keyframe.Scale, next_keyframe.Scale, interpolant);
                transform.Dirty = true;
            }
        }
        // 4. Check if the animation is still running.
        let new_time = animate.Current.Time + delta;
        if (new_time < animate.Current.Duration) {
            // The animation isn't done yet; continue.
            animate.Current.Time = new_time;
            return;
        }
        else {
            // The animation has completed; reset its timer.
            animate.Current.Time = 0;
        }
        // 5. The animation has completed. Loop it or switch to idle.
        if (animate.Current.Flags & 4 /* Alternate */) {
            // Reverse the keyframes of the clip and recalculate their timestamps.
            for (let keyframe of animate.Current.Keyframes.reverse()) {
                keyframe.Timestamp = animate.Current.Duration - keyframe.Timestamp;
            }
        }
        if (!(animate.Current.Flags & 2 /* Loop */)) {
            animate.Current = animate.States["idle"];
        }
    }

    function create() {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
    }
    function invert(out, a) {
        let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
    }
    function multiply(out, a, b) {
        let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]; // Cache only the current line of the second matrix
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
    }
    function from_rotation_translation_scale(out, q, v, s) {
        // Quaternion math
        let x = q[0], y = q[1], z = q[2], w = q[3];
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;
        let xx = x * x2;
        let xy = x * y2;
        let xz = x * z2;
        let yy = y * y2;
        let yz = y * z2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        let sx = s[0];
        let sy = s[1];
        let sz = s[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
    }
    function perspective(out, fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(fovy / 2), nf;
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
            nf = 1 / (near - far);
            out[10] = (far + near) * nf;
            out[14] = 2 * far * near * nf;
        }
        else {
            out[10] = -1;
            out[14] = -2 * near;
        }
        return out;
    }
    function get_translation(out, mat) {
        out[0] = mat[12];
        out[1] = mat[13];
        out[2] = mat[14];
        return out;
    }
    function get_scaling(out, mat) {
        let m11 = mat[0];
        let m12 = mat[1];
        let m13 = mat[2];
        let m21 = mat[4];
        let m22 = mat[5];
        let m23 = mat[6];
        let m31 = mat[8];
        let m32 = mat[9];
        let m33 = mat[10];
        out[0] = Math.hypot(m11, m12, m13);
        out[1] = Math.hypot(m21, m22, m23);
        out[2] = Math.hypot(m31, m32, m33);
        return out;
    }
    function get_rotation(out, mat) {
        let scaling = get_scaling([0, 0, 0], mat);
        let is1 = 1 / scaling[0];
        let is2 = 1 / scaling[1];
        let is3 = 1 / scaling[2];
        let sm11 = mat[0] * is1;
        let sm12 = mat[1] * is2;
        let sm13 = mat[2] * is3;
        let sm21 = mat[4] * is1;
        let sm22 = mat[5] * is2;
        let sm23 = mat[6] * is3;
        let sm31 = mat[8] * is1;
        let sm32 = mat[9] * is2;
        let sm33 = mat[10] * is3;
        let trace = sm11 + sm22 + sm33;
        let S = 0;
        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out[3] = 0.25 * S;
            out[0] = (sm23 - sm32) / S;
            out[1] = (sm31 - sm13) / S;
            out[2] = (sm12 - sm21) / S;
        }
        else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            out[3] = (sm23 - sm32) / S;
            out[0] = 0.25 * S;
            out[1] = (sm12 + sm21) / S;
            out[2] = (sm31 + sm13) / S;
        }
        else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            out[3] = (sm31 - sm13) / S;
            out[0] = (sm12 + sm21) / S;
            out[1] = 0.25 * S;
            out[2] = (sm23 + sm32) / S;
        }
        else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            out[3] = (sm12 - sm21) / S;
            out[0] = (sm31 + sm13) / S;
            out[1] = (sm23 + sm32) / S;
            out[2] = 0.25 * S;
        }
        return out;
    }
    function distance_squared_from_point(m, v) {
        let x = m[12] - v[0];
        let y = m[13] - v[1];
        let z = m[14] - v[2];
        return x * x + y * y + z * z;
    }

    function resize_perspective(projection, aspect) {
        if (aspect > 1) {
            // Landscape orientation.
            perspective(projection.Projection, projection.FovY, aspect, projection.Near, projection.Far);
        }
        else {
            // Portrait orientation.
            perspective(projection.Projection, projection.FovY / aspect, aspect, projection.Near, projection.Far);
        }
        invert(projection.Inverse, projection.Projection);
    }

    const QUERY$b = 2048 /* Transform */ | 2 /* Camera */;
    function sys_camera(game, delta) {
        game.Cameras = [];
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$b) === QUERY$b) {
                let camera = game.World.Camera[i];
                if (camera.Kind === 1 /* Xr */ && game.XrFrame) {
                    game.Cameras.push(i);
                    update_xr(game, i, camera);
                    // Support only one camera per scene.
                    return;
                }
                if (camera.Kind === 0 /* Forward */ && !game.XrFrame) {
                    game.Cameras.push(i);
                    update_forward(game, i, camera);
                    // Support only one camera per scene.
                    return;
                }
            }
        }
    }
    function update_forward(game, entity, camera) {
        if (game.ViewportResized) {
            switch (camera.Projection.Kind) {
                case 0 /* Perspective */: {
                    let aspect = game.ViewportWidth / game.ViewportHeight;
                    resize_perspective(camera.Projection, aspect);
                    break;
                }
            }
        }
        let transform = game.World.Transform[entity];
        copy(camera.View, transform.Self);
        multiply(camera.Pv, camera.Projection.Projection, camera.View);
        get_translation(camera.Position, transform.World);
    }
    function update_xr(game, entity, camera) {
        let transform = game.World.Transform[entity];
        let pose = game.XrFrame.getViewerPose(game.XrSpace);
        camera.Eyes = [];
        for (let viewpoint of pose.views) {
            let eye = {
                Viewpoint: viewpoint,
                View: create(),
                Pv: create(),
                Position: [0, 0, 0],
            };
            // Compute the eye's world matrix.
            multiply(eye.View, transform.World, viewpoint.transform.matrix);
            get_translation(eye.Position, eye.View);
            // Compute the view matrix.
            invert(eye.View, eye.View);
            // Compute the PV matrix.
            multiply(eye.Pv, viewpoint.projectionMatrix, eye.View);
            camera.Eyes.push(eye);
        }
    }

    const BOX = [
        [0.5, 0.5, 0.5],
        [0.5, 0.5, -0.5],
        [-0.5, 0.5, -0.5],
        [-0.5, 0.5, 0.5],
        [0.5, -0.5, 0.5],
        [0.5, -0.5, -0.5],
        [-0.5, -0.5, -0.5],
        [-0.5, -0.5, 0.5],
    ];
    /**
     * Computes the AABB based on the translation, rotation and scale of the
     * transform. This is the most accurate function from the compute_aabb family.
     */
    function compute_aabb(world, aabb) {
        get_translation(aabb.Center, world);
        // Start with the extents on each axis set to the position of the center.
        let min_x, min_y, min_z, max_x, max_y, max_z;
        min_x = max_x = aabb.Center[0];
        min_y = max_y = aabb.Center[1];
        min_z = max_z = aabb.Center[2];
        // Expand the extents outwards from the center by finding the farthest
        // vertex on each axis in both the negative and the positive direction.
        let world_vertex = [0, 0, 0];
        for (let i = 0; i < 8; i++) {
            let bb_vertex = BOX[i];
            // Scale the bounding box according to the size of the collider.
            world_vertex[0] = bb_vertex[0] * aabb.Size[0];
            world_vertex[1] = bb_vertex[1] * aabb.Size[1];
            world_vertex[2] = bb_vertex[2] * aabb.Size[2];
            transform_position(world_vertex, world_vertex, world);
            if (world_vertex[0] < min_x) {
                min_x = world_vertex[0];
            }
            if (world_vertex[0] > max_x) {
                max_x = world_vertex[0];
            }
            if (world_vertex[1] < min_y) {
                min_y = world_vertex[1];
            }
            if (world_vertex[1] > max_y) {
                max_y = world_vertex[1];
            }
            if (world_vertex[2] < min_z) {
                min_z = world_vertex[2];
            }
            if (world_vertex[2] > max_z) {
                max_z = world_vertex[2];
            }
        }
        // Save the min and max bounds.
        aabb.Min = [min_x, min_y, min_z];
        aabb.Max = [max_x, max_y, max_z];
        // Calculate the half-extents.
        aabb.Half[0] = (max_x - min_x) / 2;
        aabb.Half[1] = (max_y - min_y) / 2;
        aabb.Half[2] = (max_z - min_z) / 2;
    }
    function penetrate_aabb(a, b) {
        let distance_x = a.Center[0] - b.Center[0];
        let penetration_x = a.Half[0] + b.Half[0] - Math.abs(distance_x);
        let distance_y = a.Center[1] - b.Center[1];
        let penetration_y = a.Half[1] + b.Half[1] - Math.abs(distance_y);
        let distance_z = a.Center[2] - b.Center[2];
        let penetration_z = a.Half[2] + b.Half[2] - Math.abs(distance_z);
        if (penetration_x < penetration_y && penetration_x < penetration_z) {
            return [penetration_x * Math.sign(distance_x), 0, 0];
        }
        else if (penetration_y < penetration_z) {
            return [0, penetration_y * Math.sign(distance_y), 0];
        }
        else {
            return [0, 0, penetration_z * Math.sign(distance_z)];
        }
    }
    function intersect_aabb(a, b) {
        return (a.Min[0] < b.Max[0] &&
            a.Max[0] > b.Min[0] &&
            a.Min[1] < b.Max[1] &&
            a.Max[1] > b.Min[1] &&
            a.Min[2] < b.Max[2] &&
            a.Max[2] > b.Min[2]);
    }

    /**
     * @module systems/sys_collide
     */
    const QUERY$a = 2048 /* Transform */ | 8 /* Collide */;
    function sys_collide(game, delta) {
        // Collect all colliders.
        let static_colliders = [];
        let dynamic_colliders = [];
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$a) === QUERY$a) {
                let transform = game.World.Transform[i];
                let collider = game.World.Collide[i];
                // Prepare the collider for this tick's detection.
                collider.Collisions = [];
                if (collider.New) {
                    collider.New = false;
                    compute_aabb(transform.World, collider);
                }
                else if (collider.Dynamic) {
                    compute_aabb(transform.World, collider);
                    dynamic_colliders.push(collider);
                }
                else {
                    static_colliders.push(collider);
                }
            }
        }
        for (let i = 0; i < dynamic_colliders.length; i++) {
            check_collisions(dynamic_colliders[i], static_colliders, static_colliders.length);
            check_collisions(dynamic_colliders[i], dynamic_colliders, i);
        }
    }
    /**
     * Check for collisions between a dynamic collider and other colliders. Length
     * is used to control how many colliders to check against. For collisions
     * with static colliders, length should be equal to colliders.length, since
     * we want to consider all static colliders in the scene. For collisions with
     * other dynamic colliders, we only need to check a pair of colliders once.
     * Varying length allows to skip half of the NxN checks matrix.
     *
     * @param game The game instance.
     * @param collider The current collider.
     * @param colliders Other colliders to test against.
     * @param length How many colliders to check.
     */
    function check_collisions(collider, colliders, length) {
        for (let i = 0; i < length; i++) {
            let other = colliders[i];
            let collider_can_intersect = collider.Mask & other.Layers;
            let other_can_intersect = other.Mask & collider.Layers;
            if (collider_can_intersect || other_can_intersect) {
                if (intersect_aabb(collider, other)) {
                    let hit = penetrate_aabb(collider, other);
                    if (collider_can_intersect) {
                        collider.Collisions.push({
                            Other: other.EntityId,
                            Hit: hit,
                        });
                    }
                    if (other_can_intersect) {
                        other.Collisions.push({
                            Other: collider.EntityId,
                            Hit: negate([0, 0, 0], hit),
                        });
                    }
                }
            }
        }
    }

    /**
     * @module components/com_children
     */
    function children(...blueprints) {
        return (game, entity) => {
            let child_entities = [];
            for (let blueprint of blueprints) {
                let child = instantiate(game, blueprint);
                child_entities.push(child);
            }
            game.World.Signature[entity] |= 4 /* Children */;
            game.World.Children[entity] = {
                Children: child_entities,
            };
        };
    }
    /**
     * Yield descendants matching a component mask. Start at the current entity.
     *
     * @param world World object which stores the component data.
     * @param entity Parent entity to traverse.
     * @param mask Component mask to look for.
     */
    function* query_down(world, entity, mask) {
        if ((world.Signature[entity] & mask) === mask) {
            yield entity;
        }
        if (world.Signature[entity] & 4 /* Children */) {
            for (let child of world.Children[entity].Children) {
                yield* query_down(world, child, mask);
            }
        }
    }

    const QUERY$9 = 32 /* ControlAlways */ | 2048 /* Transform */;
    function sys_control_always(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$9) === QUERY$9) {
                update$7(game, i);
            }
        }
    }
    function update$7(game, entity) {
        let control = game.World.ControlAlways[entity];
        let move = game.World.Move[entity];
        if (control.Direction) {
            move.Direction = control.Direction.slice();
        }
        if (control.Rotation) {
            move.LocalRotation = control.Rotation.slice();
        }
        if (control.AnimationClip) {
            for (let ent of query_down(game.World, entity, 1 /* Animate */)) {
                let animate = game.World.Animate[ent];
                animate.Trigger = control.AnimationClip;
            }
        }
    }

    const QUERY$8 = 2048 /* Transform */ | 16 /* ControlPlayer */;
    function sys_control_player(game, delta) {
        if (!game.XrFrame) {
            return;
        }
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$8) === QUERY$8) {
                update$6(game, i);
            }
        }
    }
    const AXIS_Y$1 = [0, 1, 0];
    let left_climbing = false;
    let left_last_position = [0, 0, 0];
    let left_curr_position = [0, 0, 0];
    let left_offset = [0, 0, 0];
    let right_climbing = false;
    let right_last_position = [0, 0, 0];
    let right_curr_position = [0, 0, 0];
    let right_offset = [0, 0, 0];
    function update$6(game, entity) {
        let transform = game.World.Transform[entity];
        let children = game.World.Children[entity];
        let control = game.World.ControlPlayer[entity];
        if (control.Kind === 0 /* Motion */) {
            let move = game.World.Move[entity];
            let bob_entity = children.Children[0];
            let bob_transform = game.World.Transform[bob_entity];
            let bob_children = game.World.Children[bob_entity];
            let head_entity = bob_children.Children[1];
            let head_transform = game.World.Transform[head_entity];
            // Walking in the direction of looking.
            let left = game.XrInputs["left"];
            if (left === null || left === void 0 ? void 0 : left.gamepad) {
                let axis_strafe = left.gamepad.axes[2];
                if (axis_strafe) {
                    let direction = [axis_strafe, 0, 0];
                    transform_direction(direction, direction, head_transform.World);
                    transform_direction(direction, direction, transform.Self);
                    direction[1] = 0;
                    add(move.Direction, move.Direction, direction);
                }
                let axis_forward = left.gamepad.axes[3];
                if (axis_forward) {
                    let direction = [0, 0, axis_forward];
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
                let bobbing = (Math.sin(bobbing_frequency * transform.Translation[0]) +
                    Math.sin(bobbing_frequency * transform.Translation[2])) *
                    bobbing_amplitude;
                bob_transform.Translation[1] = bobbing;
                bob_transform.Dirty = true;
            }
            // Rotating the player.
            let right = game.XrInputs["right"];
            if (right === null || right === void 0 ? void 0 : right.gamepad) {
                let axis_rotate = -right.gamepad.axes[2];
                if (axis_rotate) {
                    let amount = axis_rotate * Math.PI;
                    let rotation = from_axis([0, 0, 0, 1], AXIS_Y$1, amount);
                    multiply$1(move.LocalRotation, move.LocalRotation, rotation);
                }
            }
            let left_hand_entity = bob_children.Children[2];
            let left_hand_control = game.World.ControlXr[left_hand_entity];
            let right_hand_entity = bob_children.Children[3];
            let right_hand_control = game.World.ControlXr[right_hand_entity];
            // Climbing with the left hand.
            if (left_hand_entity && (left_hand_control === null || left_hand_control === void 0 ? void 0 : left_hand_control.Squeezed)) {
                let hand_transform = game.World.Transform[left_hand_entity];
                let hand_collide = game.World.Collide[left_hand_entity];
                if (hand_collide.Collisions.length > 0) {
                    let climbed_entity = hand_collide.Collisions[0].Other;
                    let climbed_transform = game.World.Transform[climbed_entity];
                    let climbed_children = game.World.Children[climbed_entity];
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
                        climbed_children.Children.push(entity);
                        transform.Parent = climbed_entity;
                        // Compute player's world translation in case they were attached before.
                        get_translation(transform.Translation, transform.World);
                        transform_position(transform.Translation, transform.Translation, climbed_transform.Self);
                        // Compute the offset rotation between the player and the climb.
                        let climbed_world_rotation = [0, 0, 0, 1];
                        get_rotation(climbed_world_rotation, climbed_transform.World);
                        conjugate(climbed_world_rotation, climbed_world_rotation);
                        get_rotation(transform.Rotation, transform.World);
                        multiply$1(transform.Rotation, climbed_world_rotation, transform.Rotation);
                        transform.Dirty = true;
                    }
                    else {
                        get_translation(left_curr_position, hand_transform.World);
                        transform_position(left_curr_position, left_curr_position, transform.Self);
                        subtract(left_offset, left_last_position, left_curr_position);
                        copy$1(left_last_position, left_curr_position);
                        transform_direction(left_offset, left_offset, transform.World);
                        transform_direction(left_offset, left_offset, climbed_transform.Self);
                        add(transform.Translation, transform.Translation, left_offset);
                        transform.Dirty = true;
                    }
                }
            }
            else if (left_climbing) {
                left_climbing = false;
            }
            // Climbing with the right hand.
            if (right_hand_entity && (right_hand_control === null || right_hand_control === void 0 ? void 0 : right_hand_control.Squeezed)) {
                let hand_transform = game.World.Transform[right_hand_entity];
                let hand_collide = game.World.Collide[right_hand_entity];
                if (hand_collide.Collisions.length > 0) {
                    let climbed_entity = hand_collide.Collisions[0].Other;
                    let climbed_transform = game.World.Transform[climbed_entity];
                    let climbed_children = game.World.Children[climbed_entity];
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
                        climbed_children.Children.push(entity);
                        transform.Parent = climbed_entity;
                        // Compute player's world translation in case they were attached before.
                        get_translation(transform.Translation, transform.World);
                        transform_position(transform.Translation, transform.Translation, climbed_transform.Self);
                        // Compute the offset rotation between the player and the climb.
                        let climbed_world_rotation = [0, 0, 0, 1];
                        get_rotation(climbed_world_rotation, climbed_transform.World);
                        conjugate(climbed_world_rotation, climbed_world_rotation);
                        get_rotation(transform.Rotation, transform.World);
                        multiply$1(transform.Rotation, climbed_world_rotation, transform.Rotation);
                        transform.Dirty = true;
                    }
                    else {
                        get_translation(right_curr_position, hand_transform.World);
                        transform_position(right_curr_position, right_curr_position, transform.Self);
                        subtract(right_offset, right_last_position, right_curr_position);
                        copy$1(right_last_position, right_curr_position);
                        transform_direction(right_offset, right_offset, transform.World);
                        transform_direction(right_offset, right_offset, climbed_transform.Self);
                        add(transform.Translation, transform.Translation, right_offset);
                        transform.Dirty = true;
                    }
                }
            }
            else if (right_climbing) {
                right_climbing = false;
            }
            let rigid_body = game.World.RigidBody[entity];
            if (left_climbing || right_climbing) {
                rigid_body.Kind = 2 /* Kinematic */;
            }
            else {
                rigid_body.Kind = 1 /* Dynamic */;
                if (transform.Parent) {
                    // Release the player.
                    let climbed_entity = transform.Parent;
                    let climbed_children = game.World.Children[climbed_entity];
                    // Un-parent the player.
                    climbed_children.Children.pop();
                    transform.Parent = undefined;
                    // Move the player into the world space.
                    get_translation(transform.Translation, transform.World);
                    get_rotation(transform.Rotation, transform.World);
                    transform.Dirty = true;
                }
            }
        }
    }

    const QUERY$7 = 2048 /* Transform */ | 64 /* ControlXr */;
    function sys_control_pose(game, delta) {
        if (!game.XrFrame) {
            return;
        }
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$7) === QUERY$7) {
                update$5(game, i);
            }
        }
    }
    const AXIS_Y = [0, 1, 0];
    function update$5(game, entity) {
        let transform = game.World.Transform[entity];
        let control = game.World.ControlXr[entity];
        let children = game.World.Children[entity];
        if (control.Kind === 0 /* Head */) {
            let pose = game.XrFrame.getViewerPose(game.XrSpace);
            transform.Translation[0] = pose.transform.position.x;
            transform.Translation[1] = pose.transform.position.y;
            transform.Translation[2] = pose.transform.position.z;
            transform.Rotation[0] = pose.transform.orientation.x;
            transform.Rotation[1] = pose.transform.orientation.y;
            transform.Rotation[2] = pose.transform.orientation.z;
            transform.Rotation[3] = pose.transform.orientation.w;
            transform.Dirty = true;
            return;
        }
        if (control.Kind === 1 /* Left */) {
            let input = game.XrInputs["left"];
            if (input) {
                let pose = game.XrFrame.getPose(input.gripSpace, game.XrSpace);
                if (pose) {
                    control.Pose = pose;
                    transform.Translation[0] = pose.transform.position.x;
                    transform.Translation[1] = pose.transform.position.y;
                    transform.Translation[2] = pose.transform.position.z;
                    transform.Rotation[0] = pose.transform.orientation.x;
                    transform.Rotation[1] = pose.transform.orientation.y;
                    transform.Rotation[2] = pose.transform.orientation.z;
                    transform.Rotation[3] = pose.transform.orientation.w;
                    transform.Dirty = true;
                }
                if (input.gamepad) {
                    let squeeze = input.gamepad.buttons[1];
                    if (squeeze) {
                        control.Squeezed = squeeze.pressed;
                        // Open or close the hand.
                        let hand_entity = children.Children[0];
                        let hand_transform = game.World.Transform[hand_entity];
                        hand_transform.Scale[2] = map_range(squeeze.value, 0, 1, 1, 0.5);
                        from_axis(hand_transform.Rotation, AXIS_Y, -squeeze.value);
                        hand_transform.Dirty = true;
                    }
                }
            }
            return;
        }
        if (control.Kind === 2 /* Right */) {
            let input = game.XrInputs["right"];
            if (input) {
                let pose = game.XrFrame.getPose(input.gripSpace, game.XrSpace);
                if (pose) {
                    control.Pose = pose;
                    transform.Translation[0] = pose.transform.position.x;
                    transform.Translation[1] = pose.transform.position.y;
                    transform.Translation[2] = pose.transform.position.z;
                    transform.Rotation[0] = pose.transform.orientation.x;
                    transform.Rotation[1] = pose.transform.orientation.y;
                    transform.Rotation[2] = pose.transform.orientation.z;
                    transform.Rotation[3] = pose.transform.orientation.w;
                    transform.Dirty = true;
                }
                if (input.gamepad) {
                    let squeeze = input.gamepad.buttons[1];
                    if (squeeze) {
                        control.Squeezed = squeeze.pressed;
                        // Open or close the hand.
                        let hand_entity = children.Children[0];
                        let hand_transform = game.World.Transform[hand_entity];
                        hand_transform.Scale[2] = map_range(squeeze.value, 0, 1, 1, 0.5);
                        from_axis(hand_transform.Rotation, AXIS_Y, squeeze.value);
                        hand_transform.Dirty = true;
                    }
                }
            }
            return;
        }
    }

    /**
     * @module components/com_render
     */
    const colored_shaded_vaos = new WeakMap();
    function render_colored_shaded(material, mesh, diffuse_color, shininess = 0, specular_color = [1, 1, 1, 1], front_face = GL_CW) {
        return (game, entity) => {
            if (!colored_shaded_vaos.has(mesh)) {
                // We only need to create the VAO once.
                let vao = game.Gl.createVertexArray();
                game.Gl.bindVertexArray(vao);
                game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
                game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
                game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
                game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.NormalBuffer);
                game.Gl.enableVertexAttribArray(material.Locations.VertexNormal);
                game.Gl.vertexAttribPointer(material.Locations.VertexNormal, 3, GL_FLOAT, false, 0, 0);
                game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
                game.Gl.bindVertexArray(null);
                colored_shaded_vaos.set(mesh, vao);
            }
            game.World.Signature[entity] |= 512 /* Render */;
            game.World.Render[entity] = {
                Kind: 1 /* ColoredShaded */,
                Material: material,
                Mesh: mesh,
                Phase: diffuse_color[3] < 1 ? 1 /* Transparent */ : 0 /* Opaque */,
                FrontFace: front_face,
                Vao: colored_shaded_vaos.get(mesh),
                DiffuseColor: diffuse_color,
                SpecularColor: specular_color,
                Shininess: shininess,
            };
        };
    }
    function render_instanced(mesh, offsets, colors, front_face = GL_CW) {
        return (game, entity) => {
            let material = game.MaterialInstanced;
            let vao = game.Gl.createVertexArray();
            game.Gl.bindVertexArray(vao);
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
            game.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
            let instance_buffer = game.Gl.createBuffer();
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_buffer);
            game.Gl.bufferData(GL_ARRAY_BUFFER, offsets, GL_STATIC_DRAW);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn1);
            game.Gl.vertexAttribPointer(material.Locations.InstanceColumn1, 4, GL_FLOAT, false, 4 * 16, 0);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn1, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn2);
            game.Gl.vertexAttribPointer(material.Locations.InstanceColumn2, 4, GL_FLOAT, false, 4 * 16, 4 * 4);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn2, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn3);
            game.Gl.vertexAttribPointer(material.Locations.InstanceColumn3, 4, GL_FLOAT, false, 4 * 16, 4 * 8);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn3, 1);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColumn4);
            game.Gl.vertexAttribPointer(material.Locations.InstanceColumn4, 4, GL_FLOAT, false, 4 * 16, 4 * 12);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColumn4, 1);
            let instance_color_buffer = game.Gl.createBuffer();
            game.Gl.bindBuffer(GL_ARRAY_BUFFER, instance_color_buffer);
            game.Gl.bufferData(GL_ARRAY_BUFFER, colors, GL_STATIC_DRAW);
            game.Gl.enableVertexAttribArray(material.Locations.InstanceColor);
            game.Gl.vertexAttribPointer(material.Locations.InstanceColor, 3, GL_FLOAT, false, 0, 0);
            game.Gl.vertexAttribDivisor(material.Locations.InstanceColor, 1);
            game.Gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);
            game.Gl.bindVertexArray(null);
            game.World.Signature[entity] |= 512 /* Render */;
            game.World.Render[entity] = {
                Kind: 8 /* Instanced */,
                Material: material,
                Phase: 0 /* Opaque */,
                Mesh: mesh,
                Vao: vao,
                InstanceCount: offsets.length / 16,
                InstanceBuffer: instance_buffer,
                FrontFace: front_face,
            };
        };
    }

    /**
     * @module components/com_transform
     */
    function transform(translation = [0, 0, 0], rotation = [0, 0, 0, 1], scale = [1, 1, 1]) {
        return (game, entity) => {
            game.World.Signature[entity] |= 2048 /* Transform */;
            game.World.Transform[entity] = {
                World: create(),
                Self: create(),
                Translation: translation,
                Rotation: rotation,
                Scale: scale,
                Dirty: true,
            };
        };
    }

    /**
     * @module systems/sys_light
     */
    const QUERY$6 = 2048 /* Transform */ | 128 /* Light */;
    function sys_light(game, delta) {
        game.LightPositions.fill(0);
        game.LightDetails.fill(0);
        let counter = 0;
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$6) === QUERY$6) {
                update$4(game, i, counter++);
            }
        }
    }
    let world_pos = [0, 0, 0];
    function update$4(game, entity, idx) {
        let light = game.World.Light[entity];
        let transform = game.World.Transform[entity];
        get_translation(world_pos, transform.World);
        if (light.Kind === 1 /* Directional */) {
            // For directional lights, their normalized position in the world
            // describes the light's normal.
            normalize(world_pos, world_pos);
        }
        game.LightPositions[4 * idx + 0] = world_pos[0];
        game.LightPositions[4 * idx + 1] = world_pos[1];
        game.LightPositions[4 * idx + 2] = world_pos[2];
        game.LightPositions[4 * idx + 3] = light.Kind;
        game.LightDetails[4 * idx + 0] = light.Color[0];
        game.LightDetails[4 * idx + 1] = light.Color[1];
        game.LightDetails[4 * idx + 2] = light.Color[2];
        game.LightDetails[4 * idx + 3] = light.Intensity;
    }

    /**
     * @module systems/sys_move
     */
    const QUERY$5 = 2048 /* Transform */ | 256 /* Move */;
    const NO_ROTATION = [0, 0, 0, 1];
    function sys_move(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$5) === QUERY$5) {
                update$3(game, i, delta);
            }
        }
    }
    function update$3(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let move = game.World.Move[entity];
        if (move.Direction[0] !== 0 || move.Direction[1] !== 0 || move.Direction[2] !== 0) {
            // Directions are not normalized to allow them to express slower
            // movement from a gamepad input. They can also cancel each other out.
            // They may not, however, intensify one another; hence max amount is 1.
            let amount = Math.min(1, length(move.Direction));
            // Transform the direction into the world or the parent space. This will
            // also scale the result by the scale encoded in the transform.
            transform_direction(move.Direction, move.Direction, transform.World);
            if (transform.Parent !== undefined) {
                let parent = game.World.Transform[transform.Parent];
                transform_direction(move.Direction, move.Direction, parent.Self);
            }
            // Normalize the direction to remove the transform's scale. The length
            // of the orignal direction is now lost.
            normalize(move.Direction, move.Direction);
            // Scale by the amount and distance traveled in this tick.
            scale(move.Direction, move.Direction, amount * move.MoveSpeed * delta);
            add(transform.Translation, transform.Translation, move.Direction);
            transform.Dirty = true;
            set$1(move.Direction, 0, 0, 0);
        }
        // Rotations applied relative to the local space (parent's or world).
        if (move.LocalRotation[3] !== 1) {
            let t = Math.min(1, (move.RotationSpeed / Math.PI) * delta);
            slerp(move.LocalRotation, NO_ROTATION, move.LocalRotation, t);
            // Pre-multiply.
            multiply$1(transform.Rotation, move.LocalRotation, transform.Rotation);
            transform.Dirty = true;
            set(move.LocalRotation, 0, 0, 0, 1);
        }
        // Rotations applied relative to the self space.
        if (move.SelfRotation[3] !== 1) {
            let t = Math.min(1, (move.RotationSpeed / Math.PI) * delta);
            slerp(move.SelfRotation, NO_ROTATION, move.SelfRotation, t);
            // Post-multiply.
            multiply$1(transform.Rotation, transform.Rotation, move.SelfRotation);
            transform.Dirty = true;
            set(move.SelfRotation, 0, 0, 0, 1);
        }
    }

    /**
     * @module systems/sys_physics_integrate
     */
    const QUERY$4 = 2048 /* Transform */ | 1024 /* RigidBody */;
    const GRAVITY = -3.721;
    function sys_physics_integrate(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$4) === QUERY$4) {
                update$2(game, i, delta);
            }
        }
    }
    function update$2(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.Kind === 1 /* Dynamic */) {
            copy$1(rigid_body.VelocityIntegrated, rigid_body.VelocityResolved);
            // Compute change to velocity, including the gravity.
            scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
            add(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
            rigid_body.VelocityIntegrated[1] += GRAVITY * delta;
            // Apply velocity to position.
            let vel_delta = [0, 0, 0];
            scale(vel_delta, rigid_body.VelocityIntegrated, delta);
            add(transform.Translation, transform.Translation, vel_delta);
            transform.Dirty = true;
            // Reset force/acceleration.
            set$1(rigid_body.Acceleration, 0, 0, 0);
        }
    }

    /**
     * @module systems/sys_physics_kinematic
     */
    const QUERY$3 = 2048 /* Transform */ | 1024 /* RigidBody */;
    function sys_physics_kinematic(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$3) === QUERY$3) {
                update$1(game, i, delta);
            }
        }
    }
    const current_position = [0, 0, 0];
    const movement = [0, 0, 0];
    function update$1(game, entity, delta) {
        let transform = game.World.Transform[entity];
        let rigid_body = game.World.RigidBody[entity];
        get_translation(current_position, transform.World);
        if (rigid_body.Kind === 2 /* Kinematic */) {
            subtract(movement, current_position, rigid_body.LastPosition);
            // Compute velocity from this frame's movement.
            scale(rigid_body.VelocityIntegrated, movement, 1 / delta);
        }
        copy$1(rigid_body.LastPosition, current_position);
    }

    /**
     * @module systems/sys_physics_resolve
     */
    const QUERY$2 = 2048 /* Transform */ | 8 /* Collide */ | 1024 /* RigidBody */;
    function sys_physics_resolve(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY$2) === QUERY$2) {
                update(game, i);
            }
        }
    }
    // Temp vector used to compute the reflection off of a static body.
    let a = [0, 0, 0];
    function update(game, entity) {
        let transform = game.World.Transform[entity];
        let collide = game.World.Collide[entity];
        let rigid_body = game.World.RigidBody[entity];
        if (rigid_body.Kind === 1 /* Dynamic */) {
            rigid_body.IsAirborne = true;
            let has_collision = false;
            for (let i = 0; i < collide.Collisions.length; i++) {
                let collision = collide.Collisions[i];
                if (game.World.Signature[collision.Other] & 1024 /* RigidBody */) {
                    has_collision = true;
                    // Dynamic rigid bodies are only supported for top-level
                    // entities. Thus, no need to apply the world → self → local
                    // conversion to the collision response. Local space is world space.
                    add(transform.Translation, transform.Translation, collision.Hit);
                    transform.Dirty = true;
                    // Assume mass = 1 for all rigid bodies. On collision,
                    // velocities are swapped, unless the other body is a static
                    // one (and behaves as if it had infinite mass).
                    let other_body = game.World.RigidBody[collision.Other];
                    switch (other_body.Kind) {
                        case 0 /* Static */:
                            // Compute the reflection vector as
                            //   r = v - 2 * (v·n) * n
                            // where
                            //   v — the incident velocity vector
                            //   n — the normal of the surface of reflection
                            // Compute n.
                            normalize(a, collision.Hit);
                            // Compute - 2 * (v·n) * n.
                            scale(a, a, -2 * dot(rigid_body.VelocityIntegrated, a));
                            add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, a);
                            break;
                        case 1 /* Dynamic */:
                        case 2 /* Kinematic */:
                            copy$1(rigid_body.VelocityResolved, other_body.VelocityIntegrated);
                            break;
                    }
                    // When Bounciness = 1, collisions are 100% elastic.
                    scale(rigid_body.VelocityResolved, rigid_body.VelocityResolved, rigid_body.Bounciness);
                    if (collision.Hit[1] > 0 && rigid_body.VelocityResolved[1] < 1) {
                        // Collision from the bottom stops the downward movement.
                        rigid_body.VelocityResolved[1] = 0;
                        rigid_body.IsAirborne = false;
                    }
                }
            }
            if (!has_collision) {
                copy$1(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
            }
        }
        else if (rigid_body.Kind === 2 /* Kinematic */) {
            copy$1(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
        }
    }

    /**
     * @module systems/sys_render_forward
     */
    const QUERY$1 = 2048 /* Transform */ | 512 /* Render */;
    function sys_render_forward(game, delta) {
        for (let camera_entity of game.Cameras) {
            let camera = game.World.Camera[camera_entity];
            switch (camera.Kind) {
                case 0 /* Forward */:
                    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
                    game.Gl.viewport(0, 0, game.ViewportWidth, game.ViewportHeight);
                    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
                    render_all(game, camera);
                    break;
                case 1 /* Xr */:
                    let layer = game.XrFrame.session.renderState.baseLayer;
                    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, layer.framebuffer);
                    game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
                    for (let eye of camera.Eyes) {
                        let viewport = layer.getViewport(eye.Viewpoint);
                        game.Gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
                        render_all(game, eye);
                    }
                    break;
            }
        }
    }
    function render_all(game, eye, current_target) {
        // Keep track of the current state to minimize switching.
        let current_material = null;
        let current_front_face = null;
        // Transparent objects to be sorted by distance to camera and rendered later.
        let transparent_entities = [];
        // First render opaque objects.
        for (let ent = 0; ent < game.World.Signature.length; ent++) {
            if ((game.World.Signature[ent] & QUERY$1) === QUERY$1) {
                let render = game.World.Render[ent];
                if (render.Phase === 1 /* Transparent */) {
                    // Store transparent objects in a separate array to render them later.
                    transparent_entities.push(ent);
                    continue;
                }
                if (render.Material !== current_material) {
                    current_material = render.Material;
                    use_material(game, render, eye);
                }
                if (render.FrontFace !== current_front_face) {
                    current_front_face = render.FrontFace;
                    game.Gl.frontFace(render.FrontFace);
                }
                draw_entity(game, ent, current_target);
            }
        }
        // Sort transparent objects by distance to camera, from back to front, to
        // enforce overdraw and blend them in the correct order.
        transparent_entities.sort((a, b) => {
            let transform_a = game.World.Transform[a];
            let transform_b = game.World.Transform[b];
            return (distance_squared_from_point(transform_b.World, eye.Position) -
                distance_squared_from_point(transform_a.World, eye.Position));
        });
        game.Gl.enable(GL_BLEND);
        for (let i = 0; i < transparent_entities.length; i++) {
            let ent = transparent_entities[i];
            let render = game.World.Render[ent];
            if (render.Material !== current_material) {
                current_material = render.Material;
                use_material(game, render, eye);
            }
            if (render.FrontFace !== current_front_face) {
                current_front_face = render.FrontFace;
                game.Gl.frontFace(render.FrontFace);
            }
            draw_entity(game, ent, current_target);
        }
        game.Gl.disable(GL_BLEND);
    }
    function use_material(game, render, eye) {
        switch (render.Kind) {
            case 0 /* ColoredUnlit */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                break;
            case 1 /* ColoredShaded */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                game.Gl.uniform3fv(render.Material.Locations.Eye, eye.Position);
                game.Gl.uniform4fv(render.Material.Locations.LightPositions, game.LightPositions);
                game.Gl.uniform4fv(render.Material.Locations.LightDetails, game.LightDetails);
                game.Gl.uniform4fv(render.Material.Locations.FogColor, game.ClearColor);
                game.Gl.uniform1f(render.Material.Locations.FogDistance, game.FogDistance);
                break;
            case 4 /* TexturedUnlit */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                break;
            case 5 /* TexturedShaded */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                game.Gl.uniform3fv(render.Material.Locations.Eye, eye.Position);
                game.Gl.uniform4fv(render.Material.Locations.LightPositions, game.LightPositions);
                game.Gl.uniform4fv(render.Material.Locations.LightDetails, game.LightDetails);
                break;
            case 7 /* Vertices */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                break;
            case 6 /* MappedShaded */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                game.Gl.uniform3fv(render.Material.Locations.Eye, eye.Position);
                game.Gl.uniform4fv(render.Material.Locations.LightPositions, game.LightPositions);
                game.Gl.uniform4fv(render.Material.Locations.LightDetails, game.LightDetails);
                break;
            case 8 /* Instanced */:
                game.Gl.useProgram(render.Material.Program);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Pv, false, eye.Pv);
                game.Gl.uniform3fv(render.Material.Locations.Eye, eye.Position);
                game.Gl.uniform4fv(render.Material.Locations.FogColor, game.ClearColor);
                game.Gl.uniform1f(render.Material.Locations.FogDistance, game.FogDistance);
                break;
        }
    }
    function draw_entity(game, entity, current_target) {
        let transform = game.World.Transform[entity];
        let render = game.World.Render[entity];
        switch (render.Kind) {
            case 0 /* ColoredUnlit */:
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
                game.Gl.bindVertexArray(render.Vao);
                game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
                game.Gl.bindVertexArray(null);
                break;
            case 1 /* ColoredShaded */:
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
                game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
                game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
                game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
                game.Gl.bindVertexArray(render.Vao);
                game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
                game.Gl.bindVertexArray(null);
                break;
            case 4 /* TexturedUnlit */:
                if (render.Texture === current_target) {
                    // Prevent feedback loop between the active render target
                    // and the texture being rendered.
                    break;
                }
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
                game.Gl.activeTexture(GL_TEXTURE0);
                game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
                game.Gl.uniform1i(render.Material.Locations.TextureMap, 0);
                game.Gl.bindVertexArray(render.Vao);
                game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
                game.Gl.bindVertexArray(null);
                break;
            case 5 /* TexturedShaded */:
                if (render.Texture === current_target) {
                    // Prevent feedback loop between the active render target
                    // and the texture being rendered.
                    break;
                }
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
                game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
                game.Gl.uniform4fv(render.Material.Locations.SpecularColor, render.SpecularColor);
                game.Gl.uniform1f(render.Material.Locations.Shininess, render.Shininess);
                game.Gl.activeTexture(GL_TEXTURE0);
                game.Gl.bindTexture(GL_TEXTURE_2D, render.Texture);
                game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 0);
                game.Gl.bindVertexArray(render.Vao);
                game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
                game.Gl.bindVertexArray(null);
                break;
            case 7 /* Vertices */:
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniform4fv(render.Material.Locations.Color, render.Color);
                game.Gl.bindBuffer(GL_ARRAY_BUFFER, render.VertexBuffer);
                game.Gl.enableVertexAttribArray(render.Material.Locations.VertexPosition);
                game.Gl.vertexAttribPointer(render.Material.Locations.VertexPosition, 3, GL_FLOAT, false, 0, 0);
                game.Gl.drawArrays(render.Material.Mode, 0, render.IndexCount);
                break;
            case 6 /* MappedShaded */:
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.uniformMatrix4fv(render.Material.Locations.Self, false, transform.Self);
                game.Gl.uniform4fv(render.Material.Locations.DiffuseColor, render.DiffuseColor);
                game.Gl.activeTexture(GL_TEXTURE1);
                game.Gl.bindTexture(GL_TEXTURE_2D, render.DiffuseMap);
                game.Gl.uniform1i(render.Material.Locations.DiffuseMap, 1);
                game.Gl.activeTexture(GL_TEXTURE2);
                game.Gl.bindTexture(GL_TEXTURE_2D, render.NormalMap);
                game.Gl.uniform1i(render.Material.Locations.NormalMap, 2);
                game.Gl.activeTexture(GL_TEXTURE3);
                game.Gl.bindTexture(GL_TEXTURE_2D, render.RoughnessMap);
                game.Gl.uniform1i(render.Material.Locations.RoughnessMap, 3);
                game.Gl.bindVertexArray(render.Vao);
                game.Gl.drawElements(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0);
                game.Gl.bindVertexArray(null);
                break;
            case 8 /* Instanced */:
                game.Gl.uniformMatrix4fv(render.Material.Locations.World, false, transform.World);
                game.Gl.bindVertexArray(render.Vao);
                let instance_count = Math.floor(render.InstanceCount);
                game.Gl.drawElementsInstanced(render.Material.Mode, render.Mesh.IndexCount, GL_UNSIGNED_SHORT, 0, instance_count);
                game.Gl.bindVertexArray(null);
                break;
        }
    }

    /**
     * @module systems/sys_resize
     */
    function sys_resize(game, delta) {
        if (game.ViewportWidth != window.innerWidth || game.ViewportHeight != window.innerHeight) {
            game.ViewportResized = true;
        }
        if (game.ViewportResized) {
            game.ViewportWidth = game.Canvas3D.width = game.Canvas2D.width = window.innerWidth;
            game.ViewportHeight = game.Canvas3D.height = game.Canvas2D.height = window.innerHeight;
        }
    }

    const QUERY = 2048 /* Transform */;
    function sys_transform(game, delta) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY) === QUERY) {
                let transform = game.World.Transform[i];
                if (transform.Dirty) {
                    update_transform(game, i, transform);
                }
            }
        }
    }
    function update_transform(game, entity, transform) {
        transform.Dirty = false;
        from_rotation_translation_scale(transform.World, transform.Rotation, transform.Translation, transform.Scale);
        if (transform.Parent !== undefined) {
            let parent_transform = game.World.Transform[transform.Parent];
            multiply(transform.World, parent_transform.World, transform.World);
        }
        invert(transform.Self, transform.World);
        if (game.World.Signature[entity] & 4 /* Children */) {
            let children = game.World.Children[entity];
            for (let child of children.Children) {
                if (game.World.Signature[child] & 2048 /* Transform */) {
                    let child_transform = game.World.Transform[child];
                    child_transform.Parent = entity;
                    update_transform(game, child, child_transform);
                }
            }
        }
    }

    function shift(values) {
        let value = values.shift();
        if (typeof value === "boolean" || value == undefined) {
            return "";
        }
        else if (Array.isArray(value)) {
            return value.join("");
        }
        else {
            return value;
        }
    }
    function html(strings, ...values) {
        return strings.reduce((out, cur) => out + shift(values) + cur);
    }

    function EnterVr(game) {
        return html `
        <div
            style="
                position: absolute;
                bottom: 1vmin;
                right: 1vmin;
                background: #000;
                color: #fff;
                font: 13px Arial;
            "
        >
            ${game.XrFrame
        ? ExitButton()
        : window.isSecureContext
            ? navigator.xr
                ? game.XrSupported
                    ? EnterButton()
                    : `<div style="padding: 1vmin">WebXR headset not found</div>`
                : `<div style="padding: 1vmin">WebXR not supported</div>`
            : `<div style="padding: 1vmin">WebXR requires HTTPS</div>`}
        </div>
    `;
    }
    function EnterButton() {
        return html `
        <button
            onclick="$(${0 /* EnterVr */})"
            style="
                padding: 1vmin;
                background: #000;
                color: #fff;
                border: none;
            "
        >
            Enter VR
        </button>
    `;
    }
    function ExitButton() {
        return html `
        <button
            onclick="$(${1 /* ExitVr */})"
            style="
                padding: 1vmin;
                background: #000;
                color: #fff;
                border: none;
            "
        >
            Exit VR
        </button>
    `;
    }

    function App(game) {
        return html ` <div>${EnterVr(game)}</div> `;
    }

    /**
     * @module systems/sys_ui
     */
    let prev;
    function sys_ui(game, delta) {
        let next = App(game);
        if (next !== prev) {
            game.Ui.innerHTML = prev = next;
        }
    }

    class WorldImpl {
        constructor(capacity = 20000) {
            this.Signature = [];
            this.Graveyard = [];
            this.Capacity = capacity;
        }
        CreateEntity() {
            if (this.Graveyard.length > 0) {
                return this.Graveyard.pop();
            }
            if (DEBUG && this.Signature.length > this.Capacity) {
                throw new Error("No more entities available.");
            }
            // Push a new signature and return its index.
            return this.Signature.push(0) - 1;
        }
        DestroyEntity(entity) {
            this.Signature[entity] = 0;
            if (DEBUG && this.Graveyard.includes(entity)) {
                throw new Error("Entity already in graveyard.");
            }
            this.Graveyard.push(entity);
        }
    }

    class World extends WorldImpl {
        constructor() {
            super(...arguments);
            this.Animate = [];
            this.Camera = [];
            this.Children = [];
            this.Collide = [];
            this.ControlAlways = [];
            this.ControlPlayer = [];
            this.ControlXr = [];
            this.Light = [];
            this.Move = [];
            this.Render = [];
            this.RigidBody = [];
            this.Transform = [];
        }
    }

    class Game extends Game3D {
        constructor() {
            super();
            this.World = new World();
            this.XrSupported = false;
            this.XrInputs = {};
            this.MaterialColoredWireframe = mat_forward_colored_wireframe(this.Gl);
            this.MaterialColoredGouraud = mat_forward_colored_gouraud(this.Gl);
            this.MaterialInstanced = mat_forward_instanced(this.Gl);
            this.MeshCube = mesh_cube(this.Gl);
            this.MeshHand = mesh_hand(this.Gl);
            this.Cameras = [];
            // The rendering pipeline supports 8 lights.
            this.LightPositions = new Float32Array(4 * 8);
            this.LightDetails = new Float32Array(4 * 8);
            this.ClearColor = [1, 1, 1, 1.0];
            this.FogDistance = 150;
            if (navigator.xr) {
                xr_init(this);
            }
        }
        Start() {
            let last = performance.now();
            let tick = (now, frame) => {
                let delta = (now - last) / 1000;
                last = now;
                if (frame) {
                    this.XrFrame = frame;
                    this.Running = this.XrFrame.session.requestAnimationFrame(tick);
                }
                else {
                    this.XrFrame = undefined;
                    this.Running = requestAnimationFrame(tick);
                }
                this.FrameSetup(delta);
                this.FrameUpdate(delta);
                this.FrameReset(delta);
            };
            if (this.XrSession) {
                this.Running = this.XrSession.requestAnimationFrame(tick);
            }
            else {
                this.Running = requestAnimationFrame(tick);
            }
        }
        Stop() {
            if (this.XrSession) {
                this.XrSession.cancelAnimationFrame(this.Running);
            }
            else {
                cancelAnimationFrame(this.Running);
            }
            this.Running = 0;
        }
        FrameSetup(delta) {
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
        FrameUpdate(delta) {
            // User input.
            sys_control_pose(this);
            sys_control_player(this);
            sys_control_always(this);
            // Game logic.
            sys_animate(this, delta);
            sys_move(this, delta);
            // Physics and collisions.
            sys_physics_integrate(this, delta);
            sys_transform(this);
            sys_physics_kinematic(this, delta);
            sys_collide(this);
            sys_physics_resolve(this);
            sys_transform(this);
            sys_resize(this);
            sys_camera(this);
            sys_light(this);
            sys_render_forward(this);
            sys_ui(this);
        }
    }

    let seed = 1;
    function set_seed(new_seed) {
        seed = 198706 * new_seed;
    }
    function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }
    function float(min = 0, max = 1) {
        return rand() * (max - min) + min;
    }

    function camera_forward_perspective(fovy, near, far) {
        return (game, entity) => {
            game.World.Signature[entity] |= 2 /* Camera */;
            game.World.Camera[entity] = {
                Kind: 0 /* Forward */,
                Projection: {
                    Kind: 0 /* Perspective */,
                    FovY: fovy,
                    Near: near,
                    Far: far,
                    Projection: create(),
                    Inverse: create(),
                },
                View: create(),
                Pv: create(),
                Position: [0, 0, 0],
            };
        };
    }
    function camera_xr() {
        return (game, entity) => {
            game.World.Signature[entity] |= 2 /* Camera */;
            game.World.Camera[entity] = {
                Kind: 1 /* Xr */,
                Eyes: [],
            };
        };
    }

    function blueprint_camera(game) {
        return [
            children([transform(undefined, [0, 1, 0, 0]), camera_forward_perspective(1, 0.1, 1000)]),
        ];
    }

    function animate(clips) {
        return (game, entity) => {
            let States = {};
            for (let name in clips) {
                let { Keyframes, Flags = 7 /* Default */ } = clips[name];
                let duration = Keyframes[Keyframes.length - 1].Timestamp;
                States[name] = {
                    // One-level-deep copy of the clip's keyframes. When
                    // AnimationFlag.Alternate is set, sys_animate recalculates
                    // keyframes' timestamps after each alternation. We want to
                    // modify copies of the timestamps defined in the clip. It's OK
                    // to copy other keyframe properties by reference.
                    Keyframes: Keyframes.map((keyframe) => ({ ...keyframe })),
                    Flags,
                    Duration: duration,
                    Time: 0,
                };
            }
            game.World.Signature[entity] |= 1 /* Animate */;
            game.World.Animate[entity] = {
                States,
                Current: States["idle"],
            };
        };
    }

    let speed = 25;
    const kolos1_anims = {
        body: {
            idle: {
                Keyframes: [
                    {
                        Timestamp: speed * 0.0,
                        Rotation: from_euler([0, 0, 0, 1], 0, 5, 0),
                    },
                    {
                        Timestamp: speed * 0.5,
                        Rotation: from_euler([0, 0, 0, 1], 0, -5, 0),
                    },
                ],
            },
            walk: {
                Keyframes: [
                    {
                        Timestamp: speed * 0.0,
                        Rotation: from_euler([0, 0, 0, 1], 0, 5, 0),
                    },
                    {
                        Timestamp: speed * 0.2,
                        Rotation: from_euler([0, 0, 0, 1], 0, -5, 0),
                    },
                ],
            },
        },
        left_hand: {
            idle: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.5,
                        Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                    },
                ],
            },
            walk: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], 30, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.2,
                        Rotation: from_euler([0, 0, 0, 1], -60, 0, 0),
                    },
                ],
            },
        },
        right_hand: {
            idle: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.5,
                        Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                    },
                ],
            },
            walk: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], -60, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.2,
                        Rotation: from_euler([0, 0, 0, 1], 30, 0, 0),
                    },
                ],
            },
        },
        left_leg: {
            idle: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                    },
                    {
                        Timestamp: speed * 1,
                        Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                    },
                ],
            },
            walk: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], -45, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.2,
                        Rotation: from_euler([0, 0, 0, 1], 45, 0, 0),
                    },
                ],
            },
        },
        right_leg: {
            idle: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                    },
                    {
                        Timestamp: speed * 1,
                        Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                    },
                ],
            },
            walk: {
                Keyframes: [
                    {
                        Timestamp: speed * 0,
                        Rotation: from_euler([0, 0, 0, 1], 45, 0, 0),
                    },
                    {
                        Timestamp: speed * 0.2,
                        Rotation: from_euler([0, 0, 0, 1], -45, 0, 0),
                    },
                ],
            },
        },
    };

    function prop_left_hand(game) {
        return [
            transform(),
            render_instanced(game.MeshCube, Float32Array.from([
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -45.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -45.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -45.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -45.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -45.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -33.1, -43.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -43.55,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -43.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -35.1, -41.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -41.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -41.55, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -41.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -41.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -41.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -41.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -41.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -41.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -41.55,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -41.55, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -35.1, -41.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -41.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -41.55, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -41.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -47.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -41.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -41.55, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -39.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -33.1, -39.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -39.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -39.55, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -39.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -39.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -39.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -39.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -27.1, -39.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -39.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -39.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -39.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -33.1, -47.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -39.55,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -39.55, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -35.1, -37.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, -37.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -37.55, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -37.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -37.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -37.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -37.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -37.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -37.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -37.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -37.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, -37.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -47.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -37.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -37.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -35.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -35.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -35.55, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -35.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -33.1, -35.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -35.55,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -35.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, -35.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, -47.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -35.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -35.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -33.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1,
                -33.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -33.55, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -33.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, -33.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -33.55,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -33.55, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -29.1, -33.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -33.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -33.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -33.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -33.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1,
                -33.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -33.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -47.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -33.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -33.55,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -31.55, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -33.1, -31.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -31.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -31.55, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -31.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -31.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -31.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -31.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -31.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -31.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -31.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -31.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -47.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -31.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -31.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -29.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -29.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -29.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -29.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -31.1, -43.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -43.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, -5.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -11.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -27.1, -13.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                -11.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -13.55, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -5.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -27.1, 0.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                2.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -27.1, -5.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -31.1, -27.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -27.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -27.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -27.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -25.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -25.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -25.55, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -29.1, -25.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -25.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -25.55, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -25.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -25.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -25.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -25.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -25.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -25.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -25.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -27.1, -25.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -25.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -25.55, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -23.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -23.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -23.55, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -29.1, -23.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -23.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -23.55, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -23.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1,
                -23.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -23.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -23.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -23.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -23.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -31.1, -23.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -23.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, -6.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -21.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -33.1, -21.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -21.55, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -21.55, -0.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -35.1, -21.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -21.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -21.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -21.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -21.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -21.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -21.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, -21.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -21.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -21.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -27.1, 8.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -19.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -19.55, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -19.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -35.1, -19.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -19.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -19.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -33.1, -19.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -19.55, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 0.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -31.1, -19.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -19.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, 0.45, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, -17.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -17.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -17.55, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -35.1, -17.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -17.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -17.55, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -17.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                -17.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -17.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -17.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -17.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -17.55,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -17.55, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -29.1, -15.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, -15.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -15.55, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -15.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -15.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                -15.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -15.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -15.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -15.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -15.55,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -15.55, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, 6.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -13.55, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -13.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -13.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -13.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -13.55, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -13.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -49.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -45.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -13.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -13.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -45.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -31.1, -45.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                -13.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -13.55, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -13.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -45.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -45.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -45.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -13.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -13.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -45.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -45.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -45.55, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, 6.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -47.55, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -47.55, -4.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -31.1, -47.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, -51.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -57.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                4.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -49.55, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -59.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -31.1, -57.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -55.55,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -53.55, -6.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -49.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -59.55, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -57.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -31.1, -55.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -53.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -47.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -31.1, -49.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, -1.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -51.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -31.1, -51.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -49.55,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -51.55, -2.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -29.1, -47.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -49.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -53.55, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -11.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -33.1, -11.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                -3.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -11.55, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -51.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, -11.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -11.55,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -45.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -11.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -11.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, -11.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -47.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -11.55, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -11.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -11.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -49.55,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -11.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, -11.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -55.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -11.55, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -11.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -51.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -51.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -47.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -29.1, -57.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -53.55,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -51.55, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -45.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -59.55, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -57.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -29.1, -55.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -9.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -9.55, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -51.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -31.1, -9.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -9.55, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -53.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                -57.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -51.55, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, 2.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -59.55, -6.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -27.1, 0.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1,
                0.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -49.55, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -29.1, -47.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -7.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -7.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -45.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -7.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -7.55, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -43.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -29.1, -43.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -47.55, -8.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -45.55, -8.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -31.1, -55.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -53.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 0.45, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -43.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -43.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1,
                -5.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -27.1, -55.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -5.55,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -5.55, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -37.1, -5.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -53.55, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -5.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -5.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -51.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -37.1, -5.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -5.55, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -5.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, -55.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -5.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1,
                -5.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -35.1, -5.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -5.55,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -5.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 0.45, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, -5.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -5.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -5.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, -5.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -5.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -5.55, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -37.1, -5.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -27.1, -3.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -5.55, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, -5.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -5.55, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, -5.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -33.1, -5.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, -5.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -5.55, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -5.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -5.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -5.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 8.45, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, -3.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -3.55, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -3.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, -3.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                -3.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -3.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -39.1, -3.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -3.55,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -3.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -3.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -3.55, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -3.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -29.1, -3.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1,
                -3.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -3.55, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -3.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -29.1, -3.55, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -3.55, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -3.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -37.1, -3.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -3.55,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -33.1, -3.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -31.1, -3.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -3.55, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -33.1, -3.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, -3.55,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, -3.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -3.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -3.55, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -3.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -35.1, -3.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1,
                -3.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -3.55, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -39.1, -1.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -1.55,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -1.55, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -33.1, -1.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, -1.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -1.55, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -1.55, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -39.1, -1.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1,
                -1.55, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, -1.55, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1, -1.55, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -39.1, -1.55, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -1.55, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -1.55, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -39.1, -1.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1,
                -1.55, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1, -1.55, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -1.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -25.1, -1.55, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, -1.55, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, -1.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -39.1, -1.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1,
                -1.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, -1.55, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, -1.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -29.1, -1.55, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, -8.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -31.1, 0.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1,
                0.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 0.45, -6.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 0.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -33.1, 0.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 0.45, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1, 0.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -37.1, 0.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1, 0.45,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 0.45, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -39.1, 0.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, 0.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 0.45, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 0.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -25.1, 0.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 0.45, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -25.1, 0.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -37.1, 0.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 0.45,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 0.45, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, 0.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, 0.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 6.45, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 2.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -33.1, 2.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 2.45,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 2.45, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -39.1, 2.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, 2.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, 2.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -39.1, 2.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1,
                2.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 2.45, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 2.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -29.1, 2.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -1.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -27.1, 2.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 4.45,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 4.45, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, 4.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, 4.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, 4.45, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -39.1, 4.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1,
                4.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45, 9.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -35.1, 4.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, 4.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 4.45, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 4.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -27.1, 0.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 6.45,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 6.45, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, 6.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -29.1, 6.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 6.45, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 6.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, 6.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 6.45,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 6.45, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -33.1, 6.45, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, 6.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 6.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -39.1, 6.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 6.45, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 6.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -33.1, 6.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 6.45,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 6.45, 7.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -27.1, 2.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1,
                6.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 6.45, 9.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -29.1, 6.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, 6.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 6.45, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 6.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, 8.45, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -35.1, 8.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -33.1, 8.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -35.1, 8.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, 8.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 8.45, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -37.1, 8.45, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 8.45,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -29.1, 8.45, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -37.1, 8.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 8.45, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -29.1, 8.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 8.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, 8.45, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 8.45,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -35.1, 8.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1,
                8.45, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 8.45, 5.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, 8.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -29.1, 8.45, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -37.1, 8.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 8.45, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -31.1, 8.45, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -35.1, 8.45,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -35.1, 8.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -33.1, 8.45, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -31.1, 8.45, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -27.1, -5.55, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 2.45,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -27.1, 4.45, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, 6.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 6.45, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -37.1, 2.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -39.1, 4.45, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 4.45, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 8.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -39.1, 6.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 2.45,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, 4.45, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -37.1, 6.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -37.1, 2.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -39.1, 4.45, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -37.1, 4.45, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -27.1, -1.55, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -3.55,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -27.1, -5.55, -6.1, 1,
            ]), Float32Array.from([
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56,
            ])),
        ];
    }
    function prop_right_hand(game) {
        return [
            transform(),
            render_instanced(game.MeshCube, Float32Array.from([
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -27.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, -3.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9,
                -27.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -5.26, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -29.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 26.9, -5.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -31.26,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -31.26, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 26.9, -11.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -27.26, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -29.26, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -31.26, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 34.9, -25.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -25.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -27.26, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -27.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 30.9, -27.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -3.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 34.9, -29.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -29.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -29.26, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -29.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, -29.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9,
                -31.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -31.26, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -31.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 26.9, -31.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -29.26,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -13.26, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -11.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, -13.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -33.26, -10.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 34.9, -25.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -5.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 26.9, -5.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -27.26, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, -27.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -3.26,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 34.9, -29.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -29.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -29.26, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -31.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, -31.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -31.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -31.26, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, -33.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -25.26,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -27.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -27.26, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 0.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, 2.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 34.9, -29.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -29.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -29.26, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -31.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, -31.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -31.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -27.26, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, -33.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, -27.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, -5.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -5.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 32.9, -29.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -3.26,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -29.26, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, -31.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, -31.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -27.26, -16.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, -33.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9,
                -25.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, -3.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -27.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 32.9, -27.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -27.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -29.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, -27.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -29.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 30.9, -27.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -29.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -31.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 32.9, -31.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -31.26,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -29.26, -16.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, -33.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -25.26, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -25.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 32.9, -25.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -25.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -25.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 30.9, -25.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -25.26,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 30.9, -25.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -25.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, -25.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -27.26, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 34.9, -29.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -29.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -29.26, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -31.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 32.9, -31.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 8.74, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -23.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 32.9, -23.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -23.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -31.26, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -23.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 34.9, -23.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -23.26, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 8.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 34.9, -23.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -31.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -23.26, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -23.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 34.9, -23.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -23.26, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -23.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 30.9, -33.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                8.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -23.26, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -23.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 26.9, 8.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -33.26, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -29.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, -29.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -31.26,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -31.26, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -25.26, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -25.26, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -18.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 34.9, -21.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9,
                -21.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -37.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, -21.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -21.26,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -21.26, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -21.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -21.26, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -21.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 34.9, -21.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -23.26,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, -21.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, -21.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -27.26,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 8.74, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, 8.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -29.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -31.26, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 30.9, -35.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -16.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -23.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -25.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -23.26, -20.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -23.26, -26.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 30.9, -23.26, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                6.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -19.26, -0.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 32.9, -19.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -19.26, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -19.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 30.9, -21.26, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -19.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -19.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 32.9, -19.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -24.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -19.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, 0.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -21.26, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -19.26, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -19.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, -3.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, 0.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -18.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, -3.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -26.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -25.26, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, -25.26, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -25.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -35.26, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -35.26, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 34.9, -17.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -17.26,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -17.26, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -35.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -17.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -17.26, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -17.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 26.9, -5.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -33.26,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -17.26, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -17.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -17.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -17.26, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -31.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, -17.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -17.26,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -17.26, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -29.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -27.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 28.9, -15.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -25.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -15.26, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -15.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, -15.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -23.26,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -15.26, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -15.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -15.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -15.26, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, -15.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -15.26,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -15.26, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, -23.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -21.26, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -24.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 28.9, -21.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -29.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -23.26, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -27.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, -21.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -21.26, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 28.9, -31.26, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, -21.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -29.26, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -25.26, -28.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 28.9, -23.26, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -21.26, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -33.26, -20.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -31.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 32.9, -23.26, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -21.26,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -35.26, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 28.9, -33.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, -21.26, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -35.26, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -35.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 28.9, -35.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -37.26, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -21.26, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -21.26, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, -19.26, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -19.26,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -19.26, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -19.26, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -37.26, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -37.26, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, 6.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -23.26, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -13.26, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -13.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, -13.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -23.26,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -23.26, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 34.9, -13.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -13.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -23.26, -24.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -13.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, 6.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -5.26,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -13.26, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -13.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -13.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -13.26, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -13.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 26.9, 6.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -13.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 28.9, -13.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                6.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, 5.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, 4.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -3.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, -1.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -11.26, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -11.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 26.9, -3.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9,
                -11.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -11.26, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -11.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, 8.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -11.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 32.9, -11.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -11.26,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -11.26, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -11.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -11.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -11.26, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -11.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 30.9, -11.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -11.26,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -9.26, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 28.9, -9.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -9.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -9.26, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, 2.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 0.74, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 0.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, -7.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -7.26, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -7.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, -7.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 0.74,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, -5.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -5.26, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 38.9, -5.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, -5.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -5.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 34.9, -5.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -5.26,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                36.9, -5.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -5.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 38.9, -5.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                38.9, -5.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, 0.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, 13.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 36.9, -5.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9,
                -5.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -5.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                38.9, -5.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, -5.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -5.26, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 36.9, -5.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -3.26, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, -5.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, 4.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 34.9, -5.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -5.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 36.9, -5.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -5.26, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9,
                -5.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -5.26, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -5.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 32.9, -5.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -5.26, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 8.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, 2.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -3.26,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 34.9, -3.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -3.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -3.26, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -3.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, -3.26, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -3.26,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -3.26, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 38.9, -3.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, -3.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -3.26, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 32.9, -3.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -3.26,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, -3.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                -3.26, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -3.26, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, -3.26, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -3.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 38.9, -3.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -3.26, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -3.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, -3.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -3.26,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -3.26, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 28.9, -3.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9,
                -3.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -3.26, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, -3.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 38.9, -3.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -3.26, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -3.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 32.9, -3.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -3.26,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -5.26, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 38.9, -1.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                36.9, -1.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -1.26, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, -1.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, -1.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -1.26,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -1.26, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 38.9, -1.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                24.9, -1.26, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -1.26, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 24.9, -1.26, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 38.9, -1.26, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -1.26,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -1.26, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 38.9, -1.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9,
                -1.26, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 24.9, -1.26, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -1.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                24.9, -1.26, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, -1.26, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, -1.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 38.9, -1.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, -1.26,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, -1.26, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, -1.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, -1.26, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, 0.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 0.74, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 0.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 34.9, 0.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 0.74,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 0.74, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 24.9, 0.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9,
                0.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 24.9, 0.74, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 0.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                38.9, 0.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 0.74, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 0.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 36.9, 0.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 24.9, 0.74, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 0.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 24.9, 0.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 0.74, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 0.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 32.9, 0.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 0.74,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 0.74, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 26.9, 6.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9,
                2.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 2.74, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 2.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                28.9, 2.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 38.9, 2.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 38.9, 2.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 34.9, 2.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 2.74,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 2.74, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, 2.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -3.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, 4.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 4.74, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 4.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 28.9, 4.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 38.9, 4.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 38.9, 4.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9,
                4.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74, 9.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 34.9, 4.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, 4.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 4.74, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 4.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 26.9, 0.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 6.74, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 6.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, 6.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 6.74,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 28.9, 6.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9,
                6.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 6.74, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                32.9, 6.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 6.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 38.9, 6.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 6.74, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 38.9, 6.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 6.74, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 30.9, 6.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 6.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 28.9, 6.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 6.74, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 32.9, 6.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                6.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                30.9, 8.74, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, 8.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 32.9, 8.74, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 8.74,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9,
                8.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 8.74, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, 8.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 8.74, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 8.74, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 36.9, 8.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9, 8.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 28.9, 8.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, 8.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 8.74,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 34.9, 8.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 30.9,
                8.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 8.74, 5.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 36.9, 8.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                34.9, 8.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 28.9, 8.74, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 36.9, 8.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 30.9, 8.74, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 30.9, 8.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 34.9, 8.74,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 32.9, 8.74, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 30.9, 8.74, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9,
                -5.26, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 2.74, -6.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, 4.74, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, 4.74, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 36.9, 8.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 36.9, 6.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 2.74,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 4.74, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 36.9, 4.74, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9,
                8.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 6.74, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 38.9, 2.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                26.9, 4.74, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 6.74, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 2.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 38.9, 4.74, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 36.9, 4.74, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -1.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 26.9, -3.26, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 26.9, -5.26,
                -6.1, 1,
            ]), Float32Array.from([
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
            ])),
        ];
    }
    function prop_right_leg(game) {
        return [
            transform(),
            render_instanced(game.MeshCube, Float32Array.from([
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 16.9, -20.52, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -20.52, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -20.52, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -20.52, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -20.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -20.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -20.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 14.9, -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 14.9, -20.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -20.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -20.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -20.52, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 12.9, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -20.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.52,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -20.52, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -20.52, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.52, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, -18.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.52, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 8.9, -18.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -18.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.52, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -18.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 12.9, -18.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -18.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -18.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -18.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.52, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -18.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -18.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.52, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -18.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -18.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.52,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.52, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -18.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -18.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.52, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 8.9, -18.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.52, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -16.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 10.9, -16.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.52, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -16.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -16.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.52, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -16.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, -16.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -16.52, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -16.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                -16.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -16.52, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -16.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.52, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 10.9, -16.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.52,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.52, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -16.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.52, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.52,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.52, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -14.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -14.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -14.52, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -14.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -14.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -14.52, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -14.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -14.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.52,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -14.52, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -14.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -12.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.52, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -12.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 8.9, -12.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.52, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -10.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 10.9, -10.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -10.52,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.52, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -8.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -8.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -8.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -8.52,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -8.52, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -8.52, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, 1.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 6.9, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -8.52, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -8.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.52, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -6.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -6.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -4.52,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.52, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -6.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -6.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.52, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -6.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -6.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -6.52, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -6.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -6.52,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.52, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 10.9, -6.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -6.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.52, -4.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -2.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.52, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, -4.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                -4.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.52, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -4.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -4.52, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, -4.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -2.52, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -2.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 14.9, -2.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -2.52,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -2.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -2.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                -2.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -2.52, -0.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -2.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -2.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.52, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -2.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -2.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -2.52, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -2.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -2.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -0.52, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -0.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -0.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -0.52,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.48, -0.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 8.9, 1.48, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                1.48, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.48, 1.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.52, 11.9, 1,
            ]), Float32Array.from([
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56,
            ])),
        ];
    }
    function prop_left_leg(game) {
        return [
            transform(),
            render_instanced(game.MeshCube, Float32Array.from([
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, 11.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -17.1, -20.52, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -20.52, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -20.52, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, -20.52, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -20.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -13.1, -20.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -20.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -20.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -20.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -20.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -20.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -20.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -20.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -20.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.52,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -20.52, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, -20.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -20.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.52, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -20.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.52, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -20.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.52, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -18.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -18.52, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -11.1, -18.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -18.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -18.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -18.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -18.52, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -9.1, -18.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -18.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -18.52, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, -18.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -18.52,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, -18.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -18.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -18.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.52,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.52, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, -18.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, -18.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -16.52, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -11.1, -16.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -16.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -16.52, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -16.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -16.52, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -7.1, -16.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -16.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -16.52, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -16.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -16.52, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -16.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -16.52, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.52, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.52, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -16.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -16.52,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -16.52, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -14.52, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -14.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -14.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.52, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -14.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -14.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -14.52, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -14.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -7.1, -14.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -14.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -14.52, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.52, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -14.52, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.52, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -12.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -12.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -12.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.52, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -9.1, -10.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.52, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -10.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -8.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -8.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.52, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -8.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -8.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.52,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.52, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -8.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.52, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -8.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -8.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -8.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.52, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, -8.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -8.52, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -8.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -8.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -8.52, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -13.1, -6.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -4.52, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -6.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -6.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.52, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -9.1, -6.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.52, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -6.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, -6.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -6.52,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.52, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -11.1, -6.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -6.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -4.52, -4.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -2.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -15.1, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.52, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -4.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -4.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.52, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, -4.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -4.52, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -7.1, -4.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -4.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.52, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -4.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -2.52, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -2.52, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -2.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -2.52, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -2.52,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -2.52, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, -2.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -2.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -2.52, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -2.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, -2.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -2.52, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -2.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -2.52, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -2.52, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -2.52, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -0.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -9.1, -0.52, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -0.52, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -0.52, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 1.48, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.48,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.48, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 1.48, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -20.52, 11.9, 1,
            ]), Float32Array.from([
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56,
            ])),
        ];
    }
    function prop_body(game) {
        return [
            transform(),
            render_instanced(game.MeshCube, Float32Array.from([
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -26.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -26.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, -26.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -16.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -26.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -26.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79, 15.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -26.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.79, -4.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -26.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -26.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -26.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -26.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -24.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -24.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, -24.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -24.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.79, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -16.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -13.1, -24.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -24.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.79, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -24.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -24.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -24.79, -4.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -24.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -6.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -24.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -24.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -24.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -24.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -24.79, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -24.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -3.1, -24.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -24.79,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -24.79, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 0.9, -24.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 11.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -4.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -24.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 12.9, -24.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 13.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -21.1, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -24.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -24.79, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 20.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                13.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -24.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 10.9, -24.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -14.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 27.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 27.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -24.79, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -24.79, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, -24.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -24.79,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, -24.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -16.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -24.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -24.79, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -24.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -24.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -18.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -18.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -24.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -24.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -24.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -24.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -24.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -24.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -24.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -24.79, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -24.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -24.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                -24.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -24.79, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -24.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, -24.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -24.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -24.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -7.1, -24.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -24.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -22.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -22.79, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 2.9, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, -22.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -22.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -22.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -22.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -22.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, -22.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79, -8.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 2.9, -22.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                -22.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, -22.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -22.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                2.9, -22.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -22.79, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, -14.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -22.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -22.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -22.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, -22.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -22.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -22.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -22.79, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -3.1, -22.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -22.79,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -22.79, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -22.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -22.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 19.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -22.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -22.79, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 20.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                21.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21, -42.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 27.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -14.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -22.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -22.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, -42.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -22.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -22.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -22.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -22.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -22.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, -22.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -22.79, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -22.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -22.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -22.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -22.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -22.79, 11.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -22.79, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -22.79, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, -22.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -22.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -22.79, 13.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 4.9, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -22.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 0.9, -22.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -22.79, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -5.1, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -22.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -22.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 2.9, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, -22.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -22.79, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -22.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 14.9, -22.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -22.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -22.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -22.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -22.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, -26.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -26.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -26.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -20.79, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -20.79,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -20.79, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -20.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -20.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.79, -12.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -20.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -20.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -20.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -20.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -20.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 14.9, -14.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -20.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.79, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, -20.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 25.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -20.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 25.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -20.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -20.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 27.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 27.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 27.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, 3.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -38.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 33.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 29.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 14.9, -14.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.79, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -21.1, 29.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                29.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 21.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, 9.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -20.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, -20.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -20.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -20.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -20.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -20.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -20.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -20.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -20.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -20.79, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -20.79, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, -20.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -18.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -18.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, -18.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -18.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -18.79, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -18.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, -18.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -18.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.79, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -18.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                33.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 31.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -17.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9,
                35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -18.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -18.79, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, -18.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                -18.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -18.79, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 12.9, -4.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -17.1, -18.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9,
                -18.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -18.79, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -18.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, -18.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -18.79, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -8.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -6.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 16.9, -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -18.79, 17.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -7.1, -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 27.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -3.1, -18.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -18.79, 17.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, 19.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -18.79,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -18.79, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                2.9, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -18.79, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -18.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 13.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -10.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -6.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -6.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -16.79, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -16.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -16.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -16.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -16.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, -6.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -16.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -16.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -16.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -16.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -28.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -16.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -16.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -32.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -16.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, -26.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 18.9, 33.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -16.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, -16.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -16.79, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -16.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -16.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -16.79, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -16.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -16.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -10.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -10.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -16.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 16.9, -16.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -16.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -16.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, -16.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, -16.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -16.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -6.79, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -16.79, 17.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 6.9, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -16.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -16.79, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, -16.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -16.79, 19.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79, 19.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.79, 19.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 2.9, -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                -16.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -16.79, 19.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -10.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -10.79, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -4.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -10.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -10.79,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -12.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, -12.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -12.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -14.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -16.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -16.79, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -16.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -16.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -16.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -9.1, -18.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -18.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 13.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -14.79, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -14.79,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -14.79, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 2.9, -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, -14.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -14.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -14.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -14.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, -14.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, -14.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                -14.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -14.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -8.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, -6.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -14.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -14.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -13.1, -14.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -14.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -14.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -14.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -14.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -14.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -14.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, -30.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 33.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -14.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -14.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -14.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -14.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -14.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -14.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -14.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -14.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -14.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -14.79, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -14.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -14.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -14.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -14.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -14.79, 15.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -3.1, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -14.79, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 0.9, -14.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -14.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -14.79, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -5.1, -14.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -14.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, -18.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -18.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, -10.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -18.79, -10.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 10.9, -18.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.79, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -8.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -8.79, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -7.1, -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -12.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -3.1, -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -12.79, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -12.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -12.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -12.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -12.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, -12.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -12.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -12.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, -12.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -12.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -12.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -12.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -12.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 27.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -12.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79, -8.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, -6.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, -12.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -12.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, -12.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -12.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, -12.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, -2.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -12.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -12.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -12.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -12.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -12.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -12.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -12.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -12.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -12.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -12.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -12.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 8.9, -12.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -12.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 12.9, -12.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 27.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -12.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, 9.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -12.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -12.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -12.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 25.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 25.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -12.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, 13.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -12.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -12.79, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -12.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1,
                -12.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -12.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -12.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 27.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -12.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -12.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -12.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -12.79, 17.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 4.9, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -12.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 0.9, -12.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -10.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -10.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -1.1, -10.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, -10.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -10.79, -8.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -10.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -10.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -10.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -10.79, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -10.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -10.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 29.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 29.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 33.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, -10.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, -10.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -10.79, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -10.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -10.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -10.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -10.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -6.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 11.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -10.79, 13.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 16.9, -10.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -10.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -10.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, -10.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -10.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, -10.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -10.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 17.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, -10.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -10.79, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -10.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, -10.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -10.79,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -10.79, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 19.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -10.79,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -10.79, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -10.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -10.79, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -8.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -8.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 12.9, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -6.79,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, -8.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -8.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -10.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -3.1, -8.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -8.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -8.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, -8.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -8.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.79, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -8.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -8.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -8.79, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -8.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -15.1, -8.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.79, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -10.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, -10.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -17.1, -8.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9,
                -8.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -8.79, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -17.1, -8.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, -8.79, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -4.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -6.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, -8.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 16.9, -8.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -8.79, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -8.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -3.1, -8.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -8.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -8.79, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 0.9, -8.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -8.79, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -8.79,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -8.79, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -8.79, 19.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -8.79, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -8.79, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -4.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -8.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -8.79, -10.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -8.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -10.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -10.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -6.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -6.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -6.79, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -6.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -6.79, -12.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, -6.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -6.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -6.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -6.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -6.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 14.9, -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -6.79,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -6.79, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -6.79, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, -6.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -6.79, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, -6.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -6.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, -6.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -6.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -6.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 7.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 25.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -6.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 11.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 8.9, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -6.79, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -6.79, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, -6.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -6.79,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -6.79, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -6.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -6.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -6.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -6.79, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -13.1, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79, 17.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -6.79, 17.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 6.9, -6.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 25.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 25.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 25.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 25.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -4.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -4.79, -12.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -4.79, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -4.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, -10.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -4.79, -10.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, -4.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -4.79,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -4.79, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, -4.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -4.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -4.79,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -4.79, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -10.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -4.79, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -4.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -4.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -4.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -4.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, -4.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -4.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                -4.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 6.9, -4.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -4.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 10.9, -4.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                -4.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 3.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -7.1, -4.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 27.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 27.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -11.1, -10.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -10.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 11.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 4.9, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -4.79, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 0.9, -4.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 25.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -4.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -4.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -4.79, 15.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -4.79, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, -4.79, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -4.79,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -4.79, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -4.79, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 27.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -4.79, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, -4.79, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -4.79,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -4.79, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -16.79, -14.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -5.1, -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -16.79, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -16.79, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 4.9, -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -2.79, -6.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 0.9, -2.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -2.79, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, -2.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -2.79, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                -2.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, 1.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -7.1, -2.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -2.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -14.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, -2.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -2.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -2.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -2.79,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -2.79, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -7.1, -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -2.79, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -2.79, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, -2.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, -4.79, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -8.79, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -8.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, -6.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -6.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -4.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -0.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -0.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -0.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -0.79,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -0.79, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, -0.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -0.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -0.79, -4.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -0.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 13.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 13.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -7.1, -0.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, -0.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -0.79, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -7.1, -0.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -0.79, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, -0.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 31.21, -42.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 31.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -0.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -0.79, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -0.79, 11.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -0.79, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -0.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -4.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -4.79, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 10.9, -10.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -38.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -36.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -36.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -36.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -36.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -34.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 5.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -34.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -34.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -32.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21,
                -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -32.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, -32.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -32.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -30.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21,
                -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 7.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -30.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -30.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -30.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -30.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -28.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -28.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, -28.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, -28.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, -28.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -26.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -26.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 9.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -30.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -26.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -24.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, -24.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, -24.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21,
                -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -30.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 13.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 13.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -22.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -5.1, 1.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -22.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                1.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -22.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, 1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -20.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, -20.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 5.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -32.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 5.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -36.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -18.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, -18.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -18.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -16.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -16.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -14.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, -14.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, -14.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -12.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, -12.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -12.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -10.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, -10.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -10.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -11.1, -10.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 18.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, -6.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                2.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -21.1, 13.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, -28.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, -28.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 20.9, 15.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                3.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -30.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 1.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 18.9, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -10.79, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, -10.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 1.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -0.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 18.9, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 1.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -7.1, 1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 3.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 18.9, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 3.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -7.1, 1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 5.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -11.1, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 5.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 7.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -11.1, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 7.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 31.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 31.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -19.1, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 9.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 12.9, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 1.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 11.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -1.1, 1.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                1.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 13.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 13.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 13.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -34.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -17.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, 15.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -7.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 1.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 17.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -3.1, 1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                1.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -28.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 19.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1,
                1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 19.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 16.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -36.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 19.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, 19.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -21.1, 9.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -28.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 0.9, 1.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 3.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -1.1, 1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                1.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 23.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 1.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 23.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -1.1, 1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                1.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 1.21, 25.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 5.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 1.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 1.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 25.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, 25.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -21.1, 7.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -28.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 18.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 1.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 1.21, 27.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 0.9, 1.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, 29.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -17.1, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 1.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 1.21, 29.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -3.1, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                2.9, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 1.21, 29.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 1.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -19.1, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 3.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 16.9, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 3.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 3.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 3.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 3.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -34.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 3.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 3.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 3.21,
                -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -30.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 3.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 3.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 3.21, -28.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 3.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, -24.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -22.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 3.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, -22.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 3.21, -20.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, 3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 3.21, -20.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 3.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 3.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 3.21, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -3.1, 3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                2.9, 3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 3.21, -8.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -9.1, 3.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 3.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 3.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 3.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -9.1, 3.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                3.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 3.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -23.1, 3.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, 3.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -32.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 3.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 8.9, 3.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                3.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 7.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, 3.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 29.21, -42.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 29.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 3.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, 3.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21,
                -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -32.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 3.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 3.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -23.1, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 3.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -5.1, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 3.21, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 3.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 3.21, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 3.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 3.21, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 3.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -23.1, 3.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                3.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, 17.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 3.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 3.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 3.21, 17.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 3.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 3.21, 19.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 3.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 3.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 3.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 3.21, 21.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 3.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 3.21, 21.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 3.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 3.21, 23.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 3.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 3.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 3.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 3.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 3.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 3.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, 27.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 3.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 3.21, 29.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 4.9, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 3.21, 29.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, 3.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 3.21, 29.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 18.9, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 5.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 10.9, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 5.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -5.1, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 5.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 5.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 2.9, 5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                5.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 5.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 8.9, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 5.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 5.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 5.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 5.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, -12.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 5.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 5.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 5.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 5.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 5.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 5.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 5.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 5.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 5.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 5.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 5.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 5.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 5.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 5.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 5.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 5.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 5.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 5.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 5.21, 29.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -5.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 5.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 5.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 2.9, 5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                5.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 5.21, 29.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -19.1, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 7.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 7.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 7.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 7.21, -38.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 7.21, -38.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 7.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 7.21, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 7.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 7.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 7.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 7.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 7.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 3.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -34.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 7.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                7.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 3.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 7.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 7.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -30.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -21.1, 7.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 7.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 7.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 7.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 7.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 7.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 7.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 7.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 7.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 7.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 7.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 7.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 7.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 7.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 7.21, 29.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -5.1, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 7.21, 29.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -1.1, 7.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 7.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 9.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 9.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 9.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 9.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 9.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 9.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, 9.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 9.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 9.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 9.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 9.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 9.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 9.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 9.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 9.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 1.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 3.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 3.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                5.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -26.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 9.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -21.1, 7.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -26.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 9.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -26.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                9.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -40.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -23.1, 9.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 11.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 9.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 9.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 9.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 9.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 9.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 9.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 9.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 9.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 9.21, 27.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 9.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 9.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 9.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 9.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 18.9, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -17.1, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 9.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 9.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 9.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 9.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 9.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 9.21, 29.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 3.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 3.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -14.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 11.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 11.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 11.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 11.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 11.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 11.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 11.21, -38.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 11.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 11.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 6.9, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 11.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 11.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 11.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 11.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 11.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 11.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, -16.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 11.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                11.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 11.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 11.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 11.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 11.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 11.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 13.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 11.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                1.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 11.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 11.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 11.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 11.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 11.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 11.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 11.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 11.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 11.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 11.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 11.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                11.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 11.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 18.9, 11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 11.21, 29.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, 5.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 5.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 11.21, 29.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 3.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 1.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 11.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 11.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                11.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 13.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -17.1, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 13.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 13.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, 13.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 15.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 13.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 12.9, 13.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 13.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 13.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 13.21, -36.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -3.1, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 13.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 13.21, -36.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, 13.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 13.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 13.21, -26.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 13.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                13.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 13.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 13.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 15.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, -0.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 13.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 13.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 9.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                9.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 13.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 13.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 13.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 13.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 13.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 13.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 13.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 13.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 13.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 13.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 13.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 13.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 13.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 13.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 13.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 4.9, 13.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 3.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -10.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 1.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 15.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 15.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 15.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                15.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 15.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 15.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, 15.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 15.21, -38.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 15.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 15.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 15.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 15.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                15.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 15.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 15.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 7.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 5.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 15.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 15.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 15.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 15.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 15.21, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                1.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 3.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 15.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                3.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -16.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 15.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 5.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 5.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 19.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 15.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 7.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 15.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 15.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 15.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 15.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 15.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 15.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 15.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 3.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 3.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 15.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 15.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 15.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 15.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 15.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 15.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 15.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 17.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, 27.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 17.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 17.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 17.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 17.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 17.21, -44.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 17.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 17.21, -42.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 17.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 17.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 17.21, -42.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 17.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 17.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 17.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -5.1, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 17.21, -40.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 2.9, 17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                17.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 17.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 17.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 17.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 17.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, 17.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 17.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 17.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -36.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 17.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1,
                1.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -22.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 17.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -30.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 3.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                3.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -28.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 17.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 3.21, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 17.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -24.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 17.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1,
                1.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -20.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 17.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -18.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                3.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 17.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 17.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 17.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 17.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 17.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 17.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 17.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 7.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -23.1, 17.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                17.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -23.1, 17.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 17.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 17.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 17.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 17.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 17.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 17.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 17.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 17.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 17.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -19.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 17.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 1.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 1.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 17.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 17.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 17.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 17.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 17.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 19.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 19.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 19.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                19.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 19.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 19.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 19.21, -42.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 19.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 19.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                19.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 19.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 19.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 19.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -32.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 19.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -30.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 19.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                19.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 19.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 19.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 19.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                19.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 3.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 3.21, -24.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 19.21, -12.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 20.9, 19.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                19.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 22.9, 19.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -23.1, 19.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                19.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 19.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 19.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                19.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 22.9, 19.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 7.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 19.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 19.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 19.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 19.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 19.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 19.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 19.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 19.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 19.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 19.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 3.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 3.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 19.21, 29.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 19.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 19.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 19.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 19.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 19.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 21.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 21.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 21.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 21.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -7.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 21.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 4.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 21.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 0.9, 21.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 21.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 21.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 21.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -38.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 21.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                21.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 21.21, -34.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 21.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21,
                -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -30.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 21.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -24.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 25.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                21.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21, -22.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 21.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 21.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 21.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 21.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 21.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 21.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 21.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 21.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 21.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 21.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 21.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 21.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 21.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 21.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 21.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 21.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 21.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 7.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -17.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 21.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 21.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 21.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 21.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 4.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 21.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 0.9, 21.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 18.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 23.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 13.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 13.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 23.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 23.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 23.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 23.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, 23.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 23.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 23.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 14.9, 23.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 23.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 23.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                23.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 23.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 23.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -30.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 23.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                23.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -22.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 21.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 21.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 23.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 21.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 21.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                23.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 11.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 1.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 1.21, -24.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 23.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -21.1, 13.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -4.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 25.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 23.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 23.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 23.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 5.21, -20.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 5.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 23.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 21.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 21.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 7.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -20.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 23.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -16.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 9.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -20.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 23.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 11.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 13.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 23.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 23.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 23.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 23.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 33.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 23.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 23.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 23.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 23.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 33.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 23.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 23.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 23.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 2.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 23.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 23.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 25.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 27.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 25.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 25.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -3.1, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 25.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 25.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, 25.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 25.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 25.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 25.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                25.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 25.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 25.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21, -30.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 25.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 25.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                25.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 25.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 23.21, -28.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 23.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 25.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 25.21, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 25.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                25.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 25.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 25.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 25.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 25.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 25.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -23.1, 25.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                25.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 25.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 25.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 25.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 25.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 25.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 25.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 25.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 25.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 25.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 25.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 4.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 25.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 0.9, 25.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 27.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -17.1, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9,
                27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 27.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 27.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 27.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 27.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 27.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 27.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 27.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 27.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 27.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                27.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 27.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 27.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -32.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 27.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                27.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 27.21, -28.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 27.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 27.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -24.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 27.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                27.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 27.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -8.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 27.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                27.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 27.21, -4.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 22.9, 27.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 27.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 3.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 27.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 27.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -23.1, 27.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                27.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 13.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -23.1, 27.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 15.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 27.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                27.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 19.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 22.9, 27.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 27.21, 23.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 27.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 27.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 27.21, 27.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 27.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 27.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 27.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 27.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 27.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 27.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 27.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 27.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 27.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 27.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 1.21, -20.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 1.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 1.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -13.1, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 7.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 3.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 3.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 29.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 16.9, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 29.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 29.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -5.1, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 29.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -1.1, 29.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 29.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -40.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 22.9, 29.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                29.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 29.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 29.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 3.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 3.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 29.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                29.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -28.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 29.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 29.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 29.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 29.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1,
                29.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -18.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 29.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 29.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 29.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 29.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 29.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 29.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 29.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 29.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 29.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 29.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 29.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 29.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 29.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 29.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 29.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 29.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 29.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 29.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 29.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 29.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 29.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 29.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 29.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 29.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 29.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 29.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 29.21, 29.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 29.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 31.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 31.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 31.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 31.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 31.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 31.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -23.1, 31.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                31.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 31.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21,
                -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 31.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -34.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 22.9, 31.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                31.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -32.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 31.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 31.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, -28.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 31.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, -26.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 31.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                31.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, -34.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 31.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -34.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 31.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                31.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -18.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 33.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -16.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 31.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, -32.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 31.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                31.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 31.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 18.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 31.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -2.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 16.9, 1.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                31.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -0.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 22.9, 31.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 27.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 22.9, 31.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -23.1, 31.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9,
                31.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -23.1, 31.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 31.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                22.9, 31.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -23.1, 31.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 31.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 31.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 22.9, 31.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 31.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 31.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 31.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 31.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 31.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 31.21,
                27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, -30.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 31.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 31.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 31.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 31.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 31.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 31.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 22.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 31.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 31.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 15.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -30.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 10.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 31.21,
                29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 31.21, 29.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 31.21, 29.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 31.21, 29.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 33.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 33.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 33.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 33.21, -44.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 33.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -15.1, 33.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9,
                33.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 33.21, -28.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 33.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, 33.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 33.21,
                -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 33.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -22.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 33.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -18.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 33.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -5.1, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 33.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 33.21, -16.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 2.9, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 33.21, -16.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 33.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, 33.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 33.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 33.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 33.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 33.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, 33.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 33.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 33.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 33.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 33.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 33.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -17.1, 33.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 33.21,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 33.21, 5.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 33.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 33.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 33.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 33.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 33.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 33.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 33.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 33.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 33.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 33.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 33.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, 33.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 33.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 33.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 18.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -44.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -44.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21,
                -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -44.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -44.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 35.21, -44.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21,
                -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -42.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -42.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -42.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -42.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -42.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -42.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -42.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -40.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -40.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -40.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 8.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -40.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, 35.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21,
                -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -17.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -38.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 14.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -38.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -38.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -3.1, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21,
                -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -38.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -36.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -5.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -36.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -1.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -34.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -34.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -3.1, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -32.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -32.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -32.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -5.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -32.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -1.1, 35.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -32.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 12.9, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -30.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 8.9, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -30.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -5.1, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -30.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -1.1, 35.21, -30.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -30.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 14.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1,
                35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                6.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -28.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -3.1, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21,
                -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -28.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -28.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -26.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1,
                35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -26.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -26.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -26.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -24.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -24.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -24.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -24.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -24.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -22.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -22.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -22.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -22.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -22.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -20.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -20.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -20.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -20.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -20.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -18.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -18.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -18.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -19.1, 35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -16.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -16.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -16.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 27.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -7.1, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, 27.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 33.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 18.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1,
                35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21,
                -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -14.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -14.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -3.1, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 33.21, 27.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -12.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -12.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -19.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9,
                35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, -10.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -15.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 0.9, 35.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -10.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                4.9, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -10.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -1.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -8.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -17.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -8.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 14.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 33.21, 27.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 33.21, 27.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -8.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 0.9, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -6.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -17.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21,
                -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -6.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -6.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, -4.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, -4.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, -4.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -15.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21,
                -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -2.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -2.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 35.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, -2.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 33.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 33.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                14.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, -0.1, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, -0.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 4.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -1.1, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, 1.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -9.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 1.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -19.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 33.21, -36.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 18.9, 33.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -9.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 3.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, -20.79, -12.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 0.9, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1,
                35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 14.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -20.79, -12.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 5.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 2.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 5.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -19.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 7.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -7.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 4.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1,
                35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, 7.9, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                0.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -17.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1,
                35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, -5.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 9.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -13.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21,
                11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 11.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9,
                35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, 11.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -3.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, 11.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 0.9, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                16.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -11.1, 33.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                10.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -7.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21,
                13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                33.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 13.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 13.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 18.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 15.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21,
                15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 15.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 15.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 15.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 17.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 17.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -15.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -9.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 6.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21,
                19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 19.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -19.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 21.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 16.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                18.9, 35.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 21.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -9.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 35.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 21.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 21.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -19.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -17.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 35.21, 23.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21,
                23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, 35.21, 23.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -19.1, 35.21, 25.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 18.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -17.1, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 16.9, 35.21, 25.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, 35.21, 25.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, 35.21, 25.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 35.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 35.21, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -10.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 35.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21,
                -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -10.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 33.21, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -12.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 33.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                33.21, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 33.21, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -4.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 20.9, 35.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                33.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -14.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 20.9, 33.21, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21,
                -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -16.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 33.21, -16.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 33.21, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21,
                -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -18.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 33.21, -18.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -18.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, 20.9, 35.21, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 1.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                35.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -20.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, -20.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 35.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 3.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 33.21, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                35.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -22.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 33.21, -22.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 33.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                33.21, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, -24.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 33.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21,
                -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 33.21, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 35.21, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21,
                9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 9.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                35.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 11.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 35.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 13.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 33.21, 13.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1,
                35.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 15.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 33.21, 15.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 17.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -21.1, 33.21, 17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21,
                17.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 19.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 20.9, 35.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -21.1, 33.21, 19.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 19.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 35.21, 21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 33.21,
                21.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 33.21, 21.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -21.1, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                20.9, 35.21, 23.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -15.1, 35.21, 25.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, -9.1, 33.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, 33.21,
                25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, 35.21, 25.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 10.9, 35.21, 25.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -15.1, -22.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 14.9, -22.79, -12.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -23.1, 25.21, -14.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 22.9, 25.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1,
                1.21, -14.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, 1.21, -14.1, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 9.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -32.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -21.1, 13.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                13.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, -32.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -32.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -11.1, -26.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79,
                -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, -12.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, -12.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -26.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, -10.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, -10.1, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, 8.9, -26.79, -10.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -16.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -16.79, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -26.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 12.9, -26.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79,
                -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, -8.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                8.9, -26.79, -8.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.79, -0.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -13.1, -26.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9,
                -26.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79, -6.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -26.79, -6.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, -6.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -16.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -16.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -26.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -26.79, -4.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 10.9, -26.79, -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79,
                -4.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, -4.1, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -13.1, -16.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                12.9, -16.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -26.79, -2.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, -2.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, -2.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 7.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -34.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -18.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 12.9, -18.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -26.79, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, 6.9, -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -26.79, -0.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, -3.1, -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9,
                -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -26.79, -0.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -26.79, -0.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 7.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 7.21, -36.1,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 20.9, 7.21, -38.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1,
                -18.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 12.9, -18.79, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -13.1, -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 12.9, -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, 1.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -5.1, -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -26.79,
                1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -26.79, 1.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, 2.9, -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1,
                -26.79, 1.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -26.79, 1.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 20.9, 7.21, -40.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, -34.1, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 9.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, 3.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -7.1, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, 3.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 4.9, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -26.79,
                3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -1.1, -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9,
                -26.79, 3.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 11.21, -34.1, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 11.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -21.1, 13.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9, 13.21,
                -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 15.21, -34.1, 1, 0, 0, -2, 0,
                0, 2, 0, 0, 2, 0, 0, 0, 20.9, 15.21, -34.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -11.1, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 8.9, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79,
                5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -5.1, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9,
                -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -26.79, 5.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 2.9, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -1.1, -26.79, 5.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -26.79, 5.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -21.1, 9.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 20.9, 9.21, -36.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, 7.9, 1, 0, 0, -2, 0, 0,
                2, 0, 0, 2, 0, 0, 0, -9.1, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9,
                -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, 7.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, 6.9, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0,
                -5.1, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -26.79, 7.9, 1, 0,
                0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2,
                0, 0, 0, 2.9, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -26.79,
                7.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -26.79, 7.9, 1, 0, 0, -2, 0, 0, 2,
                0, 0, 2, 0, 0, 0, -21.1, 25.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 20.9,
                25.21, -24.1, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -11.1, -26.79, 9.9, 1, 0, 0,
                -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0,
                0, 0, -9.1, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 8.9, -26.79, 9.9,
                1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -7.1, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0,
                0, 2, 0, 0, 0, 6.9, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -5.1,
                -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 4.9, -26.79, 9.9, 1, 0, 0, -2,
                0, 0, 2, 0, 0, 2, 0, 0, 0, -3.1, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0,
                0, 2.9, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, -1.1, -26.79, 9.9, 1,
                0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0.9, -26.79, 9.9, 1, 0, 0, -2, 0, 0, 2, 0, 0,
                2, 0, 0, 0, -11.1, -26.79, 11.9, 1, 0, 0, -2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 10.9,
                -26.79, 11.9, 1,
            ]), Float32Array.from([
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53,
                0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
                0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55,
                0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56, 0.53, 0.55, 0.56,
            ])),
        ];
    }
    function blue_mech(game) {
        return [
            children([
                transform([0, 65.26, 0], undefined, undefined),
                children(prop_left_hand(game)),
                animate(kolos1_anims.left_hand),
            ], [
                transform([0, 64.69, 0], undefined, undefined),
                children(prop_right_hand(game)),
                animate(kolos1_anims.right_hand),
            ], [
                transform([0, 21.63, 0], undefined, undefined),
                children(prop_right_leg(game)),
                animate(kolos1_anims.right_leg),
            ], [
                transform([0, 21.49, 0], undefined, undefined),
                children(prop_left_leg(game)),
                animate(kolos1_anims.left_leg),
            ], [
                transform([0, 51.75, 0], undefined, undefined),
                children(prop_body(game)),
                animate(kolos1_anims.body),
            ]),
        ];
    }

    /**
     * @module components/com_collide
     */
    /**
     * Add the Collide component.
     *
     * @param dynamic Dynamic colliders collider with all colliders. Static
     * colliders collide only with dynamic colliders.
     * @param layers Bit field with layers this collider is on.
     * @param mask Bit mask with layers visible to this collider.
     * @param size Size of the collider relative to the entity's transform.
     */
    function collide(dynamic, layers, mask, size = [1, 1, 1]) {
        return (game, entity) => {
            game.World.Signature[entity] |= 8 /* Collide */;
            game.World.Collide[entity] = {
                EntityId: entity,
                New: true,
                Dynamic: dynamic,
                Layers: layers,
                Mask: mask,
                Size: size,
                Min: [0, 0, 0],
                Max: [0, 0, 0],
                Center: [0, 0, 0],
                Half: [0, 0, 0],
                Collisions: [],
            };
        };
    }

    function control_player(kind) {
        return (game, entity) => {
            game.World.Signature[entity] |= 16 /* ControlPlayer */;
            game.World.ControlPlayer[entity] = {
                Kind: kind,
            };
        };
    }

    function control_xr(kind) {
        return (game, entity) => {
            game.World.Signature[entity] |= 64 /* ControlXr */;
            game.World.ControlXr[entity] = {
                Kind: kind,
                Pose: null,
                Squeezed: false,
            };
        };
    }

    /**
     * @module components/com_move
     */
    /**
     * The Move mixin.
     *
     * @param move_speed - Movement speed in units per second.
     * @param rotation_speed - Rotation speed, in radians per second.
     */
    function move(move_speed, rotation_speed) {
        return (game, entity) => {
            game.World.Signature[entity] |= 256 /* Move */;
            game.World.Move[entity] = {
                MoveSpeed: move_speed,
                RotationSpeed: rotation_speed,
                Direction: [0, 0, 0],
                LocalRotation: [0, 0, 0, 1],
                SelfRotation: [0, 0, 0, 1],
            };
        };
    }

    /**
     * @module components/com_rigid_body
     */
    function rigid_body(kind, bounciness = 0.5) {
        return (game, entity) => {
            game.World.Signature[entity] |= 1024 /* RigidBody */;
            game.World.RigidBody[entity] = {
                Kind: kind,
                Bounciness: bounciness,
                Acceleration: [0, 0, 0],
                VelocityIntegrated: [0, 0, 0],
                VelocityResolved: [0, 0, 0],
                LastPosition: [0, 0, 0],
                IsAirborne: false,
            };
        };
    }

    function blueprint_viewer(game) {
        return [
            control_player(0 /* Motion */),
            collide(true, 1 /* Player */, 2 /* Ground */, [0.1, 0.5, 0.1]),
            rigid_body(1 /* Dynamic */, 0.1),
            move(2, 1),
            children(
            // An intermediate entity for walk bobbing.
            [
                transform(undefined, [0, 1, 0, 0]),
                children([
                    // Headset.
                    transform(),
                    camera_xr(),
                ], [
                    // Head (must be Children[1]).
                    transform(),
                    control_xr(0 /* Head */),
                ], [
                    // Left hand (must be Children[2]).
                    transform(),
                    control_xr(1 /* Left */),
                    collide(true, 0 /* None */, 8 /* Climbable */, [0.1, 0.1, 0.1]),
                    children([
                        // The hand mesh; must be Children[0].
                        transform(undefined, undefined, [-1, 1, 1]),
                        render_colored_shaded(game.MaterialColoredGouraud, game.MeshHand, [1, 1, 0.3, 1], 0, [1, 1, 1, 1], GL_CCW),
                    ]),
                ], [
                    // Right hand (must be Children[3]).
                    transform(),
                    control_xr(2 /* Right */),
                    collide(true, 0 /* None */, 8 /* Climbable */, [0.1, 0.1, 0.1]),
                    children([
                        // The hand mesh; must be Children[0].
                        transform(),
                        render_colored_shaded(game.MaterialColoredGouraud, game.MeshHand, [1, 1, 0.3, 1], 0, [1, 1, 1, 1], GL_CW),
                    ]),
                ]),
            ]),
        ];
    }

    function control_always(direction, rotation, animation) {
        return (game, entity) => {
            game.World.Signature[entity] |= 32 /* ControlAlways */;
            game.World.ControlAlways[entity] = {
                Direction: direction,
                Rotation: rotation,
                AnimationClip: animation,
            };
        };
    }

    /**
     * @module components/com_light
     */
    function light_directional(color = [1, 1, 1], range = 1) {
        return (game, entity) => {
            game.World.Signature[entity] |= 128 /* Light */;
            game.World.Light[entity] = {
                Kind: 1 /* Directional */,
                Color: color,
                Intensity: range ** 2,
            };
        };
    }

    function scene_stage(game) {
        set_seed(Date.now());
        game.World = new World();
        game.Cameras = [];
        game.ViewportResized = true;
        game.Gl.clearColor(game.ClearColor[0], game.ClearColor[1], game.ClearColor[2], 1);
        // Camera.
        instantiate(game, [...blueprint_camera(), transform([0, 100, 70], [0, 1, 0, 0])]);
        // VR Camera.
        instantiate(game, [...blueprint_viewer(game), transform([0, 100, 70], [0, 1, 0, 0])]);
        instantiate(game, [
            transform([0, 90, 70], [0, 0, 0, 1], [10, 0, 10]),
            collide(false, 2 /* Ground */, 0 /* None */),
            rigid_body(0 /* Static */),
            render_colored_shaded(game.MaterialColoredGouraud, game.MeshCube, [
                float(0, 1),
                float(0, 1),
                float(0, 1),
                1,
            ]),
        ]);
        // Light.
        instantiate(game, [transform([2, 4, 3]), light_directional([1, 1, 1], 1)]);
        let rubble_count = 20000;
        let ground_x = 10;
        let ground_z = 10;
        let ground_size = 50;
        instantiate(game, [
            transform(undefined, undefined, [ground_x * ground_size, 3, ground_z * ground_size]),
            collide(false, 4 /* Solid */ | 2 /* Ground */, 0 /* None */),
            rigid_body(0 /* Static */),
        ]);
        let element_count = rubble_count + ground_x * ground_z;
        let matrices = new Float32Array(element_count * 16);
        let colors = new Float32Array(element_count * 3);
        let off = 0;
        for (let x = 0; x < ground_x; x++) {
            for (let z = 0; z < ground_z; z++) {
                let tx = (x - ground_x / 2 + 0.5) * ground_size;
                let ty = (z - ground_z / 2 + 0.5) * ground_size;
                let view = new Float32Array(matrices.buffer, off * 4 * 16, 16);
                off++;
                from_rotation_translation_scale(view, [0, 0, 0, 1], [tx, -1, ty], [ground_size, 1, ground_size]);
                let color = new Float32Array(colors.buffer, off * 4 * 3, 3);
                color[0] = float(0, 1);
                color[1] = float(0, 1);
                color[2] = float(0, 1);
            }
        }
        // Rubble on the ground.
        // for (let i = ground_x * ground_z; i < element_count; i++) {
        //     let view = new Float32Array(matrices.buffer, i * 4 * 16, 16);
        //     from_rotation_translation_scale(
        //         view,
        //         from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90)),
        //         [
        //             float((-ground_size * ground_x) / 2, (ground_size * ground_x) / 2),
        //             0,
        //             float((-ground_size * ground_z) / 2, (ground_size * ground_z) / 2),
        //         ],
        //         [float(0.1, 0.5), float(0.5, 5), float(0.1, 0.5)]
        //     );
        //     let color = new Float32Array(colors.buffer, i * 4 * 3, 3);
        //     color[0] = float(0, 1);
        //     color[1] = float(0, 1);
        //     color[2] = float(0, 1);
        // }
        instantiate(game, [transform([0, 1, 0]), render_instanced(game.MeshCube, matrices, colors)]);
        // // Floating boxes.
        // for (let i = 0; i < floating_count; i++) {
        //     let s = float(5, 10);
        //     instantiate(game, [
        //         transform(
        //             [
        //                 float((-ground_size * ground_x) / 2, (ground_size * ground_x) / 2),
        //                 float(3, 25),
        //                 float((-ground_size * ground_z) / 2, (ground_size * ground_z) / 2),
        //             ],
        //             from_euler([0, 0, 0, 1], float(-90, 90), float(-90, 90), float(-90, 90)),
        //             [s, s, s]
        //         ),
        //         render_colored_shaded(game.MaterialColoredGouraud, game.MeshCube, [
        //             float(0, 1),
        //             float(0, 1),
        //             float(0, 1),
        //             1,
        //         ]),
        //         collide(false, Layer.Solid | Layer.Climbable, Layer.None),
        //         rigid_body(RigidKind.Static),
        //     ]);
        // }
        instantiate(game, [
            transform([0, -2, -20], from_euler([0, 0, 0, 1], 0, 180, 0)),
            ...blue_mech(game),
        ]);
        instantiate(game, [
            transform([-100, -2, 100], from_euler([0, 0, 0, 1], 0, 0, 0)),
            move(2, 0),
            ...blue_mech(game),
            control_always([0, 0, -1], null, "walk"),
        ]);
    }

    let game = new Game();
    scene_stage(game);
    game.Start();
    // @ts-ignore
    window.$ = dispatch.bind(null, game);
    // @ts-ignore
    window.game = game;

})();