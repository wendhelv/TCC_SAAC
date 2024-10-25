'use client'
import { useSession, signOut} from "next-auth/react"

export default function InicioAdminInterno(){
    const { data: session } = useSession()
    return(
        <>
        <h1>{session?.user?.email}</h1>
        <h1>{session?.user?.role}</h1>
        <button onClick={() => signOut({redirectTo: '/login'})}>Sign Out</button>
        </>
    )
}