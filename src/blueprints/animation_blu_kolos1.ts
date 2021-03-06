import {from_euler} from "../../common/quat.js";

let speed = 25;

export const kolos1_anims = {
    body: {
        idle: {
            Keyframes: [
                {
                    Timestamp: speed * 0.0,
                    Rotation: from_euler([0, 0, 0, 1], 0, 5, 0),
                },
                {
                    Timestamp: speed * 0.5,
                    Rotation: from_euler([0, 0, 0, 1], 0, -5, 0),
                },
            ],
        },
        walk: {
            Keyframes: [
                {
                    Timestamp: speed * 0.0,
                    Rotation: from_euler([0, 0, 0, 1], 0, 5, 0),
                },
                {
                    Timestamp: speed * 0.2,
                    Rotation: from_euler([0, 0, 0, 1], 0, -5, 0),
                },
            ],
        },
    },
    left_hand: {
        idle: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                },
                {
                    Timestamp: speed * 0.5,
                    Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                },
            ],
        },
        walk: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], 30, 0, 0),
                },
                {
                    Timestamp: speed * 0.2,
                    Rotation: from_euler([0, 0, 0, 1], -60, 0, 0),
                },
            ],
        },
    },
    right_hand: {
        idle: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                },
                {
                    Timestamp: speed * 0.5,
                    Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                },
            ],
        },
        walk: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], -60, 0, 0),
                },
                {
                    Timestamp: speed * 0.2,
                    Rotation: from_euler([0, 0, 0, 1], 30, 0, 0),
                },
            ],
        },
    },

    left_leg: {
        idle: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                },
                {
                    Timestamp: speed * 1,
                    Rotation: from_euler([0, 0, 0, 1], 5, 0, 0),
                },
            ],
        },
        walk: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], -45, 0, 0),
                },
                {
                    Timestamp: speed * 0.2,
                    Rotation: from_euler([0, 0, 0, 1], 45, 0, 0),
                },
            ],
        },
    },
    right_leg: {
        idle: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                },
                {
                    Timestamp: speed * 1,
                    Rotation: from_euler([0, 0, 0, 1], -5, 0, 0),
                },
            ],
        },
        walk: {
            Keyframes: [
                {
                    Timestamp: speed * 0,
                    Rotation: from_euler([0, 0, 0, 1], 45, 0, 0),
                },
                {
                    Timestamp: speed * 0.2,
                    Rotation: from_euler([0, 0, 0, 1], -45, 0, 0),
                },
            ],
        },
    },
};
