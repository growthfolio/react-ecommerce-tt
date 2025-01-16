// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { ChangeEvent } from "react";
// import { storage } from "./firebaseConfig";

// function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (file) {
//       const storageRef = ref(storage, `images/${file.name}`);
//       uploadBytes(storageRef, file)
//         .then((snapshot) => {
//           getDownloadURL(snapshot.ref).then((url) => {
//             setUser((prevState) => ({
//               ...prevState,
//               photo: url, // Atualiza o estado com a URL da imagem
//             }));
//           });
//         })
//         .catch((error) => {
//           console.error("Erro ao fazer upload:", error);
//         });
//     }
//   }
