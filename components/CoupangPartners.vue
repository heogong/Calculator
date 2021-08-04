<template>
	<div class="center">
		<iframe
			src="https://ads-partners.coupang.com/widgets.html?id=504591&template=carousel&trackingCode=AF6783549&subId=&width=680&height=140"
			width="680"
			height="140"
			frameborder="0"
			scrolling="no"
			referrerpolicy="unsafe-url"
		></iframe>
		<div class="infoText">
			이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
			제공받습니다.
		</div>
	</div>
</template>

<script>
export default {
	head: {
		script: [
			{
				src: 'https://ads-partners.coupang.com/g.js',
			},
		],
	},
}
</script>

<style scoped>
.center {
	text-align: center;
}

.infoText {
	color: #e56a2c;
	font-size: 12px;
}
</style>
