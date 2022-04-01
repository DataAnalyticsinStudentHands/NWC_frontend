function d2card(datum) {
    let profilepic = ""
    if(datum.profilepic.length > 0){
        profilepic = `https://dash.cs.uh.edu${datum.profilepic[0].formats.thumbnail.url}`
    }
    else{
        profilepic = null
    }

    return {
        id: datum.id,
        name: datum.name,
        role: datum.role,
        state: datum.state,
        featured: datum.featured,
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