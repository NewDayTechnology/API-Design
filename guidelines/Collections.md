# Collections and Pagination

---

This guidance is mostly derived from [Microsofts API guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#9-collections).

## Serving collections over HTTP

Much like

```http
GET /users/1
```

should return the User entity with Id 1, the collection of Users should be returned as follows:

```http
GET /users
```

Collections can choose to either return a list of complete entities OR a list of summary objects, which act as an index for subsequent queries. In either case, if the number of items that could occur in such a list is unknown or can grow arbitrarily, **the collection should return a paginated list**.

## Empty Collections

Empty collections should always return a HTTP 200 and an empty array. Any other status code could indicate to the client that there was an error.

## Summary Objects

When nested collections refer to other root entities, use summary objects to reference these resources.

```http
GET /customers/1/orders -> returns summary of orders
GET /orders/1 -> returns full order objects
```

Summary objects **MUST** contain at least the URI of the full resource, and it's ID.
Summary objects **MAY** contain other properties, but they MUST be consistent with the full resource.

Summary objects are most comment when nesting one aggregate root inside another - such as a list of references to `orders` inside a `user` entity. Situationally, summary objects may contain additional data to prevent the client `enumerating lists` for predictable values (e.g. return the `OrderReference` on an `OrderSummary` rather than having the client issue multiple requests where possible).

## Pagination

RESTful APIs that return collections SHOULD return partial sets, to allow for a better experience to clients and to avoid performance issues. Consumers of these services MUST expect partial result sets and correctly page through to retrieve an entire set.

There are two main different forms of pagination that MAY be supported by RESTful APIs.

*Cursor-based pagination*: a unique key identifies the first page-entry (see also Twitter API or Facebook API)

*Offset-based pagination*: a offset identifies how many items to skip, implicitly identifying the first item of the page. It can then be split into two subtypes.
Server-driven paging mitigates against denial-of-service attacks by forcibly paginating a request over multiple response payloads. Client-driven paging enables clients to request only the number of resources that it can use at a given time.

APIs SHOULD use *Cursor-based pagination* as it allows for predictable results (i.e. avoid missed elements on collection changes) and far more efficient implementations (in particular when using non-relational databases).

Sorting and filtering parameters MUST be preserved across pages.

A sample minimal response will look like:

```json
{
  "items": [/*...*/],
  "next": "{opaqueUrl}",
}
```

Paginated collections properties:

- MUST have a `next` property in the response that indicates the next page of results. If the property is missing, this is the last page.
- SHOULD have a `prev` property with a link to the previous page. If a API response define such property, when missing it indicates it is the first page.
- COULD have the `first`, `last` and `self` properties pointing to the first, last and current page of the resultset.
- COULD have a `query` property containing an object defining the query and sorting used.

A full example will look like:

```json
{
  "items": [/*...*/],
  "next": "{opaqueUrl}",
  "prev": "{opaqueUrl}",
  "first": "{opaqueUrl}",
  "last": "{opaqueUrl}",
  "self": "{selfLink}",
  "query": {
    "filterCriteriaA": "value",
    "filterCriteriaB": "value",
    "orderingRuleA": "value",
  }
}

### Supporting Client-Driven Offset-based pagination

_This approach is in general not reccomended, however when required (e.g. there is a need to jump around multiple pages instead of moving sequentially), it MUST be implemented following these guidelines._

Clients MAY use `$top` and `$skip` query parameters to specify a number of results to return and an offset into the collection.

The server SHOULD honor the values specified by the client, but enforcing limits on page size to protect against denial-of-service attacks; however, clients MUST be prepared to handle responses that contain a smaller page size.
Essentialy, the server **SHOULD** handle `$top` as a contraint of maximum page size; it should try to honour the request, however  it MAY return less elements than the specified page size when appropriate.

When both `$top` and `$skip` are given by a client, the server SHOULD first apply `$skip` and then `$top` on the collection.

Note: If the server can't honor `$top` and/or `$skip`, the server MUST return an error to the client informing about it instead of just ignoring the query options. This will avoid the risk of the client making assumptions about the data returned.
