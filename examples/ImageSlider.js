import View from './view'; // don`t forget change location of view.js

// implement your view class
class ImageSlider extends View {

  /**
   * Put ui and events definitions here
   */
  preInitialize() {
    // define ui with jQuery selectors
    this.ui = {
      prevButton: '.btn-prev',
      nextButton: '.btn-next',
      currentSlide: '.current-slide'
    };
    // define ui events
    this.events = {
      'click .btn-prev': 'onBtnPrevClick',
      'click .btn-next': 'onBtnNextClick'
    }
  }

  // implement event handlers
  onBtnPrevClick(e) {
    this.ui.currentSlide // it`s just a jQuery object - do what u want
      .children('img')
      .replaceWith(this.nextSlide());
  }

  onBtnNextClick() {
    this.ui.currentSlide // it`s just a jQuery object - do what u want
      .children('img')
      .replaceWith(this.prevSlide());
  }

  nextSlide() {
    // implement
  };

  prevSlide() {
    // implement
  };
}

// use it

const imageSlider = new ImageSlider({
  $el: $('#image-slider') // root element of your view
});

// call methods
imageSlider.nextSlide();
imageSlider.prevSlide();
// or even use ui (carefully, don`t break encapsulation, it`s just an example of view`s power)
imageSlider.ui.prevButton.hide();
