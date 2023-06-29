import VARIABLES from "../../config/.env.js";
const { fetchBaseUrl } = VARIABLES;

function d2card(datum) {
    let profilepic = ""
    // let profilepic2 = ''
    if(datum.attributes.profilepic.data === null){
        profilepic = null
    }else{
        // profilepic = `https://dash.cs.uh.edu${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}
        profilepic = `${fetchBaseUrl}${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}`

    }
    // datum.profilepic.length > 0
    // if(check === false){
        // profilepic = `https://dash.cs.uh.edu${datum.profilepic[0].formats.thumbnail.url}`
    //     // profilepic = `http://localhost:1337${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}`
    // }
    // else{
    //     profilepic = null
    // }
    return {
        id: datum.id,
        // name: datum.attributes.name,
        firstname: datum.attributes.firstname,
        lastname: datum.attributes.lastname,
        role: datum.attributes.role,
        state: datum.attributes.state,
        featured: datum.attributes.featured,
        profilepic,
    };
};

export function loadcards(data, setState) {
    
    try{
        setState(data?.map(d2card));
        
    } catch(e) {
        console.log(e);
    }
     
}