
### What we aim to provide:
- Create vector database by specifying a embedding model and database ID.
- Specify the vector database as either a session or a permanent database.
  - A session database would automatically be cleaned up after the session ends. A session database would only be available during the session it is started in.
  - A permanent database would be available via the database ID during any user session. After some time of inactivity, this database would be automatically cleaned up.
- Store text chunks in a database by specifying the database ID and the text chunk. AI Pay will automatically convert the text chunk into a vector using the selected embedding model and store it in the database.
- Retrieve relevant text chunks from the database by specifying a query and the database ID. AI Pay will automatically convert the query into a vector using the selected embedding model and retrieve the most relevant text chunks from the database.

### Use cases:
- Information Retrieval: Users can input a query, and the system can retrieve relevant text chunks from a large corpus of documents. This can be useful in search engines, digital libraries, or knowledge bases.
- Content Recommendation: Content platforms like news websites, blogs, or social media can use this system to recommend related articles, posts, or discussions based on user queries.
- Legal Research: Lawyers or legal professionals can use this system to retrieve relevant case law, statutes, or legal opinions based on their questions or research topics.
- Content Summarization: The system can retrieve relevant text chunks and summarize them to provide concise answers to user queries, making information more digestible and accessible.
- Market Research: Businesses can use this system to gather information about consumer opinions, market trends, or competitor strategies by retrieving relevant text chunks from online reviews, forums, or social media discussions.
