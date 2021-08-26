<template>
	<div>
		<div class="card" @click="nextEat(eatData)">
			<div class="card-header-title has-text-justified">{{ eatData.name }}</div>
			<div class="card-image">
				<figure class="image is-2by1">
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
				>구매하기</b-button
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
</style>
