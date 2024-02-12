# Versioning

All our APIs should follow a versioning protocol.

Only major breaking changes should result in a new version. However, we expect developers to minimize the need for versioning by practicing good "addition" to APIs, rather than creating a new version for every change. If items need to be made obsolete later, they should only be removed when there is a major version change.

All changes should be documented in the project "Change Log", and each API should advertise its major and minor version.

To reiterate, **major versions must be avoided and kept as a last resort; incremental changes are the way forward**.

## The Use of Version Numbers

- Major version numbers should be used for breaking changes.
- Minor version numbers for non-breaking changes.

We support version numbers in the forms:

- 1 for requests
- 1.0 for responses and documentation

We appreciate that this isn't the full breadth of semantic versioning, but more specificity is of no help to consuming clients in this context.

## Version Lifecycle

When a new major version is released, the previous version needs to be supported side by side for a non-trivial amount of time.

Multiple major versions of an API could be implemented either in the same codebase or on a separate one, as long as routing is performed to the appropriate implementation based on the requested version, as per the [Versioning Standard](#versioning-standard) below.

When creating a new major version of an API, take the opportunity to perform a full review of the API with the aim to include all required breaking changes and minimize the chance of needing another major version soon after. If the API is also changing in purpose, consider publishing the new API under a new name, instead of as a new major version of the existing API.

Breaking changes in contracts should be cleaned up versions of previously "uglified" APIs due to additions, where at all possible. This means that a client can trivially migrate to the next version if they’re using the latest version of the docs.

When we deprecate fields or clean them up inside the same version (say, renaming a field), we should mark the old field as `deprecated` in the API spec, so that it could be hidden by default from the visualization of the docs even where it’s still returned in the response objects.

## Versioning Standard

When calling an API, consumers should include in the request the major version of the API version they want to use.
The API should then include the major and minor version in the response.

### APIs Header Versioning

Example:

```rest
GET /users/1 HTTP/1.1
Accept: application/json
Api-Version: 1
```

#### Exception to Header Versioning

In the rare circumstances where environmental restrictions prevent headers from flowing through the system, APIs should support versioning via a query parameter. Note this doesn't mean that an API should always support this mechanism; it should only be implemented when strictly required.

Example:

```rest
GET /users/1?api-version=1 HTTP/1.1
Accept: application/json
```

The presence of a URI parameter is not a requirement but will *supersede* the header versioning.

### Implicit Version

Omission of either form of API version specification will presume the latest possible version. This is not client-safe and there is no guarantee of forward compatibility.

### Avoid Path Versioning

We must entirely abandon URL versioning because it leads to URL pollution and is not always friendly for caching mechanisms or for storing references to resources.
It will also lead to duplication of endpoint paths and poor organization in the API Dev Portal.

Example to avoid:

```rest
GET /v1/users/1 HTTP/1.1
Accept: application/json
```

### APIs Response Version Header

APIs response should include the `Api-Version` header with the major and minor version of the API that has processed the request.

Example:

```txt
HTTP/1.1 200 OK
Date: Thu, 04 Feb 2024 00:42:00 GMT
Content-Type: application/json
Api-Version: 1.3
```

### Clients expectations

Clients should always be tolerant of non-breaking additions to contracts.
Clients should always include an `Api-Version` header to specify the major version requested.
Clients can rely on the `Api-Version` header returned by the server to detect the minor version and use it as a discriminator to determine which new non-breaking additions are available (i.e., checking the version, instead of checking for the presence of each new individual field).

Example:

```rest
GET /users/1 HTTP/1.1
Accept: application/json
Api-Version: 1
```

```txt
HTTP/1.1 200 OK
Date: Thu, 04 Feb 2024 00:42:00 GMT
Content-Type: application/json
Api-Version: 1.3
```

## Definition of Minor Change

> “How we aim to extend our APIs”.

The following are examples of minor changes. Minor changes require bumping the minor version of the API and documenting the changes but do not require releasing a new major version side-by-side.

- Adding new API resources
- Adding new optional request parameters or headers to existing API methods
- Adding new properties or headers to existing API responses
- Changing the order of properties or headers in existing API responses
- Changing technology
- Changing the length or format of opaque strings, such as object IDs, error messages, and other human-readable strings

## Definition of a Breaking Change

> “If you’re doing this - strongly consider an alternative”.

Changes to the contract of an API are considered a breaking change. Changes that impact the backwards compatibility of an API are a breaking change.

Teams may define backwards compatibility as their business product line needs require. These terms must be defined so clients understand.

Our guide on what broadly constitutes a breaking change is as follows:

- Removing or renaming APIs or API parameters or headers
- Removing or renaming response fields or headers
- Changes in behavior for an existing API; including default parameter and argument behavior
- Changes in casing of property names, at any point in the object graph (:warning: beware if assigning objects directly based on responses from other services)
- Changes in casing of headers
- Changes in Error Codes

Anything that would violate the *Principle of Least Astonishment*.

**It is better to introduce a new API for these kinds of behavioral changes, then suffer the consequences of versioning the old API.**

## FAQ on Header Versioning

- **Objection**: It makes it hard to route traffic.

  **Response**: You have several options for header-based versioning.

  1. In-application versioning - you can use the header inside of your application to route your requests in most common API frameworks. You can achieve this in ASP.NET Core.

  2. Outside of application versioning using APIM - you can use APIM dynamic routing to route to multiple running applications or functions based on a version header.

- **Objection**: It's harder to describe in an OpenAPI specification.
  
  **Response**: Our APIs, in general, should be both backwards and forwards compatible. In many cases, it's better to introduce a whole new API if the request/response contract of an existing one is so dramatically different that it's not worth the effort to maintain compatibility.

  OpenAPI also allows you to indicate which version of the API is described.

  In the case of deprecating response and request parameters, they should be annotated as deprecated in the documentation of the API, whilst still returned, to discourage usage.
