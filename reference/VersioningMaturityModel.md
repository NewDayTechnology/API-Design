# API Versioning Maturity Model

## Level 1: No Versioning

The API does not support versioning. Changes are made in-place, leading to potential breaking changes for existing consumers. This implies a high risk of disrupting client applications with each update. It is suitable only for very early-stage, internal, or experimental APIs where consumers can be closely coordinated with.

### To Progress

- Move toward introducing basic versioning as soon as the API is used beyond a tightly controlled environment.

## Level 2: Path or Query Parameter Versioning

Versioning is introduced through query parameters (e.g., `?version=1`) or included in the URL path (e.g., `/v1/resource`). This method is simple to implement. It provides a basic versioning mechanism but can lead to URL pollution and is not always friendly for caching mechanisms or for storing references to resources. It can also lead to duplication of endpoint paths and requires careful management of version transitions.

### To Progress

- Transition to a more robust versioning strategy and clearly define the support duration for APIs.

## Level 3: Header Versioning and Lifecycle Policy

> **🎯Target**

Versions are specified using HTTP headers. This approach offers flexibility and keeps URLs consistent and clean. Modern clients support headers, and API gateways and frameworks allow for routing based on headers without issues.

Limit the number of major API versions as much as possible, preferring incremental changes to breaking changes.

Establish clear policies for version deprecation, providing ample notice to consumers before discontinuing support for old versions.

Ensure thorough testing for new versions and conduct backward compatibility checks to minimize disruptions.

### Level 4: Version Negotiation and Migration Guides

The server dynamically determines the best version to serve based on the client's request, using content negotiation (e.g., `Accept: application/vnd.sample.v1+json`). This maximizes flexibility and allows for seamless transitions between versions for consumers. A consumer can specify multiple supported versions and express preferences via content negotiation.

Maintain detailed and accessible documentation for each version, including deprecation notices and migration guides.

### Level 5: Unified API Versioning

The entire API suite is versioned as a cohesive unit, rather than versioning individual endpoints or APIs.

With this approach, a single version number applies to the entire API surface, ensuring consistency across all services and endpoints. This strategy simplifies understanding and usage for API consumers, as they only need to track and adapt to changes in the API as a whole, rather than managing versions of individual components or endpoints. It also facilitates more straightforward global changes and cross-service features.

This approach aims to achieve an integrated API platform where consistency and simplicity for the consumer are paramount, with a central repository for documentation that encompasses the entire API suite. Clear, accessible documentation is crucial, including detailed change logs, migration guides, and deprecation notices for each version.
