import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';

import { Constants } from '../helpers/Constants';

export class AuthService {
  public userManager: UserManager;

 
  constructor() {
    /* Un comment after tesing with settings below and read from constacts instead of hard-coding.
    const settings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback.html`,
      silent_redirect_uri: `${Constants.clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${Constants.clientRoot}`,
      response_type: 'code',
      scope: Constants.clientScope
    };
    */
    const settings = {

      // This is  the metadata endpoint
      authority: 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_signup_signin',
      
      // Turn off calls to user info since CORS will block it
      loadUserInfo: false, 

      // The URL where the Web UI receives the login result
      redirect_uri: 'http://localhost:4200/signin-callback.html',

      // The no longer recommended implicit flow must be used if CORS is disabled
      // If you want to use impicit flow use id_token instead of code for the return type.
      response_type: 'code',

      // Other OAuth settings
      client_id: '18ac2afe-2c1f-4ea8-8d63-14dd50ee4f85',
      
      // openid is required, remove https://contoso.onmicrosoft.com/test/Read if access_token is not required.
      scope: 'openid https://contoso.onmicrosoft.com/test/Read', 
       // Supply these details explicitly. Directly copied from azure ad b2c policy metadata endpoint.
       metadata: {
        issuer: 'https://contoso.b2clogin.com/9859cd0c-9d99-4683-abcc-87462f67a0bc/v2.0/',
        authorization_endpoint: 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1a_signup_signin',
        token_endpoint: 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1a_signup_signin',
        jwks_uri : 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1a_signup_signin',
        end_session_endpoint: "https://contoso.b2clogin.com/contoso.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1a_signup_signin&post_logout_redirect_uri=http%3A%2F%2Flocalhost:4200%2F"

    },

  } as UserManagerSettings;
    
     this.userManager = new UserManager(settings);
    
    
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
