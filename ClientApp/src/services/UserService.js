import Group from "../models/Group";
import AuthService from "./AuthService";


export const addUser = async (uid) => {
    let res = await fetch('user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: uid })
    })
    res = await res.json();
    console.log(res);
    return res;
} 


export const getUser = async (uid) => {
    try {
        let res = await fetch(`/user/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                }
            
        })
        //console.log("GetUser Response: ", res);
        let data = await res.json();
        //console.log("GetUser Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const getUserLayers = async (uid) => {
    try {
        let res = await fetch(`/group/layers/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                }
            
        })
        //console.log("GetUser Response: ", res);
        let data = await res.json();
        //console.log("GetUser Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const getUserGroups = async (uid, isGeometries) => {
    try {
        let res = await fetch(`/group?userId=${uid}&isgeometries=${isGeometries}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                }
            
        })
        //console.log("GetUserGroups Response: ", res);
        let data = await res.json();
        //console.log("GetUserGroups Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const addGroup = async (group) => {
    group.userId = AuthService.auth.currentUser.uid;
    try {
        let res = await fetch(`/group/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(group)
        })
        //console.log("AddGroup Response: ", res);
        let data = await res.json();
        //console.log("AddGroup Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateGroup = async (group) => {
    group.userId = AuthService.auth.currentUser.uid;
    try {
        let res = await fetch(`/group/update/${group.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(group)
        })
        //console.log("AddGroup Response: ", res);
        let data = await res.json();
        //console.log("AddGroup Response: ", data);
        return data;
    }catch (error) {
        console.log(error);
    }
};


export const deleteGroup = async (id) => {
    try {

        let res = await fetch(`/group/` + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
        })
        //console.log("Delete Response: ", res);
        let data = await res.json();
        //console.log("Delete Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const addLayer = async (layer) => {
    try {
        console.log("Body:", JSON.stringify({
            userId: AuthService.auth.currentUser.uid,
            groupSetDto:layer
        }));
        let res = await fetch(`/layer/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                userId: AuthService.auth.currentUser.uid,
                groupSetDto:layer
            })
        })
        //console.log("AddLayer Response: ", res);
        let data = await res.json();
        //console.log("AddLayer Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const addGeometry = async (geometryInfo) => {
    geometryInfo.userId = AuthService.auth.currentUser.uid;
    console.log("GeometryInfo: ", geometryInfo);
    try{
        let res = await fetch(`/geometry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(geometryInfo)

        });
        return await res.json();
    }catch(error){
        console.log(error);
    }

    
};




export const updateGeometry = async (geometryInfo) => {
    geometryInfo.userId = AuthService.auth.currentUser.uid;
    try{
        let res = await fetch(`/geometry/${geometryInfo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(geometryInfo)

        });
        return await res.json();
    }catch(error){
        console.log(error);
    }
}


export const deleteGeometry = async (id) => {
    try {

        let res = await fetch(`/geometry/` + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                },
        })
        //console.log("Delete Response: ", res);
        let data = await res.json();
        //console.log("Delete Response: ", data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default {addUser, getUser, getUserLayers, getUserGroups, addGeometry, updateGeometry, deleteGeometry, addGroup, addLayer, deleteGroup, updateGroup};