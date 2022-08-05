function d2card(datum) {
    let profilepic = ""
    if(datum.attributes.profilepic.data === null){
        profilepic = null
    }else{
        profilepic = `http://localhost:1337${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}`
    }
    // datum.profilepic.length > 0
    // if(check === false){
    //     // profilepic = `https://dash.cs.uh.edu${datum.profilepic[0].formats.thumbnail.url}`
    //     // profilepic = `http://localhost:1337${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}`
    // }
    // else{
    //     profilepic = null
    // }
    return {
        id: datum.id,
        name: datum.attributes.name,
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