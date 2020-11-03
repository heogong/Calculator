import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://cloud.iexapis.com/v1/',
})

const token = 'pk_bae6de0699bc4db482e826631e82db06'
const testToken = 'Tsk_5b927ae7348c4bc486d0633873beec22' // 테스트할 수 있는 토큰

function getSearchStock(url) {
	return instance
		.get(url, {
			params: {
				chartByDay: true,
				chartSimplify: true,
				token,
			},
		})
		.catch(error => {
			alert('[ERROR] getSearchStock FETCHING THE DATA', error)
		})
}

function getSymbol(symbol) {
	return axios
		.get(`https://sandbox.iexapis.com/stable/search/${symbol}`, {
			params: { token: testToken },
		})
		.catch(error => {
			console.log(error)
			alert('[ERROR] getSymbol FETCHING THE DATA', error)
		})
}

function getKRWExchange(date) {
	return axios
		.get(`https://api.exchangeratesapi.io/${date}`, {
			params: {
				base: 'KRW',
				symbols: 'USD',
			},
		})
		.catch(error => {
			alert('[ERROR] getKRWExchange FETCHING THE DATA', error)
		})
}

export { getSearchStock, getSymbol, getKRWExchange }
