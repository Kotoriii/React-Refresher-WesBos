import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	myInput = React.createRef();

	goToStore = (event) => {
		event.preventDefault();
		const storeName = this.myInput.value.value; //react thing + JS .value
		this.props.history.push(`/store/${storeName}`); //react router history
	}

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore} >
				<h2>Please enter a Store</h2>
				<input type="text" required placeholder="Store Name" ref={this.myInput} defaultValue={getFunName()} />
				<button type="submit">Visit Store</button>
			</form>
		)
	}
}

export default StorePicker;