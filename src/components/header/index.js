import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {

	handleLoginLogout(){

	}

	render() {
		return (
			<header class={style.header}>
				<h1>Instant Lounge</h1>
				<nav>
					<Link href="/">Buy</Link>
					<Link href="/account">Account</Link>
					<a className="pointer" onClick={(e) => {e.preventDefault(); alert('a')} }>Login</a>
				</nav>
			</header>
		);
	}
}
