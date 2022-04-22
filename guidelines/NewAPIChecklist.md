# New API Checklist

This checklist will ensure that when you create a new API, you have all the things you need by default. This is the minimum bar required for making APIs available to our partners.

Whilst you can "get away with" releasing APIs to internal teams in a substandard state, they'll never be fit for publication without meeting these basic design rules.

## Foundational

- [ ] Heart Beat Endpoint `/heartbeat`
- [ ] Health Check Endpoint `/healthcheck`
- [ ] Serves an OpenAPI specification (`/openapi.json` or `/swagger.json`) which follows our requirements
- [ ] Includes AT LEAST ONE accepted authentication mechanism
- [ ] Versioning approach selected

## Structural

- [ ] URLs lower-kebab-cased
- [ ] Entity names in URLs pluralised
- [ ] No HTTP Verbs in URLs
- [ ] Uses appropriate HTTP response codes for each endpoint.

## Consistency

- [ ] All entities and paths use standard nouns.
- [ ] Errors returned using ProblemDetails.
