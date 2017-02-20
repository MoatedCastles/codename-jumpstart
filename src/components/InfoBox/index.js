import { h, Component } from 'preact';
const WARNING_MESSAGE = 'United Club passes are guaranteed valid, but do not gaurantee entry during times of high capacity. They can make exceptions, so be nice.';

export default class InfoBox extends Component {
	
	constructor(props){
		super(props);
	}

	render({uuid, hideWarning}) {
		uuid = uuid === undefined ? 'no uuid' : uuid;
		return (
		<div class="infobox">
    		<h4>{WARNING_MESSAGE}</h4>
    		<span className="clickable blue" onClick={hideWarning}><small>x - i get it, geez</small></span>
    	</div>
		);
	}
}