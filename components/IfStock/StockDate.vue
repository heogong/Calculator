<template>
	<b-datepicker
		v-model="selectedDate"
		placeholder="Click to select..."
		icon="calendar-today"
		trap-focus
		:unselectable-days-of-week="[0, 6]"
		:max-date="new Date(Date.parse(new Date()) - 1 * 1000 * 60 * 60 * 24)"
	>
	</b-datepicker>
</template>

<script>
export default {
	computed: {
		selectedDate: {
			get() {
				return this.$store.getters.selectedDate
			},
			set(value) {
				this.$store.commit('IfStock/setDate', value)
			},
		},
	},
}
</script>

<style></style>
