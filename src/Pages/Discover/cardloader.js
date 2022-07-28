function d2card(datum) {
    // console.log('dataum, line 2', datum)
    function isEmpty(object) {
        return Object.keys(object).length === 0;
      }
    
    let check = isEmpty(datum.attributes.profilepic)
    console.log('line8', datum.attributes.profilepic.data)
    // console.log('line9', datum.attributes.profilepic.data.attributes.url)
    
    let profilepic = ""
    // datum.profilepic.length > 0
    if(check === false){
        // profilepic = `https://dash.cs.uh.edu${datum.profilepic[0].formats.thumbnail.url}`
        // profilepic = `http://localhost:1337/api/${datum.attributes.profilepic.data.attributes.formats.thumbnail.url}`
        profilepic=5
        // profilepic = datum.attributes.profilepic.data.attributes.formats.thumbnail.url
        
        console.log('line 16', profilepic)
    }
    else{
        profilepic = null
    }

    return {
        id: datum.attributes.id,
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