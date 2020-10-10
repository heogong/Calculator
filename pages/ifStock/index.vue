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
				@input="() => (compareStock[0].date = selectedDate)"
			>
			</b-datepicker>
		</b-field>
		<b-field>
			<b-button @click="searchStock">Click Me</b-button>
		</b-field>
		<!-- <b-field grouped>
			<b-field expanded>
				<card />
			</b-field>
			<b-field expanded>
				<card />
			</b-field>
		</b-field> -->
	</section>
</template>

<script>
// import axios from 'axios'
import _ from 'lodash'
// import FetchData from '~/components/FetchData'
// import Card from '@/components/Card'
import { getSearchStock, getSymbol } from '@/api/index.js'

// https://api.exchangeratesapi.io/latest?base=USD&symbols=KRW : 환율api

const COMPARE_STOCK = [
	{ date: new Date() },
	{ date: new Date(Date.parse(new Date()) - 1 * 1000 * 60 * 60 * 24) },
]

export default {
	components: {
		// FetchData,
		// Card,
	},
	data() {
		return {
			symbolData: [],
			selected: null,
			isFetching: false,
			selectedDate: new Date(),
			compareStock: COMPARE_STOCK,
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
			this.compareStock.map(item => {
				getSearchStock(this.selected.symbol, this.convertDate(item.date)).then(
					({ data }) => {
						item.stock = data[0]
					},
				)
			})
		},

		convertDate(date) {
			const dd = date.getDate().toString()
			const mm = (date.getMonth() + 1).toString()
			const yyyy = date.getFullYear().toString()

			return `${yyyy}${mm[1] ? mm : '0' + mm[0]}${dd[1] ? dd : '0' + dd[0]}`
		},
	},
}
</script>

<style></style>
