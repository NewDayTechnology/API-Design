# Document Publication Guidelines

Refer to the following process, once your API content is ready for review:

1. Upload your markdown and Open API files to the Github respository:
https://github.com/NewDayCards/NewDay.Docs.DevPortal.Content

    * Create a separate branch with your team name.
    * Upload three folders:
      * **Introduction**: Contains the API overview information.
      * **API Reference**: Contains the Open API file.
      * **Integration**: Contains the API integration information.
2. Raise a pull request and assign Deb Dutta Das (Github user name: @DebDutta171989) as a reviewer.

    **Note**: The content is reviewed as per the documentation guidelines.
3. Incorporate the comments.  
4. Deb Dutta Das approves the content.
5. Merge your branch with the **main** branch.
6. In Atlassian Jira, raise a ticket in the [Developer Portal backlog](https://newdaycards.atlassian.net/jira/software/c/projects/DEVPORT/boards/1169).
7. Mention the following flags in both the (**User Guides** and **API Reference**) document types:  

   * `PublicationReady`: Specify this to publish the document in the **production environment**. If this flag is absent, the document is published in the **User Acceptance Testing (UAT)** environment.  
 
   * `ForExternalPublication`: Specify this to publish the document in the **external** Developer Portal site. If this flag is absent, the document is published in the **internal** Developer Portal site.
