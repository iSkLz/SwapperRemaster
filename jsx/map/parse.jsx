import Grid from "../game/grid.js";

const METAKEYS = ["width", "height", "keys", "swaps",]

/**
 * Parses a map file
 * @param {string} data The map contents
 * @returns {[Object, Grid]}
 */
export default function parseMap(data) {
    let lines = data.replace(/\r\n/g, "\n").split("\n");

    let metadata = [];
    let tilesdata = [];
    let output = (str) => {};
    for (const line of lines) {
        if (line.startsWith("-") || line.length == 0) continue;
        if (line === "META") {
            output = (str) => metadata.push(str);
        } else if (line === "TILES") {
            output = (str) => tilesdata.push(str);
        } else {
            output(line);
        }
    }

    let meta = parseMetaData(metadata);
    return [meta, parseTilesData(tilesdata, meta)];
}

function parseMetaData(data) {
    let meta = {};
    for (const metaline of data) {
        for (const metakey of METAKEYS) {
            if (metaline.startsWith(metakey)) {
                meta[[metakey]] = Number(metaline.replace(metakey, ""));
            }
        }
    }

    return meta;
}

function parseTilesData(data, meta) {
    let grid = new Grid(meta.width, meta.height);

    let max = Math.min(data.length, meta.width * meta.height);
    for (let i = 0; i < max; i++) {
        let tile = grid.getI(i);
        let attrs = data[i].split(" ");
        for (const attr of attrs) {
            if (attr === "white") tile.color = CONST.color.white;
            if (attr === "blue") tile.color = CONST.color.blue;
            if (attr === "red") tile.color = CONST.color.red;
            if (attr === "gray") tile.color = CONST.color.gray;
            if (attr === "grey") tile.color = CONST.color.gray;
            if (attr === "purple") tile.color = CONST.color.purple;

            if (attr === "locked") tile.locked = true;

            if (attr === "key") {
                tile.module.type = CONST.module.key;
                if (!tile.module.data.count) tile.module.data.count = 1;
            }
            if (attr === "lock") tile.module.type = CONST.module.lock;
            if (attr === "rkey") tile.module.type = CONST.module.rkey;
            if (attr === "rlock") tile.module.type = CONST.module.rlock;

            if (attr === "gold") tile.module.data.material = CONST.material.gold;
            if (attr === "silver") tile.module.data.material = CONST.material.silver;
            if (attr === "bronze") tile.module.data.material = CONST.material.bronze;

            if (attr === "chip") tile.module.data.shape = CONST.shape.chip;
            if (attr === "square") tile.module.data.shape = CONST.shape.chip;
            if (attr === "triangle") tile.module.data.shape = CONST.shape.delta;
            if (attr === "delta") tile.module.data.shape = CONST.shape.delta;
            if (attr === "circle") tile.module.data.shape = CONST.shape.heart;
            if (attr === "heart") tile.module.data.shape = CONST.shape.heart;

            if (attr === "brown") tile.module.data.color = CONST.rcolor.brown;
            if (attr === "yellow") tile.module.data.color = CONST.rcolor.yellow;
            if (attr === "green") tile.module.data.color = CONST.rcolor.green;
            if (attr === "olive") tile.module.data.color = CONST.rcolor.olive;
            if (attr === "aqua") tile.module.data.color = CONST.rcolor.aqua;

            if (attr === "swap") {
                tile.module.type = CONST.module.swap;
                if (!tile.module.data.color) tile.module.data.color = CONST.color.white;
            }

            if (attr === "toeither") tile.module.data.color = CONST.color.white;
            if (attr === "tored") tile.module.data.color = CONST.color.red;
            if (attr === "toblue") tile.module.data.color = CONST.color.blue;

            if (attr === "swapi") {
                tile.module.type = CONST.module.swapitem;
                if (!tile.module.data.delta) tile.module.data.delta = 1;
            }

            if (attr === "give") tile.module.data.delta = Math.abs(tile.module.data.delta || 1);
            if (attr === "take") tile.module.data.delta = -Math.abs(tile.module.data.delta || 1);

            if (attr === "1" || attr === "2" || attr === "3" || attr === "4" || attr === "5") {
                if (tile.module.type === CONST.module.key) tile.module.data.count = Number(attr);
                if (tile.module.type === CONST.module.swapi) tile.module.data.delta *= Number(attr);
            }
        }
    }

    return grid;
}