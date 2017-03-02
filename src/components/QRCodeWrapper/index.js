import { h, Component } from 'preact';
import Purchase from '../../requests/purchase.js';
import QRCode from 'qrcode.react';

export default class QRCodeWrapper extends Component {

	constructor(props){
		super(props);
		this.state = {
				paymentComplete: false,
				imageData: ''
		};
	}

	componentDidMount() {
		const PAYMENT_COMPLETE = 'PAYMENT_COMPLETE';
		const socket = new WebSocket('ws://localhost:3000/');
		//socket.onopen = (event) => console.log(event);
		socket.onmessage = (event) => {
			if(event.type === PAYMENT_COMPLETE){
				this.setState({
					imageData: event.imageData
				})
			} else {
				console.log('In ELSE: ',event);
			}
		};
	}

	renderQROrComplete(){
		return (this.state.paymentComplete && this.state.imageData !== '')
			? (<div className="payment_complete"><img src={this.state.imageData} /></div>)
			: ( <div><QRCode value={this.props.uri} level={this.errorCorrectLevel} /></div>);
	}

	render() {
		const errorCorrectLevel = 'H';

		return (
			<div>
				{this.renderQROrComplete()}
			</div>
		);
	}
}
