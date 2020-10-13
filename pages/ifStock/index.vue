<template>
	<section class="section">
		<p class="content"><b>Selected:</b> {{ selected }}</p>
		<b-field label="Find a movie">
			<b-autocomplete
				:data="symbolData"
				placeholder="e.g. Fight Club"
				field="title"
				:loading="isFetching"
				:clearable="true"
				@typing="getAsyncData"
				@select="option => (selected = option)"
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
		</b-field>
		<b-field label="Select a date">
			<b-datepicker
				v-model="selectedDate"
				placeholder="Click to select..."
				icon="calendar-today"
				trap-focus
				:unselectable-days-of-week="[0, 6]"
				:max-date="new Date(Date.parse(new Date()) - 1 * 1000 * 60 * 60 * 24)"
			>
			</b-datepicker>
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
			<!-- <stock-table></stock-table> -->
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
						<b-table-column label="수량" centered>
							{{ compareStock[0].stock.stockCount }}
						</b-table-column>
						<b-table-column field="stock" label="금액($)" centered>
							{{
								parseFloat(
									compareStock[0].stock.stockCount * props.row.stock.close,
								).toFixed(3)
							}}
						</b-table-column>
						<b-table-column field="stock" label="수익률(%)" centered>
							{{
								parseFloat(
									((compareStock[0].stock.stockCount * props.row.stock.close) /
										amount -
										1) *
										100,
								).toFixed(3)
							}}
						</b-table-column>
					</template>
				</template>
			</b-table>
		</b-field>
	</section>
</template>

<script>
import _ from 'lodash'
// import FetchData from '~/components/FetchData'
import { getSearchStock, getSymbol, getKRWExchange } from '@/api/index'
// import StockTable from '@/components/IfStock/StockTable.vue'

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
		// StockTable,
		// FetchData,
	},
	data() {
		return {
			symbolData: [],
			selected: null,
			isFetching: false,
			selectedDate: null,
			compareStock: COMPARE_STOCK,
			selectedCurrency: 'USD',
			amount: 1,
			exchangeDate: null,
		}
	},

	methods: {
		getAsyncData: _.debounce(async function (symbol) {
			if (!symbol.length) {
				this.data = []
				return
			}
			this.isFetching = true

			const { data } = await getSymbol(symbol)
			this.symbolData = []
			data.map(item => this.symbolData.push(item))

			this.isFetching = false
		}, 200),

		async searchStock() {
			if (this.selectedCurrency === 'KRW') await this.conversionExchange()

			await this.compareStock.map(async (item, index) => {
				const callUrl =
					index === 0
						? `stock/${this.selected.symbol}/chart/date/${this.convertDate(
								this.selectedDate,
								1,
						  )}`
						: `stock/${this.selected.symbol}/chart/1d`

				const { data } = await getSearchStock(callUrl)

				item.stock = null
				item.stock = data[data.length - 1]

				item.stock.stockCount = parseInt(this.amount / item.stock.close)
			})
		},

		async conversionExchange() {
			const { data } = await getKRWExchange(
				this.convertDate(this.selectedDate, 2),
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
