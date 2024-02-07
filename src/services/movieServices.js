export const getAllMovies = () => {
    return fetch(`http://localhost:8088/movies`).then((res) => res.json())
}