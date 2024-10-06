export function validateHexHash(hash) {
  if (typeof hash !== 'string') {
    return false;
  }

  // Check if the hash contains only hexadecimal and has a length of 64 characters
  const hexRegex = /^([A-Fa-f0-9]{64})$/;
  return hexRegex.test(hash);
}
