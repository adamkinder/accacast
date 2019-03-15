import React from 'react';
import 'moment-timezone';

class Live extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            live_events: []
        };
    }

    componentDidMount() {

        fetch(`http://livescore-api.com/api-client/scores/live.json?key=z2eKtfmFuAgFgPsH&secret=4X9OsDIxxO1bGlffntZRJmweXNTdDmVH`,{
        //mode: "no-cors", // no-cors, cors, *same-origin
        })
        
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    live_events: result.data.match
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {

    const { error, isLoaded, live_events } = this.state;

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            'thanks'
        );
    }
    }
}

export default Live;