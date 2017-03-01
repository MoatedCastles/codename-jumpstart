import { h, Component } from 'preact';
import style from './style';
import QRCode from 'qrcodejs';


export default class QRWidget extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount() {

		var qrcode = new QRCode("qrcode", {
    text: this.props.uri || "http://www.bitcoin.com",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
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
