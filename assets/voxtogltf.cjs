const vox = require("./vox-parser.cjs");
const parser = new vox.Parser();
const fs = require("fs");
const path = require("path");

const final_palette = [];
const color_map = {};
let models_output = [];

parser.parse("./mech.vox").then((result) => {
    const model_data = {
        size: {},
        cubes: [],
    };

    model_data.size = [result.size.x - 1, result.size.z - 1, result.size.y - 1];
    const palette = result.palette.map((color) => {
        return [(color.r / 255).toFixed(2), (color.g / 255).toFixed(2), (color.b / 255).toFixed(2)];
    });

    result.voxels.forEach((curr, idx) => {
        let color;
        if (typeof color_map[curr.colorIndex] !== "undefined") {
        } else {
            color_map[curr.colorIndex] = final_palette.push(palette[curr.colorIndex]) - 1;
            // console.log(
            //     `No color ${palette[curr.colorIndex]} found (voxel ${idx} in model ${path
            //         .basename(file, ".vox")
            //         .toUpperCase()}). Next color index: ${color_map[curr.colorIndex]}`
            // );
        }

        color = color_map[curr.colorIndex];

        const cube = {
            offset: [curr.x, curr.z, curr.y],
            color,
        };

        model_data.cubes.push(cube);
    });

    model_data.cubes = model_data.cubes.filter((cube) => {
        return !(
            find_cube(model_data.cubes, [cube.offset[0] + 1, cube.offset[1], cube.offset[2]]) &&
            find_cube(model_data.cubes, [cube.offset[0] - 1, cube.offset[1], cube.offset[2]]) &&
            find_cube(model_data.cubes, [cube.offset[0], cube.offset[1] + 1, cube.offset[2]]) &&
            find_cube(model_data.cubes, [cube.offset[0], cube.offset[1] - 1, cube.offset[2]]) &&
            find_cube(model_data.cubes, [cube.offset[0], cube.offset[1], cube.offset[2] + 1]) &&
            find_cube(model_data.cubes, [cube.offset[0], cube.offset[1], cube.offset[2] - 1])
        );
    });

    let res = [];
    model_data.cubes.forEach((cube, idx) => {
        res.push(cube.color);
        const [x, y, z] = cube.offset;
        // res.push(`{
        //     "mesh": 0,
        //     "name": "Cube.${idx.toString().padStart(3, "0")}",
        //     "translation": [${x * 2}, ${y * 2}, ${z * 2}]
        // }`);
    });
    // console.log(final_palette.map((e) => e.map((nr) => parseFloat(nr))));

    fs.writeFileSync(
        path.join(__dirname, "./colors.cjs"),
        `module.exports = ` + JSON.stringify(res)
    );
});

function find_cube(collection, cords) {
    return collection.some((cube) => {
        return (
            cube.offset[0] === cords[0] &&
            cube.offset[1] === cords[1] &&
            cube.offset[2] === cords[2]
        );
    });
}
