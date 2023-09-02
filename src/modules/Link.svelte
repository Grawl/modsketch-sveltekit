<script lang="ts">
	import { page } from '$app/stores'

	export let url: string = ''
</script>

{#if $page.url.pathname === url}
	<span><slot /></span>
{:else}
	<a href={url}><slot /></a>
{/if}
