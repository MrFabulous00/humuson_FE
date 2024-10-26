<template>
	<div>
		<Transition name="slide-bottom-medium">
			<ScCard>
				<ScCardHeader separator>
					<div class="uk-flex uk-flex-middle">
						<div class="uk-flex-1">
							<ScCardTitle>
								<i class="mdi" :class="[{ 'mdi-details': item }, { 'mdi-plus': !item }]" />
								블랙리스트 차량 {{ item ? '상세' : '등록' }}
							</ScCardTitle>
						</div>
						<ScCardActions>
							<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click.prevent="closeForm" />
						</ScCardActions>
					</div>
				</ScCardHeader>
				<ScCardBody>
					<div class="uk-grid-small uk-grid" data-uk-grid>
						<div style="width: 100%">
							<div class="uk-width-1-1 uk-margin-top uk-text-left" v-if="!item">
								<button
									class="sc-button sc-button-primary uk-modal-close"
									:disabled="submitStatus === 'PENDING'"
									@click.prevent="preSubmitForm"
								>
									등록
								</button>
							</div>
							<div class="uk-margin-medium-top uk-grid-small uk-width-auto@s uk-grid" data-uk-grid v-if="item">
								<div>
									<a
										v-waves.button
										href="javascript:void(0)"
										class="uk-button uk-button-default sc-button-flat-primary"
										type="button"
										@click="preSubmitForm"
									>
										해지
									</a>
								</div>
							</div>
						</div>
						<h5 class="uk-heading-bullet uk-margin-top uk-width-1-1">블랙 리스트</h5>
						<div class="uk-width-1-1">
							<ScInput
								v-model="sendData.carNumber"
								:error-state="$v.sendData.carNumber.$error"
								:validator="$v.sendData.carNumber"
							>
								<label>차량 번호</label>
							</ScInput>
							<ul class="sc-vue-errors">
								<li v-if="!$v.sendData.carNumber.required">차량번호를 입력하세요.</li>
							</ul>
						</div>
						<div class="uk-width-1-1 uk-margin-top">
							<ScTextarea v-model="sendData.blackMemo" :cols="30" :rows="5" mode="outline" placeholder="">
								<label> 블랙 리스트 사유 </label>
							</ScTextarea>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</Transition>
	</div>
</template>

<script>
	import { validationMixin } from 'vuelidate'
	import { required } from 'vuelidate/lib/validators'
	import ScInput from '@/components/Input'
	import ScTextarea from '@/components/Textarea'
	import formMixins from '@/mixins/formMixins'

	export default {
		components: { ScInput, ScTextarea },
		mixins: [validationMixin, formMixins],
		props: {
			item: {
				type: Object,
				default: null,
			},
		},
		data() {
			return {
				path: '/blackList/',
				name: 'blackList',
				sendData: {
					blackType: 1,
				},
				opts: {},
			}
		},
		validations: {
			sendData: {
				carNumber: {
					required,
				},
			},
		},
		computed: {},
		watch: {},
		async created() {},
		methods: {
			deleteForm() {},
			preSubmitForm() {
				if (!this.item) {
					this.submitForm()
				} else {
					this.$v.$touch()
					if (this.$v.$invalid) {
						this.submitStatus = 'ERROR'
					} else {
						this.submitStatus = 'PENDING'
						if (this.item) {
							UIkit.modal.confirm('해지하시겠습니까?').then(() => {
								this.$axios.$delete(this.path + this.sendData.uid).then(res => {
									this.callNotification('해지하였습니다.')
									this.closeForm()
									location.reload()
								})
							})
						} else {
							console.err(e)
						}
					}
				}
			},
		},
	}
</script>

<style lang="scss"></style>
