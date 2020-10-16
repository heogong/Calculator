<template>
	<footer class="footer">
		<div class="content">
			<div>Copyright © 2020.09.11 All rights reserved.</div>
			<div>
				<!-- <span class="">계산기</span> -->
				{{ getTitle }} by
				<a href="mailto:heogong79@gmail.com">heogong79@gmail.com</a>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: mapGetters({
		getTitle: 'appTitle',
	}),
}
</script>

<style></style>
