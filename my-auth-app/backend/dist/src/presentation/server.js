"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const app: express.Express = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use((req: express.Request, res: express.Response, next))
const app = (0, express_1.default)();
const port = 8001;
// app.get("/authorization", (req, res)) => {
// }
app.get("/authorization", async (req, res) => {
    res.status(400).send("Hello World!");
});
app.listen(3010, () => {
    console.log("Server is running on http://localhost:3010");
});
//# sourceMappingURL=server.js.map