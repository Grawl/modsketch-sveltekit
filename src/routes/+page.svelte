<script lang="ts">
	import { onDestroy } from 'svelte'
	import type { Unsubscriber } from 'svelte/store'

	import { createQuery } from '@tanstack/svelte-query'

	import { getModrinthAPI } from '$lib/modrinth'
	import { userSettings } from '$lib/store'
	import Link from '$modules/Link.svelte'

	$: isUserSettingsLoading = $userSettings === undefined

	let modrinthAPI: ReturnType<typeof getModrinthAPI> | null = null

	let modrinthUserId: string | undefined

	$: queryModrinthAuthenticatedUser = createQuery({
		queryKey: ['modrinth-user'],
		queryFn: () => {
			if (modrinthAPI === null) throw new Error('api not ready')
			return modrinthAPI.fetchAuthenticatedUser()
		},
	})

	$: queryModrinthFollows = createQuery({
		queryKey: ['modrinth-user-follows'],
		queryFn: () => {
			if (modrinthAPI === null) throw new Error('api not ready')
			if (modrinthUserId === undefined) throw new Error('no user')
			return modrinthAPI.fetchUserFollows(modrinthUserId)
		},
	})

	let unsubscribeModrinthAuthenticatedUser: Unsubscriber

	const unsubscribeSettings = userSettings.subscribe(async (settings) => {
		if (settings === undefined) return
		const value = await settings
		if (value === null) return
		const { modrinthToken } = value
		const api = getModrinthAPI(modrinthToken)
		modrinthAPI = api
		unsubscribeModrinthAuthenticatedUser = queryModrinthAuthenticatedUser.subscribe(({ data }) => {
			if (data === undefined) return
			modrinthUserId = data.data.id
		})
	})

	onDestroy(() => {
		unsubscribeSettings()
		unsubscribeModrinthAuthenticatedUser?.()
	})
</script>

<svelte:head>
	<title>ModSketch</title>
	<meta name="description" content="Minecraft Modpack planner app" />
</svelte:head>

<section>
	{#if isUserSettingsLoading}
		<p>Loading user settings…</p>
	{:else if $queryModrinthAuthenticatedUser.isLoading}
		<p>Loading Modrinth user…</p>
	{:else if $queryModrinthAuthenticatedUser.isError}
		<p>Error: {$queryModrinthAuthenticatedUser.error.message}</p>
		<p>
			<Link url="/profile/settings">Set up Modrinth API token</Link>
		</p>
	{:else if $queryModrinthFollows.isLoading}
		<p>Loading follows…</p>
	{:else if $queryModrinthFollows.isError}
		<p>Error: {$queryModrinthFollows.error.message}</p>
	{:else if $queryModrinthFollows.isSuccess}
		{#each $queryModrinthFollows.data.data as project}
			<p>{project.title}</p>
		{/each}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
