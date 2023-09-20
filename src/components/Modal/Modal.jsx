import { useCallback } from 'react';
// import { useEffect } from 'react';
import * as basicLightbox from 'basiclightbox';
import 'components/Modal/basicLightbox.min.css';

export const Modal = ({ largeImageURL, closeModal }) => {

  // 1-й варіант

  // useEffect(() =>  {
  //     const onKeydownEsc = (e) => {
  //         if (e.code === 'Escape') closeModal()
  //     }
  //     window.addEventListener('keydown', onKeydownEsc);
  //     return () => {
  //         window.removeEventListener('keydown', onKeydownEsc);
  //     }
  // },[closeModal])

  // return (
  //     <div className="Overlay" onClick={closeModal}>
  //         <div className="Modal">
  //             <img src={largeImageURL} alt="" width="800" height="600"/>
  //         </div>
  //     </div>
  // );

  //**************************** */
  
  // 2-й варіант, потрібно вимкнути суворий режим в index.js 
  //  цей рідок <React.StrictMode>
  //  <App />
  //  цей рядок  </React.StrictMode>

  const handleOpenModal = useCallback(() => {
    const instance = basicLightbox.create(
      `
          <img 
            src="${largeImageURL}" 
            width="800" 
            height="600"
          >
      `,
      {
        onShow: () => {
          window.addEventListener('keydown', onKeydownEsc);
        },
        onClose: () => {
          closeModal();
          window.removeEventListener('keydown', onKeydownEsc);
        },
      }
    );

    const onKeydownEsc = event => {
      if (event.code === 'Escape') {
        instance.close();
      }
    };

    instance.show();
    
  }, [largeImageURL, closeModal]);

  return handleOpenModal();
};
