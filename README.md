#PhoneBook [![Circle CI](https://circleci.com/gh/fredmoreira/PhoneBook.svg?style=shield)](https://circleci.com/gh/fredmoreira/PhoneBook)

A simple API REST to run tests on testing frameworks

####Depedencies

* MongoDB
* Node / Npm

#### Setup
* git clone https://github.com/fredmoreira/PhoneBook.git
* npm install

#### Run server

* npm start

#### HEADER

You must use **Content-Type: application/json**

#### Methods available for this version

* GET	  /contacts?parameter=    You can use *name* or *mobilephone* and *homephone*
* POST 	  /contacts 		 
* DELETE  /contacts/:id
* PUT 	  /contacts/_id

##### Comments
* Parameters "name" and "mobilephone" are required in *POST* method.

#### Use manually test

* Postman - Chrome (https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)

* Fiddler (http://www.telerik.com/fiddler)
