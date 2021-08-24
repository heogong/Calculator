<template>
	<section class="section">
		<b-field
			><b-progress type="is-success" :value="10" show-value></b-progress
		></b-field>
		<b-field grouped>
			<!-- https://v3.ko.vuejs.org/guide/transitions-list.html -->
			<transition-group name="fade" tag="div">
				<div v-for="eat in vsList" :key="eat" class="column">
					<div class="card" @click="nextEat(eat)">
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

					<div class="pt-1">
						<b-button
							type="is-link"
							tag="a"
							:href="eat.link"
							target="_blank"
							expanded
							>구매하기</b-button
						>
					</div>
				</div>
			</transition-group>
		</b-field>
	</section>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			eatList: [],
			vsList: [],
			show: true,
		}
	},

	async created() {
		this.$store.commit('setAppTitle', '오늘 뭐 먹지?')
		await this.setData()
		await this.initVsList()
	},

	methods: {
		async setData() {
			const response = await axios.get('/eatData.json')
			this.eatList = response.data
		},

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

<style scoped>
@import url('@/assets/bulma/css/bulma.min');
.news_text {
	background: #ffffff;
	opacity: 1;
}

.news_text:hover {
	background: #e1ff36;
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 1s ease;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(30px);
}
</style>
