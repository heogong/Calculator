<template>
	<section>
		<section class="section">
			<header class="docs-header">
				<h6 class="subtitle is-7 has-text-grey">
					<div>1. '참여정보' 란에 모임 총 참여인원 값과 총 방문장소를 입력</div>
					<div>2. '방문정보' 란에 각 모임인원 및 비용정보 입력</div>
					<div>3. 입력 시 자동으로 총 금액 및 1인당 더치금액 비용 출력</div>
					<div>
						4. '1인당 더치금액' 옆에 표시된 버튼 클릭으로 더치금액 변경가능
					</div>
				</h6>
			</header>
			<b-field label="참여정보" />
			<b-field grouped>
				<b-field label="총 참여인원" :label-position="labelPosition" expanded>
					<b-numberinput
						v-model="memberCount"
						controls-position="compact"
						type="is-warning"
						controls-rounded
						min="1"
						expanded
						pattern="[0-9]*"
						@input="setMemberCount(memberCount)"
					></b-numberinput>
				</b-field>
				<b-field label="총 방문 장소" :label-position="labelPosition" expanded>
					<b-numberinput
						v-model="visit"
						min="1"
						controls-position="compact"
						type="is-warning"
						controls-rounded
						expanded
						pattern="[0-9]*"
						@input="setVisit(memberCount)"
					></b-numberinput>
				</b-field>
			</b-field>

			<b-field label="방문정보" />
			<template v-for="(key, index) in visit">
				<b-field :key="index" grouped>
					<b-field label="참여자" :label-position="labelPosition" expanded>
						<b-numberinput
							v-model="memberArray[index].member"
							expanded
							min="1"
							:max="memberCount"
							controls-position="compact"
							type="is-warning"
							controls-rounded
							pattern="[0-9]*"
							@input="setPayment(index)"
						></b-numberinput>
					</b-field>
					<b-field label="비용" :label-position="labelPosition" expanded>
						<b-input
							v-model="memberArray[index].payment"
							:lazy="true"
							pattern="[0-9]*"
							:use-html5-validation="false"
							@input="setPayment(index)"
							@blur="setBlurComma(index)"
						></b-input>
					</b-field>
				</b-field>
			</template>

			<b-field label="비용" />
			<h6 class="subtitle is-7 has-text-grey">
				<b-icon icon="check" size="is-small"> </b-icon>1인당 더치금액은
				기본(10단위 반올림) 상태로 표시 됩니다.
			</h6>
			<b-field>
				<b-switch v-model="roundMode" passive-type="is-dark" type="is-warning">
					{{ roundMode ? '반올림' : '반내림' }}
				</b-switch>
				<b-field label="단위" :label-position="labelPosition">
					<b-radio-button
						v-model="selectUnit"
						native-value="10"
						type="is-warning"
					>
						<span>10원</span>
					</b-radio-button>

					<b-radio-button
						v-model="selectUnit"
						native-value="100"
						type="is-warning"
					>
						<span>100원</span>
					</b-radio-button>
				</b-field>
			</b-field>
			<b-field label="총 금액" :label-position="labelPosition" expanded>
				<b-input
					disabled
					:value="setComma(totalPayment)"
					size="is-medium"
					custom-class="has-text-black"
				/>
			</b-field>

			<b-field
				v-show="totalPayment > 0"
				grouped
				group-multiline
				label="1인당 더치금액"
				:label-position="labelPosition"
			>
				<b-input disabled :value="calTotalPay" custom-class="has-text-black" />
				<template v-for="(member, index) in memberArray">
					<b-checkbox-button
						:key="index"
						v-model="dutchCheckGroup"
						:native-value="index"
						type="is-danger"
					>
						<b-icon icon="mouse" size="is-small"> </b-icon>
						<span>{{ `${index + 1}차 : ${member.dutchPay}` }}</span>
					</b-checkbox-button>
				</template>
			</b-field>
		</section>
	</section>
</template>

<script>
const APP_TITLE = '더치페이 계산기'
const APP_DESC = '1차, 2차, n차... 개별 금액계산기'

const DEFAULT_MEMBER = {
	payment: 0,
	dutchPay: 0,
}

export default {
	components: {},

	data() {
		return {
			labelPosition: 'on-border',
			memberCount: 1,
			visit: 1,
			memberArray: [{ member: 1, ...DEFAULT_MEMBER }],
			totalPayment: 0,
			dutchCheckGroup: [0],
			selectUnit: '10',
			roundMode: true,
		}
	},

	computed: {
		calTotalPay() {
			let n = 0
			this.dutchCheckGroup.map(
				v => (n += this.delComma(this.memberArray[v].dutchPay)),
			)
			return this.setRoundMode(n)
		},
	},

	created() {
		this.$store.commit('setAppTitle', APP_TITLE)
		this.$store.commit('setAppDesc', APP_DESC)
	},

	methods: {
		setVisit(member) {
			const visitCount = this.visit - this.memberArray.length

			for (let i = 0; i < Math.abs(visitCount); i++) {
				visitCount > 0
					? this.memberArray.push({ member, ...DEFAULT_MEMBER })
					: this.memberArray.pop()
			}
			this.sumPayment()
		},

		setMemberCount(count) {
			this.memberArray.map((value, i) => {
				value.member = count
				this.setPayment(i)
			})
			this.sumPayment()
		},

		setPayment(i) {
			let result =
				this.delComma(this.memberArray[i].payment) / this.memberArray[i].member

			if (isNaN(result)) result = 0

			this.memberArray[i].dutchPay = this.setComma(parseInt(result))
			this.sumPayment()
		},

		sumPayment() {
			this.totalPayment = 0
			this.dutchCheckGroup = []
			this.memberArray.map((v, index) => {
				this.totalPayment += parseInt(this.delComma(v.payment))
				this.dutchCheckGroup.push(index)
			})
		},

		setBlurComma(i) {
			this.memberArray[i].payment = this.setComma(
				this.delComma(this.memberArray[i].payment),
			)
		},
		setRoundMode(sumDutchPay) {
			return this.roundMode
				? this.setComma(
						Math.round(sumDutchPay / this.selectUnit) * this.selectUnit,
				  )
				: this.setComma(
						Math.floor(sumDutchPay / this.selectUnit) * this.selectUnit,
				  )
		},

		kakaoShare() {
			this.$refs.kakaolink.sendLink()
		},

		setComma(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		delComma(x) {
			return parseInt(x.toString().replace(/,/gi, ''))
		},

		setNumber(x) {
			return x.toString().replace(/[^0-9]/g)
		},
	},
}
</script>
<style scoped>
.docs-header {
	border-bottom: 2px solid #f5f5f5;
	margin-bottom: 3rem;
	padding-bottom: 1rem;
}
.section {
	padding: 1rem 1.5rem;
}
</style>
