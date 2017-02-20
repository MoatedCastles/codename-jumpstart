import { h, Component } from 'preact';

export default class BuyWidget extends Component {
	constructor(props){
		super(props);
		this.state = { amount: 1};
	}

	handleChange(e){
		this.setState({amount: e.target.value});
	}

	render({handleBuy}) {
		return (
			<div>
				<h6>Purchase United Club One Time Entry Pass</h6>
				<img className="uc_logo" src="http://i.imgur.com/LzYJQXm.jpg" />
				<span>Qty:</span><input type="number" min="0" max="4" value={this.state.amount} onChange={(e) => this.handleChange(e)} />
				<a className="buybtn" onClick={() => alert('buy now' + this.state.amount)}>Buy</a>
			</div>
		);
	}
}
