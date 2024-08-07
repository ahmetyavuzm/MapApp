import html2canvas from 'html2canvas';


export const checkEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}






const getGeometryById = (userMapInfo, id) => {
    let geometry = userMapInfo.filter((layer) => {
        return layer.group.id ===id;
    });

    if(geometry){
        return geometry.group;
    }else{
        userMapInfo.forEach((layer) => {
            geometry = _getGeometryById(layer.group, id);
        });
    }
    return geometry;
};

const _getGeometryById = (group, id) => {
    let geometry = group.geometries.filter((geom) => {
        return geom.id === id;
    });

    if(geometry){
        return geometry[0];
    }else{
        group.children.forEach((child) => {
            let geom = getGeometryById(child, id);
            if(geom){
                geometry = geom;
                return geometry;
            }
        });
    }
}

export default{ checkEmail};