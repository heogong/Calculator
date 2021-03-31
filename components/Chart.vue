<script>
import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	// mixins: [mixins.reactiveProp],

	props: {
		stockData: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			datacollection: null,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					callbacks: {
						label(tooltipItem, data) {
							return tooltipItem.yLabel
								.toFixed(2)
								.replace(/\d(?=(\d{3})+\.)/g, '$&,')
						},
					},
				},
			},
		}
	},

	computed: {
		duration() {
			return this.stockData.map((v, index) => `${++index}년`)
		},
		totalMoney() {
			return this.stockData.map(v => v.totalMoney)
		},
	},

	watch: {
		// async stockData() {
		// 	await this.fillData()
		// 	await await this.renderChart(this.datacollection, this.options)
		// },
		stockData: {
			deep: true,
			async handler() {
				await this.fillData()
				await this.renderChart(this.datacollection, this.options)
				// await this.testaa()
			},
		},
	},

	mounted() {
		// this.renderChart(this.datacollection, this.options)
	},

	methods: {
		fillData() {
			this.datacollection = {
				labels: this.duration,
				datasets: [
					{
						label: '금액',
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						fill: 'start',
						data: this.totalMoney,
					},
				],
			}
		},

		testaa() {
			alert('ddddd')
		},
	},
}
</script>

<style></style>
