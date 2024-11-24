const express = require("express");
const { bucket, db } = require("../firebase-config");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Upload File
router.post("/upload", async (req, res) => {
  const { fileName, fileData } = req.body;

  if (!fileName || !fileData) {
    return res.status(400).send({ error: "File name and data are required." });
  }

  const blob = bucket.file(`files/${fileName}`);
  const buffer = Buffer.from(fileData, "base64");

  try {
    await blob.save(buffer, { metadata: { contentType: "application/octet-stream" } });
    const url = await blob.getSignedUrl({ action: "read", expires: "03-17-2025" });

    await db.collection("files").add({ name: fileName, url: url[0] });
    return res.status(200).send({ message: "File uploaded successfully.", url: url[0] });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// List Files
router.get("/", async (req, res) => {
  try {
    const filesSnapshot = await db.collection("files").get();
    const files = filesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).send(files);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// Delete File
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const fileRef = db.collection("files").doc(id);
    const fileDoc = await fileRef.get();

    if (!fileDoc.exists) {
      return res.status(404).send({ error: "File not found." });
    }

    const { name } = fileDoc.data();
    await bucket.file(`files/${name}`).delete();
    await fileRef.delete();

    return res.status(200).send({ message: "File deleted successfully." });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
