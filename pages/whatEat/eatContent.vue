<template>
	<div>
		<div class="card" @click="nextEat(eatData)">
			<!-- <div class="card-header-title has-text-centered">{{ eatData.name }}</div> -->
			<!-- <div class="cardTitle has-text-centered">{{ eatData.name }}</div> -->
			<div class="card-image">
				<figure class="image is-1by1">
					<img
						:src="require(`~/assets/images/whatEat/${eatData.image}.jpg`)"
						alt="Placeholder image"
					/>
				</figure>
			</div>
		</div>

		<div class="pt-2">
			<!-- <div>구매하기</div> -->
			<div v-if="isSelected">
				<b-button
					tag="a"
					target="_blank"
					size="is-small"
					expanded
					@click="resetEat"
					>다시하기</b-button
				>
				<b-button
					tag="a"
					target="_blank"
					size="is-small"
					expanded
					@click="resetEat"
					>공유하기</b-button
				>
				<b-button
					tag="nuxt-link"
					:to="{
						path: '/whatEat/eatHistory',
						query: { historyId: firestoreId },
					}"
					size="is-small"
					expanded
					>내역보기</b-button
				>
			</div>
			<b-button
				v-else
				type="is-link"
				tag="a"
				:href="eatData.link"
				target="_blank"
				size="is-small"
				expanded
				outlined
			>
				<span class="coupangStyle1">cou</span
				><span class="coupangStyle2">p</span><span class="coupangStyle3">a</span
				><span class="coupangStyle4">n</span
				><span class="coupangStyle5">g</span> 구매하기</b-button
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		eatData: {
			type: Object,
			required: true,
		},
		// 최종선택 값
		isSelected: {
			type: Boolean,
		},
		//
		firestoreId: {
			type: String,
			required: true,
		},
	},

	methods: {
		nextEat(eatData) {
			if (this.isSelected) {
				window.open(eatData.link)
			} else {
				this.$emit('parentNextEatFn', eatData)
			}
		},

		resetEat() {
			this.$emit('parentResetEat')
		},
	},
}
</script>

<style scoped>
@import url('@/assets/bulma/css/bulma.min');

img {
	object-fit: cover;
}

.card {
	/* border-radius: 25px; */
	background-color: #eee;
	cursor: pointer;
	outline: none;
	box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
}

.card:active {
	box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
	position: relative;
	top: 2px;
}

.cardTitle {
	padding: 0.75rem;
	font-weight: bold;
}

.coupangStyle1 {
	color: brown;
	font-weight: bold;
}

.coupangStyle2 {
	color: rgb(255, 0, 0);
	font-weight: bold;
}

.coupangStyle3 {
	color: gold;
	font-weight: bold;
}

.coupangStyle4 {
	color: green;
	font-weight: bold;
}

.coupangStyle5 {
	color: darkturquoise;
	font-weight: bold;
}
</style>
