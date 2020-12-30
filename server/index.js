const express = require('express');
const ctrl = require('./controller')
const app = express();

app.use(express.json());

//endpoints
app.get('/api/books', ctrl.getBooks);
app.post('/api/book', ctrl.addBook);
app.put('/api/book/:id', ctrl.updateBook);
app.delete('/api/book/:id', ctrl.deleteBook);

const port = 3333
app.listen(port, () => console.log(`Server is running on ${port}`));