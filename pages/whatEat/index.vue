<template>
	<div class="columns">
		<template v-for="eat in vsList">
			<div :key="eat" class="column is-half" @click="nextEat(eat)">
				<div class="card">
					<div class="card-image">
						<figure class="image is-2by1">
							<img
								:src="require(`~/assets/images/whatEat/${eat.image}.jpg`)"
								alt="Placeholder image"
							/>
						</figure>
					</div>
					<div class="card-content">
						<div class="content">
							{{ eat.name }}
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data() {
		return {
			eatList: [
				{
					name: '피자',
					image: 'pizza',
				},
				{
					name: '치킨',
					image: 'chinese',
				},
				{
					name: '짜장면',
					image: 'chinese',
				},
				{
					name: '김밥',
					image: 'kimbab',
				},
				{
					name: '돈까스',
					image: 'restaurant',
				},
				{
					name: '순대국',
					image: 'for-money',
				},
				{
					name: '라면',
					image: 'if-the',
				},
				{
					name: '김치찌개',
					image: 'chinese',
				},
				{
					name: '된장찌개',
					image: 'chinese',
				},
				{
					name: '비빔밥',
					image: 'chinese',
				},
				{
					name: '간장게장',
					image: 'chinese',
				},
			],
			vsList: [],
		}
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

<style></style>
