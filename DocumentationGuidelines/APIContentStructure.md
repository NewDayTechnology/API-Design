# API Content Structure

Organise your API content into the following broad categories:  

* **Introduction**: Include the following:  
  * What is the function of the API?
  * Who are the intended users?
  * What are the benefits?
  * Prerequisites  
  * Sequential workflow diagrams: Diagramatic representation to explain the API function, how the API fits into the bigger context of the solution. For example, how the MultiQuote API fits into the context of aggregators acquisition process.

    You may include more relevant sections in the **Introduction** as applicable to your API.

* **API Reference**: Include the following in the OpenAPI (swagger) file. The structure is based on the Open API Specification version 3.0:  
  * Path  
  * Request parameters
  * Sample request message
  * Response parameters
  * Sample response message
  * Error Codes

When you are describing the parameters, mention the following information:

|Parameter Name |Format | Description  |
|------------------------|-----------|-------------------|  
| Name | Text| Name of the credit applicant. |
|Contact Number | String | Include examples, if required. For example: _The contact number must start with '07'; for example, 07458847898._|
For information on the formats in which you must generate the API content, refer to [API Document Format](/DocumentationGuidelines/APIDocumentFormat.md). For information on the process that you must follow to provide the content to the Developer Portal team, refer to the [Document Publication Process](./DocumentPublicationProcess.md).
