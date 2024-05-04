import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import { storage } from './firebase/firebase-config';

export default async function Home() {
    const allImageRef = ref(storage, 'images/');
    let allImage = [];
    try {
        const listImage = await listAll(allImageRef);

        const urlPromises = listImage.items.map(async (itemRef) => {
            const url = await getDownloadURL(ref(storage, itemRef));
            return url;
        });

        allImage = await Promise.all(urlPromises);
    } catch (error) {
        throw error;
    }

    console.log(allImage);

    return (
        <main className="flex min-h-screen flex-col items-center gap-6 mt-24">
            <div>
                <Link
                    href={'/file'}
                    className="px-5 py-3 bg-green-500 text-white rounded ">
                    Image Upload
                </Link>
            </div>
            <p>Images {allImage?.length}</p>
            <div className="">
                {allImage.map((url, inx) => (
                    <figure key={inx} className="relative w-24 h-24 ">
                        <Image
                            src={url}
                            alt={`image${inx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </figure>
                ))}
            </div>
        </main>
    );
}
