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

        const result = await axios.post(`${process.env.HOST_API}/Api/Gora/CMS/Products`,data,
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

        const result = await axios.patch(`${process.env.HOST_API}/Api/Gora/CMS/Products`,data,
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

export async function GET(request: NextRequest) 
{
    try 
    {

        const params = {PRODUCTS_ENABLE:1, PRODUCTS_WEB: "CANADOG"}
        const { data: { token } } = await axios.get(`${process.env.HOST_API}/Api/Gora/TokenGora`, {
            headers: {
                "x-api-key":<string>process.env.API_KEY
            }
        })

        const result = await axios.get(`${process.env.HOST_API}/Api/Gora/CMS/Products`,
        {   params:params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let resultProduct  = []
        let init = result.data.result.recordset.length >= 6 ? 6 :  0
        console.log(init)
        for(let i = init; i < result.data.result.recordset.length;  i++)
        {
            resultProduct.push(result.data.result.recordset[i])
        }
        console.log(resultProduct.length)
        console.log("Tamaño JSON:", JSON.stringify(resultProduct).length);

        const json = JSON.stringify({ mensaje: 'OK', resultProduct });
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