import React from 'react';

class Produce extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reset: 0,
            updateTime: 250,
            times: {
                farms: 0,
                mountains: 0,
                villages: 0,
                forests: 0,
                tundras: 0
            }
        }
        this.timer = null;
        this.updateResources = this.updateResources.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.updateResources, 250);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    updateResources() {
        let locations = Object.entries(this.props.data.workerLocations);
        locations.map((location, index) => {
            if (location[0] === 'farms') {
                if (this.state.times.farms >= this.props.data.clocks.farms) {
                    this.props.data.resources.food += location[1];
                    let times = this.state.times;
                    times.farms = 0;
                    this.setState(() => ({times: times}));
                } else {
                    let times = this.state.times;
                    times.farms += this.state.updateTime;
                    this.setState(() => ({times: times}));
                }
            }
            if (location[0] === 'forests') {
                if (this.state.times.forests >= this.props.data.clocks.forests) {
                    this.props.data.resources.wood += location[1];
                    let times = this.state.times;
                    times.forests = 0;
                    this.setState(() => ({times: times}));
                } else {
                    let times = this.state.times;
                    times.forests += this.state.updateTime;
                    this.setState(() => ({times: times}));
                }
            }
            if (location[0] === 'mountains') {
                if (this.state.times.mountains >= this.props.data.clocks.mountains) {
                    this.props.data.resources.metal += location[1];
                    let times = this.state.times;
                    times.mountains = 0;
                    this.setState(() => ({times: times}));
                } else {
                    let times = this.state.times;
                    times.mountains += this.state.updateTime;
                    this.setState(() => ({times: times}));
                }
            }
            if (location[0] === 'tundra') {
                if (this.state.times.tundra >= this.props.data.clocks.tundra) {
                    this.props.data.resources.oil += location[1];
                    let times = this.state.times;
                    times.tundra = 0;
                    this.setState(() => ({times: times}));
                } else {
                    let times = this.state.times;
                    times.tundra += this.state.updateTime;
                    this.setState(() => ({times: times}));
                }
            }
            if (location[0] === 'villages') {
                if (this.state.times.villages >= this.props.data.clocks.villages) {
                    this.props.data.workers += location[1];
                    let times = this.state.times;
                    times.villages = 0;
                    this.setState(() => ({times: times}));
                } else {
                    let times = this.state.times;
                    times.villages += this.state.updateTime;
                    this.setState(() => ({times: times}));
                }
            }
            return false;
        });
    }

    getTotalWorkersUsed() {
        let locations = Object.entries(this.props.data.workerLocations);
        let usedWorkers = 0;
        locations.map((location, index) => {
            usedWorkers += location[1];
            return false;
        });
        return usedWorkers;
    }

    addWorker(location, numWorkers) {
        if (numWorkers > 0 && this.getTotalWorkersUsed() < this.props.data.workers) {
            if (location === 'farms' && this.props.data.workerLocations.farms < this.props.data.locations.farms) {
                this.props.data.workerLocations.farms++; 
            } else if (location === 'forests' && this.props.data.workerLocations.forests < this.props.data.locations.forests) {
                this.props.data.workerLocations.forests++; 
            } else if (location === 'mountains' && this.props.data.workerLocations.mountains < this.props.data.locations.mountains) {
                this.props.data.workerLocations.mountains++; 
            } else if (location === 'tundras' && this.props.data.workerLocations.tundras < this.props.data.locations.tundras) {
                this.props.data.workerLocations.tundras++; 
            } else if (location === 'villages' && this.props.data.workerLocations.villages < this.props.data.locations.villages) {
                this.props.data.workerLocations.villages++; 
            }
        } else if (numWorkers < 0 && this.getTotalWorkersUsed() > 0) {
            if (location === 'farms' && this.props.data.workerLocations.farms > 0) {
                this.props.data.workerLocations.farms--; 
            } else if (location === 'forests' && this.props.data.workerLocations.forests > 0) {
                this.props.data.workerLocations.forests--; 
            } else if (location === 'mountains' && this.props.data.workerLocations.mountains > 0) {
                this.props.data.workerLocations.mountains--; 
            } else if (location === 'tundras' && this.props.data.workerLocations.tundras > 0) {
                this.props.data.workerLocations.tundras--; 
            } else if (location === 'villages' && this.props.data.workerLocations.villages > 0) {
                this.props.data.workerLocations.villages--; 
            }
        }

        this.setState({reset: 0});
    }

    render() {
        return (
            <>
                <div className="produce">
                    <div className="title">Produce</div>
                    <ul>
                        <li>Farms: {this.props.data.workerLocations.farms}/{this.props.data.locations.farms} <span className="down-worker" onClick={() => this.addWorker('farms', -1)}>-</span><span className="up-worker" onClick={() => this.addWorker('farms', 1)}>+</span></li>
                        <li>Forests: {this.props.data.workerLocations.forests}/{this.props.data.locations.forests} <span className="down-worker" onClick={() => this.addWorker('forests', -1)}>-</span><span className="up-worker" onClick={() => this.addWorker('forests', 1)}>+</span></li>
                        <li>Mountains: {this.props.data.workerLocations.mountains}/{this.props.data.locations.mountains} <span className="down-worker" onClick={() => this.addWorker('mountains', -1)}>-</span><span className="up-worker" onClick={() => this.addWorker('mountains', 1)}>+</span></li>
                        <li>Tundras: {this.props.data.workerLocations.tundras}/{this.props.data.locations.tundras} <span className="down-worker" onClick={() => this.addWorker('tundras', -1)}>-</span><span className="up-worker" onClick={() => this.addWorker('tundras', 1)}>+</span></li>
                        <li>Villages: {this.props.data.workerLocations.villages}/{this.props.data.locations.villages} <span className="down-worker" onClick={() => this.addWorker('villages', -1)}>-</span><span className="up-worker" onClick={() => this.addWorker('villages', 1)}>+</span></li>
                    </ul>
                </div>
            </>
        );
    }
}

export default Produce;