<template>
  <section>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <span>스마트 복리 계산기</span>
          </h1>
          <!-- <h2 class="subtitle has-text-grey">
            - 1차, 2차, n차... 개별 금액계산기
          </h2> -->
        </div>
      </div>
    </section>
    <section class="section">
      <b-field label="투자원금" :label-position="labelPosition">
        <b-input
          v-model="investment"
          pattern="[0-9]*"
          :use-html5-validation="false"
          @focus="delZero"
        ></b-input>
      </b-field>
      <b-field label="정기투자금" :label-position="labelPosition">
        <b-input
          v-model="regularly"
          pattern="[0-9]*"
          :use-html5-validation="false"
          @focus="delZero"
        ></b-input>
      </b-field>
      <b-field :label-position="labelPosition" expanded>
        <template v-for="(period, index) in periodArray">
          <b-radio-button
            :key="index"
            v-model="selectRatePeriod"
            :native-value="index"
            @input="selectRate"
            >{{ period.periodName }}</b-radio-button
          >
        </template>
        <b-field label="이자율(%)" :label-position="labelPosition" expanded>
          <b-numberinput
            v-model="rate"
            controls-position="compact"
            type="is-warning"
            step="1.0"
            min-step="0.1"
            :use-html5-validation="false"
          ></b-numberinput>
        </b-field>
      </b-field>
      <b-field :label="setLable" :label-position="labelPosition" expanded>
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

      <b-field>
        <b-button type="is-dark" expanded @click="calculation"
          >계산하기</b-button
        >
      </b-field>

      <section v-if="investmentArray.length > 0">
        <div class="message is-warning">
          <div class="message-body">
            <b-field grouped>
              <b-field label="총액" :label-position="labelPosition" expanded>
                <b-input
                  v-model="totalAmount"
                  type="is-warning"
                  disabled
                ></b-input>
              </b-field>
              <b-field label="수익률" :label-position="labelPosition" expanded>
                <b-input type="is-warning" disabled></b-input>
              </b-field>
              <b-field label="수익금" :label-position="labelPosition" expanded>
                <b-input
                  v-model="totalRevenue"
                  type="is-warning"
                  disabled
                ></b-input>
              </b-field>
            </b-field>
          </div>
        </div>

        <b-field label="출력" :label-position="labelPosition">
          <template v-for="(period, index) in periodArray">
            <b-radio-button
              :key="index"
              v-model="selectPeriod"
              :native-value="index"
              :disabled="period.disabled"
              @input="calculation"
              >{{
                index === 1
                  ? `${period.periodValue}개월`
                  : `${period.periodValue}${period.periodName}`
              }}</b-radio-button
            >
          </template>
        </b-field>

        <b-table :data="investmentArray" :narrowed="true">
          <template scope="props">
            <b-table-column field="id" label="기간" width="70" numeric>
              {{
                `${props.row.id + 1}  ${
                  selectPeriod == 1
                    ? '개월'
                    : periodArray[selectPeriod].periodName
                }`
              }}
            </b-table-column>

            <b-table-column field="returnInvestValue" label="수익금" centered>
              {{ props.row.returnInvestValue | numeral('0,0') }}
            </b-table-column>

            <b-table-column field="totalMoney" label="총 액" centered>
              {{ props.row.totalMoney | numeral('0,0') }}
              <!-- {{ props.row.totalMoney }} -->
            </b-table-column>

            <b-table-column label="수익률" centered>
              <span
                :class="[
                  'tag',
                  {
                    'is-info':
                      (props.row.totalMoney - Number(props.row.investment)) /
                        Number(props.row.investment) <
                      0,
                  },
                  {
                    'is-danger':
                      (props.row.totalMoney - Number(props.row.investment)) /
                        Number(props.row.investment) >=
                      0,
                  },
                ]"
              >
                {{
                  Math.round(
                    ((props.row.totalMoney - Number(props.row.investment)) /
                      Number(props.row.investment)) *
                      100
                  )
                }}%
              </span>
            </b-table-column>

            <b-table-column field="regularly" label="정기투자금" width="200">
              <b-input
                v-model="props.row.regularly"
                controls-position="compact"
                type="is-warning"
                controls-rounded
                size="is-small"
                @input="setReCal(props.row.id)"
              ></b-input>
            </b-table-column>
            <b-table-column field="rate" label="이율(%)" width="200">
              <b-numberinput
                v-model="props.row.rate"
                controls-position="compact"
                type="is-warning"
                controls-rounded
                :use-html5-validation="false"
                size="is-small"
                @input="setReCal(props.row.id)"
              ></b-numberinput>
            </b-table-column>
          </template>
        </b-table>
      </section>
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
  id: 0,
  investment: 0,
  rate: 0,
  returnInvestValue: 0,
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
    periodValue: '',
    rateValue: 0,
    disabled: true,
  },
  {
    periodName: '연',
    periodValue: '',
    rateValue: 0,
    disabled: true,
  },
]

export default {
  data() {
    return {
      labelPosition: 'on-border',
      investment: 0,
      rate: 0,
      regularly: 0,
      // investmentArray: [{ ...DEFAULT_INFO }],
      investmentArray: [],
      periodArray: PERIOD_ARRAY,
      selectRatePeriod: 0, // 이자율 기간 선택
      selectPeriod: 0, // 출력 일/월/연 기간
      period: 1,
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
    },
    totalRevenue() {
      return (
        this.investmentArray[this.investmentArray.length - 1].totalMoney -
        Number(this.investment)
      )
    },
  },

  methods: {
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
      this.setRate()
      this.investmentArray = []

      const period = this.periodArray[this.selectPeriod]

      for (let index = 0; index < period.periodValue; index++) {
        this.investmentArray.push({
          ...DEFAULT_INFO,
          id: index,
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
        // investmentData.rate = period.rateValue.toFixed(3)
        investmentData.rate = period.rateValue
        investmentData.regularly =
          index === 0 ? 0 : Number(investmentData.regularly)

        investmentData.returnInvestValue =
          (Number(tempTotalMoney) + Number(investmentData.regularly)) *
          (investmentData.rate / 100)

        // 총 금액 + 정기금액 + 이자
        investmentData.totalMoney = parseInt(
          Number(tempTotalMoney) +
            Number(investmentData.regularly) +
            Number(investmentData.returnInvestValue)
        )
      }
    },

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
            Number(this.investmentArray[i].returnInvestValue)
        )
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
