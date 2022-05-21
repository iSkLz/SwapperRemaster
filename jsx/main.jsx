import load from "./resources.js";
import Grid from "./game/grid.js";
import RenderGrid from "./render/level/rgrid.js";
import parseMap from "./map/parse.js";

(async function() {
await load();

let data = await fetch(location.origin + "/maps/test.txt").then((res) => res.text());
let [meta, map] = parseMap(data);
ReactDOM.render(
    <RenderGrid zoom={3} width={meta.width} height={meta.height} render={map.render} />,
    document.getElementById("ct")
);

})();