"use client"

import { Amplify, type ResourcesConfig } from "aws-amplify"

export const authConfig: ResourcesConfig["Auth"] = {
    Cognito:{
        userPoolId: String("us-east-2_tsfAhsCak"),
        userPoolClientId: String("14q99ffr70mgo9hgis3loaeoac")
    }
}

Amplify.configure(
    {
        Auth: authConfig,
    },
    {
        ssr: true
    }
)

export default function ConfigureAmplifyClientSide(){
    return null
}