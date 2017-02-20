import { h, Component } from 'preact';
//const WARNING_MESSAGE = 'United Club passes are guaranteed valid, but do not gaurantee entry during times of high capacity. Check before purchasing, or just try to rebut gently the denial (can def work).';

export default class InfoBox extends Component {
	render({uuid}) {
		uuid = uuid === undefined ? 'no uuid' : uuid;
		return (
		<div>
    		<h2>WARNING_MESSAGE {uuid} </h2	>
    	</div>
		);
	}
}