<template>
  <section>
    <!-- <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <span>복리 계산기</span>
          </h1>
          <h2 class="subtitle has-text-grey">
            - 1차, 2차, n차... 개별 금액계산기
          </h2>
        </div>
      </div>
    </section> -->
    <section class="section">
      <b-input
        v-model="investment"
        pattern="[0-9]*"
        :use-html5-validation="false"
        @input="initInvest"
        @focus="delZero"
      ></b-input>
      <b-input
        v-model="regularly"
        pattern="[0-9]*"
        :use-html5-validation="false"
        @input="initInvest"
        @focus="delZero"
      ></b-input>

      <b-field label="이자율" :label-position="labelPosition">
        <b-radio v-model="selectPeriod" :native-value="0"> 일 </b-radio>
        <b-radio v-model="selectPeriod" :native-value="1"> 개월 </b-radio>
        <b-radio v-model="selectPeriod" :native-value="2"> 연 </b-radio>

        <b-numberinput
          v-model="rate"
          controls-position="compact"
          type="is-warning"
          controls-rounded
          step="0.1"
          min-step="0.01"
          @input="initInvest"
        ></b-numberinput>
      </b-field>
      <b-field label="기간" :label-position="labelPosition">
        <b-numberinput
          v-model="period"
          controls-position="compact"
          type="is-warning"
          controls-rounded
          step="1"
          min="1"
        ></b-numberinput>
      </b-field>
    </section>
  </section>
</template>

<script>
/**
 * investment : 투자원금
 * rate : 이율
 * regularly : 정규투자금
 * totalMoney : 총 금액
 */

const DEFAULT_INFO = {
  investment: 0,
  rate: 0,
  regularly: 0,
  totalMoney: 0,
}

export default {
  data() {
    return {
      labelPosition: 'on-border',
      investment: 0,
      rate: 0,
      regularly: 0,
      investmentArray: [{ ...DEFAULT_INFO }],
      selectPeriod: 0,
      period: 1,
    }
  },

  // computed : {
  //   period() {
  //     return
  //   }
  // },

  methods: {
    initInvest() {
      this.$set(this.investmentArray[0], 'investment', this.investment)
      this.$set(this.investmentArray[0], 'rate', this.rate)
      this.$set(this.investmentArray[0], 'regularly', this.regularly)
    },

    aaa() {
      for (let index = 0; index < this.period; index++) {
        const investmentData = this.investmentArray[index]
        // 각 로우 계산을 위한 임시 총 금액
        const tempTotalMoney =
          index === 0
            ? this.investment
            : this.investmentArray[index - 1].totalMoney

        // 이자
        const rateValue =
          (tempTotalMoney + investmentData.regularly) * investmentData.rate

        // 이자 + 총 금액
        investmentData.totalMoney = tempTotalMoney + rateValue
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
