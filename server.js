const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/user');
const openaiRouter = require('./routes/openai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', messagesRouter);
app.use('/api', usersRouter);
app.use('/api', openaiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
