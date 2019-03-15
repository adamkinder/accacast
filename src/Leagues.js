import React from 'react';
import { Table } from 'semantic-ui-react'
import 'moment-timezone';

class Leagues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            leagues: []
        };
    }

    componentDidMount() {

        fetch(`http://livescore-api.com/api-client/leagues/list.json?key=z2eKtfmFuAgFgPsH&secret=4X9OsDIxxO1bGlffntZRJmweXNTdDmVH&country=19`,{
        //mode: "no-cors", // no-cors, cors, *same-origin
        })
        
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    leagues: result.data.league
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

    const { error, isLoaded, leagues } = this.state;

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
                        <Table.HeaderCell>Name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {leagues.map(league => (
                    <Table.Row key={league.id}>
                        <Table.Cell>{league.name}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
        );
    }
    }
}

export default Leagues;