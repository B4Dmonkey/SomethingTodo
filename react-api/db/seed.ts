import { create } from "./crud";

export default async () => {
  const theShuffle = [
    "Let it rain",
    "Clear it out",
    "Get it",
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
