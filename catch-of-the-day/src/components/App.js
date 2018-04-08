import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes'
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	state = {
		fishes : {},
		order : {}
	};

	componentDidMount() {
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	componentDidUpdate() { //localStorage
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = (fish) => {
		const fishes = { ...this.state.fishes } //... copy of an object in JS
		fishes[`fish${Date.now()}`] = fish;
		this.setState({
			fishes: fishes
		}); //copied old fishes + new fish and will overwrite existing state
	}

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = updatedFish;
		this.setState({ fishes: fishes });
	}

	deleteFish = (key) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = null;
		this.setState({ fishes: fishes });
	}

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	}

	addToOrder = (key) => {
		const order = { ...this.state.order };
		order[key] = order[key] + 1 || 1;
		this.setState({ order: order });
	}

	removeFromOrder = (key) => {
		const order = { ...this.state.order };
		delete order[key];
		this.setState({ order: order });
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} fishes={this.state.fishes} loadSampleFishes={this.loadSampleFishes} />
			</div>
		)
	}
}

export default App;