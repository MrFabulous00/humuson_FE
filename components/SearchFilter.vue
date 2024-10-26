<template>
	<form @submit.prevent="">
		<ul class="uk-margin" data-uk-accordion>
			<li>
				<h4 class="uk-accordion-title sc-theme-bg-dark sc-light uk-text-medium"><i class="mdi mdi-filter"></i>검색 필터</h4>
				<div class="uk-accordion-content">
					<div>
						<slot name="content"></slot>
					</div>
					<div style="text-align:right">
						<button class="sc-button search-button" @click.prevent="$emit('reset')">초기화</button>
						<button class="sc-button search-button" @click.prevent="$emit('search')">검색</button>
					</div>
				</div>
			</li>
		</ul>
	</form>
</template>

<script>
	export default {}
</script>

<style>
	.uk-accordion-title {
		color: white;
	}
	.uk-accordion-title::after {
		color: white;
	}
	.search-button {
		margin-top: 20px;
	}
</style>
