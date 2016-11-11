import View from './view';

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
  };

  prevSlide() {
  };
}

// use it (on DOM ready)

const imageSlider = new ImageSlider({
  $el: $('#image-slider') // root element of your view
});

// call methods
imageSlider.nextSlide();
imageSlider.prevSlide();
