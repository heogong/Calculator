export const state = () => ({
	appTitle: '',
	appDesc: '',
})

export const mutations = {
	setAppTitle(state, title) {
		state.appTitle = title
	},
	setAppDesc(state, desc) {
		state.appDesc = desc
	},
}

export const getters = {
	appTitle(state) {
		return state.appTitle
	},

	appDesc(state) {
		return state.appDesc
	},
}
