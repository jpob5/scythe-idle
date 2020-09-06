import React from 'react';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0
        }
        
        this.timer = null;
        this.getAvailableWorkers = this.getAvailableWorkers.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.incrementNumber, 250);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    incrementNumber = () => {
        this.setState(prevState => ({ number: prevState.number + 1 }));
    }

    getAvailableWorkers() {
        let locations = Object.entries(this.props.data.workerLocations);
        let usedWorkers = 0;
        locations.map((location, index) => {
            usedWorkers += location[1];
            return false;
        });
        return (this.props.data.workers - usedWorkers);
    }

    render() {
        return (
            <>
                <div className="resources">
                    <div className="title">Resources</div>
                    <ul>
                        <li>Money: {this.props.data.money}</li>
                        <li>Food: {this.props.data.resources.food}</li>
                        <li>Metal: {this.props.data.resources.metal}</li>
                        <li>Oil: {this.props.data.resources.oil}</li>
                        <li>Wood: {this.props.data.resources.wood}</li>
                        <li>Workers: {this.props.data.workers}</li>
                        <li>Available workers: {this.getAvailableWorkers()}</li>
                    </ul>
                </div>
            </>
        );
    }
}

export default Home;