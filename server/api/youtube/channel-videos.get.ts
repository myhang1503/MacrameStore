// /server/api/youtube/channel-videos.get.ts
export default defineEventHandler(async (event) => {
  event.node.res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )

  const { youtubeApiKey, youtubeChannelId } = useRuntimeConfig()
  const { pageToken } = getQuery(event) as any

  // 1) Lấy uploads playlist id của kênh
  const channelRes: any = await $fetch('https://www.googleapis.com/youtube/v3/channels', {
    params: {
      part: 'contentDetails',
      id: youtubeChannelId,
      key: youtubeApiKey
    }
  })

  const uploadsId =
    channelRes.items?.[0]?.contentDetails?.relatedPlaylists?.uploads || null

  if (!uploadsId) {
    return { videos: [], nextPageToken: null }
  }

  // 2) Lấy video trong uploads playlist
  const listRes: any = await $fetch('https://www.googleapis.com/youtube/v3/playlistItems', {
    params: {
      part: 'snippet,contentDetails',
      playlistId: uploadsId,
      maxResults: 50,
      key: youtubeApiKey,
      ...(pageToken ? { pageToken } : {})
    }
  })

  const items = listRes.items || []
  const ids = items.map((it: any) => it.contentDetails.videoId).join(',')

  // 3) Lấy stats + duration cho từng video
  let statsMap: Record<string, any> = {}
  if (ids) {
    const vids: any = await $fetch('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails,statistics',
        id: ids,
        key: youtubeApiKey
      }
    })

    statsMap = Object.fromEntries(
      (vids.items || []).map((v: any) => [
        v.id,
        {
          duration: v.contentDetails?.duration,
          views: v.statistics?.viewCount
        }
      ])
    )
  }

  // 4) Chuẩn hoá dữ liệu trả về
  const videos = items.map((it: any) => {
    const sn = it.snippet
    const id = it.contentDetails.videoId
    return {
      id,
      title: sn.title,
      description: sn.description,
      publishedAt: sn.publishedAt,
      thumbnail: sn.thumbnails?.maxres?.url || sn.thumbnails?.high?.url,
      stats: statsMap[id] || {}
    }
  })

  return {
    videos,
    nextPageToken: listRes.nextPageToken || null
  }
})
