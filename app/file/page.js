'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FileUpload() {
    const [images, setImage] = useState(null);

    async function handleFileUpload(event) {
        if (!event.target.files || event.target.files.length === 0) {
            return; // User canceled file selection
        }

        const files = event.target.files;
        const formData = new FormData();

        for (const file of Array.from(files)) {
            formData.append('files', file);
        }

        // You can add other data to the request if needed
        formData.append('otherData', 'some data');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Server response:', data);
                setImage(data.images);
            } else {
                console.error('Error uploading files:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    console.log(images);

    return (
        <div>
            <h4>Select Image(s)</h4>

            <div className="flex gap-2 items-center">
                {images &&
                    images.map((img, inx) => (
                        <Image
                            key={inx}
                            src={`/assets/${img.url}`}
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
