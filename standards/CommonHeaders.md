# Common Headers

In order to ensure consistency and interoperability across our APIs, we have defined a set of common headers that should be used in all API requests and responses. These headers provide important information and help to enforce security, versioning, and other standards.

By adhering to these common headers, we can establish a consistent and reliable API standard that promotes interoperability and simplifies integration with our services.

## Content-Type Header

The `Content-Type` header specifies the media type of the request or response payload. It helps the server understand how to parse and process the data being sent or received. Common values for this header include `application/json`, `application/xml`, and `application/x-www-form-urlencoded`.

## Accept Header

The `Accept` header is used by the client to specify the media types it can handle in the response. It allows the server to send the response in the most appropriate format based on the client's preferences. This header is particularly useful when the API supports multiple response formats.

## API-Version Header

The `API-Version` header is used to indicate the version of the API being used. This header is important for managing backward compatibility and ensuring that clients can safely upgrade to newer versions of the API without breaking their existing integrations.
See [Versioning.md] for more details on this header.

## Client-Session-Id Header

The `Client-Session-Id` header is used to track a client's session across multiple API requests. This unique identifier is essential for maintaining session consistency and is particularly useful in scenarios where stateful interactions are necessary. It enables the system to correlate requests to a specific user session, facilitating better analytics, security audits, and troubleshooting.
Each client MUST generate a unique `Client-Session-Id` for every session, and consistently include it in the headers of all API requests made during that session.
Each API MUST accept a `Client-Session-Id` header in every request, even when it is not needed for it's own processing, and pass it through to any other API called.
The `Client-Session-Id` is NOT an authentication mechanism.
