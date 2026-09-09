/**
 * Utility function to format and resolve image URLs.
 * 
 * If the provided image path is already a full URL (starts with http/https) or data URI,
 * it returns the original path unchanged.
 * Otherwise, it prepends the backend base URL (`NEXT_PUBLIC_BASEURL`).
 *
 * @param path - Relative path, absolute path, or full URL of the image
 * @param fallback - Optional fallback image URL/path (defaults to "/placeholder.png")
 * @returns Fully formatted image URL string
 */
export const formatImageUrl = (path?: string | null, fallback: string = "/placeholder.png"): string => {
    if (!path) return fallback;

    // Return original if it starts with http://, https://, or data:
    if (/^(https?:\/\/|data:)/i.test(path)) {
        return path;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "";

    // Normalize base URL and path concatenation
    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    return `${cleanBaseUrl}${cleanPath}`;
};

export default formatImageUrl;
