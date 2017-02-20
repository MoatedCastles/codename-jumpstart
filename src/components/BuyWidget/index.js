import { h, Component } from 'preact';
const MAX_ORDER = 4;


export default class BuyWidget extends Component {
	constructor(props){
		super(props);
		this.state = { amount: 1};
	}

	handleChange(e){
		var val = e.target.value;
		if(parseInt(e.target.value) >= MAX_ORDER){
			e.target.value = MAX_ORDER;
		} else if (parseInt(e.target.value) <= 1) {
			e.target.value = 1;
		}
		this.setState({amount: e.target.value});
	}

	render({handleBuy}) {
		return (
			<div className="buy_widget">
				<h5>Purchase United Club One Time Entry Pass</h5>
				<img className="uc_logo" src="http://i.imgur.com/LzYJQXm.jpg" />
				<span>Qty:</span>
				<input 
					type="number" 
					max="99" 
					value={this.state.amount} 
					onChange={(e) => this.handleChange(e)} 
					onMouseUp={(e) => this.handleChange(e)}
					/>
				<a className="buybtn" onClick={() => alert('buy now' + this.state.amount)}>Buy</a>
			</div>
		);
	}
}
