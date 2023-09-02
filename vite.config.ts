import { sveltekit } from '@sveltejs/kit/vite'
import { config } from 'dotenv-safe'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'

config({ allowEmptyValues: true, path: existsSync('.env') ? '.env' : '.env.example' })

const { VITE_PORT } = process.env

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: Number(VITE_PORT) ?? 3456,
	},
})
