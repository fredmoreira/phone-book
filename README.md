#PhoneBook [![Circle CI](https://circleci.com/gh/fredmoreira/PhoneBook.svg?style=shield)](https://circleci.com/gh/fredmoreira/PhoneBook)

API REST simples para experimentar frameworks de automação de testes de api's

####Depedências

* MongoDB
* Node / Npm

#### Setup
* git clone https://github.com/fredmoreira/PhoneBook.git
* npm install

#### Run server

* node server.js (No diretório raiz do projeto)

#### HEADER

Utilizar o seguinte Content-Type: **Content-Type: application/json**

#### Métodos disponíveis para esta versão

* GET 	  /contacts 		 --> Consulta todos os contatos
* GET 	  /contacts/:id    --> Consulta contato especificado pelo _id (Id no MongoDB)
* GET	  /contacts?parametro=    Consulta contato filtrando pelo parametro(name,mobilephone,homephone)
* POST 	  /contacts 		 --> Adiciona novo contato
* DELETE  /contacts/:id	  --> Deleta contato especificado pelo _id (Id no MongoDB)
* PUT 	  /contacts/_id	 --> Atualiza contato especificado pelo _id (Id no MongoDB)

##### Observações
* O método de PUT foi implantado para atualizar apenas o 'name' por enquanto.
* Para o método post os campos "name" e "mobilephone" são obrigatórios.

#### Use para testar manualmente

* Postman - Chrome (https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)

* Fiddler (http://www.telerik.com/fiddler)
