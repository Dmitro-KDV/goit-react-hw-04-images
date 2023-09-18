// import {Form, Label} from './Phonebook.stiled';

import { useState } from 'react'

export const Searchbar = ({handlChange}) => {

    const [value, setValue] = useState('');

    const handleChange = ({target: {value}}) => {
        setValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handlChange(value)
    }
      
        return ( 
            <>
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        // autocomplete="off"
                        // autofocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                        value={value}
                    />
                </form>
            </>
        );
}