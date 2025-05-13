// Utility functions extracted from Tina config for unit testing

// itemProps for photo collections
export function collectionItemProps(item: { title?: string }) {
  return { label: item?.title || "Untitled Collection" };
}

// itemProps for gallery photos
export function photoItemProps(item: { image?: string }) {
  if (item?.image) {
    if (typeof item.image === 'string') {
      const parts = item.image.split('/');
      return { label: parts[parts.length - 1] };
    }
    return { label: "Photo" };
  }
  return { label: "Untitled Photo" };
}

// slugify for gallery filenames
export function gallerySlugify(values: { title?: string }) {
  const id = values?.title
    ? values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : "untitled-gallery";
  return id;
} 