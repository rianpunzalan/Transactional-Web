import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    // Notice the ? in object_property? this marks it as optional either it has a value or it is 'undefined'
    type objectType = {
        string_property: String,
        number_property: Number,
        object_property?: { inner_obj_property1: String, inner_obj_property2?: String },
        array_property?: Array<String>
    }

    try {
        const object : objectType ={
            string_property: "Single JSON Object",
            number_property: 999,
            object_property: { inner_obj_property1: "inner_property1", inner_obj_property2: "inner_property2" },
            array_property:["index1","index2","index3"]
        }
        return NextResponse.json(object, { status: 200 });
    }
    catch (e) {
        console.error(e);
    }
        
}