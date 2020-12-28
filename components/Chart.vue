<script>
import { Bar } from 'vue-chartjs'

export default {
	extends: Bar,

	props: {
		stockData: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			options: {
				responsive: true,
			},
		}
	},

	// object 값만 감지가 가능한듯
	watch: {
		stockData() {
			alert('watch')
			this.renderChart(this.stockData, this.options)
		},
	},

	mounted() {
		this.renderChart(this.stockData, this.options)
	},
}
</script>

<style>
.small {
	max-width: 600px;
	margin: 150px auto;
}
</style>
