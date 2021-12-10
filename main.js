import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Image from 'ol/layer/Image';
import OSM from 'ol/source/OSM';
import ImageWMS from 'ol/source/ImageWMS';
import ImageArcGISRest from 'ol/source/ImageArcGISRest';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';

var format = 'image/png';

var imagery = new XYZ({
  url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  attributions: "Tiles Imagery ESRI"
})

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      //source: new OSM()
      source: imagery
    })
  ],
  view: new View({
    center: fromLonLat([110.49626,-7.34230]),
    zoom: 12
  })
});

var wms_source = new ImageWMS({
  ratio: 1,
  url: 'http://localhost:8080/geoserver/salatiga/wms',
  params: {
    'FORMAT': format,
           'VERSION': '1.1.1',  
        "STYLES": '',
        "LAYERS": 'salatiga:administrasidesa_ar_25k',
        "exceptions": 'application/vnd.ogc.se_inimage',
  }
})

const adminLayer = new Image({
  source: wms_source,
  visible: false
})

const jalan_source = new ImageWMS({
  ratio: 1,
  url: 'http://localhost:8080/geoserver/salatiga/wms',
  params: {'FORMAT': format,
           'VERSION': '1.1.1',  
        "STYLES": '',
        "LAYERS": 'salatiga:JALAN_LN_25K',
        "exceptions": 'application/vnd.ogc.se_inimage',
  }
})

const jalanLayer = new Image({
  source: jalan_source
})

const pesantren_source = new ImageWMS({
  ratio: 1,
  url: 'http://demakkab.ina-sdi.or.id:8080/geoserver/Dinkominfo/wms',
  params: {'FORMAT': format,
           'VERSION': '1.1.1',  
        "STYLES": '',
        "LAYERS": 'Dinkominfo:ponpes_pt_332120190722102301',
        "exceptions": 'application/vnd.ogc.se_inimage',
  }
})

const pesantrenLayer = new Image({
  source: pesantren_source
})


map.addLayer(adminLayer)
map.addLayer(jalanLayer)
map.addLayer(pesantrenLayer)


const analisa_bmkg_source = new ImageArcGISRest({
  url: 'https://gis.bmkg.go.id/arcgis/rest/services/Analisis_curah_hujan/Analisis_curah_hujan_Februari2017/MapServer',
})

const analisaLayer = new Image({
  source: analisa_bmkg_source,
  visible: false
})

map.addLayer(analisaLayer)


const jalan_big_source = new ImageArcGISRest({
  url: 'https://geoservices.big.go.id/rbi/rest/services/TRANSPORTASI/Jalan_250K/MapServer',
})

const jalanBigLayer = new Image({
  source: jalan_big_source
})

map.addLayer(jalanBigLayer)
