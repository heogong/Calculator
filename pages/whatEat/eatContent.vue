<template>
	<div>
		<div class="card" @click="nextEat(eatData)">
			<div class="card-header-title news_text">{{ eatData.name }}</div>
			<div class="card-image">
				<figure class="image is-2by1">
					<img
						:src="require(`~/assets/images/whatEat/${eatData.image}.jpg`)"
						alt="Placeholder image"
					/>
				</figure>
			</div>
		</div>

		<div class="pt-1">
			<b-button
				type="is-link"
				tag="a"
				:href="eatData.link"
				target="_blank"
				size="is-small"
				expanded
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
	},

	methods: {
		nextEat(eatData) {
			this.$emit('parentNextEatFn', eatData)
		},
	},
}
</script>

<style scoped>
@import url('@/assets/bulma/css/bulma.min');
</style>
