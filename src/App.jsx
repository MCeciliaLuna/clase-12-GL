function App () {
  let abortController

  fetchData()

  const fetchData = async () => {
    abortController = new AbortController()

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: abortController.signal
      })

      if (!response.ok) {
        console.log('Error al realizar la solicitud')
        return
      }

      setData(response)
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message)
      setError('Error al cargar los datos. Por favor, intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <div>
          {error ? (
            <p>{error}</p>
          ) : (
            <div>
              <h1>Publicaciones:</h1>
              <ul>
                {data.map(post => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App