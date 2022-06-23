import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPessoa(req, res) {
  const { nome, idade } = req.body;
  const pessoa = await prisma.pessoa.create({
    data: {
      nome,
      idade,
    },
  });
  if (pessoa) return res.status(201).json({ message: "sucesso" });
  else return res.status(400);
}
export async function updatePessoa(req, res) {
  const { id } = req.params;
  const { nome, idade } = req.body;
  const pessoa = await prisma.pessoa.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      idade,
    },
  });
  if (pessoa) return res.status(200).json(pessoa);
  else return res.status(400);
}
export async function deletePessoa(req, res) {
  const { id } = req.params;
  const pessoa = await prisma.pessoa.delete({
    where: { id: Number(id) },
  });

  if (pessoa) return res.status(200).json({ message: "deletado" });
  else return res.status(404);
}
export async function getPessoa(req, res) {
  const { id } = req.params;
  const pessoa = await prisma.pessoa.findUnique({ where: { id: Number(id) } });
  return res.status(200).json(pessoa);
}
export async function getPessoas(req, res) {
  const pessoas = await prisma.pessoa.findMany();
  return res.status(200).json(pessoas);
}
