<script>
	import Header from '$modules/Header.svelte'
	import './global.css'
	import { browser } from '$app/environment'

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	})
</script>

<QueryClientProvider client={queryClient}>
	<div class="app">
		<Header />
		<main>
			<slot />
		</main>
	</div>
</QueryClientProvider>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
