import { scHelpers } from '~/assets/js/utils'
const { uniqueID } = scHelpers

export const menuEntries = [
	{
		id: uniqueID(),
		title: '게시판',
		icon: 'mdi mdi-file-document-box-check-outline',
		isOpen: true,
		submenu: [
			{
				id: uniqueID(),
				title: '공지사항',
				page: '/notice',
			},
			{
				id: uniqueID(),
				title: 'QnA',
				page: '/qna',
			},
		],
	},
	{
		id: uniqueID(),
		title: '메세지',
		icon: 'mdi mdi-email-check',
		isOpen: false,
		submenu: [
			{
				id: uniqueID(),
				title: '발송하기',
				page: '/dispatch',
			},
		],
	},
]
