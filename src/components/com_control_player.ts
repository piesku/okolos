import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export const enum ControlPlayerKind {
    Motion,
}

export interface ControlPlayer {
    Kind: ControlPlayerKind;
}

export function control_player(kind: ControlPlayerKind) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Kind: kind,
        };
    };
}
