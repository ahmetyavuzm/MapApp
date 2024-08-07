import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Group from './Group';

export class Layer {
    constructor(group) {
        this.vectorLayer = new VectorLayer({
            source: new VectorSource(),
            id: group.id,
        });

        this.isShow = true;
        

        //It uses vector_layer to store the geometries !!! Initilize after vector_layer
        this.group = new Group(group, this);
    }

    addFeature = (feature) => {
        this.vectorLayer.getSource().addFeature(feature);
    }

    deleteFeature = (feature) => {
        this.vectorLayer.getSource().removeFeature(feature);
    }


}
        
        

export default Layer;