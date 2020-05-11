import React from 'react';
import * as Icon from 'react-feather';

export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		};
	}

	changeHandler = e => this.setState({ value: e.target.value });

	addItem = e => {
		e.preventDefault();
		if (this.state.value) {
			this.props.addItem(this.props.type, this.state.value);
			this.setState({value: ""});
		}
	}

	render() {
		return(
			<form onSubmit={this.addItem} className="listItemForm">
				<input onChange={this.changeHandler} value={this.state.value} type="text" className="listItemInput" placeholder="Add item ..." />
				<span onClick={this.addItem} className="addIcon"><Icon.PlusCircle size={20} /></span>
			</form>
		);
	}
}
