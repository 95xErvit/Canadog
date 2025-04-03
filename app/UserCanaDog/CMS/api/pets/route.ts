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

export async function GET(request: NextRequest) {
    
    const rawParams = request.url.split('?')[1]
    console.log(rawParams.split('=')[1])

    const type = rawParams.split('=')[1]
    try 
    {

        const params = {Type: type, Enable:1, Web: "CANADOG"}
        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        const result = await axios.get(`${process.env.HOST_API}/Api/Gora/CMS/Pets`,
        {   
            params:params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let resultPet : any = null
        if(type === "Dog"){
            resultPet = result.data.result.recordset.map( (animal : any) =>{ 
                return {
                    id: animal.id,
                    shortDescription: animal.shortDescription,
                    longDescription: animal.longDescription,
                    title: animal.title,
                    old:animal.old,
                    ANIMALS_TYPE:animal.ANIMALS_TYPE,
                    ANIMALS_USER:animal.ANIMALS_USER,
                    ANIMALS_DATE:animal.ANIMALS_DATE,
                    ANIMALS_ENABLE:animal.ANIMALS_ENABLE,
                    Image:[{image: animal.image},{image: animal.image2},{image: animal.image3}, {image: animal.image4}, {image:animal.image5}]
                }
            })
        }else{
            resultPet =  result.data.result
        }

        return NextResponse.json({mensaje: "Procesado correctamente", data: resultPet}, { status: 200 })
          
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({mensaje: "Error interno", data: err}, { status: 500 })
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