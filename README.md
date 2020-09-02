

# React-oidc-client-js

> OpenID Connect (OIDC) client with React and typescript

- This is sample application that contains [oidc-client-js](https://github.com/IdentityModel/oidc-client-js) and `React` with `Typescript`.

- The application is based on `create-react-app` - [Create React App](https://github.com/facebook/create-react-app)

# Project status
[![Build status](https://ci.appveyor.com/api/projects/status/5ml2f07trcm072a1?svg=true)](https://ci.appveyor.com/project/JanSkoruba/react-oidc-client-js)

# Installation

## Cloning app

- `git clone https://github.com/razi-rais/react-oidc-client-js.git`
- `cd src/`

## Install dependecies

- Install dependecies - `yarn install`

## Configure

- Make sure your create a new B2C application and manifest looks similar to the following:

```
{
	"id": "443ca8db-7bd1-4ebd-9671-ce94e006a18a",
	"acceptMappedClaims": null,
	"accessTokenAcceptedVersion": 2,
	"addIns": [],
	"allowPublicClient": null,
	"appId": "50d2c416-a5ad-4c5c-b36a-0d1ac5b48167",
	"appRoles": [],
	"oauth2AllowUrlPathMatching": false,
	"createdDateTime": "2020-09-02T00:11:35Z",
	"groupMembershipClaims": null,
	"identifierUris": [],
	"informationalUrls": {
		"termsOfService": null,
		"support": null,
		"privacy": null,
		"marketing": null
	},
	"keyCredentials": [],
	"knownClientApplications": [],
	"logoUrl": null,
	"logoutUrl": null,
	"name": "OIDC-Test-APP",
	"oauth2AllowIdTokenImplicitFlow": false,
	"oauth2AllowImplicitFlow": false,
	"oauth2Permissions": [],
	"oauth2RequirePostResponse": false,
	"optionalClaims": null,
	"orgRestrictions": [],
	"parentalControlSettings": {
		"countriesBlockedForMinors": [],
		"legalAgeGroupRule": "Allow"
	},
	"passwordCredentials": [],
	"preAuthorizedApplications": [],
	"publisherDomain": "contoso.onmicrosoft.com",
	"replyUrlsWithType": [
		{
			"url": "http://localhost:3000/signin-callback.html",
			"type": "Spa"
		},
		{
			"url": "http://localhost:3000/",
			"type": "Spa"
		}
	],
	"requiredResourceAccess": [
		{
			"resourceAppId": "00000003-0000-0000-c000-000000000000",
			"resourceAccess": [
				{
					"id": "37f7f235-527c-4136-accd-4a02d197296e",
					"type": "Scope"
				},
				{
					"id": "7427e0e9-2fba-42fe-b0c0-848c9e6a8182",
					"type": "Scope"
				}
			]
		},
		{
			"resourceAppId": "18ac2afe-2c1f-4ea8-8d63-14dd50ee4f85",
			"resourceAccess": [
				{
					"id": "d5515006-5646-4398-ad59-fffc357f3423",
					"type": "Scope"
				}
			]
		}
	],
	"samlMetadataUrl": null,
	"signInUrl": null,
	"signInAudience": "AzureADandPersonalMicrosoftAccount",
	"tags": [],
	"tokenEncryptionKeyId": null
}
```

App Settings and Permissions:

![alt text](https://github.com/razi-rais/react-oidc-client-js/blob/master/docs/Images/app_settings.png?raw=true)
![alt text](https://github.com/razi-rais/react-oidc-client-js/blob/master/docs/Images/app_permissions.png?raw=true)

- The default b2c settings are inside ```AuthService.ts``` and using OAuth2 Authroization Code Grant with PKCE by default. You need to update the tenant name ```contoso``` and ```client_id``` to match your b2c tenant and application respectively. 

Library also supports implict flow but to enable it you need to change ``` response_type: 'code'``` to ``` response_type: 'id_token' ```

```
const settings = {

      // This is  the metadata endpoint
      authority: 'https://contoso.b2clogin.com/contoso.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_signup_signin',
      
      // Turn off calls to user info since CORS will block it
      loadUserInfo: false, 

      // The URL where the Web UI receives the login result
      redirect_uri: 'http://localhost:3000/signin-callback.html',

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
        end_session_endpoint: "https://contoso.b2clogin.com/contoso.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1a_signup_signin&post_logout_redirect_uri=http%3A%2F%2Flocalhost:3000%2F"

    },

  } as UserManagerSettings;
```

## Running app

- `yarn start` - start the web server that is running on [http://localhost:3000](http://localhost:3000)
 
- The app will launch on [http://localhost:3000](http://localhost:3000)

![alt text](https://github.com/razi-rais/react-oidc-client-js/blob/master/docs/Images/app_home.png?raw=true)

- Click on the login button and it will take you to b2c policy. Perfrom the sign using the b2c policy.

![alt text](https://github.com/razi-rais/react-oidc-client-js/blob/master/docs/Images/login.png?raw=true)


- You will be reverted back to the application from b2c along with the tokens (minimum id_token and if you have defined the scope for access token then it will be return too)

![alt text](https://github.com/razi-rais/react-oidc-client-js/blob/master/docs/Images/post%20login.png)


 
