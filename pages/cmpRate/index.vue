<template>
	<section>
		<section class="section">
			<b-field label="투자원금" :label-position="labelPosition">
				<b-input
					v-model="investment"
					pattern="[0-9]*"
					placeholder="1,000,000"
					@focus="delZero"
				></b-input>
			</b-field>
			<!-- <b-field label="정기투자금" :label-position="labelPosition">
        <b-input
          v-model="regularly"
          pattern="[0-9]*"
          :use-html5-validation="false"
          @focus="delZero"
        ></b-input>
      </b-field> -->
			<b-field grouped>
				<b-field label="이율(%)" custom-class="is-small" expanded>
					<b-field>
						<template v-for="(period, index) in periodArray">
							<b-radio-button
								:key="index"
								v-model="selectRatePeriod"
								size="is-small"
								:native-value="index"
								@input="selectRate"
								>{{ index == 2 ? '연' : period.periodName }}</b-radio-button
							>
						</template>

						<b-numberinput
							v-model="rate"
							size="is-small"
							controls-position="compact"
							type="is-warning"
							step="1.0"
							min-step="0.1"
							:use-html5-validation="false"
							expanded
						></b-numberinput>
					</b-field>
				</b-field>
				<b-field :label="setLable" custom-class="is-small" expanded>
					<b-numberinput
						v-model="period"
						size="is-small"
						controls-position="compact"
						type="is-warning"
						step="1"
						min="1"
						pattern="[0-9]*"
						expanded
						@input="setOutPutPeriod"
					></b-numberinput>
				</b-field>
			</b-field>

			<b-field>
				<b-button
					type="is-dark"
					expanded
					:disabled="isInvestment"
					@click="calculation"
					>계산하기</b-button
				>
			</b-field>

			<Chart
				v-show="investmentArray.length > 0"
				:stock-data="investmentArray"
				:period="periodArray[selectPeriod].periodName"
				:width="300"
				:height="300"
			/>

			<section v-if="investmentArray.length > 0">
				<total-summary
					:total-amount-data="totalAmount"
					:total-plus-per-data="totalPlusPer"
					:total-revenue-data="totalRevenue"
				/>

				<b-field label="출력" :label-position="labelPosition">
					<template v-for="(period, index) in periodArray">
						<b-radio-button
							:key="index"
							v-model.lazy="selectPeriod"
							:native-value="index"
							:disabled="period.disabled"
							@input="calculation(index)"
							>{{
								index === 1
									? `${period.periodValue}개월`
									: `${period.periodValue}${period.periodName}`
							}}</b-radio-button
						>
					</template>
				</b-field>
				<b-field>
					<div>
						<h6 class="subtitle is-7 has-text-grey">
							<b-icon icon="check" size="is-small"> </b-icon>출력변경 시
							"이율(%)"이 소수점 셋째 자리 까지 계산되어 수익금이 상이하니,
							결과는 참고만 하시길 바랍니다.
						</h6>
					</div>
				</b-field>

				<data-table
					:investment-data="investmentArray"
					:select-period="selectPeriod"
					:period-data="periodArray"
					@parentReCalFn="setReCal"
				/>
			</section>
		</section>
	</section>
</template>

<script>
import Chart from '@/components/Chart.vue'
import DataTable from './dataTable.vue'
import TotalSummary from './totalSummary.vue'

const APP_TITLE = '스마트 복리계산기'
const APP_DESC = ''

/**
 * investment : 투자원금
 * rate : 이율
 * regularly : 정규투자금
 * totalMoney : 각row 총 금액
 */
const DEFAULT_INFO = {
	id: 0,
	periodNo: 0, // 기간표시 값
	investment: 10000000,
	rate: 10,
	returnInvestValue: 0,
	regularly: 0,
	totalMoney: 0,
}

const PERIOD_ARRAY = [
	{
		periodName: '일',
		periodValue: 10,
		rateValue: 0,
		regularValue: 0,
		disabled: false,
	},
	{
		periodName: '월',
		periodValue: 10,
		rateValue: 0,
		regularValue: 0,
		disabled: true,
	},
	{
		periodName: '년',
		periodValue: 10,
		rateValue: 0,
		regularValue: 0,
		disabled: true,
	},
]

export default {
	components: {
		Chart,
		DataTable,
		TotalSummary,
	},
	data() {
		return {
			labelPosition: 'on-border',
			investment: DEFAULT_INFO.investment,
			rate: DEFAULT_INFO.rate,
			regularly: 0,
			// investmentArray: [{ ...DEFAULT_INFO }],
			investmentArray: [],
			periodArray: PERIOD_ARRAY,
			selectRatePeriod: 0, // 이자율 기간 선택
			selectPeriod: 0, // 출력 일/월/연 기간
			period: 10,
		}
	},

	computed: {
		setLable() {
			return `기간 (
        ${
					this.selectPeriod === 1
						? '개월'
						: this.periodArray[this.selectPeriod].periodName
				}
        )`
		},
		totalAmount() {
			return this.investmentArray[this.investmentArray.length - 1].totalMoney
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},
		totalRevenue() {
			return (
				this.investmentArray[this.investmentArray.length - 1].totalMoney -
				Number(this.investment)
			)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		},

		totalPlusPer() {
			return (
				Math.round(
					((this.investmentArray[this.investmentArray.length - 1].totalMoney -
						Number(
							this.investmentArray[this.investmentArray.length - 1].investment,
						)) /
						Number(
							this.investmentArray[this.investmentArray.length - 1].investment,
						)) *
						100,
				) + '%'
			)
		},

		isInvestment() {
			return !Number(this.investment) > 0
		},
	},

	created() {
		this.$store.commit('setAppTitle', APP_TITLE)
		this.$store.commit('setAppDesc', APP_DESC)
	},

	methods: {
		alert() {
			this.$buefy.dialog.alert('Everything looks fine!')
		},

		selectRate() {
			this.setOutPutPeriod()
			this.periodArray.map((period, i) => {
				period.disabled = !(i <= this.selectRatePeriod) // 버튼 disabled 여부
			})

			this.selectPeriod = this.selectRatePeriod // 기간버튼 자동 선택
		},

		setOutPutPeriod() {
			this.investmentArray = [] // 기간 변경 시 초기화

			if (this.selectRatePeriod === 2) {
				this.periodArray[2].periodValue = this.period
				this.periodArray[1].periodValue = this.period * 12
				this.periodArray[0].periodValue = this.period * 365
			} else if (this.selectRatePeriod === 1) {
				this.periodArray[1].periodValue = this.period
				this.periodArray[0].periodValue = this.period * 30
			} else {
				this.periodArray[0].periodValue = this.period
			}
			this.setRateRegular()
		},

		// 출력별 이율, 정기투자금 설정
		setRateRegular() {
			if (this.selectRatePeriod === 2) {
				this.periodArray[2].rateValue = this.rate
				this.periodArray[1].rateValue = this.rate / 12
				this.periodArray[0].rateValue = this.rate / 365
			} else if (this.selectRatePeriod === 1) {
				this.periodArray[1].rateValue = this.rate
				this.periodArray[0].rateValue = this.rate / 30
			} else {
				this.periodArray[0].rateValue = this.rate
			}
		},

		calculation() {
			// 초기화
			this.setRateRegular()
			this.investmentArray = []

			const period = this.periodArray[this.selectPeriod]

			for (let index = 0; index < period.periodValue; index++) {
				this.investmentArray.push({
					...DEFAULT_INFO,
					id: index,
					periodNo: index + 1,
					investment: this.investment,
					regularly: this.regularly,
				})

				const investmentData = this.investmentArray[index]
				// 각 로우 계산을 위한 임시 총 금액
				const tempTotalMoney =
					index === 0
						? this.investment
						: this.investmentArray[index - 1].totalMoney

				investmentData.id = index

				// 이자
				investmentData.rate = parseFloat(period.rateValue.toFixed(3))
				investmentData.regularly =
					index === 0 ? 0 : Number(investmentData.regularly)

				investmentData.returnInvestValue =
					(Number(tempTotalMoney) + Number(investmentData.regularly)) *
					(investmentData.rate / 100)

				// 총 금액 + 정기금액 + 이자
				investmentData.totalMoney = parseInt(
					Number(tempTotalMoney) +
						Number(investmentData.regularly) +
						Number(investmentData.returnInvestValue),
				)
			}
		},

		// 신규 계산
		setReCal(selInx) {
			for (let i = selInx; i < this.investmentArray.length; i++) {
				const tempTotalMoney =
					i === 0 ? this.investment : this.investmentArray[i - 1].totalMoney

				// 이자
				this.investmentArray[i].returnInvestValue =
					(Number(tempTotalMoney) + Number(this.investmentArray[i].regularly)) *
					(this.investmentArray[i].rate / 100)

				// 총 금액 + 정기금액 + 이자
				this.investmentArray[i].totalMoney = parseInt(
					Number(tempTotalMoney) +
						Number(this.investmentArray[i].regularly) +
						Number(this.investmentArray[i].returnInvestValue),
				)
			}
		},

		// 정기투자금 선택row부터 하위일괄적용
		// setRegular(selInx) {
		// 	for (let i = selInx; i < this.investmentArray.length; i++) {
		// 		this.investmentArray[i].regularly = this.investmentArray[
		// 			selInx
		// 		].regularly
		// 	}

		// 	this.setReCal(selInx)
		// },

		delZero() {
			if (parseInt(this.investment) === 0) {
				this.investment = ''
			}
		},
	},

	head: {
		title: '복리계산기 - 정기투자 / 이율 조절 스마트 복리계산기',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: '스마트 복리계산기',
				name: '복리계산기,복리 계산기,스마트 복리계산기,계산기,수익률,이율',
				content:
					'정기금액 기능 및 일 / 월 / 연으로 표시 가능한 복리계산기 입니다.',
			},
			{ hid: 'og:title', property: 'og:title', content: '복리계산기' },
			{
				hid: 'og:description',
				property: 'og:description',
				content:
					'정기금액 기능 및 일 / 월 / 연으로 표시 가능한 복리계산기 입니다.',
			},
		],
	},
}
</script>

<style>
.small {
	max-width: 600px;
	margin: 10px auto;
	/* display: block;
	height: 399px; */
}
</style>
