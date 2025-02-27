import About from "@/app/Components/AboutUs/AboutUs";
import Header from "@/app/Components/Header/Header";
import Footer from "@/app/Components/Footer/Footer";

export default async function HomeGora() {

    return (
        <>
            <Header/>
                <main className="bg-cover bg-center" style={{backgroundImage:'url("")'}}>
                    <About 
                    />
                </main>
            <Footer/>
        </>
    )
}