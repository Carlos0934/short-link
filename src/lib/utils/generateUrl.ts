function generateUrl({
  length,
  baseUrl,
}: {
  length: number;
  baseUrl: string;
}): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `${baseUrl}${result}`;
}

export default generateUrl;
