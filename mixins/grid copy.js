import { mapActions } from 'vuex'
export default {
	data() {
		return {
			sort: {},
			paginate: {
				pageIndex: 0,
				pageRow: this.$store.state.pageRow,
				totalItems: 0,
			},
		}
	},
	computed: {
		/**
		 * totalPages 구하기  (임시 )
		 */
		countList() {
			return Math.ceil(this.paginate.totalItems / this.paginate.pageRow)
		},
		checkDisable() {
			return this.checked.length != 1
		},
		multiCheckDisable() {
			return !this.checked.length
		},
	},
	methods: {
		...mapActions(['FETCH_LIST', 'FETCH_DETAIL', 'SAVE_LIST', 'DELETE_LIST']),
		/**
		 *
		 * 기본 그리드 세팅 - created
		 */
		init() {
			this.paginate.totalItems = this.gridProps.data.length
		},
		/**
		 * 그리드 조회
		 * @param {*} elem
		 * @param {*} at
		 */
		fetchList({ ref, path, disabled, popupEl, defaultSort }) {
			let grid = ref || this.$refs.grid
			let url = path || this.$route.path.replace(/\//gi, '')
			let sort = this.sort || defaultSort
			let paramSort = JSON.parse(JSON.stringify(sort))

			//   {
			//     "pageIndex": //pageIndex
			//     "pageRow": //한 페이지 list 노출 건수. 0 -> 99999건 출력
			//     "sort" { //list 정렬기준
			//       "key": "val" // Key - 정렬컬럼명(ex prodCd), val - ASC, DESC
			//       ...
			//     }
			//     "currMenuCd": //menuCode
			//     "sAccountNm": //고객사명
			//     "sAccountCd": //고객사코드
			//     "sProdCd": //상품코드 or 상위상품코드
			//     "sProdNm": //상품명
			// }

			Object.keys(paramSort).forEach(k => {
				paramSort[k] = paramSort[k].toUpperCase()
			})
			let params = Object.assign({}, { sort: paramSort }, this.paginate, this.search, { currMenuCd: this.$store.state.currMenuCd })
			this.FETCH_LIST({ params, url }).then(({ dataList, total }) => {
				// console.log(dataList);
				this.gridProps.data = dataList.slice()
				this.paginate.totalItems = total
				grid.invoke('resetData', dataList)
				if (disabled) this.disableGrid(grid)

				Object.keys(this.sort).forEach(key => {
					let ascending = this.sort[key] == 'asc' ? true : false
					this.$refs.grid.invoke('sort', key, ascending, true)
				})

				// this.sort;

				// this.$refs.grid.invoke("sort", "itemCd", false, true);
				// this.$refs.grid.invoke("sort", "itemBrcd", true, true);
				// 1건일때 팝업 호출
				if (popupEl && total == 1) {
					this.onSwitchPopup(popupEl, url, dataList[0])
				}
			})
		},
		/**
		 * 그리드 엑셀형 비활성화 세팅
		 */
		disableGrid(elem) {
			const grid = elem || this.$refs.grid
			for (let i = 0; i < grid.invoke('getRowCount'); i++) {
				grid.invoke('disableRow', i, false)
			}
		},
		/**
		 * 그리드 정렬
		 * @param this.$refs['ref=grid']
		 * @param object event
		 */
		sortGrid(elem, event, path) {
			const grid = elem || this.$refs.grid
			if (event.instance.store.column.allColumnMap[event.columnName].sortingType !== 'asc') {
				this.sort[event.columnName] = 'asc'
				event.instance.store.column.allColumnMap[event.columnName].sortingType = 'asc'
			} else {
				this.sort[event.columnName] = 'desc'
				event.instance.store.column.allColumnMap[event.columnName].sortingType = 'desc'
			}
			this.fetchParam.path = path
			console.log(
				this.fetchParam,
				event.instance.store.column.allColumnMap[event.columnName].sortingType,
				this.sort[event.columnName]
			)
			this.fetchList(this.fetchParam)
		},
		/**
		 * 행 추가
		 * @param this.$refs['ref=grid']
		 * @param {*} at  rowKey
		 */
		onAddRow(elem, at) {
			const grid = elem || this.$refs.grid
			grid.invoke('appendRow', {}, { at: at || 0, focus: true })
			grid.invoke('uncheckAll')
			this.checked = []
		},
		/**
		 * 행 삭제
		 * @param this.$refs['ref=grid']
		 */
		onRemoveRow(elem, { path }) {
			let url = path || this.$route.path.replace(/\//gi, '')
			const grid = elem || this.$refs.grid
			let gridDataList = []
			let gridData

			this.checked = grid.invoke('getCheckedRowKeys')
			if (!this.checked.length) {
				alert('삭제할 데이터 하나를 선택해주세요.')
				return
			}

			for (var i in this.checked) {
				let { id } = grid.invoke('getRow', this.checked[i])
				gridData = {
					id,
				}
				gridDataList.push(gridData)
			}

			const deleteParams = Object.assign({}, { gridDataList: gridDataList })

			this.DELETE_LIST({ params: deleteParams, url }).then(() => {
				this.fetchList(this.fetchParam)
				grid.invoke('uncheckAll')
			})
			this.checked = []
		},
		/**
		 * 행 저장
		 * @param this.$refs['ref=grid']
		 * @parma Object saveparam
		 */
		onSaveRow(elem, { path }) {
			let url = path || this.$route.path.replace(/\//gi, '')
			const grid = elem || this.$refs.grid
			let gridDataList = []
			let gridData

			if (grid.invoke('validate').length) {
				grid.invoke('focus', grid.invoke('validate')[0].rowKey, grid.invoke('validate')[0].errors[0].columnName, true)
				alert('다시 입력해주세요.')
				return
			}

			for (var i in this.checked) {
				let { zoneNm, zoneTypeCd, zoneAttrCd, zoneDesc, id } = grid.invoke('getRow', this.checked[i])
				gridData = {
					zoneNm,
					zoneTypeCd,
					zoneAttrCd,
					zoneDesc,
					id,
				}
				gridDataList.push(gridData)
			}

			const saveParams = Object.assign(
				{},
				{ gridDataList: gridDataList },
				// { gridParam: { sort: JSON.parse(JSON.stringify(sort)) } },
				{ currMenuCd: this.$store.state.currMenuCd },
				{ paramTitle: {} }
			)
			this.SAVE_LIST({ params: saveParams, url }).then(() => {
				this.fetchList(this.fetchParam)
				grid.invoke('uncheckAll')
			})
			this.checked = []
		},
		/**
		 * 행 복사
		 * @param this.$refs['ref=grid']
		 */
		onCopyRow(elem) {
			const grid = elem || this.$refs.grid
			this.checked = grid.invoke('getCheckedRowKeys')
			if (!this.checked.length) {
				alert('복사할 데이터 하나를 선택해주세요.')
				return
			}
			for (let i in this.checked) {
				const data = grid.invoke('getRow', this.checked[i])
				//delete data[Object.keys(data)[0]];
				data._attributes.disabled = false
				grid.invoke('appendRow', data, {
					at: grid.invoke('getIndexOfRow', this.checked[i]) + 1,
					extendPrevRowSpan: true,
				})
			}
			grid.invoke('uncheckAll')
			this.checked = []
		},
		/**
		 * 행 수정
		 * @param this.$refs['ref=grid']
		 */
		onModifyRow(elem) {
			const grid = elem || this.$refs.grid
			this.checked = grid.invoke('getCheckedRowKeys')
			if (!this.checked.length) {
				alert('수정할 데이터 하나를 선택해주세요.')
				return
			}
			for (let i in this.checked) {
				grid.invoke('enableRow', this.checked[i])
			}
			grid.invoke('uncheckAll')
			this.checked = []
		},
		/**
		 * 행 출력
		 * @param this.$refs['ref=grid']
		 */
		onPrintList() {
			if (this.checked.length > 2) {
				alert('출력할 입고예정 정보를 하나만 선택해주세요.')
				return
			}
			// grid.invoke("addRowClassName", event.rowKey, "tui-grid-cell-edited");
			console.log('리스트 출력하겠습니당~~~')
		},
		/**
		 * 페이지 개수 선택
		 * @param this.$refs['ref=grid']
		 * @param string Pageper option
		 */
		onSelectPage(elem, selectOption) {
			const grid = elem || this.$refs.grid
			this.paginate.pageRow = selectOption
			grid.invoke('setPerPage', Number(selectOption))
			this.paginate.pageIndex = 0
			this.fetchList(this.fetchParam)
		},
		/**
		 * 그리드 클릭
		 * @param this.$refs['ref=grid']
		 * @param array 기본 값 [] 세팅
		 * @param string 팝업 그리드
		 * @param string 버튼 텍스트
		 */
		onClickGrid(elem, event = {}, path, columnArr = [], popupEl) {
			const grid = elem || this.$refs.grid
			const url = path || this.$route.path.replace(/\//gi, '')
			const focusRow = grid.invoke('getFocusedCell')

			if (event.targetType === 'columnHeader') {
				this.sortGrid(grid, event, path)
			} else if (columnArr.filter(item => item === focusRow.columnName).length) {
				this.$store.commit('SET_GRID_ROWS', {
					gridRow: grid.invoke('getRow', focusRow.rowKey),
				})
				const rowData = grid.invoke('getRow', focusRow.rowKey)
				this.$store.commit('SET_SWITCH_POP', {
					switchPop: true,
				})
				this.onSwitchPopup(popupEl, url, rowData)
				return
			}
		},
		/**
		 * 그리드 수정
		 * @param this.$refs['ref=grid']
		 * @param object 이벤트 시 동작 키
		 */
		onEditGrid(elem, event) {
			const grid = elem || this.$refs.grid
			grid.invoke('addCellClassName', event.rowKey, event.columnName, 'tui-grid-cell-edited')
		},
		/**
		 * 그리드 체크 선택
		 * @param this.$refs['ref=grid']
		 */
		onCheckGrid(elem) {
			const grid = elem || this.$refs.grid

			this.checked = grid.invoke('getCheckedRowKeys')
		},
		/**
		 * 그리드 체크 해제
		 * @param this.$refs['ref=grid']
		 */
		onUnCheckGrid(elem) {
			const grid = elem || this.$refs.grid

			this.checked = grid.invoke('getCheckedRowKeys')
		},
		/**
		 * 그리드 전체 체크
		 * @param this.$refs['ref=grid']
		 */
		onAllCheckGrid(elem) {
			const grid = elem || this.$refs.grid

			this.checked = grid.invoke('getCheckedRowKeys')
		},
		/**
		 * 그리드 전체 체크
		 * @param this.$refs['ref=grid']
		 */
		onAllUnCheckGrid(elem) {
			const grid = elem || this.$refs.grid

			this.checked = grid.invoke('getCheckedRowKeys')
		},
		/**
		 * 팝업 세팅
		 * @param string 'isPopup1Switch' 컴포넌트
		 * @param string '출력' 버튼
		 * @param this.$refs['ref=grid']
		 */
		onSwitchPopup(popupEl, url, rowData) {
			const id = rowData.id
			const params = { id, currMenuCd: '97' }
			this.FETCH_DETAIL({ params, url }).then(res => {
				this.$emit('switch', popupEl, res)
			})
		},
		/**
		 * 탭 변경 하기
		 * @param string tab 이름
		 * @param this.$refs['ref=grid']
		 */
		onSwitchTab(tab, elem) {
			const grid = elem || this.$refs.grid
			this.active = tab
			this.selected = []
			if (!grid) {
				return
			}
			this.filterList(tab, grid)
			this.disableGrid(grid)
			this.checked = []
		},
		/**
		 * 탭 데이터 필터 하기
		 * @param string tab 이름
		 * @param this.$refs['ref=grid']
		 */
		filterList(tab, elem) {
			elem.invoke('resetData', this.gridList)
			if (tab === '전체') {
				return
			}
			const gridTab = tab === '정상' ? '1' : tab === '불량' ? '2' : tab === '반품' ? '3' : '4',
				filterData = elem.invoke('findRows', {
					col1: gridTab,
				}),
				newfilterData = []
			for (var i of filterData) {
				if (i.__storage__) {
					newfilterData.push(i.__storage__)
				} else {
					newfilterData.push(i)
				}
			}
			elem.invoke('resetData', newfilterData)
		},
		/*
    TODO : 추후 개발
      페이지 이동시 axios로 페이지에 맞게 서버 호출
    */
		onMovePage(num) {
			this.paginate.pageIndex = num
		},
		onEnableRow() {
			const grid = this.$refs.grid
			this.checked = grid.invoke('getCheckedRowKeys')
			this.checked.forEach(key => {
				grid.invoke('startEditing', key, 'pltbox', false)
				// grid.invoke("startEditing", key, "boxea", false);

				// startEditing(rowKey, columnName, setScroll)
			})
		},
	},
}
