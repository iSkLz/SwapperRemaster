export default class StatusBar extends React.Component {
    render() {
        let {
            gkeys, skeys, bkeys,
            swaps, deaths, moves
        } = this.props.stats;

        return <div class="statusbar">
            <div class="statusbar-keys">
                <StatusCount img="key/gold" count={gkeys} />
                <StatusCount img="key/silver" count={skeys} />
                <StatusCount img="key/bronze" count={bkeys} />
            </div>
            <div class="statusbar-stats">
                <StatusCount img="swap/pickup" count={swaps} />
                <StatusCount img="misc/skull" count={deaths} />
                <StatusCount img="misc/moves" count={moves} />
            </div>
        </div>;
    }
}

export class StatusCount extends React.Component {
    render() {
        return <div className="statusitem">
            <img src={sprites[this.props.img]} />
            {this.props.count}
        </div>;
    }
}