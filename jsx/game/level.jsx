import Grid from "./grid.js";

export default class Level {
    constructor(grid, start) {
        this.grid = grid;
        this.x = start[0];
        this.y = start[1];

        this.keys = [0, 0, 0];
        this.remoteLocks = [
            [
                [], [], []
            ],
            [
                [], [], []
            ],
            [
                [], [], []
            ]
        ];

        for (let y = 0; y < grid.height; y++) {
            for (let x = 0; x < grid.width; x++) {
                if (grid.data[x][y].module.type == CONST.module.rlock) {
                    let rlock = grid.data[x][y].module.data;
                    this.remoteLocks[rlock.material][rlock.badge].push([x, y]);
                }
            }
        }
    }
}