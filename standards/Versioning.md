# Versioning

All our API’s should follow a versioning protocol.

Only major breaking changes should result in a new version, however, we expect developers to minimise the need for versioning by practicing good “addition” to API’s rather than creating a new version for every change. If items need to be made obsolete later it should be only removed when there is a major version change.

All changes should be documented in the project “Change Log” and each API should advestise its major and minor version.

## The Use of Version Numbers

- Major version numbers should be used for breaking changes.
- Minor for non-breaking changes.

We support version numbers in the forms:

- 1 for requests
- 1.0 for responses and documentation

We appreciate that this isn't the full breadth of semantic versioning, but more specificity is of no help to consuming clients in this context.

## Version lifecycle

When a new major version is released, previous version needs to be supported side by side.
Multiple major versions of an API could be implemented either in the same codebase or on a separate one, as long as routing is performed to the appriopriate implementation based on the requested version, as per the [Versioning Standard](#versioning-standard) below.
When creating a new major version of an API, take the opportunity to perform a full review of the API with the aim to include all  required breaking changes and minimize the chance of needing another major version soon after. If the API is also changing in purpose, consider publishing the new API under a new name, isntead of as a new major version of the existing API.

## Versioning Standard

When calling an API, consumers should include in the request, the major version of the API version they want to use.
The API should then include the major and minor version in the response.

### APIs should prefer header versioning

Example:

    GET /users/1 HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Api-Version: 1

### If handling a header is impossible, we should use URI parameters

If environmental restrictions prevents consumers from working with custom headers, that API could support versioning via a query parameter.

Example:

    GET /users/1?api-version=1 HTTP/1.1

The presence of a URI parameter is not a requirement, but will *supercede* the header versioning.

### Omission of either a version header or a version parameter

Omission of either form of API version specification will presume the latest possible version. Combined with forwards compatibility, this should be considered client-safe, and version infinite.

### Services that cannot ensure forwards compatibility

Services that cannot ensure URL path stability across future versions MUST embed the version in the URL path.

Example:

    GET /v1/users/1 HTTP/1.1
    Accept: application/json
    Content-Type: application/json

This is a less-than-ideal-solution, but will be tolerated if confidence is low in forwards compatibility. Versioning in the path will lead to a messy looking public interface, but is the lesser of the evils when faced with a lack of backwards compatibility.

Our APIs, when made avilable to partners, will be hosted under a *single API management portal*, and likely organised by root paths, so path based versioning is less than ideal.

### APIs should advertise the version in the response

Apis response should include the `Api-Version` header with the major and minor version of the api that has processed the request.

Example:

    HTTP/1.1 200 OK
    Date: Thu, 04 Feb 2024 00:42:00 GMT
    Content-Type: application/json
    Api-Version: 1.3

## When not to Version

    Read: “How we aim to extend our APIs”.

The following are example of minor changes. Minor changes requires to bump the minor version of the API and docuemtn the changes, but do not require to release a new major version side by side.

- Adding new API resources
- Adding new optional request parameters or headers to existing API methods
- Adding new properties or headers to existing API responses
- Changing the order of properties or headers in existing API responses
- Changing technology
- Changing the length or format of opaque strings, such as object IDs, error messages, and other human-readable strings

## Definition of a Breaking Change

    Read: “If you’re doing this - strongly consider an alternative”.

Changes to the contract of an API are considered a breaking change. Changes that impact the backwards compatibility of an API are a breaking change.

Teams may define backwards compatibility as their business product line needs require. These terms must be defined so clients understand.

Our guide on what broadly constitutes a breaking change is as follows:

- Removing or renaming APIs or API parameters or headers
- Removing or renaming responses fields or headers
- Changes in behaviour for an existing API; including default parameter / argument behaviour
- Changes in casing of property names, at any point in the object graph (:warning: beware if assigning objects directly based on responses from other services)
- Changes in casing of headers
- Changes in Error Codes

Anything that would violate the *Principle of Least Astonishment*.

**It is better to introduce a new API for these kinds of behavioural changes, then suffer the conseqeunces of versioning the old API.**

## Common Objections to header versioning

**Objection**: It makes it hard to route traffic
**Response**: You have several options for header based versioning.

1. In application versioning - you can use the header inside of your application to route your requests in most common API frameworks. You can achieve this in ASP.NET Core.

2. Outside of application versioning using APIM - you can use APIM dynamic routing to route to multiple running applications or functions based on a version header, if you prefer.

**Objection**: It's harder to describe in an OpenAPI specification.
**Response**: Our APIs, in general, should be both backwards and forwards compatible. In many cases, it's better to introduce a whole new API if the request/response contract of an existing one is so dramatically different that it's not worth the effort to maintain compatibility.

Open API also allows you to provide multiple response and request examples, that can align to various versions of the API.

In the case of depreciating response and request parameters, they should be omitted from documentation in subsequent increments of the API whilst still returned to discourage usage.
