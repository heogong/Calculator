<template>
	<div class="columns">
		<template v-for="eat in vsList">
			<div :key="eat" class="column is-half" @click="nextEat(eat)">
				<div class="card">
					<div class="card-image">
						<figure class="image is-2by1">
							<img
								src="https://bulma.io/images/placeholders/1280x960.png"
								alt="Placeholder image"
							/>
						</figure>
					</div>
					<div class="card-content">
						<div class="content">
							{{ eat }}
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
				'피자',
				'치킨',
				'짜장면',
				'김밥',
				'돈까스',
				'순대국',
				'라면',
				'김치찌개',
				'된장찌개',
				'비빔밥',
				'간장게장',
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
