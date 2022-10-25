# Security

---
## Contents

- [API Security at NewDay](#api-security-at-newday)
  - [Contents](#contents)
  - [Checklist](#checklist)
  - [API Discovery and Classification](#api-discovery-and-classification)
  - [Security Principles](#security-principles)
  - [RESTful API Security Standards](#restful-api-security-standards)
  - [GraphQL API Security Standards](#graphql-api-security-standards)
  - [API Security Testing](#api-security-testing)
  - [Guidelines](#guidelines)


## Checklist

- [x] API is classified and has been approved through API CoE
- [ ] API follows security principles
- [ ] API adheres to security standards
- [ ] API has passed CI/CD checks for security testing :tada:

## API Discovery and Classification

To understand the risk and associated threats to an API that we are building, we need to understand how and where it will be used. This informs us about the happy path, and the unhappy (attack!) path. We can write code that is free of defects, however we must also discover flaws in business and authentication logic to have secure APIs.

We need to understand:
- Risk of the API, what is the impact of it being compromised - Critical/High/Medium/Low
- Which APIs store, process, transmit customer personal data (GDPR)
- Which APIs store, process, transmit card holder data (PCI)
- Where the API is on our platform - Unified/Domain/Core
- NewDay client specific requirements

| Risk | Business Impact | Data Classification |
| --- | --- | --- |
| `Critical` | The service is mission critical and failure will cause service outage | This service transmits Customer Personal Data, Cardholder data, or sensitive authentication data  | 
| `High` | The service is mission critical and failure will impact functionality | The service exposes sensitive data but cannot be used to identify a customer |
| `Medium` | Service outage does not create an operational impact or outage is not service affecting |  | 
| `Low` | Disruption of endpoint has low impact on NewDay Operations | The service transmits data that is is publicly and anonymously available | 


## Security Principles

Principles - Further Details & Guidelines: 

### 1. Use approved identity providers and authentication pattersn

Use token-based access control: solution designs and process flows must force clients to use token-based credentials when invoking APIs. They must oblige clients to pass tokens as a header with each API call. Designs must not rely on username/password credential pairs or other long-term credentials  given the low security of password/username credentials.
Note: Open ID connect 'sits on top of' Oath 2.0, providing ID tokens for authentication and access to further information (such as /user info endpoints on Authorisation servers) thus providing further context and detail on the authenticated user/s. It also provides the same capabilities as SAML 2.0 by offering federated SSO interoperability.

### 2. Use approved patterns for API integration

Deployment teams should deploy front end/unified APIs on API gateways for all connections, including to platform and core NewDay API's. Front end/unified APIs hosted on API gateways should apply security policies such as Oauth v2 enforcement, rate limiting, auditing, and data filtering capabilities provided by the gateway. Cross platform API calls should be made through the API gateway/s.

### 3. Encrypted: Use TLS on all API communication interfaces

All API's must transmit data over TLS. Private API's (not publicly accessible over the internet) and semi-public (e.g., APIs for partners) may use self-signed certificates, but public  unified API's must not use self-signed certificates and must use certs signed by a certificate authority.

Where possible use mutual TLS on all core integrations (to key data stores and vice versa) and API interfaces for PSD/2, PCI and PII systems.

Use mutual TLS on any API calls from/to external interfaces and on API calls from guest/dev areas to the internal network.

### 4. Targeted: Filter the data returned to the client

The full capabilities and functionality encapsulated by platform and core APIs should be consumed via front end/unified APIs tailored to the specific needs of the requesting principals. The unified (front facing) should only return datasets appropriate to the consuming app/interface or principal of the requesting API.

### 5. Minimised and Locked (Fail-safe)

APIs should not be accessible by default. Every call must be authenticated and authorised to execute queries and commands. Even public experience APIs exposing information classified as public should only be consumed by registered client applications. Private, platform, and core NewDay APIs should only be called by registered unified/front APIs. The information used by APIs in queries and commands must not be visible to third parties. 

### 6. Authenticated

Use Oauth2.0 and OpenID connect to issue and validate bearer tokens to API clients. API designs should oblige all consumers of unified/front end APIs to pass an OpenID connect token as well as the access token. The consuming app/server (or client) must authenticate itself with the relevant authorisation gateway (or API) and it is recommended that multi-factor authentication is used to authenticate the user (principal). The API must validate the token received at the end of the flow.

### 7. Authorised

Unified/front facing APIs parsing sensitive and/or confidential information should be protected with OpenID Connect authorisation code flows. The access token addresses the client-oriented access control/authorisation. The API should pass both the access token and id token in separate headers in the API call. You must apply an access token validation policy to all API's.  Allowed Oauth 2.0 grant types: 
Authorisation code grant (with PKCE) should be used for experience APIs serving mobile and public (non NewDay) devices.
The 'client credentials' grant type should only be used for service to service calls.  

### 8. Protect platform (and Core) API's with Oath2.0 Client Credentials

Core NewDay APIs must not be consumed directly by end clients and customers. They can only be consumed by unified APIs or platform APIs.  Platform APIs encapsulating or calling core service capabilities/functions must not be consumed or called directly by any consuming client/s. They must only be consumed or called by unified/front end and other platform API's.  Client ids and secrets (when used by platform or core APIs) must be encrypted and stored in Azure key vault. The calling API must request and use Oath 2.0 access using the 'client credentials' grant type. Calling API's may cache access tokens for subsequent invocations. They should request new access tokens before the previous ones expire (see refresh token requirements below).

### 9. Front end or unified APIs: Apply user-oriented access controls

An inherent weakness to Oath 2.0 is the assumption that the user on behalf of whom the access token was issued to the consuming app (client), is the owner of the resource. It is not recommended to allow access to experience, mid/core tier APIs with sensitive information until the service has verified the identity of users, including information which will inform an access control decision. The service should use the Open ID Connect ID/OpenID token to help with this decision. The service should propagate the ID token across every API call made by all API's participating in a client user transaction. The service/s may make access control decisions based on the group to which the user/s belongs. They SHOULD look for this group name in the Open ID Connect ID token. Do NOT hard-code role names in ID tokens as roles are specific to individual APIs. (There is no provision for this in the OIDC standard, but the standard is extensible, and you SHOULD configure your identity provider to return the group name – (see the Azure implementation guide)  

### 10. Secure Refresh tokens

Use the Authorization Code flow with PKCE for all new projects. The Implicit flow is not broken but should be phased out. Be careful with using refresh tokens in web applications and do not use long-lived refresh tokens in the browser.  Make the refresh tokens dependent on the user's session: RTR (see link below) is not a catch-all security measure. If an attacker manages to obtain the last refresh token before the app closes, they might be able to keep rotating the stolen refresh token. expires. Focus on preventing XSS vulnerabilities in the front end - XSS results in the complete compromise of the client/application. 


## RESTful API Security Standards

**Requires fleshing out standard authentication information here**.

### OWASP

The OWASP Project have a [cheatsheet on REST security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html).

There is also a short [testing methodology for testing REST security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Assessment_Cheat_Sheet.html).

### GraphQL API Security Standards

The OWASP Project have a [cheatsheet on GraphQL security](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html).

There is also a short [testing methodology for testing GraphQL security](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/01-Testing_GraphQL).


## API Security Testing
We have a standard CI/CD pipeline, where the following testing needs to be completed and issues remediated aligned with our internal standard for vulnerability management: 
- Static code analysis - SAST
- Secrets scanning
- Dependency scanning
- Dynamic Application Security Test - DAST
- New services which are publicly available need to be added to Bug Bounty Program and assessed by AppSec team for Penetration Testing requirement

## Guidelines
**To Complete
