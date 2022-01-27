# Introdução

### Imagens
- Imagens são utilizadas para instanciarmos o container, podemos pegar imagens já prontas e oficiais do Docker no site do [DockerHub](https://hub.docker.com) ou criar as nossas próprias utilizando Dockerfile, que será abordado mais para frente!
- Para baixar uma imagem do docker hub utilizamos o comando 
```bash
docker pull nome_da_imagem [opções/flags]
```
opcionalmente, também podemos passar a tag da imagem indicada no docker hub se quisermos uma imagem mais específica o comando ficaria dessa forma
```bash
docker pull nome_da_imagem:tag [opções/flags]
```
- Esse comando pode ter flags as principais são:

| flag | significado | função                                                            |
| ---- | ----------- | ----------------------------------------------------------------- |
| -q   | quiet       | desabilitar o modo verbose, ou seja a saida do comando no console |                                                            |

 - um exemplo de utilização, vamos baixar a imagem de um container node para nossa máquina
 
 1. primeiro buscamos o nome da imagem no DockerHub
 
 ![dockerHub node example](imgs/dockerhub.png)
 > Note que existe uma insignia verde escrita "oficial image", isso significa que essa imagem é uma imagem curada e mantida por eles, elas provem a base para a utilização sem problemas, além de estarem sempre atualizadas servem de ponto de partida para a maioria dos usuários.
 
 2. 
 
```bash
docker pull node 
```
> Aqui não utilizarei nenhuma flag

 - Caso quisesse uma versão específica do node, você consegue ver as tags acessando o menu de tags da imagem
 ![Dockerhub tags](imgs/dockerhub-tags.png)
 ![Dockerhub tags page](imgs/dockerhub-tags-page.png)
 > Você pode observar que o próprio hub te apresenta o comando para baixar a imagem
 
 3. Após a imagem ter sido baixada, podemos listar as imagens presente no nosso sistema utilizando o comando:
 ```bash
 docker image ls
 # ou
 docker images
 ```
 - Caso você não queria fazer o processo de baixar uma imagem para só depois rodar o container, você pode fazer o download da imagina direto na instanciação do container, nosso próximo tópico
---

### Instanciação do Container
- O Docker por padrão, sempre busca a imagem para subir o container primeiramente de forma local, caso não encontre nenhuma imagem localmente, ele então passa a buscar online no DockerHub, baixa ela, e então instancia o container

- Para instanciar um container, utilizamos o comando
```bash
docker run [opções/flags] nome_da_imagem
```
>O comando docker *run*, na realidade faz a função de outros dois comandos simultaneamente, o *docker create* e o *docker start*, porém podemos utilizar o run sem problemas : )
- Esse comando possuí diversas flags porém vamos ver as principais aqui

| flag      | significado         | função                                                                                                                                        |
| --------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| --rm      | Remove              | Remove o container se ele já existir                                                                                                          |
| -d        | Desacoplar (detach) | Roda o container em background e retorna o id                                                                                                 |
| --name    | Nome do container   | Permite nomear o container que será criado                                                                                                    |
| -v        | Volumes             | Vincula o ponto de montagem dos volumes                                                                                                       |
| -p        | publicar portas     | Torna pública uma porta para o host, deixando o container acessível deve ser usado da seguinte forma  portaHost:portaContainer, mapeia portas |
| -e        | Ambiente            | Responsável por setar variáveis de ambiente ao container                                                                                      |
| -t        | terminal            | Acopla um pseudo-terminal ao container                                                                                                        |
| --link    |                     |                                                                                                                                               |
| --network |                     |                                                                                                                                               |




