import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';
import InfoBox from './InfoBox';
import { getCookieByKey } from '../lib/utils';
import axios from 'axios';

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
		this.checkAndSetCookieAndLocalStorage();
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

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<InfoBox path="/" uuid={getCookieByKey('uuid')} />
				</Router>
			</div>
		);
	}
}
