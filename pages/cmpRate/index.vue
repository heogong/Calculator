<template>
  <section>
    <!-- <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <span>스마트 복리 계산기</span>
          </h1>
          <h2 class="subtitle has-text-grey">
            - 1차, 2차, n차... 개별 금액계산기
          </h2>
        </div>
      </div>
    </section> -->
    <section class="section">
      <b-field label="투자원금" :label-position="labelPosition">
        <b-input
          v-model="investment"
          pattern="[0-9]*"
          :use-html5-validation="false"
          @input="initInvest"
          @focus="delZero"
        ></b-input>
      </b-field>
      <b-field label="정기투자금" :label-position="labelPosition">
        <b-input
          v-model="regularly"
          pattern="[0-9]*"
          :use-html5-validation="false"
          @input="initInvest"
          @focus="delZero"
        ></b-input>
      </b-field>

      <b-field label="이자율" :label-position="labelPosition">
        <template v-for="(period, index) in periodArray">
          <b-radio-button
            :key="index"
            v-model="selectRatePeriod"
            :native-value="index"
            @input="selectRate"
            >{{ period.periodName }}</b-radio-button
          >
        </template>

        <b-numberinput
          v-model="rate"
          controls-position="compact"
          type="is-warning"
          controls-rounded
          step="1.0"
          min-step="0.1"
          @input="initInvest"
        ></b-numberinput>
      </b-field>
      <b-field label="기간" :label-position="labelPosition">
        <template v-for="(period, index) in periodArray">
          <b-radio-button
            :key="index"
            v-model="selectPeriod"
            :native-value="index"
            :disabled="period.disabled"
            >{{ index === 1 ? '개월' : period.periodName }}</b-radio-button
          >
        </template>
        <b-numberinput
          v-model="period"
          controls-position="compact"
          type="is-warning"
          controls-rounded
          step="1"
          min="1"
          @input="setOutPutPeriod"
        ></b-numberinput>
      </b-field>
      <b-button type="is-dark" expanded @click="calculation">계산하기</b-button>

      <b-table
        :data="investmentArray"
        :columns="dataColumn"
        :narrowed="true"
      ></b-table>
    </section>
  </section>
</template>

<script>
/**
 * investment : 투자원금
 * rate : 이율
 * regularly : 정규투자금
 * totalMoney : 각row 총 금액
 */
const DEFAULT_INFO = {
  investment: 0,
  rate: 0,
  regularly: 0,
  totalMoney: 0,
}

const PERIOD_ARRAY = [
  {
    periodName: '일',
    periodValue: 1,
    rateValue: 0,
    disabled: false,
  },
  {
    periodName: '월',
    periodValue: 0,
    rateValue: 0,
    disabled: true,
  },
  {
    periodName: '연',
    periodValue: 0,
    rateValue: 0,
    disabled: true,
  },
]

const COLUMN = [
  {
    field: 'rate',
    label: 'rate',
  },
  {
    field: 'totalMoney',
    label: 'totalMoney',
  },
  {
    field: 'regularly',
    label: '정기투자금',
  },
]

export default {
  data() {
    return {
      labelPosition: 'on-border',
      investment: 0,
      rate: 0,
      regularly: 0,
      investmentArray: [{ ...DEFAULT_INFO }],
      periodArray: PERIOD_ARRAY,
      selectRatePeriod: 0, // 이자율 기간 선택
      selectPeriod: 0, // 출력 일/월/연 기간
      period: 1,
      dataColumn: COLUMN,
    }
  },

  computed: {
    // periodArray() {
    //   return this.ratePeriodArray.
    // },
    // selectRatePeriod: {
    //   get() {
    //     return 0
    //   },
    //   set(value) {
    //     this.periodArray.map((period, i) => {
    //       if (i <= value) {
    //         period.disabled = false
    //       }
    //     })
    //   },
    // },
  },

  methods: {
    initInvest() {
      this.$set(this.investmentArray[0], 'investment', this.investment)
      // this.$set(this.investmentArray[0], 'rate', this.rate)
      this.$set(this.investmentArray[0], 'regularly', this.regularly)

      this.setRate()
    },

    selectRate() {
      this.setOutPutPeriod()
      this.periodArray.map((period, i) => {
        period.disabled = !(i <= this.selectRatePeriod) // 버튼 disabled 여부
      })

      this.selectPeriod = this.selectRatePeriod // 기간버튼 자동 선택
    },

    setOutPutPeriod() {
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
      this.setRate()
    },

    setRate() {
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
      this.investmentArray = [
        {
          ...DEFAULT_INFO,
          investment: this.investment,
          regularly: this.regularly,
        },
      ]

      const period = this.periodArray[this.selectPeriod]

      for (let index = 0; index <= period.periodValue - 1; index++) {
        const investmentData = this.investmentArray[index]
        // 각 로우 계산을 위한 임시 총 금액
        const tempTotalMoney =
          index === 0
            ? this.investment
            : this.investmentArray[index - 1].totalMoney

        // 이자
        investmentData.rate = period.rateValue / 100
        investmentData.regularly = index === 0 ? 0 : investmentData.regularly

        const rateValue =
          (Number(tempTotalMoney) + Number(investmentData.regularly)) *
          investmentData.rate

        // 이자 + 총 금액
        investmentData.totalMoney = parseInt(
          Number(tempTotalMoney) + Number(rateValue)
        )

        this.investmentArray.push({
          ...DEFAULT_INFO,
          investment: this.investment,
          regularly: this.regularly,
        })
      }
    },

    delZero() {
      if (parseInt(this.investment) === 0) {
        this.investment = ''
      }
    },
  },

  head: {
    title: '',
    meta: [
      {
        hid: '복리 계산기',
        name: '복리 계산기',
        content: '복리 계산기',
      },
    ],
  },
}
</script>

<style></style>
