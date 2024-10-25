'use client'
import { signOut } from "next-auth/react"

export default function InicioAvaliadorInterno() {

    return(

        <>
        <h1>Página do avaliador</h1>
        <button onClick={() => signOut({redirectTo: '/login'})}>Sign Out</button>
        </>
    )
}