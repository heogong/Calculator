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
			// datacollection: {
			// 	labels: [this.stockData[0].stock.date, this.stockData[1].stock.date],
			// 	datasets: [
			// 		{
			// 			label: 'Data One',
			// 			backgroundColor: '#f87979',
			// 			data: [this.stockData1, this.stockData2],
			// 		},
			// 	],
			// },
			options: {
				responsive: true,
			},
		}
	},
	// watch: {
	// 	chartData() {
	// 		this.renderChart.update()
	// 	},
	// },

	mounted() {
		// setTimeout(() => {
		this.renderChart(this.stockData, this.options)
		// }, 1000)
	},
}
</script>

<style>
.small {
	max-width: 600px;
	margin: 150px auto;
}
</style>
