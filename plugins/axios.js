export default function ({$axios, redirect, app}) {
    $axios.defaults.headers.get['Pragma'] = 'no-cache'
    $axios.defaults.headers.get['Cache-Control'] = 'no-cache, no-store'
    $axios.onRequest(config => {})
    $axios.onError(e => {
		if (e.response && e.response.data.result) {
			UIkit.modal.alert(`<span class="md-color-red-400 mdi mdi-alert-outline uk-margin-small-right"></span> ${e.response.data.result.message}`, {
				stack: true
			})
		}else {
			//UIkit.modal.alert(`<span class="md-color-red-400 mdi mdi-alert-outline uk-margin-small-right"></span> ${e.response.data}`)
		}
    })
    $axios.onResponse(response => {
        // 200번대 오류들
        //console.log(response)
    })
}
