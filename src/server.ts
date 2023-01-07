import { log } from "./output";
import { receive } from "./receive";

const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');

export const startServer = (resourcePath: string) => {

  const app = express();

  app.use(express.static(resourcePath));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // @ts-ignore it's ok
  app.post('/send', (req, res) => {
    receive(req.body);

    res.json({ ...req.body });
  });

  app.listen(port, () => {
    log(`tcpure-receiver server listening on port ${port}`);
  });

};
