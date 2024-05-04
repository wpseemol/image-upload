'use client';

import { ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react';
import { storage } from '../firebase/firebase-config';

export default function FileUpload() {
    const [images, setImage] = useState(null);

    async function handleFileUpload(event) {
        if (!event.target.files || event.target.files.length === 0) {
            return; // User canceled file selection
        }

        const files = event.target.files[0];

        const imageRef = ref(storage, `images/${files.name}`);

        try {
            const uploadImage = await uploadBytes(imageRef, files);
            console.log('upload is completed:', uploadImage);
            alert('image uploaded');
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <div>
            <h4>Select Image(s)</h4>

            <div className="flex gap-2 items-center">
                {images &&
                    images.map((img, inx) => (
                        <Image
                            key={inx}
                            src={`${img.url}`}
                            alt="images"
                            width={200}
                            height={150}
                        />
                    ))}
            </div>

            <input
                type="file"
                name="myImage"
                onChange={handleFileUpload}
                multiple
            />
        </div>
    );
}
