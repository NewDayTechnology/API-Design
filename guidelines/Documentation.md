# API Documentation Guidelines for the Developer Portal

---

Internal portal: https://internal-docs.newdaytechnology.net/

External portal: https://docs.newdaytechnology.co.uk/

These are our guidelines for writing API documentation.
It's important that our docs are **simple**, **easy to follow**, and **consistent**.

They must be suitable for both native and non-native English speakers.

## Table of Contents

- [API Documentation Guidelines](#api-documentation-guidelines)
  - [Required Documents](#required-documents)
  - [The User Guide Content](#the-user-guide-content)
    - [Writing Style](#writing-style)
  - [OpenAPI spec files](#openapi-spec-files)
  - [Document Publication Process](#document-publication-process)
    - [Adding Publication Front Matter](#adding-publication-front-matter)
    - [Opening a PR to the Content Repository](#opening-a-pr-to-the-content-repository)

## Required Documents

We require the following documents to be provided to the Developer Portal team:

1. A **user-guide introduction**, written in `markdown`.
2. An **Open API 3.0 spec file** describing your APIs.

These two artifacts will be combined and ingested into the Developer Portal.

## The User Guide Content

This **introduction** should include the following:

- What the API does
- Who the intended users are
- What scenarios you would use this API in
- Any Prerequisites
- Definition and/or explanation of terms which users may not be familiar with
- Any useful diagrams:
  - **(Optional)** Sequence Diagram explaining any particular sequencing of API calls across multiple endpoints.
  - **(Optional)** Context Diagram - e.g. how the MultiQuote API fits into the context of aggregators acquisition process.

You can (obviously!) include any additional information as applicable.

Write the content in any editor that supports Markdown format. If you need additional guidance on Markdown, please refer to the [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet).

For a product page, please create a file in either internal/editorial or external/editorial, depending if your product is internal or external, with the following naming convention:

- Product: `product-name.md` e.g. `acquiring-new-customers.md`

For an API overview page, please create a file in either internal/api/your-product-folder or external/api/your-product-folder, depending if your product is internal or external, with the following naming convention:

- One API Overview: `index.md` 
- Multiple API Overview pages (each endpoint requiring a page): `endpoint-name.md` e.g. `multi-quote.md`

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

## Document Publication Process

Documentation publication relies on adding `front matter` to your `markdown` files. To add your teams `APIs` into the portal, you need to:

1. Add the correct `Publication Front Matter`.
2. Add values to the OpenAPI specification.
3. Open a `PR` to the [Documentation Repository](https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content) with your `markdown` and `Open API Spec` files.

### Adding Publication Front Matter

`Front Matter` is content that appears at the top of your `markdown` files in the form:

```md
---
some-bool: true
some-string: "some value"
---
# Regular Markdown Content Here

This file contains front-matter
```

Our publication process requires two values:

- `pub-ready` - This is a boolean value that indicates whether the `markdown` file is ready to be published. **true** will publish the content to the `UAT` environment, while **false** will publish to the `staging` environment.

For a publicly accessible API, your `markdown` doc should look like this:

```md
---
pub-ready: true
---
# Xyz API

The `Xyz` API is a...
```

### Adding Values and Filters to OpenAPI Specification 

APIs can now be filtered in the parsing logic using tags. The tags we currently have for internal and external can be found, [here](https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content/blob/main/tags.json). If there is not a product or user type which you would put your API within, please edit and add the relevant tag to this file with your PR.

Include the following in the OpenAPI specification:

```JSON
{
  [ ... ]
  "x-pub-settings": {
    "pub-ready": "true",
    "tags": [ "identity", "retailers"]
  }
  [ ... ]
}
```

- If `pub-ready` is set to **true**, the file is published to the UAT environment. If **false**, will publish to the staging environment.

### Opening a PR to the Content Repository

The Developer Portal ingests content from the [Documentation Repository](https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content).
It contains two folders that are of note, `internal` and `external`. Depending whether or not your API is public, choose the folder accordingly. Under both of these there is a `api` folder and a `editorial` folder; your API should be uploaded to the `api` folder.

Below is a representation of the folder structure of the repo:

```
.
├── internal
│   ├── api                  # Internal API Content
│   └── editorial            # External Editorial Content - Reserved for the Devportal team
├── external
│   ├── api                  # External API Content
│   └── editorial            # External Editorial Content - Reserved for the Devportal team
├── resources                # Under Left Navbar Content - Reserved for the Devportal team
└── footer                   # Footer Content - Reserved for the Devportal team
```

The following table represents the content visibility based on its variables:

|      |internal folder|external folder|  
|------|------|-----
|pub-ready: false| Internal dev/staging| Internal dev/staging<br>External dev/staging|
|pub-ready: true| Internal dev/staging<br>Internal UAT/prod| Internal dev/staging<br>Internal UAT/prod<br>External dev/staging<br>External UAT/prod|

### API or API Overview

In order to publish your documentation, you'll need to open a pull request. You need to add your content to a subdirectory of the `api` directory.

1. Fork and clone the repository.
2. Create a directory in the `api` folder of the selected environment (`internal`/`external`) for your API.
4. Add your `spec.json`/`index.md` file.
5. Open a pull request adding **Megan Jackson** and **David Benson** as reviewers.
6. Content will be revised and merged through discussion on the PR.

### Product page

In order to publish your documentation, you'll need to open a pull request. You need to add your content to a subdirectory of the `api` directory.

1. Fork and clone the repository.
2. Create a directory in the `editorial` folder of the selected environment (`internal`/`external`) for your product page.
4. Add your `product-name.md` file.
5. Open a pull request adding **Megan Jackson** and **David Benson** as reviewers.
6. Content will be revised and merged through discussion on the PR.
