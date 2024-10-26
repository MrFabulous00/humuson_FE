import LoadingOverlay from '../components/ag-grid/LoadingOverlay'
import NoRowsOverlay from '../components/ag-grid/NoRowsOverlay'
export const agGridMixin = {
	data() {
		return {
			frameworkComponents: {
				loadingOverlay: LoadingOverlay,
				noRowsOverlay: NoRowsOverlay,
			},
			loadingOverlayComponent: 'loadingOverlay',
			loadingOverlayComponentParams: null,
			noRowsOverlayComponent: 'noRowsOverlay',
			noRowsOverlayComponentParams: null,
			localeText: {
				// for filter panel
				page: ' ',
				more: 'daMore',
				to: '~',
				of: '/',
				next: 'daNexten',
				last: 'daLasten',
				first: 'daFirsten',
				previous: 'daPreviousen',
				loadingOoo: '로딩중...',

				// for set filter
				/*selectAll: 'daSelect Allen',
				searchOoo: 'daSearch...',*/
				blanks: '값없음',
				selectAll: '전체 선택',
				searchOoo: '검색',
				noRowsToShow: '조회 결과가 없습니다.',
				// for number filter and text filter
				filterOoo: '검색',
				applyFilter: 'daApplyFilter...',
				clearFilter: '초기화',

				equals: 'daEquals',
				notEquals: 'daNotEqual',

				// for number filter
				lessThan: 'daLessThan',
				greaterThan: 'daGreaterThan',
				lessThanOrEqual: 'daLessThanOrEqual',
				greaterThanOrEqual: 'daGreaterThanOrEqual',
				inRange: 'daInRange',

				// for text filter
				contains: 'daContains',
				notContains: 'daNotContains',
				startsWith: 'daStarts dawith',
				endsWith: 'daEnds dawith',

				// filter conditions
				andCondition: 'daAND',
				orCondition: 'daOR',

				// the header of the default group column
				group: 'laGroup',

				// tool panel
				columns: '컬럼설정',
				filters: 'laFilters',
				rowGroupColumns: 'laPivot Cols',
				rowGroupColumnsEmptyMessage: 'la drag cols to group',
				valueColumns: 'laValue Cols',
				pivotMode: 'laPivot-Mode',
				groups: 'laGroups',
				values: 'laValues',
				pivots: 'laPivots',
				valueColumnsEmptyMessage: 'la drag cols to aggregate',
				pivotColumnsEmptyMessage: 'la drag here to pivot',
				toolPanelButton: 'la tool panel',

				// other
				noRowsToShow: '데이터 없음',

				// enterprise menu
				pinColumn: 'laPin Column',
				valueAggregation: 'laValue Agg',
				autosizeThiscolumn: 'laAutosize Diz',
				autosizeAllColumns: 'laAutsoie em All',
				groupBy: 'laGroup by',
				ungroupBy: 'laUnGroup by',
				resetColumns: 'laReset Those Cols',
				expandAll: 'laOpen-em-up',
				collapseAll: 'laClose-em-up',
				toolPanel: 'laTool Panelo',
				export: 'laExporto',
				csvExport: 'laCSV Exportp',
				excelExport: 'laExcel Exporto (.xlsx)',
				excelXmlExport: 'laExcel Exporto (.xml)',

				// enterprise menu (charts)
				pivotChartAndPivotMode: 'laPivot Chart & Pivot Mode',
				pivotChart: 'laPivot Chart',
				chartRange: 'laChart Range',

				columnChart: 'laColumn',
				groupedColumn: 'laGrouped',
				stackedColumn: 'laStacked',
				normalizedColumn: 'la100% Stacked',

				barChart: 'laBar',
				groupedBar: 'laGrouped',
				stackedBar: 'laStacked',
				normalizedBar: 'la100% Stacked',

				pieChart: 'laPie',
				pie: 'laPie',
				doughnut: 'laDoughnut',

				line: 'laLine',

				xyChart: 'laX Y (Scatter)',
				scatter: 'laScatter',
				bubble: 'laBubble',

				areaChart: 'laArea',
				area: 'laArea',
				stackedArea: 'laStacked',
				normalizedArea: 'la100% Stacked',

				// enterprise menu pinning
				pinLeft: 'laPin <<',
				pinRight: 'laPin >>',
				noPin: 'laDontPin <>',

				// enterprise menu aggregation and status bar
				sum: 'laSum',
				min: 'laMin',
				max: 'laMax',
				none: 'laNone',
				count: 'laCount',
				average: 'laAverage',
				filteredRows: 'laFiltered',
				selectedRows: 'laSelected',
				totalRows: 'laTotal Rows',
				totalAndFilteredRows: 'laRows',

				// standard menu
				copy: '복사',
				copyWithHeaders: 'laCopy Wit hHeaders',
				ctrlC: 'Ctrl + C',
				paste: 'laPaste',
				ctrlV: 'ctrl n V',

				// charts
				pivotChartTitle: 'laPivot Chart',
				rangeChartTitle: 'laRange Chart',
				settings: 'laSettings',
				data: 'laData',
				format: 'laFormat',
				categories: 'laCategories',
				series: 'laSeries',
				axis: 'laAxis',
				color: 'laColor',
				thickness: 'laThickness',
				xRotation: 'laX Rotation',
				yRotation: 'laY Rotation',
				ticks: 'laTicks',
				width: 'laWidth',
				length: 'laLength',
				padding: 'laPadding',
				chart: 'laChart',
				title: 'laTitle',
				font: 'laFont',
				top: 'laTop',
				right: 'laRight',
				bottom: 'laBottom',
				left: 'laLeft',
				labels: 'laLabels',
				size: 'laSize',
				legend: 'laLegend',
				position: 'laPosition',
				markerSize: 'laMarker Size',
				markerStroke: 'laMarker Stroke',
				markerPadding: 'laMarker Padding',
				itemPaddingX: 'laItem Padding X',
				itemPaddingY: 'laItem Padding Y',
				strokeWidth: 'laStroke Width',
				offset: 'laOffset',
				tooltips: 'laTooltips',
				offsets: 'laOffsets',
				callout: 'laCallout',
				markers: 'laMarkers',
				shadow: 'laShadow',
				blur: 'laBlur',
				xOffset: 'laX Offset',
				yOffset: 'laY Offset',
				lineWidth: 'laLine Width',
				normal: 'laNormal',
				bold: 'laBold',
				italic: 'laItalic',
				boldItalic: 'laBold Italic',
				fillOpacity: 'laFill Opacity',
				strokeOpacity: 'laLine Opacity',
				columnGroup: 'Column',
				barGroup: 'Bar',
				pieGroup: 'Pie',
				lineGroup: 'Line',
				scatterGroup: 'Scatter',
				areaGroup: 'Area',
				groupedColumnTooltip: 'laGrouped',
				stackedColumnTooltip: 'laStacked',
				normalizedColumnTooltip: 'la100% Stacked',
				groupedBarTooltip: 'laGrouped',
				stackedBarTooltip: 'laStacked',
				normalizedBarTooltip: 'la100% Stacked',
				pieTooltip: 'laPie',
				doughnutTooltip: 'laDoughnut',
				lineTooltip: 'laLine',
				groupedAreaTooltip: 'laGrouped',
				stackedAreaTooltip: 'laStacked',
				normalizedAreaTooltip: 'la100% Stacked',
				scatterTooltip: 'laScatter',
				bubbleTooltip: 'laBubble',
				noDataToChart: 'laNo data available to be charted.',
				pivotChartRequiresPivotMode: 'laPivot Chart requires Pivot Mode enabled.',
			},
			defaultColDef: {
				suppressMenu: true,
				suppressSizeToFit: true,
				resizable: true,
				sortable: true,
				width: 100,
				headerComponentParams: {
					template:
						'<div class="ag-cell-label-container" role="presentation">' +
						'  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
						'  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
						'    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
						'    <div class="header-sort-filter">' +
						'       <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>' +
						'       <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>' +
						'       <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>' +
						'       <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>' +
						'       <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
						'    </div>' +
						'  </div>' +
						'</div>',
				},
			},
		}
	},
	methods: {
		onGridReady(params) {
			let pageSize = params.api.gridOptionsWrapper.gridOptions.paginationPageSize
			let rowHeight = params.api.gridOptionsWrapper.gridOptions.rowHeight
			params.api.rowRenderer.rowContainers.body.eWrapper.style.minHeight = pageSize * rowHeight + 'px'
		},
		onFirstDataRendered(params) {
			this.gridOptions.api.sizeColumnsToFit()
		},
		getRowStyle(params) {
			if (params.node.detail) {
				return {
					color: '#2e7d32',
					background: '#e8f5e9',
				}
			}
		},
	},
}
