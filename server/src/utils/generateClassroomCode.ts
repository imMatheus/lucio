/**
 * @return {string} class link - a random generated string of 7 characters, example 'djA1k81'
 */

export const generateClassroomCode = (LINK_LENGTH = 7): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const characters = alphabet + upperCaseAlphabet + numbers; // combine all of them into one string

  let link = '';

  for (let i = 0; i < LINK_LENGTH; i++) {
    const n = Math.floor(Math.random() * characters.length);
    link += characters[n];
  }

  return link;
};
