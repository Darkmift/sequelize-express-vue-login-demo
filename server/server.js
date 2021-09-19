const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}

const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler.middleware');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  app.use(cors());
}

const mainRouter = require('./main.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ message: 'online' });
});

app.use('/api', mainRouter);

// global error handler
app.use(errorHandler);
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
  console.log('NODE_ENV' + process.env.NODE_ENV);
});
