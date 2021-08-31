<template>
	<section class="hero is-small is-warning">
		<div class="hero-head">
			<div class="container">
				<div class="hero-body">
					<div class="container">
						<h1 class="title">
							<span>{{ getTitle }}</span>
						</h1>
						<h2 v-if="getDesc !== ''" class="subtitle has-text-grey">
							- {{ getDesc }}
						</h2>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			hambugerActive: false,
		}
	},

	computed: {
		...mapGetters({
			getTitle: 'appTitle',
			getDesc: 'appDesc',
		}),

		routePath() {
			return this.$route.path
		},
	},
}
</script>

<style scope></style>
