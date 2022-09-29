# Naming Guidelines

---

These naming guidelines are lifted from [Microsofts REST guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#17-naming-guidelines) as the advice is sane and non-controversial.

These naming patterns will not be strictly enforced (and won't stop you going live), but they are recommended, and following these general patterns will greatly help our APIs feel consistent.

---

Naming policies should aid developers in discovering functionality without having to constantly refer to documentation.

Use of common patterns and standard conventions greatly aids developers in correctly guessing common property names and meanings.

Services SHOULD use verbose naming patterns and SHOULD NOT use abbreviations other than acronyms **that are the dominant mode of expression in the domain being represented by the API, (e.g. Url)**.

## Casing

- Acronyms **SHOULD** follow the casing conventions as though they were regular words (e.g. Url).
- All identifiers including namespaces, entityTypes, entitySets, properties, actions, functions and enumeration values **SHOULD** use lowerCamelCase.
- HTTP headers are the exception and **SHOULD** use standard HTTP convention of Capitalized-Hyphenated-Terms.
  - x-prefixed header names **MUST** be avoided [see RFC for ref](https://datatracker.ietf.org/doc/html/rfc6648)

## Names to avoid

Certain names are so overloaded in API domains that they lose all meaning or clash with other common usages in domains that cannot be avoided when using REST APIs, such as OAUTH.

Services SHOULD NOT use the following names:

- Context
- Scope
- Resource

## Forming compound names

- Services **SHOULD** avoid using articles such as 'a', 'the', 'of' unless needed to convey meaning.
  - e.g. names such as aUser, theAccount, countOfBooks SHOULD NOT be used, rather user, account, bookCount **SHOULD** be preferred.

- Services **SHOULD** add a type to a property name when not doing so would cause ambiguity about how the data is represented or would cause the service not to use a common property name.
- When adding a type to a property name, services **MUST** add the type at the end, e.g. createdDateTime.

## Identity properties

- Services **MUST** use string types for identity properties.
- Services **MAY** use the simple 'id' property to represent a local primary key value for a resource.
- Services **SHOULD** use the name of the relationship postfixed with 'Id' to represent a foreign key to another resource, e.g. subscriptionId.
  - The content of this property **SHOULD** be the canonical ID of the referenced resource.

## Date and time properties

If your name for a property contains `dateTime` it **MUST** accept a date AND a time. Equally, if it ONLY says `time`, it **MUST** only accept a time, and if it says `date`, it **MUST** only accept a date.

It's fine to disregard `date` or `dateTime` in lieu of a name like `createdAt` or `updatedAt`, and rely on the OpenAPI types to provide context.

Dates should be represented as [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) strings, with included timezone information where known.

| Type   | Format |
| ------ | -------- |
| Date | 2022-04-14 |
| Date and time in UTC, with timezone | 2022-04-14T12:37:35+00:00 |
| Date and time in UTC | 2022-04-14T12:37:35Z |
| Week | 2022-W15 |

These formats are the default serialization outputs of .NET DateTime types.

## Name properties

- For the overall name of a resource typically shown to users, services **MUST** use the property name 'displayName'.
- Services **MAY** use other common naming properties, e.g. givenName, surname, signInName.

## Collections and counts

- Services **MUST** name collections as plural nouns or plural noun phrases using correct English.
- Services **MAY** use simplified English for nouns that have plurals not in common verbal usage.
  - e.g. schemas MAY be used instead of schemata.
