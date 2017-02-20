import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	
	renderLoginAccountButton(loggedIn){
		return loggedIn ? 
			(<Link href="/account">Account</Link>)
			: (<button>login</button>);
	}

	render() {
		return (
			<header class={style.header}>
				<h1>Instant Lounge</h1>
				<nav>
					<Link href="/">Buy</Link>
					{this.renderLoginAccountButton(true)}
				</nav>
			</header>
		);
	}
}
