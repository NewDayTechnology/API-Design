# URLs and Verbs

---

#### TL;DR

- Use standard HTTP verbs
- Use human readable URLs
- Use pluralised entity names in URLs (/people/1 instead of /person/1)
- Kebab case, and lowercase entity names in URLs (/collection-records instead of /collectionrecords)
- Do not include `api` in URLs

While a few of the above TL;DR decisions have subjective answers on either side, we should try to just pick one where possible to avoid yak shaving (especially when it comes to plural/singular entity names).

## Naming in Urls

- You **MUST** must have consistency locally within your system for pluralisation, 
so no API on the same sub-domain that has multiple conventions.

- If you include the type in the variable name it **MUST** represent the underlaying type.

- You **MUST** keep URLs verb free (e.g. `/accounts/123/getcards`` is incorrect, a HTTP GET to `/account/123/cards` is correct)

- You **SHOULD** use pluralised entity names in URLs (e.g. `/people/1` instead of `/person/1`)

- API URLs **DO NOT REQUIRE** `api` in the URL (e.g `/account/123/cards` ✓ looks good, `/api/account/123/cards` not necessary)

## Casing

- ###  Path values must be lowercase, and hypenated

    Examples:

        /collection-records/1

        NOT

        /CollectionRecords/1
        /collectionRecords/1

- ### URL paths should be case insensitive

    Example:

        /collection-records/1
        /Collection-Records/1
        /CoLlEcTiOn-ReCoRdS/1

    Are all the same route.

- ### MUST use camelCase for query parameters

    Example: `/collection-records?sortBy=Date`

## Headers

- ### HTTP headers use Capitalized-Hyphenated-Terms

    Any HTTP headers are the exception and SHOULD use standard HTTP convention of Capitalized-Hyphenated-Terms.

- ### MUST NOT use x-prefixed headers

    `x-prefixed` headers are not-recommended, and considered bad practice. We should not use `x-prefixed` headers.

    If you want to use custom headers of your own design:

    Example:

        My-Custom-Header: My-Custom-Value

        NOT

        X-My-Custom-Header: My-Custom-Value

## Resource Design

- ### Split resources where possible

    Multiple top level resources for aggregate roots are more useful to callers.

    Examples:

        /customers/5
        /orders/23

        instead of

        /customers/5/orders/23

- ### Must Identify resources and sub-resources via path segments if sub-resources are not top-level resources

    If sub-resources are required, use the path segments to indicate them.

    Examples:

        /orders/2/items/1

- ### Use summary objects or lists for collections of referenced resources

        /customers/1/orders -> returns summary of orders
        /orders/1 -> returns full order objects

    Summary objects MUST contain at least the URI of the full resource, and it's ID.
    Summary objects MAY contain other properties, but they MUST be consistent with the full resource.

- ## HTTP Verbs and Methods

    HTTP methods are frequently referred to as the HTTP verbs.
    The appropriate verbs should be used when creating the API.

    **The verb should not exist in the URI or another form of the verb** (e.g. no need to write “SAVE” in URI when the verb is a POST or PATCH).

    The available verbs are listed in the RFC 261 specification in section 9.1.2.

    Operations **MUST** use the proper HTTP methods whenever possible, and operation idempotency **MUST** be respected.

    Borrowed from [Microsoft REST API fundamentals](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#74-supported-methods), the following should be respected:

    For response/status codes see: [guidelines/StatusCodes.md](../guidelines/StatusCodes.md)

Method  | Description                                                                                                                | Is Idempotent
------- | -------------------------------------------------------------------------------------------------------------------------- | -------------
GET     | Return the current value of an object                                                                                      | True
PUT     | Replace an object, or create a named object, when applicable                                                               | True
DELETE  | Delete an object                                                                                                           | True
POST    | Create a new object based on the data provided, or submit a command                                                        | False
HEAD    | Return metadata of an object for a GET response. Resources that support the GET method MAY support the HEAD method as well | True
PATCH   | Apply a partial update to an object                                                                                        | False
OPTIONS | Get information about a request; see below for details.                                                                    | True


## Nouns

Stick to business-wide terminology for common nouns, following our [glossay of nouns](https://newdaycards.atlassian.net/wiki/spaces/ENG/pages/2403926249/Glossary+of+Nouns). We also have a [glossary of business terms for personas](https://newdaycards.atlassian.net/wiki/spaces/DA/pages/1668776990/Users+and+Personas).
