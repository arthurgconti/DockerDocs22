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
 
 2. Após encontrarmos a imagem, podemos baixar ela utilizando o comando abaixo:
 
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
 - Caso você não queria fazer o processo de baixar uma imagem para só depois rodar o container, você pode fazer o download da imagem direto na instanciação do container, como abordaremos no nosso próximo tópico

- Se quisermos remover ou apagar uma imagem utilizamos o seguinte comando:
```bash
docker image rm [NOME_DA_IMAGEM]
```
---

### Instanciação do Container
- O Docker por padrão, sempre busca a imagem para subir o container primeiramente de forma local, caso não encontre nenhuma imagem localmente, ele então passa a buscar online no DockerHub, baixa ela, e então instancia o container

- Para instanciar um container, utilizamos o comando
```bash
docker run [opções/flags] nome_da_imagem
```
>O comando docker *run*, na realidade faz a função de outros dois comandos simultaneamente, o *docker create* e o *docker start*, porém podemos utilizar o run sem problemas : )

- Esse comando possuí diversas flags porém vamos ver as principais aqui

| Flag      | Significado           | Paramêtros                                                                     | função                                                                                                                                                                                                                         |
| --------- | --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| --rm      | Remover               | nenhum                                                                         | Automaticamente remove o container quando ele terminar/parar                                                                                                                                                                   |
| -d        | Desacoplar (detach)   | nenhum                                                                         | Roda o container em background e retorna o id                                                                                                                                                                                  |
| --name    | Nome do container     | nome que deseja para o container (o docker gera um nome aleatório se não usar) | Permite nomear o container que será criado                                                                                                                                                                                     |
| -v        | Volumes               | pastHost:pastContainer (./data:/usr/share/www)                                 | Vincula o ponto de montagem dos volumes, a pasta local com a pasta interna do container                                                                                                                                        |
| -p        | Publicar portas       | portaHost:portaContainer (7777:3306)                                           | Torna pública uma porta para o host, deixando o container acessível deve ser usado da seguinte forma  portaHost:portaContainer, mapeia portas                                                                                  |
| -e        | Variáveis de ambiente | VARIAVEL_AMBIENTE=valor  (-e POSTGRES_PASSWORD=password)                       | Responsável por setar variáveis de ambiente ao container                                                                                                                                                                       |
| -t        | Terminal              | nenhum                                                                         | Acopla um pseudo-terminal ao container                                                                                                                                                                                         |
| -i        | Iterativo             | nenhum                                                                         | O processo não vai ser finalizado até a conclusão                                                                                                                                                                              |
| --network | Rede                  | nome da rede criada                                                            | Conecta o container a uma rede específica de container                                                                                                                                                                         |
| --link    | Vincular              | nome do container                                                              | Vincula um container a outro ou outros containers, podendo substituir o ip nos projetos pelo nome do container                                                                                                                 |
| --restart | reiniciar             | opções:  {no,on-failure,on-failure:máximoTentativas,unless-stopped,always}     | Define a política para reiniciar o container, padrão é *no*, ou seja, o docker nunca vai reiniciar o container, as outras políticas definem a condição para que o docker reinicie o container baseado em quando ele parar/sair |

> A flag -i pode ser combinada com a flag t e/ou com a flag -d, ficando *-dit*

- Um exemplo de docker run utilizando uma imagem node que não existe localmente e alguma das flags descritas
![Baixando imagem node e instanciando container](imgs/docker-run-without-image.png)
- Após instanciarmos um container, ou vários containers, podemos listar os containers ativos usando o comando:
```bash
docker ps
```
- Caso você queira listar todos os containers que você tem criado e informações específicas de cada um, basta usar o comando:
```bash
docker ps -a
```
![Docker ps -a para mostrar todos os containers criados](imgs/docker-ps-a.png)
- Para pararmos a execução de um container utilizamos o comando
```bash
docker stop nome_container|id_container
```
![Docker stop para parar um container em execução](imgs/docker-stop-container.png)
- E após pararmos um container, ou quando iniciamos nosso computador, para subir um iniciar um container criado, utilizamos
```bash
docker start nome_container|id_container
```
![Docker stop para parar um container em execução](imgs/docker-start-container.png)

Nessa momento, já sabemos como procurar imagens na internet e onde encontra-las, também aprendemos a instanciar, parar e subir novamente um container!
- Subimos um container node, para demonstrar como funciona, porém, esse container node, ainda não terá tanta utilidade, voltaremos a utilizar ele mais para frente quando falarmos de Dockerfile, porém, vamos agora, fazer a instanciação completa de um container com uma coisa que para nós programadores é de suma importância, um SGBD, ao invés de baixarmos diversos gerenciadores, podemos ter várias imagens configuradas e só subirmos quando e qual for necessária!

- Vamos começar com o MySQL e no final do documento teremos um exemplo com o Postgres, pois conseguiremos exercitar diversas flags e conceitos!
Como vimos, devemos sempre começar pela imagem, nesse exemplo, utilizaremos a imagem oficial do DockerHub [disponível nesse link](https://hub.docker.com/_/mysql?tab=description)
- Tendo escolhido nossa imagem, podemos rodar o seguinte comando para instanciar nosso container, tendo em mente, que optamos pelo download da imagem na nuvem
```bash
docker run -d --name exemploMySql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:latest
#vamos também criar um container para podermos remover futuramente
docker run -d --name containerRemover -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:latest
```
*Observação a variável de ambiente **MYSQL_ROOT_PASSWORD** é obrigatória para definirmos a senha padrão de acesso ao bd, e essa variável está na documentação oficial da imagem, o usuário por padrão do mysql é o **root** * 
- Ao rodarmos esse comando e logo na sequência 
```bash
 docker ps
```
- Obtemos o seguinte retorno no terminal
![Docker run and docker PS](imgs/docker-run-mysql-ps-a.png)
- Podemos visualizar também os container ativos e desativos por uma interface, como, por exemplo do [ctop](https://github.com/bcicen/ctop), em verde todos os containers rodando, e em vermelho, o que estão parados
![Docker Ctop](imgs/ctop.png)
- Podemos ver os logs desse container rodando utilizando o comando
```bash
docker logs exemploMySql
```
e temos de retorno do comando todos os logs que o container emitiu
![Docker logs](imgs/docker-logs.png)
- Na sequência, precisamos executar alguns comandos, como por exemplo rodar um script para criar nosso banco de dados e nossa tabela, existem diversas formas para se fazer isso, nesse exemplo, vamos passar um script sql para nosso banco de dados, esses script foi previamente criado e não entraremos em detalhe de como criá-lo pois não é o nosso foco, após isso entraremos no banco para vermos se tudo foi executado corretamente, para isso, precisamos usar o comando **docker exec**, que vamos detalhar abaixo:
```bash
docker exec [FLAGS] container [COMANDO]
```
- *O docker exec aceita qualquer comando Linux ou referente a imagem como o mysql*

| **flag** | **significado** | **paramêtros** | **função**                                                                                            |
| -------- | --------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| -i       | Interativo      | Nenhum         | Mantém a interação no terminal enquanto o comando do container está em execução                       |
| -t       | TTY (terminal)  | nenhum         | Aloca um terminal ao container|

- Nesse nosso exemplo, vamos passar o comando de conexão ao banco mysql com o usuário e a senha e logo após com o operador < passamos o arquivo para ser executado pelo mysql, dessa forma nosso banco será criado.
```bash
docker exec -i exemploMySql mysql -uroot -proot < exemplo.sql
```
- Para vermos se o banco foi criado, temos diversas formas de fazer, mas iremos via terminal, para isso precisaremos acessar o mysql via linha de comando e passar os comandos para visualização de banco de dados e tabelas!
- Segue o fio:
```bash
# Instanciando o terminal e acessando o mysql
docker exec -it exemploMySql mysql -uroot -proot

# Dentro do terminal do mysql digitamos para vermos se o banco está criado
show databases;
# Após isso executamos para ver se nossa tabela está criada corretamente dentro do banco
use labso; show tables;
# Após isso podemos usar o select e confirmar se os dados foram inseridos corretamentes
select * from pessoa;
# E finalmente para sairmos do terminal basta digitar o comando
exit
```
- E agora para removermos um container precisamos primeiramente parar-lo e em seguida utilizamos o seguinte comando
```bash
docker stop containerRemover
docker container rm containerRemover
```

# Dockerfile
## O que é?
- Dockerfile nada mais é do que um arquivo onde conseguimos especificar todos os comandos que poderíamos passar pela linha de comando para criarmos nossa própria imagem
- Após escrevermos todas as instruções, basta rodar o comando 
```
docker build -f [file] -t [tagname] [PATH] 
```
| **flag** | **significado** | **parâmetro**      | **função**                                                                                                                                                                                                                                |
| -------- | --------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -f       | file            | nome do Dockerfile | Especificar qual o arquivo vai servir de base para a construção da imagem, por padrão, o docker build procura no contexto o arquvio chamado Dockerfile, mas através desse comando pode-se especificar outro caminho para outra dockerfile |
| -t       | tagname         | nome da imagem (name:tag)     | Especificar qual será o nome customizado da imagem, a tag que vem após o nome é opcional                                                                                                                                                                                       |
- Temos também o PATH, o PATH especifica onde encontrar os arquivos para o contexto de criação da imagem, o path pode ser um caminho para pasta, uma url ou até mesmo um repositório do git, aqui, nos limitaremos a trabalhar só com o caminho para pastas locais

## Como é um Dockerfile?
- O Dockerfile, possui diversos comandos para dar suporte a criação de uma imagem customizada, veremos alguns exemplos e detalharemos alguns dos comandos principais, vale ressaltar que obrigatoriamente, um arquivo dockerfile deve ser nomeado como Dockerfile!

| Instruções    | Função                                                                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FROM       | Ponto de partida para a criação de uma imagem, se quiser algo baseado em Mysql, pode especificar, se quiser fazer uma imagem do zero, basta informar **SCRATCH** |
| RUN        | Pode ser executada uma ou mais vezes, definimos quais os comandos serão executados nas etapas de criação de uma imagem.                                          |
| CMD        | Definimos quais comandos serão executados na etapa de criação do container, caso o container não tenha nenhum comando                                            |
| ENTRYPOINT | A mesma coisa que o *CMD*, porém seus parâmetros não são sobrescritos                                                                                            |
| ADD        | Fazer cópia de arquivos, diretório ou até mesmo baixar arquivos, na máquina host para a imagem                                                                   |
| COPY       | Permite apenas a passagem de arquivos ou diretórios, diferente do *ADD* que permite downloads                                                                    |
| EXPOSE     | Serve para documentar qual a porta será exposta, mas efetivamente **não** publica a porta                                                                        |
| VOLUME     | Cria uma pasta que será compartilhada entre o container e o host                                                                                                 |
| WORKDIR    | Tem o propósito de definir onde as instruções acima executarão suas tarefas, além de definir o diretório padrão que será aberto ao executarmos o container       |

- Agora, vamos a um exemplo prático de como utilizar essas instruções!
- Vamos criar uma aplicação básica em nodejs, só para acessarmos algumas rotas e você poderão ver diversas partes do Dockerfile em ação
- *o código em JS é um exemplo simples e estará disponibilizado, pois, todo o desenvolvimento dele não faz parte dessa matéria*
```Dockerfile
#Especificando qual imagem vamos utilizar de base
FROM node
#Indicamos a pasta que será criada dentro do container, para ser o ponto inicial dos arquivos
WORKDIR /server-example
#Copiando o arquivo package.json da pasta atual para a pasta server-example do container
COPY package.json .
# Copiando o server.js da pasta atual para a pasta server-example do container
ADD server.js .
# Documentando que o container terá a porta 3000 exposta
EXPOSE 3333

  
# rodando npm install durante a criação da imagem, para quando baixarmos ela já vir com o node_modules pronto
RUN npm install --production
# Rodando npm start após a criação do container para o container já subir com o servidor inicializado
CMD ["npm","start"]
```

- Após montarmos o Dockerfile, precisamos criar essa image, para fazer isso, basta rodar o docker build
- *obs: para o usarmos o '.', precisamos estar na pasta em que existe o Dockerfile, caso contrário é necessário passar o caminho para esse dockerfile*
 ```bash
 docker build -t nodejs-server .
 ```
- dessa forma se rodarmos o docker images veremos nossa imagem criada e pronta para ser instanciada com o comando docker run.
![Docker Images](imgs/dockerImagesServer.png)
```bash
docker run --rm -d --name server-labso nodejs-server
# Se estiver rodando o container na sua máquina, precisamos pegar o ip para poder acessar ela, usamos o seguinte comando para saber qual o ip
docker inspect server-labso | grep IPAddress
```
- e com isso podemos acessar a api pelo navegador ou fazer requisições
![Docker acessando](imgs/server-on-web.png)
# Docker Compose
## O que é?
- O Docker compose é uma ferramenta para definir e rodar multiplos containers de aplicação, para o docker compose, utilizamos um arquivo do tipo YAML para configurar as aplicações, então com um único comando, conseguimos criar e iniciar todos os serviços configurados no arquivo.
## Como é um arquivo docker-compose?
- Assim como no dockerfile precisamos que esse arquivos seja nomeado como Dockerfile, no compose, precisamos nomear o arquivo como **docker-compose.yml** ou **docker-compose.yaml**
- Um docker compose possui uma estrutura básica e vamos explicar ela agora
```yaml
version: '3.4'

services:
	service_name:
		image: image_name
		ports: 0000:0000
		volumes:
			- ./pathFolder:/containerPath
		environment:
			- KEY=VALUE
		depends_on:
			- service
			- 
volumes:
	volume:

networks:
	mydata:
	
	
```
- Dessas partes vamos detalhar elas
	- ***version*** especifica qual a versão do docker-compose vamos utilizar
	- ***services*** é a parte onde definimos todos nossos serviços, ou nossos container que serão instanciados, dentro de service, definimos um nome para o service e podemos passar outras informações como
		- **image**: imagem base para o container
		- **ports**: porta que será exposta para nosso container seguindo padrão host:container
		- **volumes**: volume que será criado para o container, assim como a flag -v do docker run
		- **enviroment**: variáveis de ambiente para o container
		- **depends_on**: basicamente nos informa que antes daquele container subir, o container que esta no depends on precisa já estar rodando, ou seja, através dele conseguimos controlar a ordem em que os containers sobem.
	- ***volumes*** é onde definimos os volumes que serão utilizados, aqui, pasta passar o nome do volume pois podemos definir a pasta diretamente no *service*
	- ***networks*** é onde usamos para criar redes internas entre os containers e depois passamos isso dentro do service em network

- Vale ressaltar, que existem partes que não são obrigatórias, porém obrigatoriamente precisamos definir os services e dependendo de como vamos trabalhar com o docker compose, é sempre bom definir a versão do docker compose
- por exemplo, por padrão, o próprio docker-compose cria uma network para aqueles serviços que estão 

- Agora que já falamos dessa parte, vamos a um exemplo prático para essa disciplina, nesse exemplo, vamos instanciar um banco de dados, uma api e também uma interface web, cada um em um container e todos se comunicando!
```yml
version: '3.4'

#Definição dos serviços
services:

#container app, ele terá nossa interface
  app: 
  #image sendo utilizada, essa imagem será construida através do Dockerfile
    image: app-labso
    #container_name é onde damos um nome customizado ao container que o docker-compose sobe
    container_name: compose-app-labso
    #ports onde mapeamos a porta host:contaier
    ports: 
      - 80:8080


#depends_on é onde falamos qual o container precisa subir antes desse
# nesse caso, nosso container app, só subirá depois que o container de bd e o da api subirem
    depends_on:
        api:
          condition: service_healthy
    

#container api, esse container terá nossa api
  api:
    image: api-labso
    container_name: compose-api-labso
     #enviroment passamos as variáveis de ambiente para essa aplicação, isso pode ser feito através de um .env por exemplo
    environment:
      - DATABASE_URL=mysql://root:root@0.0.0.0:3306/labso
    ports: 
      - 3333:3333
    #command sobrescreve o CMD da imagem, nessa caso, assim que o container subir ele ira rodar uma migration e depois iniciará o servidor da api
    command: bash -c "npx prisma db push && npm run start"
    healthcheck:
      test: curl --fail http://0.0.0.0:3333/pessoas || exit 1
      retries: 3
      interval: 3s
    #nesse depends_on, temos um condition, esse condition nos diz que nosso container de api só subira depois que o container db subir e ele estiver em um estado saudável
    # como queremos rodar uma migration nesse banco de dados, precisamos que além dele estar instanciado, precisamos que ele já esteja inicializado e podendo receber conexões
    # então dentro do container de bd a gente vai definir o que para aquele container é estar healthy
    depends_on:
      db:
        condition: service_healthy
        

#TODO volumes to maintain data
  db:
    image: mysql
    container_name: compose-bd-labso
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=labso
    ports:
      - 3306:3306
	#healthcheck é onde a gente vai definir um teste para nos dizer se o container está healthy/saudável ou não
	# nesse caso, como precisamos que o container esteja rodando e aceitando conexões, passamos que o teste desse container é dar um ping nele mesmo com o usuário root
	# caso o teste passe, ele nos retorna que o container é healthy e o container de api pode subir.
    healthcheck:
      test: mysqladmin ping -h 0.0.0.0 -u root -p$$MYSQL_ROOT_PASSWORD
      retries: 10
```

- Agora que temos nosso arquivo docker-compose precisamos subir ele, porém, como temos imagem customizada, precisaremos criar essas imagens
- Nossa imagem do app terá o seguinte Dockerfile:
```Dockerfile
FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["http-server","dist"]
```

- Nossa imagem da api terá o seguinte Dockerfile:
```Dockerfile
FROM node
WORKDIR /server-example
COPY package.json .
ADD *.js ./
COPY prisma/* ./prisma/
COPY controller/* ./controller/
EXPOSE 3333

RUN npm install --production
RUN ["npx","prisma","generate"]
CMD ["npm","start"]
```

- Após criar precisaremos criar essas duas imagens, rodamos então os seguintes comandos
```bash
cd frontend-vue
docker build -t app-labso .
cd ../backend
docker build -t api-labso .
```

- Após o build feito, se usarmos *docker images* veremos que as imagens já estão lá!
- Dessa forma podemos agora então, rodar o docker compose para subir nossos containers
```bash
cd ..
docker-compose up -d
```


- dentro da CLI do docker-compose temos diversos comandos, vamos mostrar algum deles além do up

| Comando | Significado | Descrição                                                                 | Parametro                                                                        |    
| ------- | ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | 
| up      | subir       | Cria e inicia os containers  dos serviços                                 | podemos usar a flag *--no-start* para somente criar os containers sem inicia-los | 
| down    | descer      | Para todos os serviços e remove os recursos, networks, containers, etc... | nenhum                                                                           | 
| start   | iniciar     | Inicia os serviços                                                        | nenhum                                                                           | 
| stop    | parar       | Para  os containers dos serviços                                          | nenhum                                                                           | 
| images  | imagens     | Lista as imagens                                                          | nenhum                                                                           | 
| rm      | remove      | remove/apaga todos os containers parados                                  | nenhum                                                                           | 
| top     | topo        | Mostro todos os processos rodando                                         | nenhum                                                                           | 
| kill    | derrubar    | Derruba os containers                                                     | nenhum                                                                           | 

- Vale lembrar, que todos esses comandos são feitos baseados no docker-compose.yml, então para funcionar, eles precisam ser executado na pasta que contenha o arquivo, ou você especificando o caminho para ele.
- No caso, por exemplo, do comando *docker-compose rm*, ele não ira remover TODOS os containers que você cria que estão parados, ele ira remover todos os containers de serviço que o docker-compose.yml definiu, ou seja, todos os containers parados referente a esse arquivo serão apagados.
