<template>
	<ins
		class="kakao_ad_area"
		style="display: none"
		:data-ad-unit="kakaoAdKey"
		data-ad-width="320"
		data-ad-height="100"
	></ins>
</template>

<script>
export default {
	data() {
		return {
			kakaoAdKey: process.env.KAKAO_AD_KEY,
		}
	},
	head: {
		script: [
			{
				type: 'text/javascript',
				src: '//t1.daumcdn.net/kas/static/ba.min.js',
				async: true,
			},
		],
	},
}
</script>

<style></style>
