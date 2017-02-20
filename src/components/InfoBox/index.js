import { h, Component } from 'preact';
const WARNING_MESSAGE = 'United Club passes are guaranteed valid, but do not gaurantee entry during times of high capacity. Check before purchasing, or just try to rebut gently the denial (can def work).';

export default class InfoBox extends Component {
	
	constructor(props){
		super(props);
	}

	render({uuid, hideWarning}) {
		uuid = uuid === undefined ? 'no uuid' : uuid;
		return (
		<div class="infobox">
    		<h4>{WARNING_MESSAGE}</h4>
    		<span className="clickable" onClick={hideWarning}><small>x - do not bug me</small></span>
    	</div>
		);
	}
}