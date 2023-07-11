const titles = [
  "How Do I Get Started?",
  "How do i upload an image for detection",
  "How do i get my results?",
  "What is your policy on data and privacy?",
];

const data = [
  "Get started by clicking on the sign up button that re directs you to the registration form where you enter your user Information and then press on the register button. After that you can use these credentials to login in into the GDS to carry out glaucoma tests.",

  "After signing in the user taken to the detect screen and to upload an image, the user can either clickig on the choose icon which has a label or you can drag a glaucoma image into the interface. The image is then uploaded by clicking on the upload icon.",

  "After the diagnosis and detection, the detection results are returned in the results screen for the user to view. These are clickable in oder to show a detailed display of the results.",
  "asdasdfadsfasdfasd",
].map((answer, idx) => ({
  title: titles[idx],
  content: answer,
}));

export { data };
