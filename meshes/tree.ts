import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_tree(gl: WebGLRenderingContext): Mesh {
    let vertex_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
    gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);

    let normal_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
    gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);

    let texcoord_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
    gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr, GL_STATIC_DRAW);

    let weights_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, weights_buf);
    gl.bufferData(GL_ARRAY_BUFFER, weights_arr, GL_STATIC_DRAW);

    let index_buf = gl.createBuffer()!;
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
    0, 0, 0,
    0, 1.7, -0.65,
    0, 0, -0.65,
    0, 1.7, 0,
    0, 0, 0.65,
    0, 1.7, 0.65,
    0, 0, 0.65,
    0, 0, 0,
    0, 1.7, 0,
    -0.65, 1.7, 0,
    0, 0, 0,
    -0.65, 0, 0,
    0.65, 0, 0,
    0.65, 1.7, 0,
    0.65, 0, 0,
    -0.65, 1.7, 0,
    0, 0, 0,
    0, 1.7, 0,
    -0.65, 1.7, 0,
    0.65, 1.7, 0
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([
    -0.508, 0,
    -0.884235, 0.984001,
    -0.884235, 0,
    -0.508, 0.984001,
    -0.131764, 0,
    -0.131764, 0.984001,
    -0.131764, 0,
    -0.508, 0,
    -0.508, 0.984001,
    -0.131764, 0.984001,
    -0.508, 0,
    -0.131764, 0,
    -0.884235, 0,
    -0.884235, 0.984001,
    -0.884235, 0,
    -0.131764, 0.984001,
    -0.508, 0,
    -0.508, 0.984001,
    -0.131764, 0.984001,
    -0.884235, 0.984001
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    19, 18, 17,
    16, 15, 14,
    13, 9, 12,
    11, 10, 9,
    8, 7, 6,
    5, 4, 3,
    3, 0, 1,
    2, 1, 0
]);
