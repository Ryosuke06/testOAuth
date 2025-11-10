import express from "express";

// const app: express.Express = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use((req: express.Request, res: express.Response, next))

const app = express();
const port = 8001;

// app.get("/authorization", (req, res)) => {

// }

app.post("/decision", async (req, res) => {
  res.send("POST request to the homepage");
});

app.listen(3010, () => {
  console.log("Server is running on http://localhost:3010");
});
