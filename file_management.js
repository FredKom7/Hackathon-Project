import { useState, useEffect } from "react";
import { storage, db } from "./firebaseConfig";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    listAll,
} from "firebase/storage";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

const FileManager = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    const fileCollectionRef = collection(db, "files");

    // Upload file to Firebase Storage and save metadata to Firestore
    const handleUpload = async () => {
        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        try {
            // Upload file
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Save metadata to Firestore
            await addDoc(fileCollectionRef, { name: file.name, url: downloadURL });
            alert("File uploaded successfully!");
            fetchFiles();
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    // Fetch files from Firestore
    const fetchFiles = async () => {
        const data = await getDocs(fileCollectionRef);
        setFiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // Delete file from Firebase Storage and Firestore
    const handleDelete = async (fileId, fileName) => {
        const storageRef = ref(storage, `files/${fileName}`);
        try {
            // Delete file from Storage
            await deleteObject(storageRef);
            // Delete file metadata from Firestore
            await deleteDoc(doc(db, "files", fileId));
            alert("File deleted successfully!");
            fetchFiles();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    // Update file metadata in Firestore
    const handleUpdate = async (fileId, newName) => {
        const fileDoc = doc(db, "files", fileId);
        try {
            await updateDoc(fileDoc, { name: newName });
            alert("File updated successfully!");
            fetchFiles();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <h1>File Management Interface</h1>

            {/* File Upload Section */}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            {/* File List Section */}
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                            {file.name}
                        </a>
                        <button onClick={() => handleDelete(file.id, file.name)}>
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                const newName = prompt("Enter new name:");
                                if (newName) handleUpdate(file.id, newName);
                            }}
                        >
                            Update Name
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileManager;
