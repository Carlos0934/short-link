function extractPathFromUrl(url: string) {
  return url.split("/").at(-1);
}

export default extractPathFromUrl;
