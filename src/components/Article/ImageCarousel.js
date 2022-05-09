import FsLightbox from 'fslightbox-react';
import React,{ useState } from 'react';
import { BASE_URL } from '../../AxiosInstance/axiosInstance';
import Lightbox from "react-awesome-lightbox";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";

const ImageCarousel = ({toggler,articleData,slideNumber,setToggler}) => {
//   return       <FsLightbox
//   toggler={toggler}
//   sources={articleData?.media_images && articleData?.media_images.map(({ path: image }, index) => (`${BASE_URL}/${image}`))}
//   slide={slideNumber}
// />;


if(toggler){
  return (
      <Lightbox images={articleData?.media_images && articleData?.media_images.map(({ path: image }, index) => (`${BASE_URL}/${image}`)).concat(`${BASE_URL}/uploads/media-library/b66acdeb-2f0a-4fdc-afaf-521c856b8558-Angkor-Wat-Cellcard-720p-copy.mp4`)} startIndex={slideNumber} onClose={()=>setToggler(!toggler) }/>
  )
} else {
  return null
}

};

export default ImageCarousel;

