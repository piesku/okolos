#!/usr/bin/env node

const {readFileSync} = require("fs");
const path = require("path");
const color_map = require("../../assets/colors.cjs");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the blueprint:");
    console.error("  cat foo.gltf | node gltf2prop.cjs foo");
    process.exit(1);
}

let mesh = "Cube";

// process.stdin.resume();
// let json = readFileSync(process.stdin.fd, "utf8");
// process.stdin.pause();

let blueprint_name = process.argv[2]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

let json = readFileSync("../../assets/" + blueprint_name + ".gltf", "utf8");

let vec = (arr) =>
    arr ? "[" + arr.map((v) => parseFloat(v.toFixed(2))).join(", ") + "]" : "undefined";

let create_child = (translation, rotation, scale, color = [0.33, 0.33, 0.33, 1]) => {
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, [1, 1, 1]),
        collide(true, Layer.Solid | Layer.Climbable, Layer.None, ${vec(scale)}),
        rigid_body(RigidKind.Kinematic),
        children([
            transform(undefined, undefined, ${vec(scale)}),
            render_colored_shaded(
                game.MaterialColoredGouraud,
                game.Mesh${mesh},
                ${vec(color)}
            ),
        ]),
    ]`;
};

let create_child_with_children = (name, translation, rotation, scale) => {
    let anim = animated_parts.includes(name) ? `\nanimate(kolos1_anims.${name})` : "";
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        children(prop_${name}(game)), ${anim}
    ]`;
};

let gltf = JSON.parse(json);
let nodes = gltf.nodes;
// let colors = gltf.materials.map((mat) =>
//     (mat.pbrMetallicRoughness.baseColorFactor || [1, 1, 1, 1]).map((col) =>
//         parseFloat(col.toFixed(3))
//     )
// );
// let color_map = gltf.meshes.reduce((acc, curr, index) => {
//     // acc[curr.name] = colors[curr.primitives[0].material];
//     acc[index] = colors[curr.primitives[0].material];
//     return acc;
// }, {});
const colors = [
    [0.53, 0.55, 0.56],
    [0.21, 0.21, 0.21],
    [0.35, 0.33, 0.31],
    [0.22, 0.22, 0.22],
    [0.15, 0.15, 0.15],
    [0.47, 0.66, 1],
    [1, 1, 1],
    [0.47, 0.66, 1],
];

let blueprint_elements = [];
let animated_parts = ["body", "left_hand", "right_hand", "left_leg", "right_leg"];
let off = 0;
let props = nodes.reduce((acc, node, index) => {
    if (node.name.includes(".")) {
        // prop
        const split_name = node.name.split(".");
        // const mesh = split_name[0];
        const name = split_name[1];
        acc[name] = acc[name] || {views: [], colors: [], colliders: []};

        let view = from_rotation_translation_scale(
            [],
            node.rotation,
            node.translation,
            node.scale //&& node.scale.map((e) => e * 2)
        );

        acc[name].views = acc[name].views.concat(view);
        const color = colors[0];

        acc[name].colors.push(...color);
        // acc[name].colors.push(...colors[color_map[index - off]]);

        acc[name].colliders.push(`[
            transform(${vec(node.translation)}, ${vec(node.rotation)}, ${vec(node.scale)}),
            collide(false, Layer.Terrain, Layer.None),
            rigid_body(RigidKind.Static),
        ]`);
    } else if (node.name !== "root") {
        // blueprint
        off++;
        blueprint_elements.push(
            create_child_with_children(
                node.name,
                node.translation,
                node.rotation,
                node.scale //&& node.scale.map((e) => e * 2)
            )
        );
    }
    return acc;
}, {});

//children(${props[name].colliders.join(",\n ")}),
let result = `\
import { animate } from "../components/com_animate.js";
import { children } from "../components/com_children.js";
import { collide } from "../components/com_collide.js";
import { render_instanced } from "../components/com_render.js";
import { rigid_body, RigidKind } from "../components/com_rigid_body.js";
import { transform } from "../components/com_transform.js";
import { Game, Layer } from "../game.js";
import { kolos1_anims } from "./animation_blu_kolos1.js";

${Object.keys(props)
    .map((name) => {
        return `
export function prop_${name}(game: Game) {
    return [
        transform(),
        render_instanced(game.MeshCube, Float32Array.from(${vec(
            props[name].views
        )}), Float32Array.from(${vec(props[name].colors)})),
    ];
}`;
    })
    .join("\n")}

export function blue_${blueprint_name}(game: Game) {
    return [
        children(${blueprint_elements.join(",\n        ")}),
    ];
}
`;

console.log(result);

function from_rotation_translation_scale(out, q = [0, 0, 0, 1], v = [0, 0, 0], s = [2, 2, 2]) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
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
