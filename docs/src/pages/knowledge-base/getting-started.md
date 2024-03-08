The knowledge base is a beta feature. If you find any bugs in this feature please report them to the [Feedback form](https://www.joinaipay.com/dashboard/feedback)

The knowledge base can be used to answer specific questions about a particular topic. For example, you can use it to store information about your company's products, services, or policies. 

## Getting started with the knowledge base:
1. After creating a website using the [AI Pay dashboard](https://www.joinaipay.com/dashboard), navigate to the website details page and click "Create knowledge base." Specify an embedding model then click "Create knowledge base." Choosing a larger model will result is more accurate answers but will be slightly more expensive and slower. The embedding model can be changed later.
2. Copy and paste text file and add them to the knowledge base. The text files are automatically split into smaller chunks and added to the knowledge base. (If you have many text files, you can save then as a draft then add them all to the knowledge base at once.)
3. Use one of the AI APIs (knowledge base chat, knowledge base chat stream) to ask questions about the knowledge base.

## Use cases:
- Answering questions about:
  - A company's products or services.
  - Developer documentation.
  - A large amount of text data such as a book or a large repository of legal documents.

## How the knowledge base works:
- The knowledge base works by uploading a text file containing the information you want to store. 
- AI Pay will chunk the text into smaller pieces, generate an embedding and store then in a vector database. 
- When a user asks a question, AI Pay will search the knowledge base for matching text chunks and use them as context to generate an answer.