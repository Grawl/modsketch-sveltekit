import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import {
	FIREBASE_API_KEY,
	FIREBASE_APP_ID,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
} from '$lib/env'

export const firebaseApp = initializeApp({
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
})

export const firebaseAuth = getAuth(firebaseApp)

export const googleAuthProvider = new GoogleAuthProvider()

export const onUser = (watch: (user: User | null) => void) => {
	onAuthStateChanged(firebaseAuth, (state) => watch(state))
}

export const signInWithGoogle = () =>
	signInWithPopup(firebaseAuth, googleAuthProvider).catch((error) => {
		const credential = GoogleAuthProvider.credentialFromError(error)
		console.error({ error, credential })
	})

export const logout = (callback: () => void) => signOut(firebaseAuth).then(() => callback)

export const firestore = getFirestore(firebaseApp)
