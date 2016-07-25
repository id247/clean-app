'use strict';

let settings;

if (process && process.env && process.env.NODE_ENV === 'dnevnik'){
	settings = require('../settings/dnevnik.js');
}else if (process && process.env && process.env.NODE_ENV === 'mosreg'){
	settings = require('../settings/mosreg.js');
}else{
	settings = require('../settings/local.js');
}

import DnevnikOAuth from 'dnevnik-oauth';
import DnevnikAPI from 'dnevnik-api';

DnevnikOAuth.init(settings.OAuthOptions);

DnevnikAPI.init(settings.APIoptions);
DnevnikAPI.setToken(DnevnikOAuth.getToken());

export const OAuth = DnevnikOAuth;
export const API = DnevnikAPI;
