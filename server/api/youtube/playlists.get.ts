// /server/api/youtube/playlists.get.ts
export default defineEventHandler(async (event) => {
  event.node.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  const { youtubeApiKey, youtubeChannelId } = useRuntimeConfig()
  const { pageToken, ts } = getQuery(event) as any // ts chỉ để bust cache

  return await $fetch('https://www.googleapis.com/youtube/v3/playlists', {
    params: {
      part: 'snippet,contentDetails', // có itemCount
      channelId: youtubeChannelId,
      maxResults: 50,
      key: youtubeApiKey,
      ...(pageToken ? { pageToken } : {}),
      _ : ts ?? Date.now() // cache-bust phía Google/proxy
    }
  })
}
)
