/*
* Change the first h1 tag
* to the 'Hello World!' string
* */

export default class HelloWorld {

  // Runs when the class was called
  constructor() {
    this.headline = document.querySelector('h1');
    this.changeHeadline();
  }

  // Change the content of the first h1 tag
  changeHeadline() {
    this.headline.innerHTML = 'Hello World!';
  }

}