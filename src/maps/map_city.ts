import {blue_road} from "../blueprints/blu_road.js";
import {blue_roof_2} from "../blueprints/blu_roof.js";
import {blue_tree} from "../blueprints/blu_tree.js";
import {blue_truck} from "../blueprints/blu_truck.js";
import {blue_wall} from "../blueprints/blu_wall.js";
import {blue_wall_door} from "../blueprints/blu_wall_door.js";
import {blue_wall_garage} from "../blueprints/blu_wall_garage.js";
import {transform} from "../components/com_transform.js";
import {Game} from "../game.js";

export function map_city(game: Game) {
    return [
        [transform([9.74, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall_door(game, "B")],
        [transform([8.44, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall_garage(game, "B")],
        [transform([7.14, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall(game, "C")],
        [transform([3.24, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall(game, "B")],
        [transform([1.94, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall_garage(game, "A")],
        [transform([0.64, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall(game, "A")],
        [transform([-0.66, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_wall_door(game, "A")],
        [transform([-4.69, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_road(game, "A")],
        [transform([-5.99, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_road(game, "B")],
        [transform([-7.29, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_road(game, "C")],
        [transform([-8.59, 0, -10.38], [0, 1, 0, 0], undefined), ...blue_road(game, "D")],
        [transform([1.3, 0, -7.37], [0, 1, 0, 0], undefined), ...blue_wall(game, "A")],
        [transform([1.3, 1, -7.37], [0, 1, 0, 0], undefined), ...blue_wall(game, "A")],
        [transform([1.3, 2, -7.37], [0, 1, 0, 0], undefined), ...blue_wall(game, "A")],
        [transform([0.3, 0, -7.37], [0, 1, 0, 0], undefined), ...blue_wall_door(game, "A")],
        [transform([0.3, 1, -7.37], [0, 0, 0, -1], undefined), ...blue_roof_2(game)],
        [transform([7.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -8.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -5.5], undefined, undefined), ...blue_tree(game)],
        [transform([5, 0, -7.5], undefined, undefined), ...blue_tree(game)],
        [transform([-5.08, 0, -3.11], undefined, undefined), ...blue_truck(game)],
        [transform([-1.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, -1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 0.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 1.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 2.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 4.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 3.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 5.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([7.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([6.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([5.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([4.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([3.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([2.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([0.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-0.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 6.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-1.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-2.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-3.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-4.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-5.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-6.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([-7.5, 0, 7.5], undefined, undefined), ...blue_road(game, "D")],
        [transform([1.5, 0, 3.5], undefined, undefined), ...blue_wall_door(game, "A")],
        [transform([2.5, 0, 3.5], undefined, undefined), ...blue_wall_door(game, "A")],
        [transform([3.5, 0, 3.5], undefined, undefined), ...blue_wall_door(game, "A")],
        [transform([-6.5, 0, 1.5], [0, 0.71, 0, -0.71], undefined), ...blue_wall_garage(game, "B")],
        [transform([-6.5, 1, 1.5], undefined, undefined), ...blue_wall(game, "B")],
        [transform([-6.5, 2, 1.5], undefined, undefined), ...blue_wall(game, "B")],
        [transform([-6.5, 3, 1.5], [0, -0.71, 0, -0.71], undefined), ...blue_roof_2(game)],
    ];
}
