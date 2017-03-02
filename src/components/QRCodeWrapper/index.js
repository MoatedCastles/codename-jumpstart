import { h, Component } from 'preact';
import Purchase from '../../requests/purchase.js';
import QRCode from 'qrcode.react';

export default class QRCodeWrapper extends Component {

	constructor(props){
		super(props);
		this.state = {
				paymentComplete: false
		};

	}

	render() {
		const errorCorrectLevel = 'H';

		return (
			<div>
				<QRCode value={this.props.uri} level={this.errorCorrectLevel} />
			</div>
		);
	}
}
