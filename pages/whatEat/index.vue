<template>
	<section>
		<b-field class="column"
			><b-progress type="is-warning" :value="processing" show-value>{{
				`${processCount} / ${totalProcess}`
			}}</b-progress></b-field
		>

		<b-field class="column">
			<h3 v-if="vsList.length > 0" class="title is-3 has-text-centered">
				{{
					selectedEatObj.length > 0
						? `오늘은! ${selectedEatObj[0].name}`
						: `${vsList[0].name} vs ${vsList[1].name}`
				}}
			</h3>
		</b-field>

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
						:firestore-id="fireStoreId"
						@parentNextEatFn="nextEat"
						@parentResetEat="resetEat"
					/>
				</template>
			</template>
		</transition-group>
	</section>
</template>

<script>
import axios from 'axios'
import EatContent from './eatContent.vue'

const APP_TITLE = '오늘 뭐 먹지?'
const APP_DESC = '오늘 뭐 먹냐'

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
			fireStoreId: '',
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
		this.$store.commit('setAppTitle', APP_TITLE)
		this.$store.commit('setAppDesc', APP_DESC)
		await this.setData()
		await this.initVsList()
	},

	methods: {
		async setData() {
			const response = await axios.get('/eatData.json')
			this.eatList = response.data
		},

		// async setData() {
		// 	const whatEatData = this.$fire.firestore
		// 		.collection('whatEat')
		// 		.doc('eatData')

		// 	const snapshot = await whatEatData.get()
		// 	this.eatList = snapshot.data().data
		// },

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

		nextEat(selectedEat) {
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

				this.saveFireStoreEatData() // firestore 데이터 저장
				this.confirmCustom() // 상품유도 confirm
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

		async saveFireStoreEatData() {
			const eats = this.$fire.firestore.collection('selectEat')
			const docData = {
				historyData: this.fireStoreHistoryData,
				selectData: this.fireStoreSelectData,
				date: new Date(),
			}

			const result = await eats.add(docData)

			this.fireStoreId = result.id
		},

		confirmCustom() {
			this.$buefy.dialog.confirm({
				title: '해당 상품을 구매해보시는 건 어떠세요?',
				message: `<div class='has-text-centered'>${this.selectedEatObj[0].name}<br/>
				${this.selectedEatObj[0].iframeLink}`,
				confirmText: '좋습니다.',
				cancelText: '됐습니다.',
				type: 'is-success',
				onConfirm: () => window.open(this.selectedEatObj[0].link),
			})
		},
	},
	head: {
		title: '오늘 뭐 먹지? - 오늘의 메뉴를 정해보자!',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: '오늘 뭐 먹지?',
				name:
					'오늘뭐먹지,오늘 뭐 먹지?,뭐먹지?,음식,메뉴,오늘의메뉴,식사,오늘의식사,맛있는거,골라',
				content:
					'오늘뭐먹지,오늘 뭐 먹지?,뭐먹지?,음식,메뉴,오늘의메뉴,식사,오늘의식사,맛있는거,골라',
			},
			{
				hid: 'og:title',
				property: 'og:title',
				content: '오늘 뭐 먹지?',
			},
			{
				hid: 'og:description',
				property: 'og:description',
				content: '오늘의 식사 메뉴를 정해보자!',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/restaurant-48.png' }],
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

.modal-card-title {
	font-size: 1rem;
}

@media screen and (max-width: 768px) {
	.modal-card .animation-content {
		width: 90% !important;
	}
}
</style>
