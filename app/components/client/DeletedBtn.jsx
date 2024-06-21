'use client';

import { storage } from '@/app/firebase/firebase-config';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/navigation';

export default function DeletedBtn({ imgRef }) {
    const imageRef = ref(storage, imgRef);

    const router = useRouter();

    async function handleDeleted() {
        try {
            const isDeleted = await deleteObject(imageRef);
            alert('image Deleted successfully');
            console.log(isDeleted);

            router.refresh();
        } catch (error) {
            console.log('Error deleting image:', error);
            throw error;
        }
    }

    return (
        <button
            onClick={handleDeleted}
            className="absolute top-1 z-10 text-center text-2xl rounded w-8 h-8 right-1 bg-red-400 text-white">
            x
        </button>
    );
}
