#!/usr/bin/env node

const {readFileSync} = require("fs");
const path = require("path");
const color_map = require("../../assets/colors.cjs");

if (process.argv.length !== 3) {
    console.error("Provide a GLTF file on stdin and the name of the map:");
    console.error("  cat foo.gltf | node gltf2map.cjs foo");
    process.exit(1);
}

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
        ...blueprint_climbable(RigidKind.Kinematic, ${vec(scale)}),
        child([
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
let types = "ABCD".split("");

let gltf = JSON.parse(json);
let nodes = gltf.nodes;
let blueprints = [];
let props = nodes.reduce((acc, node, index) => {
    if (node.name.includes(".")) {
        // prop
        const split_name = node.name.split(".");
        const name = split_name[0];
        const type = types.includes(split_name[1]) ? split_name[1] : false;
        let {translation, rotation, scale} = node;

        // console.log(name, type);
        if (type) {
            blueprints.push(
                // `instantiate(game, [
                `[
                    transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
                    ...blue_${name}(game, '${type}'),
                ],`
                // ]);`
            );
        } else {
            blueprints.push(
                // `instantiate(game, [
                `[
                    transform(${vec(translation)}, ${vec(rotation)}, ${vec(scale)}),
                    ...blue_${name}(game),
                ],`
                // ]);`
            );
        }
    } else if (node.name !== "root") {
        // blueprint
        // off++;
        // blueprint_elements.push(
        //     create_child_with_children(
        //         node.name,
        //         node.translation,
        //         node.rotation,
        //         node.scale //&& node.scale.map((e) => e * 2)
        //     )
        // );
    }
    return acc;
}, {});

let result = `\
import {blue_road} from "../blueprints/blu_road.js";
import {blue_roof_2} from "../blueprints/blu_roof.js";
import {blue_tree} from "../blueprints/blu_tree.js";
import {blue_truck} from "../blueprints/blu_truck.js";
import {blue_wall} from "../blueprints/blu_wall.js";
import {blue_wall_door} from "../blueprints/blu_wall_door.js";
import {blue_wall_garage} from "../blueprints/blu_wall_garage.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function map_${blueprint_name}(game: Game) {
    return [ ${blueprints.join("\n")} ];
}
`;

console.log(result);
