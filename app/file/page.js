'use client';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { storage } from '../firebase/firebase-config';

export default function FileUpload() {
    const [images, setImages] = useState([]); // Use an array to store multiple image URLs
    const [loading, setLoading] = useState(false);

    async function handleFileUpload(event) {
        setLoading(true);
        const selectedFiles = event.target.files;

        if (!selectedFiles || selectedFiles.length === 0) {
            return; // User canceled file selection
        }

        try {
            const uploadPromises = Array.from(selectedFiles).map(
                async (file) => {
                    const imageRef = ref(storage, `images/${file.name}`);

                    await uploadBytes(imageRef, file);
                    const imgUrl = await getDownloadURL(ref(storage, imageRef));
                    return imgUrl;
                }
            );

            const uploadedImageUrls = await Promise.all(uploadPromises);
            setImages(uploadedImageUrls);
            setLoading(false);

            revalidatePath('/');
        } catch (error) {
            console.error('Network error:', error);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h4>Select Image(s)</h4>

            <div className="flex gap-2 items-center">
                {loading ? (
                    <div className="w-[200px] h-[200px] flex items-center justify-center">
                        <p className="">Loading</p>
                        <span className="animate-bounce text-5xl">...</span>
                    </div>
                ) : (
                    images.map((url, index) => (
                        <Image
                            key={index}
                            src={url}
                            alt={`image${index + 1}`}
                            width={200}
                            height={200}
                            className="w-auto h-auto"
                        />
                    ))
                )}
            </div>

            <label htmlFor="myImage" className="mt-8">
                Upload Image(s)
            </label>

            <input
                type="file"
                name="myImage"
                id="myImage"
                onChange={handleFileUpload}
                multiple // Allow multiple files
                className="ml-[8rem] mt-2"
            />

            {images.length >= 1 && (
                <div className="mt-6">
                    <Link
                        className="px-5 py-3 bg-green-500 text-white rounded"
                        href="/">
                        Home
                    </Link>
                </div>
            )}
        </div>
    );
}
