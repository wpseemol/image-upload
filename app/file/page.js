'use client';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useState } from 'react';
import { storage } from '../firebase/firebase-config';

export default function FileUpload() {
    const [images, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    async function handleFileUpload(event) {
        setLoading(true);
        if (!event.target.files || event.target.files.length === 0) {
            return; // User canceled file selection
        }

        const files = event.target.files[0];

        const imageRef = ref(storage, `images/${files.name}`);

        try {
            const uploadImage = await uploadBytes(imageRef, files);

            const imgUrl = await getDownloadURL(ref(storage, imageRef));

            setImage(imgUrl);

            console.log(imageRef);
            setLoading(false);
        } catch (error) {
            console.error('Network error:', error);
            setLoading(false);
        }
    }

    console.log('image:', images);

    return (
        <div>
            <h4>Select Image(s)</h4>

            <div className="flex gap-2 items-center">
                {loading ? (
                    <>
                        <div className="w-[200px] h-[200px] flex items-center justify-center">
                            <p className="">Loading</p>
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce">.</span>
                        </div>
                    </>
                ) : (
                    images && (
                        <Image
                            src={images}
                            alt="images"
                            width={200}
                            height={200}
                        />
                    )
                    // images.map((img, inx) => (
                    //     <Image
                    //         key={inx}
                    //         src={`${img.url}`}
                    //         alt="images"
                    //         width={200}
                    //         height={150}
                    //     />
                    //))
                )}
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
