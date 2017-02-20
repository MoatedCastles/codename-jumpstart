import { h, Component } from 'preact';
import style from './style';
import qrcode from 'qrcodejs';

export default class QRWidget extends Component {

	componentDidMount() {

	}

	// Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div>
				<div id="qrcode">Loading...</div>
			</div>
		);
	}
}
