import { PrismaClient } from "@prisma/client";

export default class PersonController {

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPessoa(req, res) {
    const { nome, idade } = req.body;
    const pessoa = await this.prisma.pessoa.create({
      data: {
        nome,
        idade,
      },
    });
    if (pessoa) return res.status(201).json({ message: "sucesso" });
    else return res.status(400);
  }
  async updatePessoa(req, res) {
    const id = req.params;
    const { nome, idade } = req.body;
    const pessoa = await this.prisma.pessoa.update({
      where: {
        id,
      },
      data: {
        nome,
        idade,
      },
    });
    if (pessoa) return res.status(200).json(pessoa);
    else return res.status(400);
  }
  async deletePessoa(req, res) {
    const { id } = req.params;
    const pessoa = await this.prisma.pessoa.delete({
      where: {
        id,
      },
    });

    if (pessoa) return res.status(200).json({ message: "deletado" });
    else return res.status(404);
  }
  async getPessoa(req, res) {
    const { id } = req.params;
    const pessoa = await this.prisma.pessoa.findUnique({ where: { id } });
    return res.status(200).json(pessoa);
  }
  async getPessoas(req, res) {
    const pessoas = await this.prisma.pessoa.findMany();
    return res.status(200).json(pessoas);
  }
}
