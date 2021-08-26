<template>
	<section class="hero is-small is-warning">
		<div class="hero-head">
			<div class="container">
				<span
					class="navbar-burger burger"
					data-target="navbarMenuHeroA"
					:class="{ 'is-active': hambugerActive }"
					@click="() => (hambugerActive = !hambugerActive)"
				>
					<span></span>
					<span></span>
					<span></span>
				</span>
				<div
					id="navbarMenuHeroA"
					class="navbar-menu"
					:class="{ 'is-active': hambugerActive }"
				>
					<div class="navbar-end">
						<nuxt-link
							to="/dutch"
							class="navbar-item"
							:class="{ 'is-active': routePath === '/dutch' }"
							@click.native="hambugerActive = false"
							>더치페이계산기</nuxt-link
						>
						<nuxt-link
							to="/cmpRate"
							class="navbar-item"
							:class="{ 'is-active': routePath === '/cmpRate' }"
							@click.native="hambugerActive = false"
							>스마트복리계산기</nuxt-link
						>
						<nuxt-link
							to="/whatEat"
							class="navbar-item"
							:class="{ 'is-active': routePath === '/whatEat' }"
							@click.native="hambugerActive = false"
							>오늘뭐먹지?</nuxt-link
						>
					</div>
				</div>
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
