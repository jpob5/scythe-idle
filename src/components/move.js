import React from 'react';

class Move extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reset: 0,
            number: 0
        }
        this.timer = null;
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

    newLocation() {
        let locations = Object.entries(this.props.data.locations);
        locations.map((location, index) => {
            if (this.props.data.availableLocations[0] === location[0]) {
                location[1]++;
                this.props.data.locations[this.props.data.availableLocations[0]]++;
                console.log(location);
            }
            return false;
        });
        console.log(this.props.data.locations);
        //this.props.data.locations = locations;
    }

    render() {
        return (
            <>
                <div className="move">
                    <div className="title">Move</div>
                    <ul>
                        <li onClick={() => this.newLocation()}>{this.props.data.availableLocations[0]}</li>
                    </ul>
                </div>
            </>
        );
    }
}

export default Move;