import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {

    const data = await request.json()
    console.log(data.data)
    try 
    {

        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        const result = await axios.post(`${process.env.HOST_API}/Api/Gora/CMS/Pets`,data,
        {   
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return NextResponse.json({mensaje: "Procesado correctamente", data: result.data.result})
        
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({mensaje: "Error interno", data: err})
    }

}

export async function PATCH(request: NextRequest) {
    
    const data = await request.json()
  
    try 
    {

        console.log(data)
        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        const result = await axios.patch(`${process.env.HOST_API}/Api/Gora/CMS/Pets`,data,
        {   
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return NextResponse.json({mensaje: "Procesado correctamente", data: result.data.result}, { status: 200 })
          
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({mensaje: "Error interno", data: err}, { status: 500 })
    }

}