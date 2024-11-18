import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
    
    const data = await request.json()
    console.log(data)
    try {

        if(data.data.Pass === "Gora2024#*")
        {
            return NextResponse.json({mensaje: "Procesado correctamente", data: true}, { status: 200 })
        }
        else{
            return NextResponse.json({mensaje: "Procesado correctamente", data: false}, { status: 200 })
        }
        
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({mensaje: "Error en el procesamiento", data: err}, { status: 400 })
    }
    

}

export async function PATCH(request: NextRequest) {
    
    const data = await request.json()
  
    try 
    {

        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        try {

            const result = await axios.patch(`${process.env.HOST_API}/Api/Gora/CMS/Users`,data,
            {   
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return NextResponse.json({mensaje: "Procesado correctamente", data: result}, { status: 200 })
        }
        catch (err) {
            console.log(err)
            return NextResponse.json({mensaje: "Error en el procesamiento", data: err}, { status: 400 })
        }
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({mensaje: "Error interno", data: err}, { status: 500 })
    }

}