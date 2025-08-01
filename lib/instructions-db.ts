// This file stores custom AI instructions. You can add, edit, or remove instructions here.
// Structure: Array of instruction objects with id, text, and optional tuning fields.

export type Instruction = {
  id: string;
  text: string;
  enabled?: boolean;
  [key: string]: any;
};

export const instructions: Instruction[] = [
  {
    id: "default-1",
    text: "Be helpful and concise.",
    enabled: true
  }
];
