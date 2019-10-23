const USER = {
	state: {
		cropperShow: false,
		viewerShow: false,
		imgUrl: [],
		cropperImg:''
	},
	mutations: {
		cropperChange(state, cropper) {
			state.cropperShow = cropper.cropperShow
			state.viewerShow = cropper.viewerShow
			state.imgUrl = cropper.imgUrl
			state.cropperImg = cropper.cropperImg
		}
	},
	actions: {
		cropperAction({commit},params){
			commit('cropperChange',params)
		}
	},
	getters: {}
}

export default USER
