import GeometryModel from './Geometry';
import { Feature } from 'ol';
import { Point as PointOL} from 'ol/geom';
import { Style, Icon } from 'ol/style'; 





class Point extends GeometryModel {
    constructor(point) {

        if (!point) {
            super(null, "Point", null, null, null);
            this.coordinates = [];
            return;
        }
        
        super(point.id, "Point", point.name, point.parentId, point.description);
        this.coordinates = [point.point];

        let elementCoord = null
        if (point.point) {
            elementCoord = [this.coordinates[0].x, this.coordinates[0].y]
        }else{
            elementCoord = [0,0]
        }

        this.mapElement = new Feature({
            geometry: new PointOL(elementCoord),
            parentId: this.parentId,
            name: this.name,
            description: this.description,
            id: this.id,
        });
        
        

        this.mapElement.setStyle(this.getBlueStyle());
    }


    setParent = (parent) => {
        this.parent = parent;
        this.parent.layer.mapElement.getSource().addFeature(this.mapElement);
    };


    selectElement = () => {
        this.mapElement.setStyle(this.getRedStyle())
    }

    unSelectElement = () => {
        this.mapElement.setStyle(this.getBlueStyle())
    }

    showElement = () => {
        this.isShow = true;
        this.mapElement.setStyle(this.getBlueStyle())
    }

    hideElement = () => {
        this.isShow = false;
        this.mapElement.setStyle(new Style({
            image: null
        }))
    }

    changeCoordinates = (coordinates) => {
        this.coordinates = coordinates
        this.mapElement.getGeometry().setCoordinates([this.coordinates[0].x, this.coordinates[0].y]);
    }

    getBlueStyle = () => {
        return new Style({
            image: new Icon({
              src: "images/icons8-location-100-blue.png",
              scale: 0.3,
            }),
          });
    };

    getRedStyle = () => {
        return new Style({
            image: new Icon({
              src: "images/icons8-location-100-red.png",
              scale: 0.3,
            }),
          });
    };


}

export default Point;