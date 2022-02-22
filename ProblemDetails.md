# API Errors Samples

## ProblemDetails

`ProblemDetails` is not yet a standard, it has been proposed 5 years ago but potentially will never be ratified as a standard.
Its aim is to be machine-readable and leverage web technologies like URIs.
The proposal itself recommend to stick to your existing format instead of adopting ProblemDetails, if you already have one that works for you.
Given we don't currently have an existing internal standard, we should adopt this proposed standard format instead of trying to craft our own.
It is also widely adopted by web frameworks, including ASP.NET Core.

## Types

The `type` field identifies the type of error. It can be seen as a subclass as the main category of error as identified by the status code. If the status code is enough to identify the problem nature (e.g. 404) it should be omitted (which is equivalent to the value `about:blank`)

Types should be defined and shared across the org or superset of APIs, and the type field should contain the URI. Note a URI is not necessarily a URL and we will use an URN (e.g. newday:generic:error:validation).

Should be seen as an ID to map the error to any handling logic or user messaging and each `type` can have it's own set of extra field (called `extensions`). For this reason, different errors that need to provide different fields with extra info, should have different types.

Note this should not be too fine grained but just provide high level types of errors (can eventually be augmented with other info via extensions) and great care need is needed for public APIs to avoid exposing internal details that can lead to attack vectors.

## Use in ASP.NET Core

ASP.NET Core provide a [ProblemDetails](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.problemdetails?view=aspnetcore-6.0) class which provide flexibility to have `extensions` or could be extended for different error types.
One example is [HttpValidationProblemDetails](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpvalidationproblemdetails?view=aspnetcore-6.0).

Note that by default when it is a built-in logic emitting the error, it will include the `status` field. The `status` field is optional so while there is no need to always populate, it can be present.

## Register of generic types

| Status | Type | Title | Sample |
| ------ | ---- | ----- | ------ |
| 400 Bad Request | newday:generic:error:validation | One or more validation errors occurred. | [Validation](#validation) |
| 404 Not Found | newday:generic:error:missing | The resource requested does not exist. | [Missing](#missing) |
| 500 Internal Server Error | newday:generic:error:unavailable | Service can't process the request right now. e.g. one of the dependencies is unavailable. | [Unavailable](#unavailable) |

## Custom types

To define custom types for a particular service or domain, define the URI as `newday:{domain/system}:error:{name}`. That type can also define custom fields (extensions).

Example:

```text
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
```

```json
{
    "type": "newday:kyc:error:authenticationInvalid",
    "remainingAttempts": 3
}
```

Avoid defining custom types when not needed. e.g. a call to /document/{id} for the not found scenario doesn't require a custom type or extra info, a 404 provides enough info by itself.

## Sample Generic Errors

| Status | Sample |
| ------ | ------ |
| 400 Bad Request |  |
| 401 Unauthorized | [Unauthorized](#unauthorized) |
| 403 Forbidden | [Forbidden](#forbidden) |
| 404 Not Found | [Not Found](#generic-not-found) |
| 415 Unsupported Media Type | [Unsupported Media Type](#unsupported-media-type) |
| 429 Too Many Requests | [Too Many Requests](#too-many-requests) |
| 500 Internal Server Error | [Internal Server Error](#generic-internal-server-error) |

## Examples

### Bad Request

#### Validation

In ASP.NET Core, use [ValidationProblemDetails](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-6.0) and set the type field to `newday:generic:error:validation`.
If you need extra fields to provide additional information, on top of the validation errors, define your own custom type.

```text
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json
```

```json
{
    "type": "newday:generic:error:validation",
    "title": "One or more validation errors occurred.",
    "errors": {
        "age": [
            "must be a positive integer",
            "must be less then 120"
        ],
        "items[0].color": [
            "must be 'green', 'red' or 'blue'"
        ],
        "customer.name": [
            "mandatory"
        ]
    }
}
```

### Unauthorized

Authentication required

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json
```

```json
{
}
```

### Forbidden

```text
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
```

```json
{
}
```

### Not Found

#### Generic Not Found

```text
HTTP/1.1 404 Not Found
Content-Type: application/problem+json
```

```json
{
}
```

#### Missing

```text
HTTP/1.1 404 Not Found
Content-Type: application/problem+json
```

```json
{
    "type": "newday:generic:error:missing"
}
```

### Unsupported Media Type

```text
HTTP/1.1 415 Unsupported Media Type
Content-Type: application/problem+json
```

```json
{
}
```

### Too Many Requests

```text
HTTP/1.1 429 Too Many Requests
Content-Type: application/problem+json
Retry-After: 60
```

```json
{
}
```

### Internal Server Error

#### Generic Internal Server Error

```text
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json
```

```json
{
}
```

#### Unavailable

Service can't process the request right now. e.g. one of the dependencies is unavailable

```text
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json
Retry-After: 2
```

```json
{
    "type": "newday:generic:error:unavailable",
}
```

In integration environment it could be more specific, returning list of dependecies that have failed and the `ProblemDetails` isntance of the error returned by each one.

```text
HTTP/1.1 500 Internal Server Error
Content-Type: application/problem+json
Retry-After: 2
```

```json
{
    "type": "newday:generic:error:unavailable",
    "dependencies": [
        {
            "name": "foo",
            "details": {
                "type": "newday:generic:error:unavailable"
            }
        }
    ]
}
```
