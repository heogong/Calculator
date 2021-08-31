<template>
	<div class="contents-wrap">
		<with-out-route-header-form></with-out-route-header-form>
		<kakao-ad></kakao-ad>
		<nuxt class="body" />
		<kakao-ad2></kakao-ad2>
		<footer-form></footer-form>
	</div>
</template>

<script>
import WithOutRouteHeaderForm from '@/components/WithOutRouteHeaderForm'
import FooterForm from '@/components/FooterForm'
import kakaoAd2 from '@/components/KakaoAd2'

export default {
	components: {
		WithOutRouteHeaderForm,
		FooterForm,
		kakaoAd2,
	},
}
</script>

<style scoped>
.footer {
	padding: 0.5rem 1.5rem 0.5rem;
}

a {
	color: #ffdd57;
}

.content {
	color: #777;
	font-size: 0.8em;
}
</style>
