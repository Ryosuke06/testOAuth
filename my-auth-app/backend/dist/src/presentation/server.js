"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const AuthPresentation_1 = require("./AuthPresentation");
const tsyringe_1 = require("tsyringe");
const container_1 = require("../config/container");
// const app: express.Express = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use((req: express.Request, res: express.Response, next))
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, container_1.setupContainer)();
app.post("/decision", async (req, res, next) => {
    const presentation = tsyringe_1.container.resolve(AuthPresentation_1.AuthorizationPresentation);
    return await presentation.decision(req, res);
});
app.post("/token", async (req, res, next) => {
    const presentation = tsyringe_1.container.resolve(AuthPresentation_1.AuthorizationPresentation);
    return await presentation.token(req, res);
});
app.listen(3010, () => {
    console.log("Server is running on http://localhost:3010");
});
//# sourceMappingURL=server.js.map