const express = require('express');
const port = 3000;


export const startServer = (resourcePath: string) => {

  const app = express();

  app.use(express.static(resourcePath));

  // @ts-ignore
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

};
