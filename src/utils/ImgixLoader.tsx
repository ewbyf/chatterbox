export const imgixLoader = ({ src, width, quality } : {src: any, width: any, quality?: any}) => {
    const url = new URL("https://chatterbox.imgix.net" + src);
    const params = url.searchParams;
    params.set("auto", params.getAll("auto").join(",") || "format");
    params.set("fit", params.get("fit") || "max");
    params.set("w", params.get("w") || width.toString());
    if (quality) {
      params.set("q", quality.toString());
    }
    return url.href;
};