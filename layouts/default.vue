<template>
	<div class="contents-wrap">
		<header-form></header-form>
		<kakao-ad></kakao-ad>
		<nuxt class="body" />
		<coupang-part></coupang-part>
		<footer-form></footer-form>
	</div>
</template>

<script>
import HeaderForm from '@/components/HeaderForm'
import FooterForm from '@/components/FooterForm'
import kakaoAd from '@/components/KakaoAd'
import coupangPart from '@/components/CoupangPartners'

export default {
	components: {
		HeaderForm,
		FooterForm,
		kakaoAd,
		coupangPart,
	},
	mounted() {
		// window.Kakao.init('process.env.KAKAO_INIT_KEY')
	},
}
</script>

<style scoped>
.footer {
	/* background-color: #181600; */
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
