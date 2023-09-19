// import { useEffect, useCallback } from "react";
import * as basicLightbox from 'basiclightbox'
import "components/Modal/basicLightbox.min.css";

export const Modal = ({largeImageURL, closeModal}) => {

    // useEffect(() =>  {
    //     const onKeydownEsc = (e) => {
    //         if (e.code === 'Escape') closeModal()
    //     }
    //     window.addEventListener('keydown', onKeydownEsc); 
    //     return () => {
    //         window.removeEventListener('keydown', onKeydownEsc);
    //     }
    // },[closeModal])


    const handleOpenModal = () => {
        const instance = basicLightbox.create(`
            <img src="${largeImageURL}" alt="" width="800" height="600">
        `,
        {
            onShow: () => {
              window.addEventListener('keydown', onKeydownEsc);
            },
            onClose: () => {
              window.removeEventListener('keydown', onKeydownEsc);
            },
          }
        );
        const onKeydownEsc = (event) => {
            if (event.code === 'Escape') {
                instance.close();
            }
          }
        instance.show();
    };
    return handleOpenModal()

    // return (
    //     <img 
    //         src={largeImageURL} 
    //         onClick={handleOpenModal} 
    //         style={{ cursor: 'pointer' }} 
    //     />
    // );    

    // return (
    //     <div className="Overlay" onClick={closeModal}>
    //         <div className="Modal">
    //             <img src={largeImageURL} alt="" width="800" height="600"/>
    //         </div>
    //     </div>
    // );
}