import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {ForwardShadingLayout, TexturedShadedLayout} from "./layout.js";

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

    in vec4 attr_position;
    in vec2 attr_texcoord;
    in vec3 attr_normal;

    out vec2 vert_texcoord;
    out vec4 vert_color;

    void main() {
        vec4 world_position = world * attr_position;
        vec3 world_normal = normalize((vec4(attr_normal, 0.0) * self).xyz);
        gl_Position = pv * world_position;

        vec3 view_dir = eye - world_position.xyz;
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
                vec3 light_dir = light_positions[i].xyz - world_position.xyz;
                float light_dist = length(light_dir);
                light_normal = light_dir / light_dist;
                // Distance attenuation.
                light_intensity /= (light_dist * light_dist);
            }

            float diffuse_factor = dot(world_normal, light_normal);
            if (diffuse_factor > 0.0) {
                // Diffuse color.
                light_acc += diffuse_color.rgb * diffuse_factor * light_color * light_intensity;

                if (shininess > 0.0) {
                    // Blinn-Phong reflection model.
                    vec3 h = normalize(light_normal + view_normal);
                    float specular_angle = max(dot(h, world_normal), 0.0);
                    float specular_factor = pow(specular_angle, shininess);

                    // Specular color.
                    light_acc += specular_color.rgb * specular_factor * light_color * light_intensity;
                }
            }
        }

        vert_color = vec4(light_acc, diffuse_color.a);
        vert_texcoord = attr_texcoord;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    uniform sampler2D diffuse_map;

    in vec2 vert_texcoord;
    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        vec4 tex_color = texture(diffuse_map, vert_texcoord);
        frag_color = vert_color * tex_color;
    }
`;

export function mat_forward_textured_gouraud(
    gl: WebGL2RenderingContext
): Material<TexturedShadedLayout & ForwardShadingLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            Self: gl.getUniformLocation(program, "self")!,

            DiffuseMap: gl.getUniformLocation(program, "diffuse_map")!,
            DiffuseColor: gl.getUniformLocation(program, "diffuse_color")!,
            SpecularColor: gl.getUniformLocation(program, "specular_color")!,
            Shininess: gl.getUniformLocation(program, "shininess")!,

            Eye: gl.getUniformLocation(program, "eye")!,
            LightPositions: gl.getUniformLocation(program, "light_positions")!,
            LightDetails: gl.getUniformLocation(program, "light_details")!,

            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
            VertexTexCoord: gl.getAttribLocation(program, "attr_texcoord")!,
            VertexNormal: gl.getAttribLocation(program, "attr_normal")!,
        },
    };
}
