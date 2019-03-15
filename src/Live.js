import React from 'react';
import { Table, Icon } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';

const key = '';
const secret = '';

class Live extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            live_scores: []
        };
    }

    componentDidMount() {

        fetch(`http://livescore-api.com/api-client/scores/live.json?key=${key}&secret=${secret}`,{
        //mode: "no-cors", // no-cors, cors, *same-origin
        })
        
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    live_scores: result.data.match
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

    const { error, isLoaded, live_scores } = this.state;
    //let events_url = 'http://livescore-api.com/api-client/scores/events.json?key=z2eKtfmFuAgFgPsH&secret=4X9OsDIxxO1bGlffntZRJmweXNTdDmVH';

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    }
    else {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Home Team</Table.HeaderCell>
                        <Table.HeaderCell>Score</Table.HeaderCell>
                        <Table.HeaderCell>Away Team</Table.HeaderCell>
                        <Table.HeaderCell>Live</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {live_scores.filter(match => match.status === "IN PLAY").map(match => (
                    <Table.Row key={match.id}>
                        <Table.Cell>
                            <Moment format="D MMM YYYY">
                                {match.date}
                            </Moment>
                        </Table.Cell>
                        <Table.Cell>{match.status}</Table.Cell>
                        <Table.Cell>{match.time}</Table.Cell>
                        <Table.Cell>{match.home_name}</Table.Cell>
                        <Table.Cell>{match.score}</Table.Cell>
                        <Table.Cell>{match.away_name}</Table.Cell>
                        <Table.Cell><Icon name='angle right'/></Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        );
    }
    }
}

export default Live;