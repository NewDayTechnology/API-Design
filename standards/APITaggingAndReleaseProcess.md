
# API Tagging and Release Process

We currenty intend to use `OpenAPI tags` to include and expose APIs to our partners and consumers.

APIs can be tagged wholesale - where a tag is applied to an entire `API`, or on an endpoint-by-endpoint basis, for more granular control. By default, untagged `APIs` will only be visibile in the `API portal` in pre-UAT environments.

Applying the following tags to endpoints or entire `APIs` does the following:

- no tag: `API` is visible in the `Dev API portal`
- `beta`: `API` is visible in the `UAT API portal`
- `internal`: `API` is visible in the `UAT API portal`, and to NewDay teams logged in to the `Production API portal`. `API` is not visible to NewDay partners.
- `public`: `API` is visible in the `Production API portal`.

APIs that do not meet the basic requirements of the `API Checklist` **MUST NOT** be promoted to `internal` or `public` before being reviewed.
