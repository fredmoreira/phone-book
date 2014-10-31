##PhoneBook (Versão 0.0.2)

API REST simples para experimentar frameworks de automação de testes de api's

####Depedências

* MongoDB
* Node / NPM

#### Instalação
* git clone https://github.com/fredmoreira/PhoneBook.git
* npm install

#### Executar

* node server.js (No diretório raiz do projeto)

#### Métodos disponíveis para esta versão

* GET 	  /api/contacts 		 --> Consulta todos os contatos
* GET 	  /api/contacts/:id    --> Consulta contato especificado pelo _id (Id no MongoDB)
* GET	  /api/contacts?parametro=    Consulta contato filtrando pelo parametro(name,mobilephone,homephone)
* POST 	  /api/contacts 		 --> Adiciona novo contato
* DELETE  /api/contacts/:id	  --> Deleta contato especificado pelo _id (Id no MongoDB)

Obs.: Para o método post os campos "name" e "mobilephone" são obrigatórios.

#### Em implantação
PUT 	/api/contacts/_id	 --> Atualiza contato especificado pelo _id (Id no MongoDB)

#### Use para testar manualmente

* Postman - Chrome (https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)

* Fiddler (http://www.telerik.com/fiddler)
