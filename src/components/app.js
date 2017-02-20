import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';
import InfoBox from './InfoBox';
import { getCookieByKey } from './lib/utils';


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
		
	var uuid = window.localStorage.getItem('uuid');
	if(uuid === null) {

	}


	if(uuid === null && cookie.includes('uuid=')) {
		
		window.localStorage.setItem('uuid',uuid);
	} else if(!cookie.includes('uuid=') && uuid !== null) {
			
	}

		this.state = {
				uuid
			};
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<InfoBox path="/" uuid={this.state.uuid} />
				</Router>
			</div>
		);
	}
}
