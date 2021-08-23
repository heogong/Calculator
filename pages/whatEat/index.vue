<template>
	<section class="section">
		<b-field
			><b-progress type="is-success" :value="10" show-value></b-progress
		></b-field>
		<b-field grouped>
			<template v-for="eat in vsList">
				<div :key="eat" class="column is-half" @click="nextEat(eat)">
					<div class="card">
						<div class="card-header-title news_text">{{ eat.name }}</div>
						<div class="card-image">
							<figure class="image is-2by1">
								<img
									:src="require(`~/assets/images/whatEat/${eat.image}.jpg`)"
									alt="Placeholder image"
								/>
							</figure>
						</div>
					</div>
					<b-button
						type="is-primary"
						tag="a"
						:href="eat.link"
						target="_blank"
						outlined
						expanded
						>구매하기</b-button
					>
				</div>
			</template>
		</b-field>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			eatList2: [],
			eatList: [
				{
					name: '피자',
					image: 'pizza',
					link: 'https://coupa.ng/b5NKxR',
				},
				{
					name: '치킨',
					image: 'chinese',
					link: 'https://coupa.ng/b5NKzQ',
				},
				{
					name: '짜장면',
					image: 'chinese',
					link: 'https://coupa.ng/b5NKBJ',
				},
				{
					name: '김밥',
					image: 'kimbab',
					link: 'https://coupa.ng/b5NKD9',
				},
				{
					name: '돈까스',
					image: 'restaurant',
					link: 'https://coupa.ng/b5NKtx',
				},
				{
					name: '순대국',
					image: 'for-money',
					link: 'https://coupa.ng/b5NKr4',
				},
				{
					name: '라면',
					image: 'if-the',
					link: 'https://coupa.ng/b5NIqF',
				},
				{
					name: '김치찌개',
					image: 'chinese',
					link: 'https://coupa.ng/b5NJLT',
				},
				{
					name: '된장찌개',
					image: 'chinese',
					link: 'https://coupa.ng/b5NJXv',
				},
				{
					name: '비빔밥',
					image: 'chinese',
					link: 'https://coupa.ng/b5NJZx',
				},
				{
					name: '간장게장',
					image: 'chinese',
					link: 'https://coupa.ng/b5NKpI',
				},
			],
			vsList: [],
		}
	},

	beforeCreate() {
		axios.get('/eatData.json').then(response => (this.eatList2 = response.data))
	},

	created() {
		this.$store.commit('setAppTitle', '오늘 뭐 먹지?')
		this.initVsList()
	},

	methods: {
		initVsList() {
			const firstRanVal = this.makeRandomValue()
			this.vsList.push(this.eatList[firstRanVal])
			this.eatList.splice(firstRanVal, 1)

			const secondRanVal = this.makeRandomValue()
			this.vsList.push(this.eatList[secondRanVal])
			this.eatList.splice(secondRanVal, 1)
		},
		makeRandomValue() {
			return Math.floor(Math.random() * this.eatList.length)
		},

		nextEat(selectedEat) {
			this.vsList = [selectedEat]

			const ranVal = this.makeRandomValue()
			this.vsList.push(this.eatList[ranVal])
			this.eatList.splice(ranVal, 1)
		},
	},
}
</script>

<style>
.news_text {
	background: #ffffff;
	opacity: 1;
}

.news_text:hover {
	background: #e1ff36;
	opacity: 1;
}
</style>
