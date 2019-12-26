# Boggle Game


Boggle is a word game to find words in sequences of adjacent letters. Visit https://en.wikipedia.org/wiki/Boggle for details

### Tech stacks
  - Ruby on rails (Back-end)
  - React (Front-end)

### Online demo

Deployed in heroku

(https://boogle-rails.herokuapp.com/)

### Getting started

To get started with the app, clone the repo and then install the needed gems:

Install the dependencies and devDependencies and start the server.

```sh
$ cd /path/to/repos
$ git clone https://github.com/rikalraz/boogle-rails.git
$ cd boogle-rails
$ bundle install --without production
```

Run the test suite to verify that everything is working correctly:
```sh
$ rails test
```

Now you can you can run the app in a local server:
```sh
$ rails server -p 3000
```
Go to http://localhost:3000 to play the game.