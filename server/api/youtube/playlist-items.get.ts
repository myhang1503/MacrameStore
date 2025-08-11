// /server/api/youtube/playlist-items.get.ts
export default defineEventHandler(async (event) => {
  event.node.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  const { youtubeApiKey } = useRuntimeConfig()
  const { playlistId, pageToken, ts } = getQuery(event) as any

  return await $fetch('https://www.googleapis.com/youtube/v3/playlistItems', {
    params: {
      part: 'snippet,contentDetails',
      playlistId,
      maxResults: 50,
      key: youtubeApiKey,
      ...(pageToken ? { pageToken } : {}),
      _ : ts ?? Date.now()
    }
  })
}
)
