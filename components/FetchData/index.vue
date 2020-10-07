<script>
import axios from 'axios'

export default {
	props: {
		url: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			response: null,
			loading: false,
		}
	},

	created() {
		axios
			.get(this.url)
			.then(response => {
				console.log(response)
				this.response = response
				this.loading = true
			})
			.catch(error => {
				alert('[ERROR] FETCHING THE DATA', error)
				console.log(error)
			})
	},
	render() {
		return this.$scopedSlots.default({
			response: this.response,
			loading: this.loading,
		})
	},
}
</script>

<style></style>
