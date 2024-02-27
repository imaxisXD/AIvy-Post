// "use client";
// import { useMutation } from "convex/react";
// import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
// import "@xixixao/uploadstuff/react/styles.css";
// import { api } from "../convex/_generated/api";
// import { useState } from "react";

// export default function Uploadbox() {
//   const [progress, setProgress] = useState(0);
//   const generateUploadUrl = useMutation(api.files.generateUploadUrl);
//   const saveStorageId = useMutation(api.files.saveStorageIds);
//   const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
//     const url = await saveStorageId({
//       email: "sunny@y.com",
//       uploaded: uploaded.map(({ response }) => ({
//         storageId: (response as any).storageId,
//       })),
//     });
//     console.log("URL--->", url);
//   };

//   return (
//     <>
//       <UploadDropzone
//         className={(state) =>
//           "flex flex-col items-center justify-center gap-3 border border-dashed p-5 rounded-lg border-orange-project/50 hover:bg-orange-project/10 hover:border-orange-project/90 cursor-pointer duration-150 "
//         }
//         onUploadProgress={(progress) => {
//           setProgress(progress);
//         }}
//         subtitle="Supported file .pdf and .json"
//         uploadUrl={generateUploadUrl}
//         fileTypes={{
//           "application/json": [".json"],
//           "application/pdf": [".pdf"],
//         }}
//         multiple={true}
//         onUploadComplete={saveAfterUpload}
//         onUploadError={(error: unknown) => {
//           alert(`ERROR! ${error}`);
//         }}
//       />

//       <div
//         style={{
//           height: "20px",
//           width: `${progress}%`,
//           backgroundColor: "blue",
//         }}
//       />
//     </>
//   );
// }
