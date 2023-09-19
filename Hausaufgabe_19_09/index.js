import express from "express"

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('this ist my homework on 19th of september 2023!');
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });