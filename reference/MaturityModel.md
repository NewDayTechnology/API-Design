# API Maturity Model

## Level 1

Plain OLD XML or other weird API formats, zero-consistency from API to API, single endpoint API designs, chaos, incoherent response documents

### To Progress

- Either
  - Migrate to JSON as a transport format.
  - Split up single "RPC endpoints" into multiple different paths.
  - Deprecate the API and redesign a new one following the guidelines in this document.

## Level 1.5

JSON HTTP API with non standard use of HTTP verbs, HTTP status codes and URLs, but a bit of internal consistency. Basic swagger in place without proper response examples or input model definitions (e.g. field lenght constraints).

### To Progress

- Ensure paths don't contain HTTP verbs (e.g. no GetCards)
- At least one response example in Swagger per endpoint.
- All the models documented with info on type/format of fields.
- Use standard HTTP status codes, with correct use of 200, 4xx and 500 to indicate request success of failure.

## Level 2

Multiple URI based resources, single verbs, consistency in format and structure of URIs (consistent URL patterns and conventions around pluralisation and naming) within your own service (if referencing global resources, they are to the defined global standard), basic swagger / some other auto-doc support accessible to humans

### To Progress

_Actions can be performed endpoint by endpoint and published incrementally, without breaking the existing ones._

- Provide a path that meets our standard for publication for each published endpoint.
- Arrange endpoints to be resource oriented.
- Swagger documentation should contain readable description of the behaviour, include request and response examples, and metadata on fields' format and constraints.

## Level 3 - 🎯 TARGET

Interaction with URI resources using multiple and appropriate HTTP verbs, response documents following internally consistent conventions, resource-oriented APIs, an approach to versioning or changing APIs

## Level 4

Interactive documentation with human-consumable information, API docs present in org-wide API management solution, adheres to companywide conventions

## Level 5

Version infinite API design, forwards compatibility, Hypertext as the engine of application state (HATEOAS)
