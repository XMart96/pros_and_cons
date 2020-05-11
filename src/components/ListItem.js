import React from 'react';
import * as Icon from 'react-feather';

export default class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			id: null,
			value: ""
		};
	}

	editItem = e => {
		this.setState({ 
			edit: !this.state.edit, 
			id: e.target.tabIndex,
			value: e.target.innerHTML
		});
	}; 

	changeHandler = e => this.setState({ value: e.target.value });

	saveItem = () => {
		this.props.editItem(this.props.dataType, this.state.id, this.state.value);
		this.setState({ edit: !this.state.edit });
	}

	removeItem = e => this.props.removeItem(this.props.dataType, e.currentTarget.tabIndex);

	render() {
		if (this.state.edit) {
			return(
				<li className="listItem" data-type={this.props.dataType}>
					<input onChange={this.changeHandler} className="listItemInput" type="text" value={this.state.value} />
					<span onClick={this.saveItem} className="saveIcon"><Icon.Save size={20} /></span>
				</li>
			);
		} else {
			return(
				<li className="listItem" data-type={this.props.dataType}>
					<span tabIndex={this.props.id} onClick={this.editItem} className="listItemText">{this.props.text}</span>
					<span tabIndex={this.props.id} onClick={this.removeItem} className="removeIcon"><Icon.Trash2 size={20} /></span>
				</li>
			);
		}
	}
}
