#!/usr/bin/env node

const {readFileSync} = require("fs");
const path = require("path");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the blueprint:");
    console.error("  cat foo.gltf | node gltf2prop.cjs foo");
    process.exit(1);
}

process.stdin.resume();
let json = readFileSync(process.stdin.fd, "utf8");
process.stdin.pause();

let blueprint_name = process.argv[2]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

let vec = (arr) =>
    arr ? "[" + arr.map((v) => parseFloat(v.toFixed(2))).join(", ") + "]" : "undefined";

let create_child = (mesh, translation, rotation, scale, color = [0.33, 0.33, 0.33, 1]) => {
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        render_colored_shaded(
            game.MaterialColoredGouraud,
            game.Mesh${mesh},
            ${vec(color)}
        ),
    ]`;
};

let create_child_with_children = (name, translation, rotation, scale) => {
    return `
    [
        transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
        children(...prop_${name}(game)),
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

let blueprint_elements = [];

let props = nodes.reduce((acc, node) => {
    if (node.name.includes(".")) {
        // prop
        const split_name = node.name.split(".");
        const mesh = split_name[0];
        const name = split_name[1];
        acc[name] = acc[name] || [];
        acc[name].push(create_child(mesh, node.translation, node.rotation, node.scale));
    } else {
        // blueprint
        blueprint_elements.push(
            create_child_with_children(node.name, node.translation, node.rotation, node.scale)
        );
    }
    return acc;
}, {});

let result = `\
import {children} from "../components/com_children.js";
import {render_colored_shaded} from "../components/com_render.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

${Object.keys(props)
    .map((name) => {
        return `
export function prop_${name}(game: Game) {
    return [
        ${props[name].join(", ")}
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