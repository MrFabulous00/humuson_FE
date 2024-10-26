<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div :class="[{ 'uk-width-2-3@l': !isFullscreen }, { 'uk-width-1-1@l': isFullscreen }]">
					<ScCard>
						<ScCardHeader class="uk-flex uk-flex-middle sc-theme-bg-dark sc-light" separator>
							<div class="uk-flex-1">
								<ScCardTitle>
									<slot>발송하기</slot>
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<div class="uk-grid-small uk-grid uk-margin" data-uk-grid style="width: 100%">
								<div style="margin: auto 10px">등록일 기준</div>
								<div class="">
									<SearchMenu :search-data="searchData" :search-keyword="true" @search="search"></SearchMenu>
								</div>
								<div style="margin: auto 10px">검색조건</div>
								<div style="width: 10%">
									<Select2
										style="padding-top: 0px"
										:options="searchOpts"
										v-model="searchType"
										:settings="{ width: '100%', placeholder: '상태' }"
									/>
								</div>
								<div class="uk-width-1-5@s">
									<ScInput v-model="searchKeyword" placeholder="검색">
										<span slot="icon" class="uk-form-icon" data-uk-icon="search" />
									</ScInput>
								</div>
							</div>
							<div>
								<ag-grid-vue
									style="width: 100%"
									class="ag-theme-material"
									:dom-layout="'autoHeight'"
									:locale-text="localeText"
									:default-col-def="defaultColDef"
									:column-defs="columnDefs"
									:grid-options="gridOptions"
									:pagination="true"
									:pagination-page-size="parseInt(searchCount)"
									:row-data="rowData"
								>
								</ag-grid-vue>
								<div class="dropdownData">
									<select v-model="searchCount">
										<option value="5">5개씩 보기</option>
										<option value="10">10개씩 보기</option>
										<option value="20">20개씩 보기</option>
										<option value="50">50개씩 보기</option>
										<option value="100">100개씩 보기</option>
									</select>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ScInput from '@/components/Input'
	import Select2 from '@/components/Select2'
	import SearchMenu from '@/components/common/SearchMenu'
	import { agGridMixin } from '@/plugins/ag-grid.mixin.js'

	export default {
		components: { ScInput, Select2, SearchMenu },
		mixins: [agGridMixin],
		data() {
			return {
				gridOptions: {
					suppressRowClickSelection: false,
					suppressMenuHide: true,
					rowSelection: 'multiple',
					onGridReady: this.onGridReady,
					rowHeight: 45,
				},
				rowData: [],
				originalData: [],
				searchType: 'title',
				searchKeyword: '',
				searchCount: '5',
				isFullscreen: true,
				searchData: {
					searchDate: '',
				},
			}
		},
		computed: {
			searchOpts() {
				return [
					{ id: 'title', text: '제목' },
					{ id: 'ID', text: '작성자(ID)' },
				]
			},
			columnDefs() {
				return [
					{
						headerName: 'ID',
						maxWidth: 150,
						valueGetter: params => params.node.rowIndex + 1,
					},
					{
						headerName: '제목',
						field: 'title',
						width: 300,
					},
					{
						headerName: '작성자(ID)',
						field: 'ID',
						width: 200,
					},
					{
						headerName: '작성일',
						field: 'createdAt',
						width: 300,
					},
				]
			},
		},
		watch: {
			'searchData.searchDate': function (value, oldValue) {
				this.loadData()
			},
			searchType: function (value, oldValue) {
				this.loadData()
			},
			searchKeyword: function (value) {
				if (value === '' || value === null) {
					this.loadData()
				} else {
					this.search()
				}
			},
			searchCount: function (value) {
				this.gridOptions.api.paginationSetPageSize(Number(value))
			},
		},
		created() {
			this.searchData.searchDate = `${this.$moment(new Date()).format('YYYY-MM-DD')}`
		},
		async mounted() {
			await this.loadData()
		},
		methods: {
			search() {
				this.loadData()

				const keyword = this.searchKeyword.trim().toLowerCase()
				const searchType = this.searchType
				const searchDate = this.searchData.searchDate

				this.rowData = this.originalData.filter(item => {
					const matchesKeyword = searchType && keyword ? item[searchType]?.toString().toLowerCase().includes(keyword) : true

					const matchesDate = searchDate ? item.createdAt && item.createdAt.includes(searchDate) : true

					return matchesKeyword && matchesDate
				})
			},

			loadData() {
				this.rowData = [...this.originalData]
			},
			onGridReady(params) {
				this.gridOptions.api = params.api
				this.gridOptions.api.setRowData(this.originalData)
				this.gridOptions.api.paginationSetPageSize(Number(this.searchCount))
			},
		},
	}
</script>

<style scoped>
	.dropdownData {
		position: relative;
		z-index: 100;
	}
</style>
