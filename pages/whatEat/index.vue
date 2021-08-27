<template>
	<section>
		<b-field class="column"
			><b-progress type="is-warning" :value="processing" show-value>{{
				`${processCount} / ${totalProcess}`
			}}</b-progress></b-field
		>
		<!-- https://v3.ko.vuejs.org/guide/transitions-list.html -->
		<transition-group name="fade" tag="b-field" grouped>
			<template v-if="!selectedEatObj.length > 0">
				<template v-for="eat in vsList">
					<eat-content
						:key="eat"
						class="column"
						:eat-data="eat"
						@parentNextEatFn="nextEat"
					/>
				</template>
			</template>
			<template v-else>
				<template v-for="selectEat in selectedEatObj">
					<eat-content
						:key="selectEat"
						class="column"
						:eat-data="selectEat"
						:is-selected="selectedEatObj.length > 0"
						@parentNextEatFn="nextEat"
						@parentResetEat="resetEat"
					/>
				</template>
			</template>
		</transition-group>
	</section>
</template>

<script>
// import axios from 'axios'
import EatContent from './eatContent.vue'

export default {
	layout: 'customEat',
	components: {
		EatContent,
	},

	data() {
		return {
			eatList: [],
			vsList: [],
			totalProcess: 0,
			isSelect: false,
			selectedEatObj: [],
			fireStoreHistoryData: [],
			fireStoreSelectData: [],
		}
	},

	computed: {
		processCount() {
			return this.totalProcess - this.eatList.length
		},
		processing() {
			return parseInt(
				((this.totalProcess - this.eatList.length) / this.totalProcess) * 100,
			)
		},
		makeRandomValue() {
			return Math.floor(Math.random() * this.eatList.length)
		},
	},

	async created() {
		this.$store.commit('setAppTitle', '오늘 뭐 먹지?')
		await this.setData()
		await this.initVsList()
	},

	methods: {
		// async setData() {
		// 	const response = await axios.get('/eatData.json')
		// 	this.eatList = response.data
		// },

		async setData() {
			const whatEatData = this.$fire.firestore
				.collection('whatEat')
				.doc('eatData')

			const snapshot = await whatEatData.get()
			this.eatList = snapshot.data().data
		},

		initVsList() {
			this.totalProcess = this.eatList.length

			const firstRanVal = this.makeRandomValue
			this.vsList.push(this.eatList[firstRanVal])
			this.eatList.splice(firstRanVal, 1)

			const secondRanVal = this.makeRandomValue
			this.vsList.push(this.eatList[secondRanVal])
			this.eatList.splice(secondRanVal, 1)

			this.setHistoryData()
		},

		async nextEat(selectedEat) {
			if (this.eatList.length > 0) {
				this.vsList = [selectedEat]
				this.fireStoreSelectData.push(selectedEat)

				const ranVal = this.makeRandomValue
				this.vsList.push(this.eatList[ranVal])
				this.eatList.splice(ranVal, 1)

				this.setHistoryData()
			} else {
				this.selectedEatObj.push(selectedEat)
				this.fireStoreSelectData.push(selectedEat)
				this.isSelect = true

				const eats = this.$fire.firestore.collection('eats')
				const docData = {
					historyData: this.fireStoreHistoryData,
					selectData: this.fireStoreSelectData,
				}

				const result = await eats.add(docData)
				alert(result.id)
			}
		},

		// firestore VS 리스트 데이터
		setHistoryData() {
			this.fireStoreHistoryData.push({
				first: this.vsList[0],
				second: this.vsList[1],
			})
		},

		async resetEat() {
			this.selectedEatObj = []
			this.vsList = []
			this.fireStoreHistoryData = []
			this.fireStoreSelectData = []
			await this.setData()
			await this.initVsList()
		},
	},
}
</script>

<style scoped>
@import url('@/assets/bulma/css/bulma.min');

.fade-enter-active,
.fade-leave-active {
	transition: all 1s ease;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(30px);
}
</style>
