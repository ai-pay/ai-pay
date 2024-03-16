The knowledge base is a beta feature. If you find any bugs in this feature please report them to the [Feedback form](https://www.joinaipay.com/dashboard/feedback) or to marcus@joinaipay.com

The knowledge base can be used to answer specific questions about a particular topic. For example, you can use it to store information about your company's products, services, or policies. 

## Supported knowledge base types:
- `Developer documentation`
Note: If you want to use the knowledge base for a different type of information, please let us know by using the [Feedback form](https://www.joinaipay.com/dashboard/feedback) or by emailing marcus@joinaipay.com

## Getting started with the knowledge base:
1. After creating a website using the [AI Pay dashboard](https://www.joinaipay.com/dashboard), navigate to the website details page and click "Create knowledge base."
2. Follow the fields to upload a text file containing the information you want to store in the knowledge base.
3. Use the knowledge base chat stream API to ask questions about the knowledge base or use the ask-ai package to implement a chat interface.

## How the knowledge base works:
- The knowledge base works by uploading a text file containing the information you want to store. 
- AI Pay will chunk the text into smaller pieces, generate an embedding and store then in a vector database. 
- When a user asks a question, AI Pay will search the knowledge base for similar themed text chunks and use them as context to generate an answer.