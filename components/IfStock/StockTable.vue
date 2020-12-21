<template>
	<b-table :data="stockData">
		<template scope="props">
			<template v-if="props.row.stock != null">
				<b-table-column field="stock" label="날짜" centered>
					{{ props.row.stock.date }}
				</b-table-column>
				<b-table-column field="stock" label="stock" centered>
					{{ props.row.stock.close }}
				</b-table-column>
				<b-table-column label="amount" centered>
					{{ stockData[0].stock.stockCount }}
				</b-table-column>
				<b-table-column field="stock" label="금액($)" centered>
					{{
						(stockData[0].stock.stockCount * props.row.stock.close)
							| numeral('0,0')
					}}
				</b-table-column>
				<b-table-column field="stock" label="수익률(%)" centered>
					{{
						((stockData[0].stock.stockCount * props.row.stock.close) /
							getAmount -
							1)
							| numeral('0.00%')
					}}
				</b-table-column>
			</template>
		</template>
	</b-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: {
		stockData: {
			type: Array,
			required: true,
		},
	},

	computed: mapGetters({
		getAmount: 'IfStock/amount',
	}),
}
</script>

<style></style>
