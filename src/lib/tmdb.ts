export const tmdbFetch = async <T>(url: string, body?: any): Promise<T> => {
  const response = await fetch(`https://api.themoviedb.org/3${url}`, {
      method: 'GET',
      body: body,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.json()
    return data as Promise<T>
}