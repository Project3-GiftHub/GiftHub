import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap/';
import { useMutation } from "@apollo/client";
import { ADD_WISH } from '../utils/mutations';

const CreateWish = () => {
    const [wishData, setWishData] = useState([{ item: '' }]);

    const [addWish, { error }] = useMutation(ADD_WISH);
    const [showAlert, setShowAlert] = useState(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setWishData({ ...wishData, [name]: value });
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();

        try {
            console.log("TRYING for a wish :)   !!!!!");
            const { data } = await addWish({
                variables: { ...wishData }
            });
            console.log('data::::', data)

        } catch (err) {
            console.error(error);
            setShowAlert(true);
        }

        setWishData({
            item: '',
        });
    }

    const handleRemoveClick = (index) => {
        wishData.splice(index, 1)
    }


    return (
        <>
            <div className='wishlist'>
                <input value={wishData.item}
                onChange={handleInputChange} />

                <button onClick={handleButtonClick}>Add Wish </button>
                <ul className='wishlist-items'>
                    {wishData.map((item, index) => (
                        <li key={index}>{item}
                            <button onClick={() =>
                                handleRemoveClick(index)}>DESTROY</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    );

};
export default CreateWish;