va até a pasta raiz e execute
docker build path_docker -t nome_da_imagem -f path_to_dockerfile

-t: tag name= nome da imagem
-f: caminho para o dockerfile
path: contexto para a criação do container/ é como se a imagem fosse criada na pasta atual

### para visualizar as imagens
docker image ls

### criando container
docker run -d --rm --name mysql-container mysql-image

-d: detached = vamos executar em background
--rm: remove file = se o container existir vai remover e criar outro
--name: nome = nome do container
image: imagem = a imagem que vamo usar no container 

### para visualizar os container que estão de pé
docker ps

#### para executar comandos dentro do docker utilize
docker exec -i mysql-container mysql -uroot -proot < .\api\db\script.sql

-i:rodar em modo interativo = quer dizer que o processo não vai ser finalizado até a conclusão
container: nome do container
comando: comando que vc quer usar
    mysql: comando mysql
    -u:usuario
    -p: password
    <: comando linux para passar um arquivo pro comando


### para acessar o container
docker exec -it mysql-container /bin/bash

-i: rodar em modo interativo = quer dizer que o processo não vai ser finalizado até a conclusão
-t: tty = a resumo é o terminal
nome_do_container = nome do nome_do_container
comando: bin/bash = invoca um bash

### para parar o container
docker stop mysql-container

__ 

### Quando paramos um container tudo que ta dentro dele é perdido, para ter permanência de dados criamos *Volumes*

*Volumes*: São pastas compartilhadas para armazenadas os dados do container

### para criar volumes, executamos docker run, mas com a flag volumes
docker run -d -v "$(pwd)/api/db/data:/var/lib/mysql" --rm --name mysql-container mysql-image

-d: detached = vamos executar em background
-v: volume = indica a pasta do host que está compartilhada com o container, são separadas por pastaHost:pastaContainer
    $(pwd): interpolação do comando pwd= pwd nos retorno o diretório atual
    var/lib/mysql: pasta onde está fica o mysql e toda sua estrutura de banco
--rm: remove file = se o container existir vai remover e criar outro
--name: nome = nome do container
image: imagem = a imagem que vamo usar no container 


### para pegar informações sobre o container
docker inspect mysql-container

mysql-container: nome do container

### container node: imagem
docker build -t node-image -f api/dockerfile . 

### container node: container
docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --rm --name node-container node-image

docker run -d -v $(pwd)/api:/home/node/app -p 9001:9001 --link mysql-container --rm --name node-container node-image

$(pwd): interpolação = utilizamos $(comando) quando queremos executar algum comando e passar seu resultado para dentro da string, igual a interpolação de javascript por exemplo que é ${}
-p: porta = indicando que a porta do container vai estar exposta para a porta do host
--link: linkar um ip a um container: troca a necessidade de passar um ip, pois vincula aquilo ao nome do container
