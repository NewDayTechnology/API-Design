# Mandatory Endpoints

## Internal Use Only

These endpoints are all required to be implemented by all APIs.They are internal only, and should not be exposed over APIM, or in external documentation.

### Heart Beat

Each API **MUST** have a heart beat endpoint at `/heartbeat` that returns a 200 OK response. This is only concerned with availability, and not downstream depenedencies.

### Health Check

Each API **MUST** have a health check endpoint at `/healthcheck` that returns a 200 OK response.

API health checks **MAY** contain more detailed and granular embedded checks that verify downstream dependencies.

## External Use

### Open API

Each API **MUST** expose an OpenAPI specification at `/openapi.json` or `/swagger.json`.
