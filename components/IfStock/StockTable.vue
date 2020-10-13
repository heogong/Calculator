<template>
	<b-table :data="stockData">
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
				<b-table-column label="수량" centered>
					{{ stockData[0].stock.stockCount }}
				</b-table-column>
				<b-table-column field="stock" label="금액($)" centered>
					{{
						parseFloat(
							stockData[0].stock.stockCount * props.row.stock.close,
						).toFixed(3)
					}}
				</b-table-column>
				<b-table-column field="stock" label="수익률(%)" centered>
					{{
						parseFloat(
							((stockData[0].stock.stockCount * props.row.stock.close) /
								amount -
								1) *
								100,
						).toFixed(3)
					}}
				</b-table-column>
			</template>
		</template>
	</b-table>
</template>

<script>
export default {
	props: {
		stockData: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style></style>
