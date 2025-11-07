import express from "express";

// const app: express.Express = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use((req: express.Request, res: express.Response, next))

const app = express();
const port = 8001;

// app.get("/authorization", (req, res)) => {

// }

app.get("/authorization", async (req, res) => {
  res.send("Hello World!");
});

app.post("/token", async (req, res) => {
  const 
  res.send("POST request to the homepage");
});

app.listen(3010, () => {
  console.log("Server is running on http://localhost:3010");
});
