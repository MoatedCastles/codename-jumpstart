import { h, Component } from 'preact';
import Purchase from '../../requests/purchase.js';
import QRCode from 'qrcode.react';
import socket from 'socket.io-client';

export default class QRCodeWrapper extends Component {

	constructor(props){
		super(props);
		this.state = {
				paymentComplete: false
		};
		var io = socket(`://${document.location.hostname}/`)
		io.on('connection', () => {
			console.log('Successfully connected via socket!');
		});
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
