/**
 * Formats the url to remove the protocol
 * @param url
 */
function formatUrl(url: string): string {
  return url.replace(/(^\w+:|^)\/\//, "");
}

export default formatUrl;
