import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {ColoredShadedLayout, FogLayout, ForwardShadingLayout} from "./layout.js";

let vertex = `#version 300 es\n

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

let fragment = `#version 300 es\n
    precision mediump float;

    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        frag_color = vert_color;
    }
`;

export function mat_forward_colored_gouraud(
    gl: WebGL2RenderingContext
): Material<ColoredShadedLayout & ForwardShadingLayout & FogLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,

            DiffuseColor: gl.getUniformLocation(program, "diffuse_color")!,
            SpecularColor: gl.getUniformLocation(program, "specular_color")!,
            Shininess: gl.getUniformLocation(program, "shininess")!,

            Eye: gl.getUniformLocation(program, "eye")!,
            LightPositions: gl.getUniformLocation(program, "light_positions")!,
            LightDetails: gl.getUniformLocation(program, "light_details")!,

            FogColor: gl.getUniformLocation(program, "fog_color")!,
            FogDistance: gl.getUniformLocation(program, "fog_distance")!,

            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexNormal: gl.getAttribLocation(program, "attr_normal")!,
        },
    };
}
