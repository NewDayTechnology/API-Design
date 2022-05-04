# API Documentation Guidelines

The intent is to achieve the following:

* **Simple easy to follow instructions**: The content must be lucid and comprehensible to our customers, including both native and non-native English speakers.  
* **Easily find information**: Your customers must be able to find the information they are looking for within a few minutes of navigating to your site.

## Contents

* [API Content Structure](#api-content-structure)  
* [Generic Documentation Guidelines](#generic-documentation-guidelines)
* [Style Guide](#style-guide)
* [API Document Format](#api-document-format)

## API Content Structure

Organise your API content into the following broad categories:  

* **Overview**: Include the following:  
  * What is the function of the API?
  * Who are the intended users?
  * What are the benefits?
  * Authentication and Authorisation  
  * Prerequisites  
  * Workflow diagrams: Diagramatic representation to explain the API function, if it is a part of a bigger workflow process.  
  * FAQs

    You may include more relevant sections in the **Overview** as applicable to your API.

* **API Reference**: Include the following, based on Open API Specification version 3.0:  
  * Path  
  * Request parameters
  * Sample request message
  * Response parameters
  * Sample response message
  * Error Codes

When you are describing the parameters, mention the following details:

|Parameter Name |Format | Description  |
|------------------------|-----------|-------------------|  
| Name | Text| Name of the credit applicant. |
|Contact Number | String | Include examples, if required. For example: _The contact number must start with '07'; for example, 07458847898._|

* **Integration Guide**: Include the following:
  * Versioning
  * Environments
  * Implementation process, if any
  * NewDay Support

For information on the document format that you must follow, refer to [API Document Format](#api-document-format) and how you can provide this to the Developer Portal team, refer to [Document Publication Process]

## Generic Documentation Guidelines  

---

* **Prepare a content strategy and structure**: This will help you to prepare a skeletal structure of your content. Based on this architecture, prepare logical content sections.
* **Think about your customer first**: When you write, consider the following questions:  
  * Why will your customer read this content?
  * Did they find answer to their queries after reading your information?
  * How long did it take to find the information they are looking for?  
* **Keep your sentences short and crisp**: It is often difficult to understand long sentences.
* **Punctuation is important**: Incorrect or missing punctuation can alter the meaning of your content.
* **Include a Glossary**: Explain the  terms and their definitions.  

## Style Guide

The aim is to present technical information in a simple manner; it must be writer agnostic.

To achieve a consistent writing style, we recommend you to refer to the following guidelines. However, there could be deviations when you might have to explain difficult concepts in a different way.

### Avoid Ambigous Language

*Avoid* words like _might_, _could_, and _would_.

Example:  

**Avoid**: An error _might_ occur, if you do not enter correct information.  

**Better**: The following error occurs, if you do not enter correct information.  

### Use Second Person

Use _you_ instead of using third person pronouns _they_ or _customers_.

Example:

**Avoid**: The customer must enter the previous address, if they have resided at the current address for less than 12 months.  

**Better**: You must enter the previous address, if you have resided at the current address for less than 12 months.

### Use British English

The company standard is to use British English.

Example:

Use _Authorisation_ and **not** _Authorization_  

### Avoid Latin Phrases and Abbreviations

It can be difficult to understand latin phrases. Hence, it is recommended to use full form of words.

Example:

**Avoid**: e.g, i.e.
**Better**: Example, that is

For **abbreviations**, when you are using it for the first time in your content, explain the term. From next time onwards, you can use the abbreviated form.

### Capitalisation

#### Headings

Use sentence case.

Example:

_MultiQuote API in the Acquisition Workflow_

#### API Parameters

Use the same capitalisation as displayed in the API request or response message.  

## API Document Format

