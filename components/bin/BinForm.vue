<template>
	<div>
		<Transition name="slide-bottom-medium">
			<ScCard>
				<ScCardHeader separator>
					<div class="uk-flex uk-flex-middle">
						<div class="uk-flex-1">
							<ScCardTitle>
								<i class="mdi" :class="[{ 'mdi-details': item }, { 'mdi-plus': !item }]" />
								BIN 카드 {{ item ? '상세' : '등록' }}
							</ScCardTitle>
						</div>
						<ScCardActions>
							<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click.prevent="closeForm" />
						</ScCardActions>
					</div>
				</ScCardHeader>
				<ScCardBody>
					<div class="uk-grid-small uk-grid" data-uk-grid>
						<div class="uk-width-1-1">
							<ScInput v-model="sendData.partner" :error-state="$v.sendData.partner.$error" :validator="$v.sendData.partner">
								<label>파트너사</label>
							</ScInput>
							<ul class="sc-vue-errors">
								<li v-if="!$v.sendData.partner.required">파트너사를 입력하세요</li>
							</ul>
						</div>
						<div class="uk-width-1-1">
							<ScInput
								v-model="sendData.binNumber"
								:error-state="$v.sendData.binNumber.$error"
								:validator="$v.sendData.binNumber"
							>
								<label>카드번호</label>
							</ScInput>
							<ul class="sc-vue-errors">
								<li v-if="!$v.sendData.binNumber.required">카드번호를 입력하세요</li>
							</ul>
						</div>
						<div class="uk-width-1-1">
							<ScInput v-model="sendData.month" :error-state="$v.sendData.month.$error" :validator="$v.sendData.month">
								<label>할부 수</label>
							</ScInput>
							<div style="color: #e53935; font-size: 12px; margin-top: 8px">
								일시불일 경우: 0 / 할부일 경우: 할부개월 수(90개월일 경우: 90) / 할부 결제후 취소되는 경우: 할부개월 수,0
								(90개월 선택 후 취소되는 경우: 90,0)
							</div>
							<ul class="sc-vue-errors">
								<li v-if="!$v.sendData.month.required">할부 수를 입력하세요.</li>
							</ul>
						</div>
					</div>
					<div class="uk-width-1-1 uk-margin-top uk-text-center">
						<button
							class="sc-button sc-button-primary uk-modal-close"
							:disabled="submitStatus === 'PENDING'"
							@click.prevent="preSubmitForm"
						>
							{{ item ? '수정' : '등록' }}
						</button>
						<button
							v-if="item"
							class="sc-button sc-button-danger uk-modal-close"
							:disabled="submitStatus === 'PENDING'"
							@click="deleteForm"
						>
							삭제
						</button>
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
	import formMixins from '@/mixins/formMixins'
	import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'

	export default {
		components: { ScInput },
		mixins: [validationMixin, formMixins],
		props: {
			item: {
				type: Object,
				default: null,
			},
		},
		data() {
			return {
				path: '/bin',
				name: 'bin',
				images: [],
				sendData: {
					partner: '',
					binNumber: '',
					month: '0',
				},
			}
		},
		validations: {
			sendData: {
				partner: {
					required,
				},
				binNumber: {
					required,
				},
				month: {
					required,
				},
			},
		},
		methods: {
			preSubmitForm() {
				let validateMonth = this.sendData.month
				const blank = /^\s+|\s+$/g
				const blank_pattern = /[\s]/g
				const special_pattern = /[`~!@#$%^.&*|\\\'\";:\/?]/gi
				const regex = /[^0-9]/g
				if (validateMonth.replace(blank, '') == '') {
					alert('공백만 입력되었습니다.')
					return (this.sendData.month = '0')
				} else if (blank_pattern.test(validateMonth) == true) {
					alert('공백이 입력되었습니다.')
					return (this.sendData.month = '0')
				} else if (special_pattern.test(validateMonth) == true) {
					alert('특수문자가 입력되었습니다.')
					return (this.sendData.month = '0')
				} else if (regex.test(validateMonth) == true) {
					alert('문자가 입력되었습니다.')
					return (this.sendData.month = '0')
				}
				return this.submitForm()
			},

			deleteForm() {
				UIkit.modal.confirm('삭제하시겠습니까?').then(() => {
					this.$axios.$delete(this.path + '/' + this.sendData.id).then(res => {
						console.log(this.$axios.$delete)
						this.callNotification('삭제하였습니다.')
						this.closeForm()
					})
				})
			},
		},
	}
</script>

<style lang="scss"></style>
