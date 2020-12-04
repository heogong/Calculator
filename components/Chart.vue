<script>
import { Bar } from 'vue-chartjs'

export default {
	extends: Bar,

	props: {
		stockData: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			datacollection: {
				labels: [this.stockData[0].stock.date, this.stockData[1].stock.date],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [
							this.stockData[0].stock.stockCount *
								this.stockData[0].stock.close,
							this.stockData[0].stock.stockCount *
								this.stockData[1].stock.close,
						],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		}
	},

	mounted() {
		setTimeout(() => {
			this.renderChart(this.datacollection, this.options)
		}, 1000)
	},
}
</script>

<style>
.small {
	max-width: 600px;
	margin: 150px auto;
}
</style>
