<template>
	<section class="section">
		<p class="content"><b>Selected:</b> {{ getStock }}</p>
		<b-field label="Find a movie">
			<stock-auto></stock-auto>
		</b-field>
		<b-field label="Select a date">
			<stock-date></stock-date>
		</b-field>
		<b-field>
			<b-radio-button
				v-model="selectedCurrency"
				native-value="USD"
				type="is-danger"
			>
				<span>$</span>
			</b-radio-button>

			<b-radio-button
				v-model="selectedCurrency"
				native-value="KRW"
				type="is-success"
				@input="() => (amount = 1)"
			>
				<span>₩</span>
			</b-radio-button>
			<b-input v-model="amount"></b-input>
		</b-field>
		<b-filed>{{ exchangeDate }} 기준</b-filed>
		<b-field>
			<b-button @click="searchStock">Click Me</b-button>
		</b-field>
		<b-field>
			<stock-table :stock-data="compareStock"></stock-table>
		</b-field>
	</section>
</template>

<script>
// import FetchData from '~/components/FetchData'
import { mapGetters } from 'vuex'
import { getSearchStock, getKRWExchange } from '@/api/index'
import StockAuto from '@/components/IfStock/StockAuto.vue'
import StockTable from '@/components/IfStock/StockTable.vue'
import StockDate from '@/components/IfStock/StockDate.vue'

const COMPARE_STOCK = [
	{
		stock: {},
	},
	{
		stock: {},
	},
]

export default {
	components: {
		StockAuto,
		StockDate,
		StockTable,
		// FetchData,
	},
	data() {
		return {
			isFetching: false,
			compareStock: COMPARE_STOCK,
			selectedCurrency: 'USD',
			amount: 1,
			exchangeDate: null,
		}
	},

	computed: mapGetters({
		getStock: 'IfStock/stock',
		getSelectedDate: 'IfStock/selectedDate',
	}),

	methods: {
		async searchStock() {
			if (this.selectedCurrency === 'KRW') await this.conversionExchange()

			await this.compareStock.map(async (item, index) => {
				const callUrl =
					index === 0
						? `stock/${this.getStock.symbol}/chart/date/${this.convertDate(
								this.getSelectedDate,
								1,
						  )}`
						: `stock/${this.getStock.symbol}/chart/1d`

				const { data } = await getSearchStock(callUrl)

				item.stock = null
				item.stock = data[data.length - 1]

				item.stock.stockCount = parseInt(this.amount / item.stock.close)
			})
		},

		async conversionExchange() {
			const { data } = await getKRWExchange(
				this.convertDate(this.getSelectedDate, 2),
			)

			this.selectedCurrency = 'USD'
			this.amount = parseFloat(data.rates.USD * this.amount).toFixed(2)
			this.exchangeDate = data.date
		},

		convertDate(date, type) {
			const dd = date.getDate().toString()
			const mm = (date.getMonth() + 1).toString()
			const yyyy = date.getFullYear().toString()

			return type === 1
				? `${yyyy}${mm[1] ? mm : '0' + mm[0]}${dd[1] ? dd : '0' + dd[0]}`
				: `${yyyy}-${mm[1] ? mm : '0' + mm[0]}-${dd[1] ? dd : '0' + dd[0]}`
		},
	},
}
</script>

<style></style>
