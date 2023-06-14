- Server Directory ---> Note about server.js and localDataServer.js

-- The main difference between the two servers is the way the task list is stored. the task list in _server.js_ is stored in memory as an array of objects. This means that if the server is restarted, the task list will be reset to its initial state. In contrast, the _localDataServer.js_ reads and writes the task list to a file on disk using the fs module. **This means that the task list will persist even if the server is restarted.**

-- Another difference is that _localDataServer.js_ uses the await keyword with the file system methods readFile and writeFile to ensure that the file operations are performed asynchronously. This is necessary because file operations can take longer than memory operations, and blocking the event loop could cause the server to become unresponsive.

- Overall, _localDataServer.js_ is a more robust and scalable solution for persisting data on a server. However, for smaller applications or prototypes, _server.js_ might be simpler and easier to implement.
