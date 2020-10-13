<template>
	<b-table :data="compareStock">
		<template scope="props">
			<template v-if="props.row.stock != null">
				<b-table-column field="stock" label="날짜" centered>
					{{ props.row.stock.date }}
				</b-table-column>
				<b-table-column field="stock" label="시가" centered>
					{{ props.row.stock.open }}
				</b-table-column>
				<b-table-column field="stock" label="주가" centered>
					{{ props.row.stock.close }}
				</b-table-column>
				<b-table-column field="stock" label="수량" centered>
					{{ props.row.stock.stockCount }}
				</b-table-column>
				<b-table-column field="stock" label="금액($)" centered>
					{{ parseFloat(props.row.stock.StockAmount).toFixed(3) }}
				</b-table-column>
				<b-table-column field="stock" label="수익률(%)" centered>
					{{ parseFloat(props.row.stock.stockYield).toFixed(3) }}
				</b-table-column>
			</template>
		</template>
	</b-table>
</template>

<script>
import { getSearchStock } from '@/api/index'

export default {
	data() {
		return {
			compareStock: [
				{
					stock: null,
				},
				{
					stock: null,
				},
			],
		}
	},

	methods: {
		searchStock() {
			this.compareStock.map(async (item, index) => {
				const callUrl =
					index === 0
						? `stock/${this.selected.symbol}/chart/date/${this.convertDate(
								this.selectedDate,
								1,
						  )}`
						: `stock/${this.selected.symbol}/chart/1d`

				const { data } = await getSearchStock(callUrl)

				item.stock = data[data.length - 1]
				item.stock.stockCount =
					index === 0 ? parseInt(this.amount / item.stock.close) : '-'

				item.stock.StockAmount =
					index === 1
						? this.compareStock[0].stock.stockCount * item.stock.close
						: '-'
				item.stock.stockYield =
					index === 1
						? (this.compareStock[1].stock.StockAmount / this.amount - 1) * 100
						: '-'
			})
		},
	},
}
</script>

<style></style>
