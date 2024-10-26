<template>
	<div class="uk-grid-small uk-grid uk-margin" data-uk-grid>
		<div class="big">
			<div class="midium2" data-uk-grid>
				<div class="midium3">
					<div class="">
						<div class="uk-button-group">
							<button class="sc-button" :class="{ 'uk-active': selectButton === '0' }" @click.prevent="selectA">A구역</button>
							<button class="sc-button" :class="{ 'uk-active': selectButton === '1' }" @click.prevent="selectH">H구역</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	if (process.client) {
		require('~/plugins/flatpickr')
	}
	export default {
		components: {},
		props: {},
		data() {
			return {
				selectButton: '',
			}
		},
		computed: {},
		watch: {
			'searchData.searchDate': function (new_value, old_value) {
				this.$emit('search')
			},
			'searchData.reserveStatus': function (new_value, old_value) {
				this.$emit('search')
			},
			selectButton: function (new_value, old_value) {
				this.$emit('search', new_value)
			},
		},
		async created() {},
		async mounted() {},
		methods: {
			initPicker(date) {
				document.querySelector('#sel_date')._flatpickr.setDate(date)
			},
			selectA() {
				this.selectButton = '0'
				this.searchParking = 'A'
			},
			selectH() {
				this.selectButton = '1'
				this.searchParking = 'H'
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
