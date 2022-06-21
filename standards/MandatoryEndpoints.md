# Mandatory Endpoints

Please noth the paths in this document are not necessary absolute, but relative to the root of the service.

## Internal Use Only

These endpoints are all required to be implemented by all APIs.They are internal only, and should not be exposed over APIM, or in external documentation.

### Heart Beat

Each API **MUST** have a heart beat `GET` endpoint at `/heartbeat` that returns a `200 OK` or `204 No Content` response. This is only concerned with availability, and not downstream depenedencies.

### Health Check

Each API **MUST** have a health check `GET` endpoint at `/healthcheck` that returns a `200 OK` response when the service is healthy.
Otherwise, it returns a `500 Internal Server Error`.

API health checks **MAY** contain more detailed and granular embedded checks that verify downstream dependencies.

API health checks **MAY** also handle a `HEAD` request to the same endpoint which returns the same status code as the `GET` request but without content.

## External Use

### Open API

Each API **MUST** expose an OpenAPI specification at one of the following path:
- `/openapi.json`
- `/swagger.json`
- `/openapi/{version}.json`
