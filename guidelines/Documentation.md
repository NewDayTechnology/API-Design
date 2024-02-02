# API Documentation Guidelines for the Developer Portal

---
Note: For a full guide on uploading to the developer portal, use this link: [internal-docs.newdaytechnology.net/tools-and-guides/onboarding-guide](https://internal-docs.newdaytechnology.net/tools-and-guides/onboarding-guide/)

Internal portal: [internal-docs.newdaytechnology.net](https://internal-docs.newdaytechnology.net/)

External portal: [docs.newdaytechnology.co.uk](https://docs.newdaytechnology.co.uk/)

These are our guidelines for writing API documentation.
It's important that our docs are **simple**, **easy to follow**, and **consistent**.

They must be suitable for both native and non-native English speakers.

## Table of Contents

- [API Documentation Guidelines](#api-documentation-guidelines-for-the-developer-portal)
  - [Required Documents](#required-documents)
  - [The User Guide Content](#the-user-guide-content)
    - [Writing Style](#writing-style)
  - [OpenAPI spec files](#openapi-spec-files)
  - [Document Publication Process](#document-publication-process)
    - [Opening a PR to the Content Repository](#opening-a-pr-to-the-content-repository)

## Required Documents

All we require for you to publish your APIs in the Developer Portal is a **OpenAPI 3.0** or **AsyncAPI 2.0** file describing your APIs, with optional `mdx` content that can be deployed alongside the API.

## The User Guide Content

If you provide `mdx` content, it should present itself as an **introduction**, and should include the following:

- What the API does
- Who the intended users are
- What scenarios you would use this API in
- Any prerequisites
- Definition and/or explanation of terms which users may not be familiar with
- Any useful diagrams:
  - **(Optional)** Sequence Diagram explaining any particular sequencing of API calls across multiple endpoints.
  - **(Optional)** Context Diagram - e.g. how the MultiQuote API fits into the context of aggregators acquisition process.

You can (obviously!) include any additional information as applicable.

Currently, our recommendation is to use the [MDX Editor](https://internal-docs.newdaytechnology.net/mdx-preview/) we provide. For any additional guidance please use our [Markdown Guide](https://internal-docs.newdaytechnology.net/markdown-guide/) and our [Custom Components Guide](https://internal-docs.newdaytechnology.net/components-guide/).

### File Naming

For product/editorial pages, please contant the Triumph team for support. For an API overview page, please create a file in either internal/api/your-product-folder or external/api/your-product-folder, depending if your product is internal or external, with at least one API Overview page (`index.mdx`), and, when applicable, multiple API Overview pages (`endpoint-name.mdx` e.g. `multi-quote.mdx`).

### Writing Style

We have a [Style Guide](./StyleGuide.md) that you can use to help write your documentation. It includes guidance on tone of voice, capitalisation, and other written style.

In addition to the style guide, consider the following when writing:

- **Think about the reader**: When you write, consider the following questions:
  - Why will they read this content?
  - Does your documentation answer the most commonly asked questions?
  - How long did it take to find the information they are looking for?
  - Will the reader have an understanding of the Product/API after reading this?

- **Write an essay plan**: It's easier to write an outline of your documentation first, and then revise it over subsequent drafts, expanding on your points. This will improve the flow of the content.

- **Keep your sentences short**: It is  difficult to understand long sentences. Write simple sentences that are easier to follow.

- **Punctuation is important**: Punctuation can alter the meaning of your content - make sure you write "let's eat, kids", not "let's eat kids"!

- **Include a Glossary**: Explain the terms and their definitions, if required. **[Ed: We should maintain a centralised glossay in the dev portal]**

## OpenAPI spec files

Your spec file should be OpenAPI 3.0 and include the following properties:

- operationId to identify the endpoint e.g. createAccount
- Logical order of API endpoints with healthCheck and heartBeat at the bottom of the specification
- API summary and description for each endpoint
- Parameter descriptions
- Enum descriptions
- The path and any required query parameters
- Example requests
- Example responses
- Error Codes

When you are describing the parameters, you must include at least the parameter name, and a meaningful description.

|Parameter Name |Format | Description  |
|------------------------|-----------|-------------------|
| Name | Text| Name of the credit applicant. |
|Contact Number | String | Include examples, if required. For example: _The contact number must start with '07'; for example, 07458847898._|

**Avoid redundant descriptions** - for example "Name" = "The Name". Rather ommit the description field than waste space.

**It is expected that you use language provided tooling to generate these OpenAPI specs from your code.**

Note: Please refer to the [linting guide](https://internal-docs.newdaytechnology.net/tools-and-guides/linting-guide/) for additional information regarding API requirements.

## Document Publication Process

Documentation publication relies on adding `front matter` to your `mdx` files. To add your teams `APIs` into the portal, you need to:

1. Add the correct `Publication Front Matter`.
2. Add values to the OpenAPI specification.
3. Open a `PR` to the [Documentation Repository](https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content) with your `markdown` and `Open API Spec` files.

### Opening a PR to the Content Repository

The Developer Portal ingests content from the [Documentation Repository](https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content).
It contains two folders that are of note, `internal` and `external`. Depending whether or not your API is public, choose the folder accordingly. Under both of these there is a `api` folder and a `editorial` folder; your API should be uploaded to the `api` folder.

Below is a representation of the folder structure of the repo:

```text
.
├── internal
│   ├── api            # Internal API Content
│   └── editorial      # External Editorial Content - Reserved for the Devportal team
├── external
│   ├── api            # External API Content
│   └── editorial      # External Editorial Content - Reserved for the Devportal team
├── resources          # Under Left Navbar Content - Reserved for the Devportal team
└── footer             # Footer Content - Reserved for the Devportal team
```

The `pub-ready` property in both MDX and spec files represents whether or not the content is ready to be published, i.e., if set to false it will only be published to the dev environment.

For further details, please refer to the [Onboarding Guide](https://internal-docs.newdaytechnology.net/tools-and-guides/onboarding-guide/).
