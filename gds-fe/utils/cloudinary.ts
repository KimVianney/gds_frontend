export const scaleCloudinaryImage = (
  uri: string,
  width: number,
  height: number
): string => {
  const parts = uri.split("/upload");
  return `${parts[0]}/upload/c_scale,h_${height},w_${width}/${parts[1]}`;
};

export const upload = async (
  files: File[],
  cloudName: string,
  uploadPreset: string
): Promise<string[]> => {
  const urls = [];
  const formData = new FormData();
  const fileList = Object.keys(files);

  for (const file of fileList) {
    formData.append("file", files[Number(file)]);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "gds_uploads");
    // This is using an unauthenticated request
    // check https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    const response = (await result.json()) as {
      url: string;
      secure_url: string;
    };
    urls.push(response.secure_url);
  }

  return urls;
};

export const toBase64 = async (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
