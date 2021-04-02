const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_ONLINE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    if (
      DB ===
      process.env.DATABASE_ONLINE.replace('<PASSWORD>', process.env.DB_PASSWORD)
    ) {
      console.log('CONNECTED TO ONLINE EventHorz DATABASE');
    } else {
      console.log('CONNECTED TO OFFLINE EventHorz DATABASE');
    }
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(
    `Server is Running in ${process.env.NODE_ENV.toUpperCase()} mode on port ${port}`
  );
});

// if (process.env.NODE_ENV === 'production') {
//   process.on('unhandledRejection', (error) => {
//     console.log(error.name, error.message);
//     console.log('UNdandler Rejection! Shutting Down...');
//     server.close(() => {
//       process.exit(1);
//     });
//   });
// }
