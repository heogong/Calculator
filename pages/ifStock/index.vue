<template>
	<section>
		<p class="content"><b>Selected:</b> {{ selected }}</p>
		<b-field label="Find a movie">
			<b-autocomplete
				:data="data"
				placeholder="e.g. Fight Club"
				field="title"
				:loading="isFetching"
				@typing="getAsyncData"
				@select="option => (selected = option)"
			>
				<template slot-scope="props">
					<div class="media">
						<div class="media-left">
							<!-- <fetch-data
								:url="`https://cloud.iexapis.com/stable/stock/${props.option.symbol}/logo?token=pk_bae6de0699bc4db482e826631e82db06`"
							>
								<div slot-scope="{ response }">
									<img width="32" :src="response.data.url" />
								</div>
							</fetch-data> -->
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
		<b-field>
			<fetch-data
				:url="`https://cloud.iexapis.com/stable/stock/aapl/logo?token=pk_bae6de0699bc4db482e826631e82db06`"
			>
				<div slot-scope="{ response }">
					<img width="32" :src="response.data.url" />
					{{ response.data.url }}
				</div>
			</fetch-data>
		</b-field>
	</section>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import FetchData from '~/components/FetchData'

export default {
	components: {
		FetchData,
	},
	data() {
		return {
			data: [],
			selected: null,
			isFetching: false,
		}
	},

	methods: {
		getAsyncData: _.debounce(function (symbol) {
			if (!symbol.length) {
				this.data = []
				return
			}
			this.isFetching = true
			axios
				.get(
					`https://sandbox.iexapis.com/stable/search/${symbol}?token=Tsk_5b927ae7348c4bc486d0633873beec22`,
				)
				.then(({ data }) => {
					this.data = []
					data.map(item => this.data.push(item))
				})
				.catch(error => {
					this.data = []
					throw error
				})
				.finally(() => {
					this.isFetching = false
				})
		}, 500),
	},
}
</script>

<style></style>
