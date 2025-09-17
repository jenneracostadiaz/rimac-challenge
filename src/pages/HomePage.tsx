import { useUser } from '../services/userService'
import './HomePage.scss'

function HomePage() {
  const { data, isLoading, isError } = useUser()

  if (isLoading) return <p>Cargando usuario...</p>
  if (isError) return <p>Error cargando usuario</p>

  const getAge = data?.birthDay
    ? Math.floor((Date.now() - new Date(data.birthDay).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    : 'N/A'

  return (
    <div className="home">
      <h1 className="home__title">Bienvenido, {data?.name}</h1>
      <p className="home__text">Edad: {getAge}</p>
    </div>
  )
}

export default HomePage
