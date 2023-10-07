import { useState, useEffect } from "react";
import Notiflix from 'notiflix';
import { RotatingLines } from  'react-loader-spinner'
import {getImage} from './services'
import {ImageGallery} from 'components/ImageGallery/ImageGallery'
import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'
import {Searchbar} from 'components/ImageSearch/Searchbar'
import {Button} from 'components/Button/Button'
import {Modal} from 'components/Modal/Modal'

import './styles.css'

let innerHeight = window.innerHeight;

export const App = () => {

  const [searchText, setSearchText] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      getImage(searchText, page)
          .then((response) => {
            if (response.data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                return;
            }
            if (page > 1) {
              setImage((prevImage) => [...prevImage, ...response.data.hits])
            }  else {
              setImage(response.data.hits);
            }
            setTotalPage(response.data.totalHits);
            console.log(response.data.hits)
          })
          .catch(function(error) {
              Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
          })
          .finally(() => {
            setIsLoading(false);
          })
    }
  },[searchText, page]);

  useEffect(() => {
    image && scroll()
  }, [image]);

  const handleChange = (searchText) => {
    setSearchText(searchText)
    setPage(1);
  }

  const handleSubmit = () => {
      setPage(page + 1);
  }

  const openModal = (e) => {
    setLargeImageURL(e.target.dataset.source)
  }

  const closeModal = () => {
    setLargeImageURL('')
  }

  const scroll = () => {
    innerHeight = innerHeight + window.innerHeight;
    window.scrollBy({
      top: innerHeight,
      behavior: "smooth",
    });
  } 
    return (
      <div>
        <header className="Searchbar">
          <Searchbar handlChange={handleChange}/>
        </header>
        <>
            <ImageGallery openModal={openModal}>
                {image && image.map((el) => {
                  return (
                    <ImageGalleryItem key={el.id} image={el}/>
                )})}  
            </ImageGallery>
            
            {largeImageURL && <Modal largeImageURL={largeImageURL} closeModal={closeModal}/>}
            
            {isLoading && 
            <div className="RotatingLines">
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
            }
            {page * 12 <= totalPage &&  <Button handleSubmit={handleSubmit}/>}
          </>
      </div>
    );
};
