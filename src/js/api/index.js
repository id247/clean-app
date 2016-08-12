'use strict';

import hello from '../../../node_modules/hellojs/dist/hello.js';
//import hello from 'hellojs';
import { OAuthOptions } from 'appSettings';

hello.init({

	dnevnik: {
		name: 'Dnevnik',

		oauth: {
			version: 2,
			auth: 'https://login.staging.dnevnik.ru/oauth2',
			grant: 'https://api.staging.dnevnik.ru/v1/authorizations'
		},

		// Refresh the access_token once expired
		refresh: true,

		scope: {
			'basic': OAuthOptions.scope,
		},

		response_type: 'token',

		scope_delim: ' ',

		login: function(p) {
			p.options.popup.width = 710;
		},

		base: 'https://api.staging.dnevnik.ru/v1/',

		// There aren't many routes that map to the hello.api so I included me/bikes
		// ... because, bikes
		get: {
			//users: 'users/me'
		},
		wrap: {
			//me: function(o, headers) {}
		}
	}
});

hello.init({
	// Register app https://sellercentral.dnevnik.com/gp/homepage.html
	dnevnik : OAuthOptions.clientId,
},{
	redirect_uri : OAuthOptions.modalRedirectUrl,
});

const dnevnik = hello('dnevnik');

function realPromise(options){
	return new Promise( (resolve, reject) => {
		options.callback = function(data){
			console.log(data);

			resolve(data);
		};

		dnevnik.api(options.url)
		.then(
			res => {
				console.log(res.type);
				switch(res.type){
					case 'tokenRequired':
						reject(res.description);
						break;
					default:
						resolve(res);
				}
			},
			err => {
				console.error(err);
				reject(err);
			}
		);
	});
} 

export const OAuth = {
	login: () => {
		return dnevnik.login();
	},
	logout: () => {
		return dnevnik.logout();
	},
} 

export const API = {
	getUser: (userId = 'me') => {
		const options = {
			url: 'users/' + userId
		};

		return realPromise(options);
	},
} 



