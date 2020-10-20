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
				@input="() => $store.commit('IfStock/setAmount', 1)"
			>
				<span>₩</span>
			</b-radio-button>
			<b-input v-model="amount"></b-input>
		</b-field>
		<b-filed>{{ exchangeDate }} 기준</b-filed>
		<b-field>
			<b-button @click="searchStock">Click Me</b-button>
		</b-field>
		<b-field v-if="isFetching">
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

const APP_TITLE = '주식정보'
const APP_DESC = ''
const CURRENCY = 'USD'

export default {
	components: {
		StockAuto,
		StockDate,
		StockTable,
		// FetchData,
	},

	data() {
		return {
			compareStock: [
				{
					stock: {},
				},
				{
					stock: {},
				},
			],
			selectedCurrency: CURRENCY,
			exchangeDate: null,
			isFetching: false,
		}
	},

	computed: {
		...mapGetters({
			getStock: 'IfStock/stock',
			getSelectedDate: 'IfStock/selectedDate',
		}),
		amount: {
			get() {
				return this.$store.getters['IfStock/amount']
			},
			set(value) {
				this.$store.commit('IfStock/setAmount', value)
			},
		},
	},

	created() {
		this.$store.commit('setAppTitle', APP_TITLE)
		this.$store.commit('setAppDesc', APP_DESC)
	},

	methods: {
		async searchStock() {
			if (this.selectedCurrency === 'KRW') await this.conversionExchange()

			await this.compareStock.map(async (item, index) => {
				const callUrl =
					index === 0
						? `stock/${this.getStock.symbol}/chart/date/${this.$moment(
								this.getSelectedDate,
						  ).format('YYYYMMDD')}`
						: `stock/${this.getStock.symbol}/chart/1d`

				const { data } = await getSearchStock(callUrl)

				item.stock = null
				item.stock = data[data.length - 1]

				item.stock.stockCount = parseInt(this.amount / item.stock.close)

				this.isFetching = true
			})
		},

		async conversionExchange() {
			const dateParam = this.$moment(this.getSelectedDate).format('YYYY-MM-DD')
			const { data } = await getKRWExchange(dateParam)

			this.selectedCurrency = CURRENCY
			this.amount = parseFloat(data.rates.USD * this.amount).toFixed(2)
			this.exchangeDate = data.date
		},
	},

	head: {
		title: 'TEST',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: '스마트 복리계산기',
				name: '스마트 복리계산기',
				content:
					'정기금액 기능 및 일 / 월 / 연으로 표시 가능한 복리계산기 입니다.',
			},
		],
	},
}
</script>

<style></style>
