"use client"
import React from "react"
import { Image } from "@nextui-org/react"

export default function Donations() {
    return(
        <div>
            <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <div className="text-center">
                            <span className="filter drop-shadow-[0_0_0.2rem_#f82e03] inline-block">
                                <Image alt="lovePets" src="/avatarGora.png" height="70" width="70"/>
                            </span> 
                            <h2 className="mt-4 text-3xl font-bold text-blackGora sm:text-4xl xl:text-5xl">Escoge tu forma de ayudar</h2>
                            <p className="mt-4 text-xl font-normal text-blackGora sm:text-lg xl:text-xl">Tenemos debito automático mensual con el valor que selecciones, para que seas parte de este sueño</p>
                        </div>

                        <div className="relative mt-10 md:mt-24 md:order-2">
                            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                                <div 
                                    className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter" 
                                    style={{ 
                                        background: 'linear-gradient(90deg, #df6536 -0.55%, #f5e8d5 22.86%, #699c83 48.36%, #edbbab 73.33%, #eaad29 99.34%)'
                                    }}>
                                </div>
                            </div>

                            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                                <div className="flex flex-col overflow-hidden shadow-xl rounded-2xl">
                                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                        <div className="flex-1">
                                            <div className="flex items-center mt-8">
                                                <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="" alt=""/>
                                            </div>

                                            <blockquote className="flex-1 mt-8">
                                                <p className="text-lg leading-relaxed text-gray-900">“Este valor cubre todos los gastos mensuales de un peludo: <br/> COMIDA, SNACKS, DESPARASITANTES, VACUNAS E HIGIENE”</p>
                                            </blockquote>
                                        </div>

                                        {/* <div className="flex items-center mt-8">
                                            <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" alt="" />
                                            <div className="ml-4">
                                                <p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                                                <p className="mt-0.5 text-sm font-pj text-gray-600">Freelance React Developer</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="flex flex-col overflow-hidden shadow-xl rounded-2xl">
                                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                        <div className="flex-1">
                                            <div className="flex items-center mt-8">
                                                <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="" alt=""/>
                                            </div>

                                            <blockquote className="flex-1 mt-8">
                                                <p className="text-lg leading-relaxed text-gray-900 font-pj">“Gracias a tu donación, un peludo rescatado de las calles nunca más sentirá hambre ¡Todos los días tendrá su plato lleno!”</p>
                                            </blockquote>
                                        </div>

                                        {/* <div className="flex items-center mt-8">
                                            <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png" alt="" />
                                            <div className="ml-4">
                                                <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                                                <p className="mt-0.5 text-sm font-pj text-gray-600">Digital Marketer</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="flex flex-col overflow-hidden shadow-xl rounded-2xl">
                                    <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
                                        <div className="flex-1">
                                            <div className="flex items-center mt-8">
                                                <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="" alt=""/>
                                            </div>

                                            <blockquote className="flex-1 mt-8">
                                                <p className="text-lg leading-relaxed text-gray-900 font-pj">“Cada aporte suma y con cada granito de arena podremos construir un mundo mejor para ellos.”</p>
                                            </blockquote>
                                        </div>

                                        {/* <div className="flex items-center mt-8">
                                            <Image className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png" alt="" />
                                            <div className="ml-4">
                                                <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                                                <p className="mt-0.5 text-sm font-pj text-gray-600">Graphic Designer</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <section className="py-8 mb-10">
                <div className="text-center py-8 max-w-6xl mx-auto">
                    <h2 className="mt-4 text-3xl font-bold text-blackGora sm:text-4xl xl:text-5xl">Gracias padrinos</h2>
                    <p className="mt-4 text-xl font-normal text-blackGora sm:text-lg xl:text-xl">
                        ¡Su ayuda es TODO para nosotros y para ellos!<br/>
                        Gracias padrinos y madrinas de rescate, ellos tendrán lo necesario para empezar una vida feliz.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
                    {/* Card 1 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/1/avatar-female-2.png"
                        alt="Jennifer"
                    />
                    <p className="text-sm font-bold">@jennifer.a</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-3.png"
                        alt="James"
                    />
                    <p className="text-sm font-bold">@jamescron</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-1.png"
                        alt="Alexa"
                    />
                    <p className="text-sm font-bold">@alexaborn</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-2 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
                        alt="Cameron"
                    />
                    <p className="text-sm font-bold">@camerondi</p>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
                        alt="Martina"
                    />
                    <p className="text-sm font-bold">@martina</p>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
                        alt="Christina"
                    />
                    <p className="text-sm font-bold">@christin.jamescron</p>
                    </div>

                    {/* Card 7 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-3.png"
                        alt="James"
                    />
                    <p className="text-sm font-bold">@jamescron</p>
                    </div>

                    {/* Card 8 */}
                    <div className="bg-white text-blackGora p-6 rounded-full flex items-center space-x-4 shadow-lg border-2 border-redGora hover:border-2 hover:border-pinkGora lg:translate-x-8">
                    <Image
                        className="w-12 h-12 rounded-full"
                        src="https://cdn.rareblocks.xyz/collection/bakerstreet/images/testimonials/5/member-1.png"
                        alt="Alexa"
                    />
                    <p className="text-sm font-bold">@alexaborn</p>
                    </div>
                </div>
            </section>
        </div> 
    )
}