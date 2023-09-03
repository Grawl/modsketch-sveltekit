import axios from 'axios'
import type { AxiosResponse } from 'axios'

type ModrinthPlatform = 'required' | 'optional' | 'unsupported'

type ModrinthProjectStatus =
	| 'approved'
	| 'archived'
	| 'rejected'
	| 'draft'
	| 'unlisted'
	| 'processing'
	| 'withheld'
	| 'scheduled'
	| 'private'
	| 'unknown'

type ModrinthProjectRequestedStatus = 'approved' | 'archived' | 'unlisted' | 'private' | 'draft'

type ModrinthDonationUrl = {
	id: string
	platform: string
	url: string
}

type ModrinthProjectType = 'mod' | 'modpack' | 'resourcepack' | 'shader'

type ModrinthProjectMonetizationStatus = 'monetized' | 'demonetized' | 'force-demonetized'

type ModrinthLicense = {
	id: string
	name: string
	url: string
}

type ModrinthPicture = {
	url: string
	featured: boolean
	title: string
	description: string
	created: string
	ordering: number
}

type ModrinthProject = {
	slug: string
	title: string
	description: string
	categories: string[]
	client_side: ModrinthPlatform
	server_side: ModrinthPlatform
	body: string
	status: ModrinthProjectStatus
	requested_status?: ModrinthProjectRequestedStatus
	additional_categories: string[] | null
	issues_url: string | null
	source_url: string | null
	wiki_url: string | null
	discord_url: string | null
	donation_urls: ModrinthDonationUrl[] | null
	project_type: ModrinthProjectType
	downloads: number
	icon_url: string | null
	color: number | null
	thread_id?: string
	monetization_status?: ModrinthProjectMonetizationStatus
	id: string
	team: string
	published: string
	updated: string
	approved?: string
	queued?: string
	followers: number
	license?: ModrinthLicense
	versions?: string[]
	game_versions?: string[]
	loaders?: string[]
	gallery: ModrinthPicture[] | null
}

type ModrinthProjectsList = ModrinthProject[]

type ModrinthPayoutData = {
	balance: number
	payout_wallet: string
	payout_wallet_type: string
	payout_address: string
}

type ModrinthUserRole = 'admin' | 'moderator' | 'developer'

type ModrinthUser = {
	username: string
	name: string | null
	email: string | null
	bio?: string
	payout_data: ModrinthPayoutData | null
	id: string
	avatar_url: string
	created: string
	role: ModrinthUserRole
	/*
	(unused)
	EARLY_MODPACK_ADOPTER
	EARLY_RESPACK_ADOPTER
	EARLY_PLUGIN_ADOPTER
	ALPHA_TESTER
	CONTRIBUTOR
	TRANSLATOR
	*/
	badges: number
	auth_providers: string[] | null
	email_verified: boolean | null
	has_password: boolean | null
	has_totp: boolean | null
}

type RMethod<T> = Promise<AxiosResponse<T>>

export const getModrinthAPI = (modrinthToken: string) => {
	const api = axios.create({
		baseURL: 'https://api.modrinth.com/v2',
		headers: {
			Authorization: modrinthToken,
			// TODO send this 'User-Agent' header instead of default axios' or svelte'
			// i dunno who rewrites it after me
			'X-User-Agent': `${PACKAGE_REPOSITORY}/${PACKAGE_VERSION} (${PACKAGE_AUTHOR_EMAIL})`,
		},
	})

	return {
		fetchAuthenticatedUser: (): RMethod<ModrinthUser> => api.get<ModrinthUser>('user'),
		fetchUserFollows: (user: string): RMethod<ModrinthProjectsList> =>
			api.get<ModrinthProjectsList>(`user/${user}/follows`),
	}
}
