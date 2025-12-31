// app/api/upload/route.js

import { bucket } from "@/lib/firebaseAdmin";
import formidable from "formidable";
import { NextResponse } from "next/server";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  const form = formidable({ multiples: true });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err)
        return reject(
          NextResponse.json({ error: err.message }, { status: 500 })
        );

      const uploadedFiles = [];
      try {
        const fileArray = Array.isArray(files.file) ? files.file : [files.file];
        for (let file of fileArray) {
          const fileBuffer = await fs.promises.readFile(file.filepath);
          const filename = `works/${Date.now()}-${file.originalFilename}`;
          const fileRef = bucket.file(filename);

          await fileRef.save(fileBuffer, {
            metadata: {
              contentType: file.mimetype,
              firebaseStorageDownloadTokens: Date.now().toString(),
            },
          });

          const url = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURIComponent(filename)}?alt=media`;
          uploadedFiles.push(url);
        }

        resolve(NextResponse.json({ urls: uploadedFiles }, { status: 200 }));
      } catch (uploadErr) {
        reject(
          NextResponse.json({ error: uploadErr.message }, { status: 500 })
        );
      }
    });
  });
}
