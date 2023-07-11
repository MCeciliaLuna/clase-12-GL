import { useEffect, useRef, useState } from "react";

const App = () => {
  const [fetchData, setFetchData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: abortControllerRef.current.signal }
        );
        if (!response.ok) {
          throw new Error(
            "Error al cargar los datos. Por favor, intenta nuevamente"
          );
        }
        const data = await response.json();
        setFetchData(data);
      } catch (error) {
        console.error("ERROR AL REALIZAR LA SOLICITUD", error);
        setError("Error al cargar los datos. Por favor, intenta nuevamente");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunction();
    
   abortControllerRef.current = new AbortController()

  }, []);
  

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Publicaciones:</h1>
      <ul>
        {fetchData.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
