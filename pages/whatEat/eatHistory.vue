<template>
	<section>
		<!-- <div class="block">
			<b-field grouped group-multiline>
				<div class="control">
					<b-switch v-model="showSocial"> Show Social step </b-switch>
				</div>
				<div class="control">
					<b-switch v-model="isAnimated"> Animated </b-switch>
				</div>
				<div class="control">
					<b-switch v-model="isRounded"> Rounded </b-switch>
				</div>
				<div class="control">
					<b-switch v-model="isStepsClickable"> Clickable Marker </b-switch>
				</div>
			</b-field>
			<b-field grouped group-multiline>
				<div class="control">
					<b-switch v-model="hasNavigation"> Navigation Buttons </b-switch>
				</div>
				<div class="control">
					<b-switch v-model="customNavigation"> Custom Navigation </b-switch>
				</div>
				<div class="control">
					<b-switch v-model="isProfileSuccess">
						Set <code>is-success</code> for profile
					</b-switch>
				</div>
			</b-field>
			<b-field v-if="hasNavigation" grouped group-multiline>
				<b-field label="Prev icon">
					<b-select v-model="prevIcon">
						<option value="chevron-left">Chevron</option>
						<option value="arrow-left">Arrow</option>
					</b-select>
				</b-field>
				<b-field label="Next icon">
					<b-select v-model="nextIcon">
						<option value="chevron-right">Chevron</option>
						<option value="arrow-right">Arrow</option>
					</b-select>
				</b-field>
				<b-field label="Label position">
					<b-select v-model="labelPosition">
						<option value="bottom">Bottom</option>
						<option value="right">Right</option>
						<option value="left">Left</option>
					</b-select>
				</b-field>
				<b-field label="Mobile mode">
					<b-select v-model="mobileMode">
						<option :value="null">-</option>
						<option value="minimalist">Minimalist</option>
						<option value="compact">Compact</option>
					</b-select>
				</b-field>
				<b-field label="Mobile mode">
					<b-select v-model="mobileMode">
						<option :value="null">-</option>
						<option value="minimalist">Minimalist</option>
						<option value="compact">Compact</option>
					</b-select>
				</b-field>
			</b-field>
		</div> -->
		<b-field>
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
				<template v-for="(historyEat, index) in historyEatData">
					<b-step-item
						:key="index"
						:step="index"
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

				<!-- <b-step-item
				step="1"
				label="김치찌개 vs 된장찌개"
				:clickable="isStepsClickable"
			>
				<h1 class="title has-text-centered">김치찌개</h1>
				<img
					:src="require(`~/assets/images/whatEat/chinese.jpg`)"
					alt="Placeholder image"
				/>
			</b-step-item> -->
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

	created() {
		this.initData()
	},

	methods: {
		async initData() {
			const eats = this.$fire.firestore
				.collection('selectEat')
				.doc('Xhazrc2rzEW1p1Gi0E8s')

			const snapshot = await eats.get()
			this.historyEatData = snapshot.data().historyData
			this.selectEatData = snapshot.data().selectData
		},
	},
}
</script>

<style></style>
