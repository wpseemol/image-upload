import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import DeletedBtn from './components/client/DeletedBtn';
import { storage } from './firebase/firebase-config';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const allImageRef = ref(storage, 'images/');
    let allImage = [];
    try {
        const listImage = await listAll(allImageRef);

        const urlPromises = listImage.items.map(async (itemRef) => {
            const url = await getDownloadURL(ref(storage, itemRef));

            return { url: url, itemRef: itemRef?._location.path_ };
        });

        allImage = await Promise.all(urlPromises);
    } catch (error) {
        throw error;
    }

    return (
        <main className="flex min-h-screen container mx-auto flex-col items-center gap-6 mt-24">
            <div>
                <Link
                    href={'/file'}
                    className="px-5 py-3 bg-green-500 text-white rounded ">
                    Image Upload
                </Link>
            </div>
            <p>Images:- {allImage?.length}</p>
            <div className=" flex w-fit justify-center gap-4 flex-wrap">
                {allImage.map((img, inx) => {
                    return (
                        <figure key={inx} className="relative">
                            <DeletedBtn imgRef={img.itemRef} />
                            <Image
                                src={img.url}
                                alt={`image${inx + 1}`}
                                width={400}
                                height={400}
                                className="w-auto h-auto"
                            />
                        </figure>
                    );
                })}
            </div>
        </main>
    );
}
