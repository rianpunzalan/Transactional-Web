import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    type objectType = {
        string_property: String,
        number_property: Number,
        object_property?: { inner_obj_property1: String, inner_obj_property2?: String },
        array_property?: Array<String>
    }

    try {
        let object_array: objectType[] = [];
        let object1 : objectType ={
            string_property: "Has simple Properties",
            number_property: 1,
        }

        let object2 : objectType ={
            string_property: "Has property that is an object with its own inner properties",
            number_property: 2,
            object_property: { inner_obj_property1: "inner_property1" }
        }

        let object3 : objectType ={
            string_property: "Same as object2, but has multiple inner properties",
            number_property: 3,
            object_property: { inner_obj_property1: "inner_property1", inner_obj_property2: "inner_property2" }
        }

        let object4 : objectType ={
            string_property: "Has a property that is an array.",
            number_property: 4,
            object_property: { inner_obj_property1: "inner_property1", inner_obj_property2: "inner_property2" },
            array_property:["index1","index2","index3"]
        }
  
        object_array.push(object1);
        object_array.push(object2);
        object_array.push(object3);
        object_array.push(object4);

        return NextResponse.json(object_array, { status: 200 });
    }
    catch (e) {
        console.error(e);
    }
}