// import Vue from 'vue'
// import AWS from 'aws-sdk'
// import dotenv from 'dotenv'

// dotenv.config()

// const region = `${process.env.VUE_APP_AWS_REGION}`
// const access_key = `${process.env.VUE_APP_AWS_ACCESS_KEY}`
// const secret_key = `${process.env.VUE_APP_AWS_SECRET_KEY}`
// const bucket_name = `${process.env.VUE_APP_AWS_BUCKET_NAME}`



// const S3 = new AWS.S3({
// 	region,
// 	credentials: {
// 		accessKeyId: access_key,
// 		secretAccessKey: secret_key,
// 	},
// })

// const objectStorageApi = {
// 	async getObject(id) {
// 		let params = {
// 			Bucket: bucket_name,
// 			Key: "car_image/" + id,
// 		}
// 		try {
// 			const signedUrl = await S3.getSignedUrlPromise("getObject", params)
// 			console.log('signedUrl', signedUrl);
// 			return signedUrl
// 		} catch (err) {
// 			console.error('Error getting object:', err);
// 			return false
// 		}
// 	},
// }

// const objectStoragePlugin = {
// 	install(Vue) {
// 		Vue.mixin({
// 			data() {
// 				return {
// 					objectStorageApi: objectStorageApi,
// 				}
// 			},
// 		})
// 		Object.defineProperty(Vue.prototype, '$objectStorage', {
// 			get() {
// 				return this.$root.objectStorageApi
// 			},
// 		})
// 	},
// }

// Vue.use(objectStoragePlugin)
