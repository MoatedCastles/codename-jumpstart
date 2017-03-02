import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import BuyWidget from './BuyWidget';
// import Profile from './profile';
import InfoBox from './InfoBox';
import { getCookieByKey } from '../lib/utils';
import axios from 'axios';
import QRCode from 'qrcode.react';
import QRCodeWrapper from './QRCodeWrapper';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor(){
		super();
		var noLocalStorageFunc = () => console.log('No localStorage support in browser');
		var shamFunc = noLocalStorageFunc;

		if(!window.localStorage){
			window.localStorage =  { getItem: shamFunc, setItem: shamFunc };
		}
		var showWarning = window.localStorage.getItem('hideWarning') === null ? true : false;
		this.state = {
			showWarning
		};
		this.checkAndSetCookieAndLocalStorage();
	}

	renderInfoBox(){

		if(window.localStorage.getItem('hideWarning') === null) {
			return (<InfoBox path="/" uuid={getCookieByKey('uuid')} hideWarning={this.hideWarning.bind(this)} />);
		}
	}

	hideWarning(){
		window.localStorage.setItem('hideWarning','1');
		this.setState( { showWarning: false });
	}

	checkAndSetCookieAndLocalStorage(){
		var uuid = window.localStorage.getItem('uuid');
		var cookie = document.cookie;
		if(uuid === null){
			if(cookie.includes('uuid=')){
				uuid = getCookieByKey('uuid');
				if(uuid !== null)
					window.localStorage.setItem('uuid',uuid);
				} else {
					axios.get('/uuid').then(resp => {
						window.localStorage.setItem('uuid',resp.data);
					});
				}
		} else {
			document.cookie = 'uuid=' + uuid;
		}
	}

	showBuyWidgetOrQRCode(){
		const uri = `bitcoin:1Bt7tUXoYJ3hX9R6b1ZgMXah4i2Dzfo7eR?amount=0.02&label=United%20Club%20pass`;
		return (
			(this.state.uri !== undefined && this.state.uri !== null)
				? <QRCodeWrapper uri={this.state.uri	} />
				: <BuyWidget path="/" setURI={this.setURI.bind(this)} />
		);
	}

	setURI(uri){
		this.setState( {uri} );
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
				<div path="/">
					{this.renderInfoBox()}
					{this.showBuyWidgetOrQRCode()}
				</div>
				<div path="/account">
					<h3>Nothing here yet</h3>
				</div>
				</Router>

			</div>
		);
	}
}
