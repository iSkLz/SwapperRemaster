const flags = {
    bronze: "flag/bronze",
    gold: "flag/gold",
    normal: "flag/normal",
    silver: "flag/silver",
};

const keys = {
    bronze1: "key/bronze-1",
    bronze2: "key/bronze-2",
    bronze3: "key/bronze-3",
    bronze4: "key/bronze-4",
    bronze5: "key/bronze-5",
    gold1: "key/gold-1",
    gold2: "key/gold-2",
    gold3: "key/gold-3",
    gold4: "key/gold-4",
    gold5: "key/gold-5",
    silver1: "key/silver-1",
    silver2: "key/silver-2",
    silver3: "key/silver-3",
    silver4: "key/silver-4",
    silver5: "key/silver-5",
};

const locks = {
    bronze: "lock/bronze",
    gold: "lock/gold",
    silver: "lock/silver",
};

const swaps = {
    force: "swap/forcered",
    force: "swap/forceblue",
    neutral: "swap/neutral",
    pickup: "swap/pickup",
};

const tiles = {
    black: "tile/black",
    blue: "tile/blue",
    gray: "tile/gray",
    purple: "tile/purple",
    red: "tile/red",
};

const badges = {
    brown: "misc/badge/brown",
    yellow: "misc/badge/yellow",
    green: "misc/badge/green",
    olive: "misc/badge/olive",
    aqua: "misc/badge/aqua",
};

const _misc = {
    code: ["misc/code", "heart", "chip", "delta"],
    codeheart: ["misc/newbadge/codeheart-", "brown", "yellow", "green", "olive", "aqua"],
    codechip: ["misc/newbadge/codechip-", "brown", "yellow", "green", "olive", "aqua"],
    codedelta: ["misc/newbadge/codedelta-", "brown", "yellow", "green", "olive", "aqua"],
    color: ["misc/badge"],
    sign: ["misc/sign", "plus", "minus"],
    barrier: ["misc/barrier", "left", "top", "right", "bottom"],
    barrierd: ["misc/barrierd", "left", "top", "right", "bottom"],
    lock: ["misc/lock"],
    lockwhite: ["misc/lockw"],
    locked: ["misc/locked"],
    nothing: ["misc/nothing"]
};

let misc = {};

let res = {};

export default async function load() {
    for (const rel in _misc) {
        if (!_misc.hasOwnProperty(rel)) continue;
        const link = _misc[rel];
        if (link.length > 1) {
            for (let i = 1; i < link.length; i++) {
                misc[rel + link[i]] = link[0] + link[i];
            }
        } else misc[rel] = link[0];
    }

    await _load();
}

async function _load() {
    let straight = {flags, keys, locks, swaps, tiles, badges, misc};
    for (const group in straight) {
        if (!straight.hasOwnProperty(group)) continue;
        let groupobj = straight[group];

        for (const rel in groupobj) {
            if (!groupobj.hasOwnProperty(rel)) continue;
            const link = groupobj[rel];
            const src = location.origin + "/svgs/" + groupobj[rel] + ".svg";
            res[link] = src;
        }
    }
    window.sprites = res;
}