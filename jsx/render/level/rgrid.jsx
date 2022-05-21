import GridTile from "./tile.js";

export default class RenderGrid extends React.Component {
    render() {
        let r = this.props.render;
        let w = this.props.width;
        let h = this.props.height;
        let z = this.props.zoom;

        let tiles = [];

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (this.props.editor)
                    tiles.push(<GridTile layers={r(x, y)} />);
                else tiles.push(<GridTile key={x + ":" + y} layers={r(x, y)} />);
            }
        }

        return (
            <div className="tilesgrid" style={{
                "--zoom": z,
                "--width": w,
                "--height": h,
            }}>
                {tiles}
            </div>
        );
    }
}