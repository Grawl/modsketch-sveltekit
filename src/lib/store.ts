import type { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { derived, writable } from 'svelte/store'

import { firestore } from '$lib/firebase'

export type UserStore = User | null | undefined

export const userStore = writable<UserStore>(undefined)

export type UserSettings = {
	modrinthToken: string
}

export const userSettings = derived(
	userStore,
	(user) => {
		if (user === null || user === undefined) return undefined
		const docRef = doc(firestore, 'users', user.uid)
		return getDoc(docRef).then((docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data()
				return data as UserSettings
			} else {
				return null
			}
		})
	},
	undefined
)
