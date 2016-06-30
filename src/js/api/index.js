import { OAuthOptions,  APIoptions } from 'appSettings';
import DnevnikOAuth from 'dnevnik-oauth';
import DnevnikAPI from 'dnevnik-api';

DnevnikOAuth.init(OAuthOptions);

DnevnikAPI.init(APIoptions);
DnevnikAPI.setToken( DnevnikOAuth.getToken() );

export const OAuth = DnevnikOAuth;
export const API = DnevnikAPI;
