export default {
	data() {
		return {
			defaultData: '',
			submitStatus: null,
		}
	},
	watch: {
		item() {
			this.images = []
			this.settingForm(this.item)
		},
	},
	computed: {},
	created() {
		this.defaultData = JSON.stringify(this.sendData)
		this.settingForm(this.item)
	},
	mounted() { },
	methods: {
		settingForm(props) {
			if (!props) {
				this.refreshForm()
			} else {
				this.sendData = JSON.parse(JSON.stringify(props))
			}
			this.afterSetting()
		},
		afterSetting() { },
		preSubmitForm() {
			this.submitForm()
		},
		submitForm(e) {
			// e.preventDefault()
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
			} else {
				this.submitStatus = 'PENDING'
				if (this.item) {
					this.putForm()
				} else {
					this.postForm()
				}
			}
		},
		postForm() {
			UIkit.modal.confirm('등록하시겠습니까?').then(async () => {
				this.$axios
					.$post(this.path, this.sendData)
					.then(async res => {
						this.callNotification('등록되었습니다.')
						this.closeForm()
						location.reload()
					})
					.finally(() => {
						this.submitStatus = 'OK'
					})
			})
		},
		putForm() {
			UIkit.modal.confirm('수정하시겠습니까?').then(async () => {
				this.$axios
					.$put(this.path, this.sendData)
					.then(async res => {
						this.callNotification('수정하였습니다.')
						this.$nuxt.$emit('put-data' )
						// this.closeForm()
						// location.reload()
					})
					.finally(() => {
						this.submitStatus = 'OK'
					})
			})
		},

		// putForm() {
		// 	UIkit.modal.prompt('수정 사유를 입력해주세요.', null).then(async reason => {
		// 		if (reason) {
		// 			this.sendData.changeReason = reason; // 입력된 수정 사유를 sendData에 추가
		// 			try {
		// 				await this.$axios.$put(this.path, this.sendData);
		// 				this.callNotification('수정하였습니다.');
		// 				this.closeForm();
		// 				location.reload();
		// 			} catch (error) {
		// 				console.error('ERROR', error);
		// 				this.callNotification('수정에 실패하였습니다.');
		// 			} finally {
		// 				this.submitStatus = 'OK';
		// 			}
		// 		} else {
		// 			this.callNotification('수정 사유를 입력해주세요.');
		// 		}
		// 	});
		// },

		closeForm() {
			this.refreshForm()
			this.$emit('close-form')
		},
		refreshForm() {
			this.$v.$reset()
			this.sendData = JSON.parse(this.defaultData)
		},
	},
}
