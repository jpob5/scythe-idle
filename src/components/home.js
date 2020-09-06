import React from 'react';
import Resources from './resources';
import Produce from './produce';
import Move from './move';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                workers: 2,
                money: 5,
                locations: {
                    farms: 1,
                    mountains: 0,
                    villages: 0,
                    forests: 1,
                    tundras: 0
                },
                workerLocations: {
                    farms: 0,
                    mountains: 0,
                    villages: 0,
                    forests: 0,
                    tundras: 0
                },
                resources: {
                    wood: 0,
                    oil: 0,
                    metal: 0,
                    food: 0
                },
                clocks: {
                    farms: 10000,
                    mountains: 10000,
                    villages: 100000,
                    forests: 10000,
                    tundras: 10000
                },
                availableLocations: ['villages']
            }
        }
    }


    render() {
        return (
            <>
                <Resources data={this.state.data}/>
                <Produce data={this.state.data}/>
                <Move data={this.state.data}/>
            </>
        );
    }
}

export default Home;