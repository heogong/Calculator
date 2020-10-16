<template>
	<section class="hero is-warning">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">
					<span>{{ getTitle }}</span>
				</h1>
				<h2 v-if="getDesc !== null" class="subtitle has-text-grey">
					- {{ getDesc }}
				</h2>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: mapGetters({
		getTitle: 'appTitle',
		getDesc: 'appDesc',
	}),
}
</script>

<style></style>
