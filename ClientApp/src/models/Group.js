import Geometry from './Geometry';
import { addGroup } from '../services/UserService';

class Group{
    constructor(group, layer) {
        this.layer = layer;
        
        this.id = group.id;
        this.userId = group.userId;
        this.groupId = group.groupId;
        this.properties = group.properties;
        this.createGeometries(group.geometries);
        this.type = group.type;
        
    }

    createGeometries(geometries){
       this.geometries = [];
        for (let geometry of geometries){
            if(geometry){
                
                if(geometry.type.toLowerCase() === "group"){ 
                    this.geometries.push(new Group(geometry, this.layer));
                 }else{
                    
                     this.addGeometry(new Geometry(geometry));
                 }
            }
            
        }
    };

    addGeometry = (geometry) => {
        this.geometries.push(geometry);
        if (this.layer !== null && geometry.feature !== null){
            this.layer.addFeature(geometry.feature);
        }
    }

    deleteGeometry = (geometry) => {
        this.geometries = this.geometries.filter(g => g.id !== geometry.id);
        if(this.layer !== null){
            this.layer.deleteFeature(geometry.feature);
        }
        
    }

    updateGeometry = (geometry) => {
        let index = this.geometries.findIndex(g => g.id === geometry.id);
        this.geometries[index] = geometry;
        if(this.layer !== null){
            this.layer.deleteFeature(geometry.feature);
            this.layer.addFeature(geometry.feature);
        }
    }


    update =(data)=> {
        this.groupId = data.groupId;
        this.properties = data.properties;
    }
}

export default Group;