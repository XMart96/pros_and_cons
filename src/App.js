import React from 'react';
import './App.css';
import { config } from "./config.js";
import Loader from './components/Loader.js';
import ListBlock from './components/ListBlock.js';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null
		};
	}

	componentDidMount = async () => {
		const groupId = await this.fetchURL(config.groupIdURL);
		const userId = await this.fetchURL(config.userIdURL);
		this.setState({
			groupId: groupId.groupId,
			userId: userId.userId
		}, this.getData);
	};

	fetchURL = async url => {
		try {
			const r = await fetch(url);
			const j = await r.json();
			return j;
		} catch(e) {
			console.error(`Cannot get ${url}: ${e.message}`);
		}
	}

	getData = async () => {
		try {
			const r = await fetch(`${config.dataURL}${this.state.groupId}/user/${this.state.userId}`);
			const j = await r.json();
			this.setState({data: j});
		} catch(e) {
			console.error(`Cannot get data: ${e.message}`);
		}
	}
	
	setData = async () => {
		try {
			await fetch(`${config.dataURL}${this.state.groupId}/user/${this.state.userId}`, {
				method: 'PUT',
				body: JSON.stringify(this.state.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch(e) {
			console.error(`Cannot set data: ${e.message}`);
		}
	}

	addItem = (t, i) => {
		const d = this.state.data;
		if (t === "pros") {
			d.pros.push(i);
		} else if (t === "cons") {
			d.cons.push(i);
		}
		this.setState({data: d}, this.setData);
	}

	editItem = (t, i, v) => {
		const d = this.state.data;
		if (t === "pros") {
			d.pros[i] = v;
		} else if (t === "cons") {
			d.cons[i] = v;
		}
		this.setState({data: d}, this.setData);
	};

	removeItem = (t, i) => {
		const d = this.state.data;
		if (t === "pros") {
			d.pros.splice(i, 1);
		} else if (t === "cons") {
			d.cons.splice(i, 1);
		}
		this.setState({data: d}, this.setData);
	};

	render() {
		return (
			<main>
				<header>Should I ... ?</header>
				{ this.state.data ? 
					<div className="content">
						<ListBlock 
							header="Pro's"
							data={this.state.data.pros}
							id="pros"
							addItem={this.addItem}
							editItem={this.editItem}
							removeItem={this.removeItem}
						/>
						<ListBlock 
							header="Con's" 
							data={this.state.data.cons}
							id="cons"
							addItem={this.addItem}
							editItem={this.editItem}
							removeItem={this.removeItem}
						/>
					</div> 
				: 
					<Loader />
				}
			</main>
		);
	}
}
