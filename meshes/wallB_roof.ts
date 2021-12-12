import {Mesh} from "../common/mesh.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_wallB_roof(gl: WebGLRenderingContext): Mesh {
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
    -0.5, 0, 0.5,
    0.5, 0, 0.4,
    0.5, 0, 0.5,
    0.5, 0, -0.4,
    0.5, 0, -0.5,
    -0.5, 0, -0.5,
    -0.5, 0, -0.5,
    -0.5, 0, 0.5,
    -0.5, 0, 0.4,
    -0.5, 0, -0.5,
    -0.5, 0, 0.4,
    -0.5, 0, -0.4,
    0.5, 0.5, 0,
    -0.5, 0, 0.5,
    0.5, 0, 0.5,
    -0.5, 0.5, 0,
    0.5, 0, -0.5,
    -0.5, 0.5, 0,
    0.5, 0.5, 0,
    -0.5, 0, -0.5,
    -0.5, 0, -0.4,
    -0.5, 0.5, 0,
    -0.5, 0, -0.5,
    -0.5, 0.4, 0,
    -0.5, 0, 0.4,
    -0.5, 0.5, 0,
    -0.5, 0.4, 0,
    -0.5, 0, 0.5,
    0.5, 0.5, 0,
    0.5, 0, 0.4,
    0.5, 0.4, 0,
    0.5, 0, 0.5,
    0.5, 0.5, 0,
    0.5, 0, -0.4,
    0.5, 0, -0.5,
    0.5, 0.4, 0,
    -0.5, 0, 0.4,
    -0.5, 0.4, 0,
    -0.5, 0, -0.4,
    0.5, 0, 0.4,
    0.5, 0, -0.4,
    0.5, 0.4, 0
]);

// prettier-ignore
let normal_arr = Float32Array.from([
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, 1, 0,
    0, -1, 0,
    0, 1, 0,
    0, -1, 0,
    0, 0.7071, 0.7071,
    0, 0.7071, 0.7071,
    0, 0.7071, 0.7071,
    0, 0.7071, 0.7071,
    0, 0.7071, -0.7071,
    0, 0.7071, -0.7071,
    0, 0.7071, -0.7071,
    0, 0.7071, -0.7071,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0
]);

// prettier-ignore
let texcoord_arr = Float32Array.from([
    -14, -11,
    -13.9, -10,
    -14, -10,
    -13.1, -10,
    -13, -10,
    -13, -11,
    -13, -11,
    -14, -11,
    -13.9, -11,
    -13, -11,
    -13.9, -11,
    -13.1, -11,
    -2, -3.29289,
    -3, -4,
    -2, -4,
    -3, -3.29289,
    11, 6,
    12, 6.70711,
    11, 6.70711,
    12, 6,
    -3.9, -4.9,
    -4, -4,
    -4, -5,
    -3.9, -4.1,
    -3.9, -4.9,
    -4, -4,
    -3.9, -4.1,
    -4, -5,
    -4, -4,
    -3.9, -4.9,
    -3.9, -4.1,
    -4, -5,
    -4, -4,
    -3.9, -4.9,
    -4, -5,
    -3.9, -4.1,
    9.9, 1,
    9.5, 1.4,
    9.1, 1,
    -10.9, 1,
    -10.1, 1,
    -10.5, 1.4
]);

// prettier-ignore
let weights_arr = Float32Array.from([
    // Weights must be assigned manually for now b/c OBJ doesn't support them.
    // WARNING: Remaking the mesh file will overwrite your weights here.
]);

// prettier-ignore
let index_arr = Uint16Array.from([
    41, 40, 39,
    38, 37, 36,
    35, 32, 33,
    34, 33, 32,
    31, 28, 29,
    30, 29, 28,
    27, 24, 25,
    26, 25, 24,
    23, 20, 21,
    22, 21, 20,
    19, 16, 17,
    18, 17, 16,
    15, 12, 13,
    14, 13, 12,
    11, 10, 9,
    8, 7, 6,
    5, 0, 4,
    4, 0, 3,
    3, 0, 1,
    2, 1, 0
]);
