import { create } from "./crud";

export default async () => {
  const theShuffle = [
    "Right",
    "Right",
    "Right",
    "Left",
    "Left",
    "Left",
    "Kick",
    "Kick",
    "Kick",
    "Walk it by yourself",
    "Walk it by yourself",
    // "To the right, to the right, to the right, to the right",
    // "To the left, to the left, to the left, to the left",
    // "Now kick, now kick, now kick, now kick",
    // "Now walk it by yourself, now walk it by yourself",
  ];

  for (const steps of theShuffle) {
    await create({
      title: steps,
    });
  }
}; 
