import Tokens from "csrf";

export const logLevel = "info";
export const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
export const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
// export const cloudName = "";
// export const uploadPreset = "";

export const tokens = new Tokens();
export const secret = tokens.secretSync();

// Uncomment these lines to generate a secret
// const token = tokens.create(secret);
// console.log({ secret, token });

// export const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendURL = "http://localhost:8000";
// export const backendURL = "127.0.0.1:8000";
