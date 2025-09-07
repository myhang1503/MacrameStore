// utils/seo.ts
export function getSeoMeta({
  title,
  description,
  image,
}: {
  title?: string
  description?: string
  image?: string
}) {
  return {
    title: title ? `${title} | My Amazing Site` : 'My Amazing Site',
    description: description ?? 'Website giới thiệu sản phẩm handmade.',
    ogTitle: title,
    ogDescription: description,
    ogImage: image ?? 'https://example.com/default.png',
    twitterCard: 'summary_large_image',
  }
}
