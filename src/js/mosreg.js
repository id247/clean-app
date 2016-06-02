'use strict'

import 'babel-polyfill';
import Main from './index';

const appSettings = {

	API: {
		groupId: 1000000588054,
		folderId: 2526310,
		server: 'school.mosreg.ru',
		cookieName: 'mosreg_project_token',
		scope: 'Files,SocialEntityMembership',	
		clientId: 'ab3baa5a2b3e45c3a912da8c50b754a7',
		clienSecret: '5c15438b793241559629526e68f7f296',
		modalRedirectUrl: '//ad.school.mosreg.ru/promo/oauth',
		redirectUrl: '//ad.school.mosreg.ru/promo/folder',
		develop: true
	}
};

Main(appSettings);

