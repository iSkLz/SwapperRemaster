const flags = {
    bronze: "flag/bronze",
    gold: "flag/gold",
    normal: "flag/normal",
    silver: "flag/silver",
};

const keys = {
    bronze: "key/bronze",
    gold: "key/gold",
    silver: "key/silver",
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

const misc = {
    code: ["misc/badgecode", "circle", "square", "triangle"],
    color: ["misc/badgecolor"],
    sign: ["misc/badgesign", "plus", "minus"],
    barrier: ["misc/barrier", "left", "up", "right", "down"],
    barrierdashed: ["misc/barrierd", "left", "up", "right", "down"],
    lock: ["misc/lock"],
    lockwhite: ["misc/lockw"],
};

let res = {
};

export default async function load() {
    console.log("hello!");
    await _load();
}

async function _load() {
    let straight = {flags, keys, locks, swaps, tiles};
    for (const group in straight) {
        if (!straight.hasOwnProperty(group)) continue;
        let groupobj = straight[group];

        for (const rel in groupobj) {
            if (!groupobj.hasOwnProperty(rel)) continue;
            const link = groupobj[rel];
            const src = "/sprites/" + groupobj[rel] + ".png";
            await loadimg(src, link);
        }
    }

    /*
    for (const rel in misc) {
        if (!misc.hasOwnProperty(rel)) continue;
        const desc = misc[rel];
        const link = desc[0];
        const src = "/sprites/" + link + ".png";
        if (desc.length == 1) await loadimg(src, link);
        else await loadimgdiv(desc);
    }
    //*/

    window.sprites = res;
}

async function loadimg(src, link) {
    let bytes = await downloadimg(src);
    let blob = new Blob([bytes], { type: "image/png" });
    let url = URL.createObjectURL(blob);
    res[link] = {
        bytes, blob, url
    };
}

let x = false;

function downloadimg(src) {
    if (!x) {window.open(location.origin + src, "_blank"); x=true}
    return new Promise((resolve) => {
        $.get({
            url: location.origin + src,
            success: (d) => {
                let bfr = new ArrayBuffer(d.length);
                let arr = new Uint8ClampedArray(bfr);
                for (let i = 0; i < d.length; i++) arr[i] = d.codePointAt(i);
                resolve(arr);
            },
            mimeType: "text/plain"
        });
    });
}

function _loadimg(src, link) {
    return new Promise((resolve) => {
        let resimg = document.createElement("img");
        resimg.onload = () => {
            let cvs = document.createElement("canvas");
            cvs.width = resimg.naturalWidth;
            cvs.height = resimg.naturalHeight;
            let ctx = cvs.getContext("2d");
            ctx.drawImage(resimg, 0, 0);
            let imgd = ctx.getImageData(0, 0, resimg.naturalWidth, resimg.naturalHeight)
            let imgb = new Blob(imgd.data, { type: "image/png" });
            let imgu = URL.createObjectURL(imgb);
            res[link] = {
                img: resimg,
                cvs, ctx,
                imgdata: imgd,
                blob: imgb,
                url: imgu
            };
            resolve();
        };
        resimg.src = src;
    })
}

function loadimgdiv(desc) {
    const link = desc[0];
    const src = "./sprites/" + link + ".png";

    return new Promise((resolve) => {
        let resimg = document.createElement("img");
        resimg.onload = () => {
            let cvs = document.createElement("canvas");
            cvs.width = resimg.naturalWidth;
            cvs.height = resimg.naturalHeight;
            let ctx = cvs.getContext("2d");
            ctx.drawImage(resimg, 0, 0);
            res[link] = {
                img: resimg,
                cvs, ctx,
            };

            let c = desc.length - 1;
            let unit = resimg.naturalWidth / c;
            for (let i = 1; i < desc.length; i++) {
                let imgd = ctx.getImageData(unit * (i - 1), 0, unit, resimg.naturalHeight);
                console.log(imgd);
                let imgb = new Blob(imgd.data, { type: "application/octet-stream" });
                let imgu = URL.createObjectURL(imgb);
                let newlink = link + "_" + desc[i];
                res[newlink] = {
                    imgdata: imgd,
                    blob: imgb,
                    url: imgu,
                }
            }

            resolve();
        };
        resimg.src = src;
    })
}