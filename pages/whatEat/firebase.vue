<template>
	<div>{{ db }}</div>
</template>

<script>
export default {
	data() {
		return {
			analytics: '',
			db: '',
		}
	},

	async created() {
		const aa = [
			{ first: 'a', second: 'b', selected: 'a' },
			{ first: 'a', second: 'b', selected: 'a' },
		]

		const eats = this.$fire.firestore.collection('eats').doc('abc')
		// const whatEat = this.$fire.firestore.collection('whatEat').doc('eatData')

		const snapshot = await eats.get()
		this.db = snapshot.data()

		const docData = {
			stringExample: 'Hello world!!!',
			booleanExample: true,
			numberExample: 3.14159265,
			arrayExample: aa,
			objectExample: {
				a: 5,
				b: {
					nested: 'foo',
				},
			},
		}

		// whatEat.set({ data: response.data })

		eats.set(docData)

		this.$fire.firestore
			.collection('whatEat')
			.where('name', '==', '피자')
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data())
				})
			})
			.catch(error => {
				console.log('Error getting documents: ', error)
			})
	},
}
</script>

<style></style>
