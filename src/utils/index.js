export const carouselSettings = {
  dots: false,
  infinite: true,
  swipe: true,
  swipeToSlide: true,
  adaptiveHeight: false,
  slidesToShow:3,
  initialSlide: 0,
  autoplay:false,
  speed:400,
  touchMove: true,
  arrows: false,
  rows:1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
}



export const stringifyErrorMessage = (error) => {
  const message = error?.response?.data?.message;
  if(message){
    if(Array.isArray(message)){
      return message.reduce((acc,err) => acc === '' ? err.errorMessage : `${acc}, ${err.errorMessage}` ,'');
    }
    if(typeof message === 'string'){
      return message;
    }
  }
  return error;
}

export const parseParams = (querystring) => {

  // parse query string
  const params = new URLSearchParams(querystring);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
          obj[key] = params.getAll(key);
      } else {
          obj[key] = params.get(key);
      }
  }

  return obj;
};