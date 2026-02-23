/*
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable"
import fs from "fs"
import { addPhoto } from "@/app/lib/commands"

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files: any) => {
    if (err) return res.status(500).json({ error: err.message });

    const id = fields.id as string;
    const file = files.file; // the uploaded file

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // // 1️⃣ Store the document
    // const session = store.openSession();
    // const user = { name: userName };
    // const id = await session.store(user);

    // // 2️⃣ Attach the image
    // const fileStream = fs.createReadStream(file.filepath);
    // session.advanced.attachments.store(
    //   id,
    //   file.originalFilename,
    //   fileStream,
    //   file.mimetype
    // );

    // await session.saveChanges();
    // session.dispose();

    res.status(200).json({ id });
  });
}



  // UPLOAD FORM:
  /*
  "use client";
  import { useState } from "react";

  export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) setMessage(`Uploaded successfully! Document ID: ${data.id}`);
      else setMessage(`Error: ${data.error}`);
    };

    return (
      <form onSubmit= { handleSubmit } >
      <input 
        type="text"
    placeholder = "User Name"
    value = { name }
    onChange = {(e) => setName(e.target.value)
  } 
      />
    < input
  type = "file"
  onChange = {(e) => setFile(e.target.files?.[0] || null)
} 
      />
  < button type = "submit" > Upload </button>
    < p > { message } </p>
    </form>
  );
}
}*/