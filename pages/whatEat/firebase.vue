<template>
	<div>aaaa</div>
</template>

<script>
import { initializeApp } from 'firebase/firebase-firestore.js'
// import { getAnalytics } from 'firebase/storage'

// const firebaseConfig = {
// 	apiKey: 'AIzaSyCbTooDoKHB5y8dc9w9h9CUZFG6DY5u3N8',
// 	authDomain: 'calproject-6fe1c.firebaseapp.com',
// 	projectId: 'calproject-6fe1c',
// 	storageBucket: 'calproject-6fe1c.appspot.com',
// 	messagingSenderId: '136456100913',
// 	appId: '1:136456100913:web:c87ae6029d185b38288910',
// 	measurementId: 'G-HYV62BSE8S',
// }

export default {
	data() {
		return {
			analytics: '',
			db: '',
		}
	},

	created() {
		const firebase = initializeApp({
			apiKey: 'AIzaSyCbTooDoKHB5y8dc9w9h9CUZFG6DY5u3N8',
			authDomain: 'calproject-6fe1c.firebaseapp.com',
			projectId: 'calproject-6fe1c',
		})
		this.db = firebase.firestore()
	},
}
</script>

<style></style>
