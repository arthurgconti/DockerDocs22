import { Router } from "express";
import PersonController from "./controller/controller.person.js";

const routes = Router();
const controller = new PersonController();

routes.get("/", (req, res) => {
  res.send("Olá bem vindo ao servidor express");
});

routes.get("/docker", (req, res) => {
  res.send("Estamos rodando essa aplicação em um container DOCKER");
});

routes.get("/so", (req, res) => {
  res.send("SO é muito interessante");
});
routes.get("/monitoria", (req, res) => {
  res.send(
    "As monitorias ocorrem com o monitor Arthur Conti as terças e quintas : )"
  );
});

routes.post("/pessoa",controller.createPessoa);
routes.get("/pessoas",controller.getPessoas);
routes.get("/pessoa/:id",controller.getPessoa);
routes.put("/pessoa/:id",controller.updatePessoa);
routes.delete("/pessoa/:id",controller.deletePessoa);

export default routes;
