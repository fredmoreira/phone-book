# PhoneBook [![Circle CI](https://circleci.com/gh/fredmoreira/phone-book.svg?style=svg)](https://circleci.com/gh/fredmoreira/phone-book)


A simple REST API with JSON file-based storage for experimenting with testing frameworks.

#### Dependencies

* Node & Yarn

#### Setup

* git clone https://github.com/fredmoreira/phone-book
* yarn install

#### Run server

* yarn start

#### Tests

* yarn test
* yarn test:unit
* yarn test:coverage
* yarn lint

#### Header

You must use **Content-Type: application/json**

#### Methods available for this version

* GET	  /contacts?parameter=    You can use *name* or *mobilephone* and *homephone*
* POST 	  /contacts 		 
* DELETE  /contacts/:id
* PUT 	  /contacts/:id

##### Comments

* Parameters "name" and "mobilephone" are required in *POST* method.

#### Manual testing

* Postman - Chrome (https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)

* Fiddler (http://www.telerik.com/fiddler)
