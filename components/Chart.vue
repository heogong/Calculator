<template>
	<canvas id="myChart" ref="myChart" width="100" height="100"></canvas>
</template>

<script>
export default {
	props: {
		stockData: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			aaa: this.stockData,
		}
	},

	// computed: {
	// 	chartData: {
	// 		get() {
	// 			return this.aaa
	// 		},
	// 		set() {
	// 			this.aaa.push(
	// 				this.stockData.map(value => {
	// 					return value.stock.stockCount * value.stock.close
	// 				}),
	// 			)
	// 		},
	// 	},
	// },

	mounted() {
		// const ctx = document.getElementById('myChart')
		// const ctx = this.$refs.myChart.getContext('2d')
		// eslint-disable-next-line no-unused-vars
		const myChart = new this.$_Chart(this.$refs.myChart.getContext('2d'), {
			type: 'bar',
			data: {
				labels: [this.aaa[0].stock.date, this.aaa[1].stock.date],
				datasets: [
					{
						label: '# of Votes',
						// data: [
						// 	this.stockData[0].stock.stockCount *
						// 		this.stockData[0].stock.close,
						// 	this.stockData[0].stock.stockCount *
						// 		this.stockData[1].stock.close,
						// ],
						data: [111, 222],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
						],
						borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		})
	},
}
</script>

<style></style>
