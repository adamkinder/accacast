import React from 'react';
import { Table } from 'semantic-ui-react'
import Moment from 'react-moment';
import 'moment-timezone';

const key = '';
const secret = '';

class Standings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            standings: []
        };
    }

    componentDidMount() {

        fetch(`http://livescore-api.com/api-client/fixtures/standings.json?key=${key}&secret=${secret}&league=25`,{
        //mode: "no-cors", // no-cors, cors, *same-origin
        })
        
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    standings: result.data.fixtures
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

    const { error, isLoaded, standings } = this.state;

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
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Home Team</Table.HeaderCell>
                        <Table.HeaderCell>Away Team</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {fixtures.map(fixture => (
                    <Table.Row key={fixture.id}>
                        <Table.Cell>
                            <Moment format="D MMM YYYY">
                                {fixture.date}
                            </Moment>
                        </Table.Cell>
                        <Table.Cell>{fixture.time}</Table.Cell>
                        <Table.Cell>{fixture.home_name}</Table.Cell>
                        <Table.Cell>{fixture.away_name}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        );
    }
    }
}

export default Standings;