import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://sandbox.iexapis.com/stable/',
})

const token = 'Tsk_5b927ae7348c4bc486d0633873beec22'

function getSearchStock(symbol, date) {
	// chartByDay: true,
	return instance
		.get(`stock/${symbol}/chart/date/${date}`, {
			params: {
				chartByDay: true,
				token,
			},
		})
		.catch(error => {
			alert('[ERROR] getSearchStock FETCHING THE DATA', error)
			console.log(error)
		})
}

function getSymbol(symbol) {
	return instance
		.get(`search/${symbol}`, { params: { token } })
		.catch(error => {
			alert('[ERROR] getSymbol FETCHING THE DATA', error)
			console.log(error)
		})
}

export { getSearchStock, getSymbol }
