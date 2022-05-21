export default class Grid {
    static deepcopy(grid) {
        let data = grid.data;

        let newdata = new Array(grid.width);
        for (let x = 0; x < newdata.length; x++) {
            newdata[x] = new Array(grid.height);
            for (let y = 0; y < height; y++) {
                newdata[x][y] = {module: {}};
                for (const aprop in data[x][y]) {
                    if (data[x][y].hasOwnProperty(aprop)) {
                        if (aprop !== "module") newdata[x][y][aprop] = data[x][y][aprop];
                    }
                }

                for (const bprop in data[x][y].module) {
                    if (!data[x][y].module.hasOwnProperty(bprop)) continue;
                    newdata[x][y].module[bprop] = data[x][y].module[bprop];
                }
            }
        }

        let newgrid = new Grid(grid.width, grid.height);
        newgrid.data = newdata;
        return newgrid;
    }

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.data = new Array(width);
        for (let x = 0; x < width; x++) {
            this.data[x] = new Array(height);
            for (let y = 0; y < height; y++) {
                this.data[x][y] = {
                    color: CONST.color.white,
                    locked: false,
                    module: {
                        type: CONST.module.nothing,
                        data: {}
                    }
                }
            }
        }

        this.history = [this.data];
    }

    set(x, y, data) {
        for (const prop in data) {
            if (data.hasOwnProperty(prop)) this.data[x][y][prop] = data[prop];
        }
    }

    get = (x, y) => {
        return this.data[x][y];
    }

    getI(i) {
        let y = Math.floor(i / this.width);
        let x = i % this.width;
        return this.get(x, y);
    }

    getMatStr(x, y) {
        switch (this.data[x][y].module.data.material) {
            case CONST.material.bronze:
                return "bronze";
            case CONST.material.silver:
                return "silver";
            case CONST.material.gold:
                return "gold";
            default:
                return "nope";
        }
    }

    getSwapColorStr(x, y) {
        switch (this.data[x][y].module.data.color) {
            case CONST.color.white:
                return "neutral";
            case CONST.color.blue:
                return "forceblue";
            case CONST.color.red:
                return "forcered";
            default:
                return "nope";
        }
    }

    getRColorStr(x, y) {
        switch (this.data[x][y].module.data.color) {
            case CONST.rcolor.brown:
                return "brown";
            case CONST.rcolor.yellow:
                return "yellow";
            case CONST.rcolor.green:
                return "green";
            case CONST.rcolor.olive:
                return "olive";
            case CONST.rcolor.aqua:
                return "aqua";
            default:
                return "nope";
        }
    }

    getRShapeStr(x, y) {
        switch (this.data[x][y].module.data.shape) {
            case CONST.shape.delta:
                return "delta";
            case CONST.shape.chip:
                return "chip";
            case CONST.shape.heart:
                return "heart";
            default:
                return "nope";
        }
    }

    render = (x, y) => {
        let tile = this.get(x, y);

        let tilecolor = "tile/";
        if (tile.color == CONST.color.white) tilecolor += "black";
        if (tile.color == CONST.color.red) tilecolor += "red";
        if (tile.color == CONST.color.blue) tilecolor += "blue";
        if (tile.color == CONST.color.purple) tilecolor += "purple";
        if (tile.color == CONST.color.gray) tilecolor += "grey";

        let locked = "misc/" + ((tile.locked) ? "locked" : "nothing");

        if (tile.module.type == CONST.module.nothing) return [tilecolor, locked];

        if (tile.module.type == CONST.module.key) {
            return [tilecolor, locked, "key/" + this.getMatStr(x, y) + "-" + tile.module.data.count];
        }

        if (tile.module.type == CONST.module.lock) {
            return [tilecolor, locked, "lock/" + this.getMatStr(x, y)];
        }

        if (tile.module.type == CONST.module.swap) {
            return [tilecolor, locked, "swap/" + this.getSwapColorStr(x, y)];
        }

        if (tile.module.type == CONST.module.swapitem) {
            return [tilecolor, locked, "swap/pickup",
                "misc/sign" + ((tile.module.delta > 0) ? "plus" : "minus")];
        }

        if (tile.module.type == CONST.module.rkey) {
            return [tilecolor, locked, "key/" + this.getMatStr(x, y),
                "misc/newbadge/code" + this.getRShapeStr(x, y) + "-" + this.getRColorStr(x, y)];
        }

        if (tile.module.type == CONST.module.rlock) {
            return [tilecolor, locked, "lock/" + this.getMatStr(x, y),
                "misc/newbadge/code" + this.getRShapeStr(x, y) + "-" + this.getRColorStr(x, y)];
        }
    }
}