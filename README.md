# API Design at NewDay

---

The goal of this document is to support the advancement of the [RESTful API Maturity model](reference/MaturityModel.md).

RESTful API design is a practice that all RESTful based API should follow, there are options available within for engineers to choose from, giving allowances for differing requirements. These are based on our own engineering experience and various industry guidelines.

This document is not meant to be exhaustive, and will likely change over time as we learn more.

## Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [API Design at NewDay](#api-design-at-newday)
  - [Contents](#contents)
  - [Disclaimer & Intended Audience](#disclaimer-intended-audience)
  - [What is an API?](#what-is-an-api)
  - [Principles](#principles)
  - [API Standards](#api-standards)
  - [Guidelines](#guidelines)
  - [Contributing](#contributing)

<!-- /code_chunk_output -->

## Disclaimer & Intended Audience

Please note, this document is **not intended to be used for non-REST based APIs**.

There will be categories of APIs that require different implementation details than outlined here, such as GraphAPIs (they're by definition, not REST based), or that adhere to another protocol or architectural style.

**By default, we will assume that the vast majority of APIs we produce for the consumption of other teams, partners, or the public are REST based and will adhere to the following principles.**

If you are producing APIs for your specific application only (for example, a Backend-for-Frontend API), it's acceptible to deviate from these standards to serve your applications needs, however, any API that doesn't meet the standards here shall **never** be used for any other purpose.

## What is an API?

There's repeated confusion around the terms "API" and "Endpoint" when we're talking about RESTful APIs. For the sake of this guide, and for further discussions, the following is true:

- An `API` is a set of endpoints that are exposed over HTTP.
- An `API` is made up of one logical, deployable unit of code (a Functions App, a Web App, or a container serving HTTP traffic).
- An `Endpoint` is an individual HTTP Route that is exposed by an API. One `API` can contain one or more `endpoints`.
- Each `API` contains representations of one or more entities.
- Each `API` exposes a `Health Check` endpoint on `/healthcheck`, a `/heartbeat`, and an `OpenAPI` specification on either `/swagger.json` or `/openapi.json`.

## Principles

- [General Design Principles](reference/DesignPrinciples.md)

## API Standards

The following categories describe our requirements for API design. **It is expected you follow the approach outlined in each sub-section**.

- [Urls, Verbs, and Response Codes](standards/UrlsVerbsAndResponseCodes.md)
- [Versioning](standards/Versioning.md)
- [Security](standards/Security.md)
- [PCI Data](standards/PCIData.md)
- [Mandatory Endpoints](standards/MandatoryEndpoints.md)
- [API Tagging and Release Process](standards/APITaggingAndReleaseProcess.md)

While these are our standards, if your API design meaningfully, rather than incidentally doesn't match their expectations, please open a pull request to this document and we will adapt the standards to cover your needs.

Not following these standards will greatly slow down your path to production as we discuss your design on it's way through.

## Guidelines

These are a set of recommendations for solving common problems in API design. We strongly prefer you follow this guidance unless there's a good reason to deviate from it.

- [Status Codes](guidelines/StatusCodes.md)
- [Errors: ProblemDetails](guidelines/ProblemDetails.md)
- [Collections and Pagination](guidelines/Collections.md)
- [Naming](guidelines/Naming.md)
- [New API Checklist](guidelines/NewAPIChecklist.md)

## Contributing

See the [contributing guidelines](CONTRIBUTING.md).

[A list of authors and contributors is avilable here](AUTHORS.md).
