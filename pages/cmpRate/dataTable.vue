<template>
	<b-table
		:data="investmentData"
		:narrowed="true"
		:paginated="true"
		per-page="24"
	>
		<template scope="props">
			<b-table-column field="periodNo" label="기간" width="70" numeric>
				{{
					`${props.row.periodNo}  ${
						selectPeriod == 1 ? '개월' : periodData[selectPeriod].periodName
					}`
				}}
			</b-table-column>

			<b-table-column field="returnInvestValue" label="수익금" centered>
				{{ props.row.returnInvestValue | numeral('0,0') }}
			</b-table-column>

			<b-table-column field="totalMoney" label="총 액" centered>
				{{ props.row.totalMoney | numeral('0,0') }}
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
								100,
						)
					}}%
				</span>
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

			<b-table-column field="regularly" label="정기투자금" width="200">
				<b-field>
					<b-input
						v-model="props.row.regularly"
						controls-position="compact"
						type="is-warning"
						controls-rounded
						size="is-small"
						@input="setReCal(props.row.id)"
					></b-input>
					<p class="control">
						<b-button
							type="is-warning"
							class="button"
							size="is-small"
							@click="setRegular(props.row.id)"
							>하위적용</b-button
						>
					</p>
				</b-field>
			</b-table-column>
		</template>
	</b-table>
</template>

<script>
export default {
	props: {
		investmentData: {
			type: Array,
			required: true,
		},
		periodData: {
			type: Array,
			required: true,
		},
		selectPeriod: {
			type: Number,
			required: true,
		},
	},

	methods: {
		setReCal(id) {
			this.$emit('parentReCalFn', id)
		},

		// 정기투자금 선택row부터 하위일괄적용
		setRegular(id) {
			for (let i = id; i < this.investmentData.length; i++) {
				this.investmentData[i].regularly = this.investmentData[id].regularly
			}

			this.$emit('parentReCalFn', id)
		},
	},
}
</script>

<style></style>
