import { NavbarInternoAdmin } from "@/components/NavbarInternoAdmin";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import AcessoNegado from "@/components/AcessoNegado";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()


    if (session?.user?.role != 'admin') {
        return <AcessoNegado />
    }
    else {
        return (


            <>
                <NavbarInternoAdmin />
                {children}

            </>

        );
    }


}
