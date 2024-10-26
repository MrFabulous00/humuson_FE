import { mapState } from 'vuex'
export default {
	data() {
		return {
			isShowForm: false,
			isFullscreen: true,
			rowIndex: null,
			selectedData: null,
			gridOptions: {
				suppressRowClickSelection: true,
				suppressMenuHide: true,
				rowSelection: 'multiple',
				onGridReady: this.onGridReady,
				onFirstDataRendered: this.onFirstDataRendered,
				onCellClicked: this.onRowClicked,
				rowHeight: 45,
				getRowStyle: this.getRowStyle,
			},
			opts: {},
			sendData: {},
			list: [],
			defaultData: '',
			isReserveForm: false,
		}
	},
	watch: {},
	computed: {},
	created() {
		this.defaultData = JSON.stringify(this.sendData)
	},
	mounted() {},
	methods: {
		filterReset() {
			this.sendData = JSON.parse(this.defaultData)
			this.preFetchData()
		},
		preFetchData() {
			this.fetchData()
		},
		fetchData() {
			this.list = []
			let params = {}
			for (const key in this.sendData) {
				if (this.sendData[key]) params[key] = this.sendData[key]
			}
			if (this.path !== '/receive') {
				this.$axios.$get(this.path, { params }).then(res => {
					if (this.gridOptions.api) {
						this.list = res.data.rows
						this.gridOptions.api.setRowData(this.list)
					}
				})
			}
		},
		openNewForm() {
			this.isShowForm = true
			this.isFullscreen = false
			this.selectedData = null
		},
		openReserveForm() {
			this.isShowForm = true
			this.isReserveForm = true
			this.isFullscreen = false
			this.selectedData = null
		},
		onRowClicked(props) {
			this.isReserveForm = false
			if (this.isShowForm === true && this.rowIndex === props.rowIndex) {
				this.gridOptions.api.redrawRows()
				this.isShowForm = false
				this.onFullScreen()
				return
			}
			this.isShowForm = true
			this.isFullscreen = false
			this.rowIndex = props.rowIndex
			this.gridOptions.api.redrawRows()
			this.selectedData = props.data
		},
		onCloseForm() {
			this.isShowForm = false
			this.rowIndex = null
			this.gridOptions.api.redrawRows()
			this.preFetchData()
		},
		onFullScreen(el, done) {
			setTimeout(() => {
				this.isFullscreen = true
			}, 300)
		},
	},
}
