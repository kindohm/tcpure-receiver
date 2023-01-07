import { receive } from "./receive";

const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

export const startServer = (resourcePath: string) => {

  const app = express();

  app.use(express.static(resourcePath));

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // @ts-ignore
  app.post('/send', (req, res) => {
    console.log('receiving', req.body);
    receive(req.body);

    res.json({ ...req.body });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

};
