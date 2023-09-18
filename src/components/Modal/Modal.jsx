import { useEffect } from "react";


export const Modal = ({largeImageURL, closeModal}) => {

    useEffect(() =>  {
        const onKeydownEsc = (e) => {
            if (e.code === 'Escape') closeModal()
        }
        window.addEventListener('keydown', onKeydownEsc); 
        return () => {
            window.removeEventListener('keydown', onKeydownEsc);
        }
    },[closeModal])
    
    return (
        <div className="Overlay" onClick={closeModal}>
            <div className="Modal">
                <img src={largeImageURL} alt="" width="800" height="600"/>
            </div>
        </div>
    );
    }