const titles = [
  "Catch this silent thief of sight before you lose vision.?",
  "Taking steroid medication? Talk with your eye doctor.",
  "Eat well to see well.",
  "Exercise regularly but carefully.",
  "Protect your eyes from sunlight.",
];

const data = [
  "If you are at risk for glaucoma, you should see your ophthalmologist regularly for eye exams. They can find the disease in its early stage then watch and treat it.",
  "Taking steroids for long periods of time or in high doses can raise your eye pressure, especially if you have glaucoma. Steroids that you take by mouth or use around your eyes are the most likely to raise eye pressure. Always tell your eye doctor if you are taking any kind of steroids.",
  "Eat plenty of leafy green vegetables and colored fruits, berries and vegetables every day. They contain vitamins and minerals that protect your body and eyes. In fact, studies show that eye-healthy foods are better than vitamins at preventing glaucoma.",
  "Intense exercise that raises your heart rate can also raise your eye pressure. But brisk walking and regular exercise at a moderate pace can lower eye pressure and improve your overall health. If you lift heavy weights, have a qualified trainer show you how to breathe properly during this exercise.",
  "Eye injuries can lead to glaucoma. Always wear protective eyewear during sports or while working on your home and in your yard.",
].map((answer, idx) => ({
  title: titles[idx],
  content: answer,
}));

export { data };
