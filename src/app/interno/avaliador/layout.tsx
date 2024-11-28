import { NavbarInternoAvaliador } from "@/components/NavbarInternoAvaliador";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

        return (


            <>
                <NavbarInternoAvaliador />
                {children}

            </>

        );
}
