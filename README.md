# COVID-19 Tracker

This web application displays COVID-19 stats for every country in the world and generates graphs for selected countries’ case types. The data is updated every 15 minutes. 

My goal is to provide information that is easily digestible and informative to the public.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
$ cd Desktop
$ git clone https://github.com/JamesonC/COVID-19-Statistics.git
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
$ cd COVID-19-Statistics
$ npm install
```

Obtain Rapid API key and Host key from https://rapidapi.com/api-sports/api/covid-193
Navigate to project root

```
$ touch .env
$ open .env
```
Add these lines in the .env file

```
REACT_APP_HOST='insert host key'
REACT_APP_COVID19_API_KEY='insert api key'
```

Start Development Server

```
$ npm start
```

## Built With

* [React](https://reactjs.org/docs/create-a-new-react-app.html) - JavaScript library for building user interfaces
* [Node](https://www.npmjs.com/package/node) - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express](https://expressjs.com/) - Node.js web application framework


## Authors

* **Jameson Campbell** - *Initial work* - [Github](https://github.com/JamesonC)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details