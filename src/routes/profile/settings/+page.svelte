<script lang="ts">
	import { setDoc, doc } from 'firebase/firestore'

	import { userStore, userSettings } from '$lib/store'
	import type { UserStore, UserSettings } from '$lib/store'
	import { firestore } from '$lib/firebase'

	import { onDestroy } from 'svelte'

	let user: UserStore

	let isLoading = false

	$: {
		if (user === undefined) isLoading = true
	}

	let modrinthToken: string | null = null

	const saveSettings = async () => {
		if (user === null || user === undefined) return
		isLoading = true
		try {
			const docRef = doc(firestore, 'users', user.uid)
			await setDoc<UserSettings>(docRef, { modrinthToken })
		} catch (exception) {
			console.error('Error adding document', exception)
		}
		isLoading = false
	}

	const unsubscribeUser = userStore.subscribe((value) => {
		user = value
	})

	const unsubscribeSettings = userSettings.subscribe(async (settings) => {
		isLoading = true
		if (settings === undefined) return
		const value = await settings
		isLoading = false
		if (value === null) return
		modrinthToken = value.modrinthToken
	})

	onDestroy(() => {
		unsubscribeUser()
		unsubscribeSettings()
	})
</script>

<div>
	<div>
		<div class="tokenField">
			<label for="modrinth-token" class="tokenLabel">Modrinth token</label>
			<input
				id="modrinth-token"
				type="text"
				bind:value={modrinthToken}
				disabled={isLoading}
				class="tokenInput"
			/>
		</div>
		<p>
			Log in on Modrinth, open Settings › User settings › PATs › Create a PAT, and select following
			checkboxes:
		</p>
		<ul>
			<li>Read user data</li>
			<li>Read projects</li>
		</ul>
		<p>And select expire date</p>
	</div>
	<button type="button" on:click={saveSettings} disabled={isLoading}>Save</button>
</div>

<style>
	.tokenField {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.tokenLabel {
		flex-shrink: 0;
	}

	.tokenInput {
		width: 100%;
	}
</style>
