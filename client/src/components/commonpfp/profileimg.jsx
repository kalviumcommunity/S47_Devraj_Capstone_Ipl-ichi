import React, { useEffect, useState } from 'react';
import axios from 'axios';

function profileimg() {
    const [pic, setPic] = useState(); // State to store the image URL
    const [uploadpic, setUploadpic] = useState(null);
    const [showUpload, setShowUpload] = useState(false);

    const JWToken = localStorage.getItem('JWToken');

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = () => {
        const JWToken = localStorage.getItem('JWToken');
        axios.get('http://localhost:3000/api/users/getpic', {
            headers: {
                Authorization: `Bearer ${JWToken}`
            },
            responseType: 'blob'
        })
        .then((response) => {
            setPic(URL.createObjectURL(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const picupload = () => {
        const formData = new FormData();
        formData.append('pic', uploadpic);
        axios.post('http://localhost:3000/api/users/picupload', formData, {
            headers: {
                Authorization: `Bearer ${JWToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response);
            fetchImage();
            setShowUpload(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const inputpic = (event) => {
        setUploadpic(event.target.files[0]);
        setShowUpload(true);
    }

    const handleupload = () => {
        picupload();
    }
    
    return (
        <>
            {pic && <img style={{height: "100px", width: "100px", borderRadius: "50%", objectFit: "contain"}} src={pic} alt="https://cdn-icons-png.flaticon.com/512/149/149071.png" />} 
            <input type="file" id="profilepic" onChange={inputpic} />
            <label htmlFor="profilepic" >
                <p>Choose Image</p>
            </label>
            {
                showUpload? (
                    <button onClick={handleupload}>Upload</button>
                ) : null
            }
        </>
    );
}

export default profileimg;
