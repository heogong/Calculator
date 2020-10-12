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
				@input="() => (amount = 0)"
			>
				<span>₩</span>
			</b-radio-button>
			<b-input v-model="amount"></b-input>
			<template v-if="selectedCurrency === 'KRW'">
				<b-button @click="conversionExchange">exchange</b-button>
			</template>
		</b-field>
		<b-filed>{{ exchangeDate }} 기준</b-filed>
		<b-field>
			<b-button @click="searchStock">Click Me</b-button>
		</b-field>
		<b-field>
			<b-table :data="compareStock">
				<template scope="props">
					<template v-if="props.row.stock != null">
						<b-table-column field="stock" label="날짜" centered>
							{{ props.row.stock.date }}
						</b-table-column>
						<b-table-column field="stock" label="시가" centered>
							{{ props.row.stock.open }}
						</b-table-column>
						<b-table-column field="stock" label="종가" centered>
							{{ props.row.stock.close }}
						</b-table-column>
						<b-table-column field="stock" label="수량" centered>
							{{ props.row.stock.stockCount }}
						</b-table-column>
						<b-table-column field="stock" label="금액" centered>
							-
						</b-table-column>
						<b-table-column field="stock" label="수익률" centered>
							-
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

const COMPARE_STOCK = [
	{
		stock: null,
	},
	{
		stock: null,
	},
]

export default {
	components: {
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
			amount: 0,
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
			})
		},

		async conversionExchange() {
			const { data } = await getKRWExchange(
				this.convertDate(this.selectedDate, 2),
			)

			this.selectedCurrency = 'USD'
			this.amount = data.rates.USD * this.amount
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
