import Link from "next/link";


export function Footer() {
    return (
        <>
            <footer className="border border-t-orange-100">
                <p className="text-center py-6">© 2024, Desenvolvido por <Link target="_blank" href='https://www.mystdev.com.br/' className="text-orange-100 transition-all duration-500 hover:text-orange-500">Myst1 Dev</Link></p>
            </footer>
        </>
    )
}