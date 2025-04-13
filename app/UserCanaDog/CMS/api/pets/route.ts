import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { headers } from "next/headers"
import { gzipSync } from 'zlib';

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
            let fin = result.data.result.recordset.Length >= 3 ? 3 :  result.data.result.recordset.Length
            let resultPet = []
            for(let i = 0; i < fin;  i++){
                let animal : any = {
                    id: result.data.result.recordset[0].id,
                    shortDescription: result.data.result.recordset[0].shortDescription,
                    longDescription: result.data.result.recordset[0].longDescription,
                    title: result.data.result.recordset[0].title,
                    old:result.data.result.recordset[0].old,
                    ANIMALS_TYPE:result.data.result.recordset[0].ANIMALS_TYPE,
                    ANIMALS_USER:result.data.result.recordset[0].ANIMALS_USER,
                    ANIMALS_DATE:result.data.result.recordset[0].ANIMALS_DATE,
                    ANIMALS_ENABLE:result.data.result.recordset[0].ANIMALS_ENABLE,
                    Image:[{image: result.data.result.recordset[0].image},
                        {image: result.data.result.recordset[0].image2},
                        {image: result.data.result.recordset[0].image3}, 
                        {image: result.data.result.recordset[0].image4}, 
                        {image:result.data.result.recordset[0].image5}]
                }
                resultPet.push(animal)
            }
        }else{
            resultPet =  result.data.result
        }
        console.log("Tamaño JSON:", JSON.stringify(resultPet).length);

        const json = JSON.stringify({ mensaje: 'OK', resultPet });
        const compressed = gzipSync(json);
        return new NextResponse(compressed, {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Content-Encoding': 'gzip',
              'Content-Length': compressed.length.toString(),
            },
          });
          
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