import React from 'react';
import ListItem from './ListItem.js';
import Form from './ListForm.js';

export default function ListBlock(props) {
	return(
		<section className="listContainer" id={props.id}>
			<h2>{props.header}</h2>
			<ul className="list">
				{props.data.map((t, i) => {
					return(
						<ListItem 
							text={t} 
							key={i} 
							id={i}
							dataType={props.id}
							editItem={props.editItem}
							removeItem={props.removeItem}
						/>
					);
				})}
			</ul>
			<Form type={props.id} addItem={props.addItem} />
		</section>
	);
}
