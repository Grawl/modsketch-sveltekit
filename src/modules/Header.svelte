<script>
	import logo from '$lib/images/modsketch-logo.png'
	import Auth from '$modules/auth/Auth.svelte'
	import Link from '$modules/Link.svelte'
</script>

<header>
	<div class="corner">
		<img src={logo} alt="SvelteKit" />
	</div>

	<nav>
		<ul>
			<li>
				<Link url="/">Home</Link>
			</li>
			<li>
				<Link url="/about">About</Link>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<Auth />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		display: flex;
		align-items: center;
	}

	.corner img {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li:has(span)::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav :global(a),
	nav :global(span) {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	:global(a):hover {
		color: var(--color-theme-1);
	}
</style>
