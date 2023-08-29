# HTTP Status Codes Guidelines

---

When defining status codes, look at the API from a consumer perspective and think about the meaning of the operation and what action the consumer will take in reaction to the status code received.

The status codes should not necessarily reflect the outcome of underlying operation and should not be driven based on observability goals.

Also only standard status codes should be used, according to [RFC9110](https://www.rfc-editor.org/rfc/rfc9110.html). Status codes in the wrong context or with the wrong semantic is both surprising and usually problematic for consumers (it can break client libraries, monitoring, proxies and so on).

Status codes should be more specific where possible, however **we must not repurpose response codes for other purposes than originally intended** (e.g., don't use WebDAV extensions where a 500 would suffice).



## Common status code use cases

The below outline some examples of where certain HTTP Status Codes may be applied. HTTP Status Codes are often contextual to an APIs contracts. **It is up to the team which is most appopriate for their use cases.** If your team is unsure which status code should be used in an API response your team owns, please raise the query at an API Design Review session or raise your query with a Principal Engineer or Principal Architect.

### 2XX success 

| Status | Descriptor | Use case |
| ------ | -------- |-------- |
| 200 | OK | Used when the operation is successful (or at least partially successful) for the consumer and, for example, it is allowed to proceed with the flow. This is valid even if some dependencies are returning error, as long as those operations are optional or not critical. Further information can be contained in the body of the response. |
| 201 |  Created | The request has been fulfilled, resulting in the creation of a new resource |
| 202 | Accepted | The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs. |
| 204 | No Content | The server successfully processed the request, and is not returning any content. |

### 4XX client errors

| Status | Descriptor | Use case |
| ------ | -------- |-------- |
| 400 | Bad Request | The server cannot or will not process the request due to an apparent client error, for exmaple, the consumer is sending some invalid data or performing an invalid operation. |
| 401 |  Unauthorized | The consumer is not authorised to complete the request required. Ensure your access token is still valid. It is similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided |
| 403 | Forbidden | The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action |
| 404 | Not Found | The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible. |
| 409 | Conflict | Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates. |
| 429 | Too Many Requests | The consumer is sending too many requests to the API and must back off for some period of time. This is configured in the APIM policy for the API. |

### 5xx server errors

| Status | Descriptor | Use case |
| ------ | -------- |-------- |
| 500 | Internal Server Error | The service can not handle the request. It doesn't matter if the service itself is broken, or one of the core dependency is not available. From the consumer point of view, what matters is that the request can not be fulfilled at the moment and they should retry later. |
| 502 | Bad Gateway | The server was acting as a gateway or proxy and received an invalid response from the upstream server. Generally used by proxies/gateway (like APIM in our case) when they can't reach the backend. |
| 503 | Service Unavailable | The server cannot handle the request (because it is overloaded or down for maintenance). Often, this is a temporary state. Generally used by proxies/gateway (like APIM in our case) when they can't reach the backend. |
| 504 | Gateway Timeout | The server was acting as a gateway or proxy and did not receive a timely response from the upstream server. Generally used by proxies/gateway (like APIM in our case) when they can't reach the backend. |


_Note: One high level categorization that usually help with error is that 5XX and 408 (request timeout) are transient, as in the consumer should try to submit the same request later. All the other errors are not, there is no point sending the same request again._
