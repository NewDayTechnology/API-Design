# HTTP Status Codes Guidelines

---

When defining status codes, look at the API from a consumer perspective and think about the meaning of the operation and what action the consumer will take in reaction to the status code received.

The status codes should not necessarily reflect the outcome of underlying operation and should not be driven based on observability goals.

Also only standard status codes should be used, using status codes in the wrong context (e.g. protocol specific ones like 422) or with the wrong semantic is both surprising and usually problematic for consumers (it can break client libraries, monitoring, proxies and so on).

Status codes should be more specific where possible.

| Status | Use case |
| ------ | -------- |
| 200 | should be used when the operation is successful (or at least partially successful) for the consumer and, for example, it is allowed to proceed with the flow. This is valid even if some dependencies are returning error, as long as those operations are optional or not critical. There are some other codes: 201 when specifically a resource has been created, 202 when the request will be processed asynchronously, 204 when the response body is empty (200 preferred as you can extend it later adding a body without making a breaking change) |
| 400 | The consumer is sending some invalid data or performing an invalid operation. There is no point in retrying the same request. One exception is when the resource is in an invalid state to accept the request, but the request is otherwise correct and could be performed later when the state as changed. In this case 409 can be used. |
| 404 | the resource does not exist |
| 500 | The service can not handle the request. It doesn't matter if the service itself is broken, or one of the core dependency is not available. From the consumer point of view, what matters is that the request can not be fulfilled at the moment and they should retry later. There are other errors that more specifically define unavailability (502,3,4) but those are generally used by proxies/gateway (like APIM in our case) when they can't reach the backend. |

_One high level categorization that usually help with error is that 5XX and 408 (request timeout) are transient, as in the consumer should try to submit the same request later. All the other errors are not, there is no point sending the same request again._


---

Each request to the API should respond with the appropriate HTTP response code as defined in RFC 2616 Section 10:

[RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1](https://datatracker.ietf.org/doc/html/rfc2616#section-10)

**We must not repurpose response codes for other purposes than originally intended**. (e.g. don't use WebDAV extensions where a 500 would suffice.)
