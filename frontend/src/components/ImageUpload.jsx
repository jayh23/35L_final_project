import React, { useState, useRef } from 'react';
import DefaultImage from "../../public/images/doom.jpg"; // Change to default icon
import EditIcon from "../../public/images/botw.jpg"; //Change to edit icon
import UploadingAnim from "../../public/images/halo2.jpg"; // Change to loading animation

const ImageUpload = () => {
    const [avatarURL, setAvatarURL] = useState(DefaultImage);
    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const validateImageSize = (file) => {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_FILE_SIZE) {
            alert("Image size must be less than 5MB.");
            return false;
        }
        return true;
    }

    // Think all of this has to go in another file
    const uploadImageDisplay = async () => {
        try {
            const uploadedFile = fileUploadRef.current.files[0];

            if (!validateFileSize(uploadedFile)) {
                return;
            }

            setAvatarURL(UploadingAnim);
            const formData = new FormData();
            formData.append("file", uploadedFile); // Might be wrong, poorly adapted this from tutorial using different hosting/uploading service

            const response = await fetch("/api/upload-avatar", {
                method: "PATCH",
                body: formData,
                // Probably needs auth?
            });

            if (response.status === 201) {
                const data = await response.json();
                setAvatarURL(data.avatarURL);
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            console.error(erorr);
            setAvatarURL(DefaultImage);
        }
    }

    // Inline styling from tutorial but it can be taken out
    return (
        <div className="relative h-96 w-96">
            <img src={avatarURL} alt="Avatar" className="h-96 w-96 rounded-full" />
            <form id="form" encType='multipart/form-data'>
                <button type='submit' onClick={handleImageUpload} className='flex-center absolute bottom-12 right-14 h-9 w-9'>
                    <img src={EditIcon} alt="Edit" className='object-cover' />
                </button>
                <input type="file" id="file" ref={fileUploadRef} accept="image/*" hidden />
            </form>
        </div>
    );
}

export default ImageUpload;