<template>
	<b-autocomplete
		:data="data"
		placeholder="e.g. Fight Club"
		field="title"
		:loading="isFetching"
		:clearable="true"
		:value="symbolTicker"
		@typing="getAsyncData"
		@select="option => selectOption(option)"
	>
		<template slot-scope="props">
			<div class="media">
				<div class="media-left">
					<img width="32" :src="props.option.logoUrl" />
				</div>
				<div class="media-content">
					{{ props.option.symbol }}
					<br />
					<small> Region {{ props.option.region }} </small>
				</div>
			</div>
		</template>
	</b-autocomplete>
</template>

<script>
import _ from 'lodash'
import { getSymbol } from '@/api/index'

export default {
	data() {
		return { data: [], isFetching: false, symbolTicker: '' }
	},

	methods: {
		getAsyncData: _.debounce(async function (symbol) {
			if (!symbol.length) {
				this.data = []
				return
			}
			this.isFetching = true

			const { data } = await getSymbol(symbol)
			this.data = []
			data.map(item => this.data.push(item))

			this.isFetching = false
		}, 200),

		selectOption(option) {
			this.$store.commit('IfStock/setStock', option)
			this.symbolTicker = option.symbol
			this.$emit('callStockCompany')
		},
	},
}
</script>

<style></style>
