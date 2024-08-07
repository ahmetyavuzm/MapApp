import WKT from 'ol/format/WKT.js';
import {Icon, Style} from 'ol/style.js';
import Feature from 'ol/Feature.js';

import {Stroke, Fill} from 'ol/style.js';


const format = new WKT();


export const normal_style = () => {return new Style({
    image: new Icon({
        anchor: [0.5, 1], // 
      src: "images/icons8-location-100-blue.png",
      scale: 0.3,
    }),
    stroke: new Stroke({
      color: "blue",
      width: 2,
      lineCap: "round", // Köşeleri yuvarlak yapar
      lineJoin: "round", // Köşeleri yuvarlak yapar
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)", // Poligon içini hafif şeffaf kırmızı yapar
    }),
});
}

/*
export const normal_style = () => {return new Style({
    image: new Icon({
        anchor: [0.5, 1], // 
      src: "images/icons8-location-100-blue.png",
      scale: 0.3,
    }),
  });
}
  */

export const invisible_style = () => {
    return new Style({
        anchor: [0.5, 1], // 
        image: null
    })
}
export const selected_style = () => {
    return new Style({
        image: new Icon({
            anchor: [0.5, 1], // 
          src: "images/icons8-location-100-red.png",
          scale: 0.3,
        }),
        stroke: new Stroke({
            color: "red",
            width: 2,
            lineCap: "round", // Köşeleri yuvarlak yapar
            lineJoin: "round", // Köşeleri yuvarlak yapar
          }),
          fill: new Fill({
            color: "rgba(255, 0, 0, 0.1)", // Poligon içini hafif şeffaf kırmızı yapar
          }),
      });
}

export const createFeature = (style, geometry) => {
    const feature = new Feature({
        geometry: geometry
    });
    feature.setStyle(style);
    return feature;
};

export class Geometry{

    constructor(geometry) {
        this.id = geometry.id;
        this.userId = geometry.userId;
        this.properties = geometry.properties;
        this.type = geometry.type;
        this.groupId = geometry.groupId;
        this.wkt = geometry.wkt;

        this.feature = this.createFeature(normal_style(), {
            "id": this.id,
            "type": this.type,
            "properties": this.properties,
        });
    }

    createFeature = (style) => {
        const feature = format.readFeature(this.wkt, {
            dataProjection: "EPSG:3857",//'EPSG:4326',
            featureProjection: 'EPSG:3857',
        });
        feature.setProperties({
            "properties": this.properties,
            "id": this.id,
            "type": this.type,
        })
        feature.setStyle(style);
        return feature;
    }


    changeWkt = (wkt) => {
        this.wkt = wkt;
        this.feature = this.createFeature(normal_style());
    }

    selectElement = () => {
        this.feature.setStyle(selected_style())
    }

    unSelectElement = () => {
        this.feature.setStyle(normal_style())
    }

    showElement = () => {
        this.feature.setStyle(normal_style())
    }

    hideElement = () => {
        this.feature.setStyle(invisible_style())
    }


    update = (data) => {
        this.type = data.type;
        this.properties = data.properties;
        this.changeWkt(data.wkt);
        this.groupId = data.groupId;
    }

    
}


export default Geometry;