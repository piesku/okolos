import {link, Material} from "../common/material.js";
import {GL_TRIANGLES} from "../common/webgl.js";
import {DepthMappingLayout} from "./layout.js";

let vertex = `#version 300 es\n

    uniform mat4 pv;
    uniform mat4 world;

    in vec4 attr_position;

    void main() {
        gl_Position = pv * world * attr_position;
    }
`;

let fragment = `#version 300 es\n
    precision mediump float;

    out vec4 frag_color;

    float linear_depth(float depth) {
        float near = 4.0;
        float far  = 64.0;
        return (2.0 * near) / (far + near - depth * (far - near));
    }

    void main() {
        // Visualization only. Actual z is saved in the depth buffer.
        float z = linear_depth(gl_FragCoord.z);
        frag_color = vec4(z, z, z, 1.0);
    }

`;

export function mat_forward_depth(gl: WebGL2RenderingContext): Material<DepthMappingLayout> {
    let program = link(gl, vertex, fragment);
    return {
        Mode: GL_TRIANGLES,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            VertexPosition: gl.getAttribLocation(program, "attr_position")!,
        },
    };
}
