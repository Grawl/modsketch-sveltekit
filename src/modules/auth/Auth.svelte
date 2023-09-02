<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'

	import { onUser, signInWithGoogle, logout } from '$lib/firebase'
	import { userStore } from '$lib/store'
	import type { UserStore } from '$lib/store'

	let user: UserStore = undefined

	onUser((state) => (user = state))

	$: {
		userStore.set(user)
		if (user === null && $page.url.pathname !== '/' && browser) {
			location.href = '/'
		}
	}

	const signOut = () =>
		logout(() => {
			user = null
		})
</script>

<div class="root">
	{#if user === undefined}
		…
	{:else if user === null}
		<button type="button" on:click={signInWithGoogle}>Sign in</button>
	{:else}
		<a href="/profile">
			<img src={user.photoURL} alt={user.displayName} class="photo" width="32" />
		</a>
		<button type="button" on:click={signOut}>Logout</button>
	{/if}
</div>

<style>
	.root {
		display: flex;
		gap: 0.5rem;
	}

	.photo {
		aspect-ratio: 1/1;
		border-radius: 100%;
	}
</style>
