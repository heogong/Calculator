<template>
	<section>
		<b-field class="has-text-centered">
			<b-steps
				v-model="activeStep"
				:animated="isAnimated"
				:rounded="isRounded"
				:has-navigation="hasNavigation"
				:icon-prev="prevIcon"
				:icon-next="nextIcon"
				:label-position="labelPosition"
				:mobile-mode="mobileMode"
				size="is-small"
			>
				<!-- <div>{{ $route.query }}</div> -->
				<template v-for="(historyEat, index) in historyEatData">
					<b-step-item
						:key="index"
						:step="`${index + 1}`"
						:label="`${historyEat.first.name} VS ${historyEat.second.name}`"
						:clickable="isStepsClickable"
					>
						<h1 class="title has-text-centered">
							{{
								selectEatData.length !== index + 1
									? `Pick! ${selectEatData[index].name}`
									: `오늘은! ${selectEatData[index].name}`
							}}
						</h1>
						<img
							:src="
								require(`~/assets/images/whatEat/${selectEatData[index].image}.jpg`)
							"
						/>
					</b-step-item>
				</template>
				<template v-if="customNavigation" #navigation="{ previous, next }">
					<b-button
						outlined
						type="is-danger"
						icon-pack="fas"
						icon-left="backward"
						:disabled="previous.disabled"
						@click.prevent="previous.action"
					>
						Previous
					</b-button>
					<b-button
						outlined
						type="is-success"
						icon-pack="fas"
						icon-right="forward"
						:disabled="next.disabled"
						@click.prevent="next.action"
					>
						Next
					</b-button>
					<b-button
						outlined
						icon-pack="fas"
						icon-right="forward"
						@click.prevent="activeStep = selectEatData.length - 1"
					>
						최종pick
					</b-button>
				</template>
			</b-steps>
		</b-field>
	</section>
</template>

<script>
export default {
	layout: 'customEat',
	data() {
		return {
			activeStep: 0,

			showSocial: false,
			isAnimated: true,
			isRounded: true,
			isStepsClickable: true,

			hasNavigation: true,
			customNavigation: false,
			isProfileSuccess: false,

			prevIcon: 'chevron-left',
			nextIcon: 'chevron-right',
			labelPosition: 'bottom',
			mobileMode: 'minimalist',

			historyEatData: [],
			selectEatData: [],
		}
	},

	computed: {
		historyId() {
			return this.$route.query.historyId
		},

		dataLength() {
			return this.selectEatData.length
		},
	},

	created() {
		this.initData()
	},

	updated() {
		this.activeStep = this.dataLength - 1
	},

	methods: {
		async initData() {
			const eats = this.$fire.firestore
				.collection('selectEat')
				.doc(this.historyId)
			// .doc('Xhazrc2rzEW1p1Gi0E8s')

			const snapshot = await eats.get()
			this.historyEatData = snapshot.data().historyData
			this.selectEatData = snapshot.data().selectData
		},
	},
}
</script>

<style></style>
