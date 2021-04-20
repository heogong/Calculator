<template>
	<div class="message is-warning">
		<div class="message-body">
			<b-field grouped group-multiline>
				<b-field label="총액" :label-position="labelPosition" expanded>
					<b-input
						v-model="totalAmountData"
						type="is-warning"
						disabled
						custom-class="has-text-black"
					></b-input>
				</b-field>
				<b-field label="수익률" :label-position="labelPosition" expanded>
					<b-input
						v-model="totalPlusPerData"
						type="is-warning"
						disabled
						custom-class="has-text-black"
					>
					</b-input>
				</b-field>
				<b-field label="수익금" :label-position="labelPosition" expanded>
					<b-input
						v-model="totalRevenueData"
						type="is-warning"
						disabled
						custom-class="has-text-black"
					></b-input>
				</b-field>
			</b-field>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		totalAmountData: {
			type: String,
			required: true,
		},
		totalPlusPerData: {
			type: String,
			required: true,
		},
		totalRevenueData: {
			type: String,
			required: true,
		},
	},
}
</script>

<style></style>
