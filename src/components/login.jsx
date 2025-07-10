export default function Login({setLogueadoUser, setLogueadoAdmin, user, admin}) {

  return(
      <div>
          <button onClick={setLogueadoUser}>{user ? "Cerrar sesion" : "Iniciar sesion"}</button>
          <button onClick={setLogueadoAdmin}>{admin ? "Cerrar sesion Admin" : "Iniciar sesion Admin"}</button>
      </div>
  )
}