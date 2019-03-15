import React from 'react';
import { Menu } from 'semantic-ui-react'
import Home from './Home'
import Live from './Live'
import Fixtures from './Fixtures'
import Leagues from './Leagues'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {
	state = { activeItem: 'home' }
	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Router>
				<div>
					<Menu tabular>
						<Menu.Item as={Link} to={'/'} name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
						<Menu.Item as={Link} to={'/live'} name='live' active={activeItem === 'live'} onClick={this.handleItemClick} />
						<Menu.Item as={Link} to={'/leagues'} name='leagues' active={activeItem === 'leagues'} onClick={this.handleItemClick} />
						<Menu.Item as={Link} to={'/fixtures'} name='fixtures' active={activeItem === 'fixtures'} onClick={this.handleItemClick} />
					</Menu>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/live' component={Live} />
						<Route path='/leagues' component={Leagues} />
						<Route path='/fixtures' component={Fixtures} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;