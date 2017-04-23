# PhoneBook [![Circle CI](https://circleci.com/gh/fredmoreira/phone-book.svg?style=shield)](https://circleci.com/gh/fredmoreira/phone-book)


A simple API REST for experiencing testing frameworks

#### Depedencies

* MongoDB
* Node / Npm

#### Setup
* git clone https://github.com/fredmoreira/phone-book
* npm install

#### Run server

* npm start

#### Header

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
