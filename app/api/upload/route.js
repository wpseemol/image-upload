import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export const POST = async (req, res) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files'); // Use 'files' as the field name for multiple files

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files received.' },
                { status: 400 }
            );
        }

        // Process each file
        const baseUrl = 'http://localhost:3000'; // Replace with your actual domain
        const array = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = generateRandomFilename(); // You can create a function to generate unique filenames
            await writeFile(
                path.join(process.cwd(), 'public/assets/', filename),
                buffer
            );

            // Construct the full image URL
            const imageUrl = `/assets/${filename}`;
            const fullImageUrl = `${baseUrl}${imageUrl}`;

            array.push({ url: fullImageUrl }); // Store the full image URL
        }

        return NextResponse.json({
            Message: 'successful',
            status: 201,
            images: array,
        });
    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ Message: 'Failed', status: 500 });
    }
};

// Helper function to generate a random filename (customize as needed)
function generateRandomFilename() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    return `file_${timestamp}_${randomString}.jpg`; // Example filename format
}
