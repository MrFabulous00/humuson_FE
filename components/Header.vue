<template>
	<header id="sc-header" ref="header">
		<nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
			<div class="uk-navbar-left nav-overlay-small uk-margin-right uk-navbar-aside">
				<a id="sc-sidebar-main-toggle" href="javascript:void(0)" @click.stop="toggleMainSidebar">
					<i v-if="sidebarMainExpanded" class="mdi mdi-backburger" data-uk-tooltip="축소" />
					<i v-if="!sidebarMainExpanded" class="mdi mdi-menu" data-uk-tooltip="확대" />
				</a>
				<div class="sc-brand uk-visible@m">
					<h3 class="md-color-white uk-margin-remove-bottom" style="font-size: 1.1rem">
						TMS
						<span style="font-size: 0.7rem">Total Marketing Server</span>
					</h3>
				</div>
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right">
				<ul class="uk-navbar-nav">
					<li class="uk-visible@l">
						<a href="javascript:void(0)" class="sc-text-semibold"> </a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	import { scMq } from '~/assets/js/utils'

	export default {
		components: {},
		data: () => ({
			account: {
				name: '최고관리자',
			},
			sidebarMainExpanded: true,
		}),
		computed: {
			...mapState(['vxSidebarMainExpanded', 'vxTopMenuActive', 'vxSidebarMiniActive']),
		},
		watch: {
			vxSidebarMainExpanded(state) {
				this.sidebarMainExpanded = state
			},
		},
		mounted() {
			const self = this
			self.$nextTick(() => {
				if (scMq.mediumMin()) {
					self.sidebarMainExpanded = this.vxSidebarMainExpanded
				} else {
					self.sidebarMainExpanded = false
				}
			})
			// sticky header
			let options = scMq.mediumMax() ? { showOnUp: true, animation: 'uk-animation-slide-top' } : {}
			UIkit.sticky(this.$refs.header, options)
		},
		methods: {
			toggleMainSidebar() {
				let state = !this.sidebarMainExpanded
				this.$store.commit('sidebarMainToggle', state)
			},

			moveTo(path) {
				this.$nuxt.$router.push('profile')
			},
		},
	}
</script>

<style scoped>
	.md-color-white uk-margin-remove-bottom {
		font-size: 1.3rem;
	}
</style>
