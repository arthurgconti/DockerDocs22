import { Router } from "express";
import {
  createPessoa,
  getPessoas,
  getPessoa,
  updatePessoa,
  deletePessoa,
} from "./controller/controller.pessoa.js";

const routes = Router();

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

routes.post("/pessoa", createPessoa);
routes.get("/pessoas", getPessoas);
routes.get("/pessoa/:id", getPessoa);
routes.put("/pessoa/:id", updatePessoa);
routes.delete("/pessoa/:id", deletePessoa);

export default routes;
