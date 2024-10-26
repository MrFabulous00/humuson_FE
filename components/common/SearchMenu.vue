<template>
	<div class="uk-grid-small uk-grid uk-margin" data-uk-grid>
		<div class="big">
			<div class="midium2" v-if="searchType == ''" data-uk-grid>
				<div class="small2">
					<ScInput
						id="sel_date"
						v-model="searchData.searchDate"
						v-flatpickr="dpRange"
						ref="rangePicker"
						placeholder="날짜 검색"
						mode="outline"
						style="width: 300px"
					>
						<span slot="icon" class="uk-form-icon" data-uk-icon="calendar"></span>
					</ScInput>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ScInput from '~/components/Input'
	import moment from '~/plugins/moment'
	import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
	import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index'
	import { Korea } from 'flatpickr/dist/l10n/ko.js'

	if (process.client) {
		require('~/plugins/flatpickr')
	}
	export default {
		components: {
			ScInput,
		},
		props: {
			searchData: {
				type: Object,
				default: function () {
					return {}
				},
			},
			searchType: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				sites: [],
				siteOptions: [],
				selectButton: '',
			}
		},
		computed: {
			dpRange() {
				return {
					mode: 'range',
					plugins: [confirmDatePlugin],
					defaultDate: [],
				}
			},
			dpMonth() {
				return {
					plugins: [
						new monthSelectPlugin({
							shorthand: true, //defaults to false
							dateFormat: 'Y-m', //defaults to "F Y"
							altFormat: 'Y-m', //defaults to "F Y"
						}),
					],
				}
			},
		},
		watch: {
			'searchData.searchDate': function (new_value, old_value) {
				this.$emit('search')
			},
		},
		async created() {},
		async mounted() {},
		methods: {
			initPicker(date) {
				document.querySelector('#sel_date')._flatpickr.setDate(date)
			},
			fetchData() {
				this.$emit('search')
			},
		},
	}
</script>
<style>
	@import 'flatpickr/dist/plugins/monthSelect/style.css';

	.uk-button-group > .sc-button {
		min-width: 75px;
	}
	.big {
		display: flex;
		flex-direction: grid;
	}
	.medium1 {
		display: inline-block;
		margin: 6px 10px 0 0;
	}
	.midium3 {
		margin-right: 50px;
	}
</style>
