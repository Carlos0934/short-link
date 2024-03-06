function extractPathFromUrl(url: string) {
  return url.split("/").slice(3).join("/");
}

export default extractPathFromUrl;
