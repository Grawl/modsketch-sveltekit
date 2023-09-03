import { sveltekit } from '@sveltejs/kit/vite'
import { config } from 'dotenv-safe'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'

import { author, repository, version } from './package.json'

config({ allowEmptyValues: true, path: existsSync('.env') ? '.env' : '.env.example' })

const { VITE_PORT } = process.env

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: Number(VITE_PORT) ?? 3456,
	},
	define: {
		PACKAGE_AUTHOR_EMAIL: `'${author.email}'`,
		PACKAGE_REPOSITORY: `'${repository}'`,
		PACKAGE_VERSION: `'${version}'`,
	},
})
