import VARIABLES from "../../config/.env";

const {fetchBaseUrl} = VARIABLES;

export function getSafe(data, ...keys) {
    let curr = data;
    keys.forEach(k => {
        if(curr[k] === undefined) return undefined;
        curr = curr[k];
    });
    if(Object.keys(curr).length === 0){
        return undefined;
    }
    return curr;
}

export function media2url(media) {
    const mediaUrl = getSafe(media, "url");
    return [fetchBaseUrl, mediaUrl].join(''); // mediaUrl already comes with the /
}

export function processPage(data, setState) {

    // GRAB TEXTFIELDS
    const stateTextfields = {};
    const textfields = getSafe(data, 0, "TEXTFIELD");
    if(textfields !== undefined) {
        textfields.forEach(tf => {
            stateTextfields[getSafe(tf, "SECTION")] =
                getSafe(tf, "CONTENT");
        })
    }

    // GRAB MEDIA (IMGS, PDFS)
    const stateMedia = {};
    const media = getSafe(data, 0, "MEDIA");
    if(media !== undefined){
        media.forEach(md => {
            stateMedia[getSafe(md, "SECTION")] =
                media2url(getSafe(md, "MEDIA", 0));
        })
    }
    
    setState({
        ...stateTextfields,
        ...stateMedia,
    })
}

export function processPageOld(data, setState, state={}) {
    const newState = {};
    data.forEach(datum => newState[getSafe(datum, "Section")] = getSafe(datum, "Content"));
    setState({
        ...state,
        ...newState,
    });
}