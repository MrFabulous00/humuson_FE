import {helpers} from 'vuelidate/lib/validators'

const customValidators = {}

customValidators.minCheck = (min) => helpers.withParams(
	{type: 'minCheck', min: min},
	(value) => !helpers.req(value) || value.length >= min
)
customValidators.maxCheck = (max) => helpers.withParams(
	{type: 'maxCheck', max: max},
	(value) => !helpers.req(value) || value.length <= max
)
customValidators.minMaxCheck = (min, max) => helpers.withParams(
	{type: 'minMaxCheck', min: min, max: max},
	(value) => !helpers.req(value) || (min <= value.length && value.length <= max)
)
customValidators.idFormatCheck = () => helpers.regex(
	'idFormatCheck',
	/^[a-z0-9]{3,20}$/i
)
customValidators.passwordFormatCheck = () => helpers.regex(
	'passwordFormatCheck',
	/^[a-zA-Z0-9@$!%*#?&+_]{4,20}$/i
)
customValidators.integerFormatCheck = () => helpers.regex(
	'integerFormatCheck',
	/[0-9]/i
)
customValidators.versionFormatCheck = () => helpers.regex(
    'versionFormatCheck',
    /^\d{1,2}[.]\d{1,2}[.]\d{1,2}$/
)

customValidators.versionMinMaxCheck = (min, max) => helpers.withParams(
    {type: 'versionMinMaxCheck', min: min, max: max},
    (value) => !helpers.req(value) || (min <= value.length && value.length <= max)
)



export default customValidators
