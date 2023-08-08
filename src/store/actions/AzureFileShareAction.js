import axios from "axios";
import CryptoJS from "crypto-js";

export const uploadFileToAzureShare = async (file) => {
  // Set your Azure details here
  const storageAccountName = "aacstrdev";
  const fileShareName = "awm";
  const apiVersion = "2020-08-04";
  const storageAccountKey =
    "Vhvf7Uy8TgoLVIyY5HYbyMNUr4JPmxFiGY/VIfa7yyhZZ6+NosSA6eUBz3nDknU2pqlunMVKAMdX+ASt/QOLmw=="; // Replace with your actual storage account key

  // Construct the request URL
  const url = `https://${storageAccountName}.file.core.windows.net/${fileShareName}/${encodeURIComponent(
    file.name
  )}`;

  // Construct headers
  const currentDate = new Date().toUTCString();
  const contentLength = file.size;
  const contentType = file.type;

  const stringToSign = `PUT\n\n${contentLength}\n\n${contentType}\n\n\n\n\n\n\nx-ms-date:${currentDate}\nx-ms-version:${apiVersion}\n/${storageAccountName}/${fileShareName}/${encodeURIComponent(
    file.name
  )}`;

  // Calculate the signature using crypto-js
  const signature = CryptoJS.HmacSHA256(
    stringToSign,
    CryptoJS.enc.Base64.parse(storageAccountKey)
  ).toString(CryptoJS.enc.Base64);

  const headers = {
    "x-ms-version": apiVersion,
    Authorization: `SharedKey ${storageAccountName}:${signature}`,
    "x-ms-date": currentDate,
    "Content-Length": contentLength,
    "Content-Type": contentType,
    // ... other headers ...
  };

  // Make the PUT request using axios
  try {
    const response = await axios.put(url, file, {
      headers: headers,
    });

    if (response.status === 201) {
      return "File uploaded successfully.";
    } else {
      throw new Error("File upload failed.");
    }
  } catch (error) {
    throw new Error("File upload failed: " + error.message);
  }
};
