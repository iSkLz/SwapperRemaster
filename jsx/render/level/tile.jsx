export default class GridTile extends React.Component {
    render() {
        return (<div>
            {
                this.props.layers.map(
                    (pic, i) =>
                    <img className={"gridlayer-" + i} src={sprites[pic]} />
                )
            }
        </div>);
    }
}