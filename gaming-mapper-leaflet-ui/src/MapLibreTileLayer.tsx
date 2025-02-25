import { type LayerProps, createElementObject, createLayerComponent } from '@react-leaflet/core';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';

export interface MapLibreTileLayerProps extends L.LeafletMaplibreGLOptions, LayerProps {
    url: string;
    attribution: string;
    maxZoom: number;
}

const MapLibreTileLayer = createLayerComponent<L.MaplibreGL, MapLibreTileLayerProps>(
    function createLayer({ url, attribution, pane, ...options }, context) {
        const layer = L.maplibreGL({
            style: url
        });

        return createElementObject(layer, context);
    },
    function updateLayer(layer, props, prevProps) {
        const { url, attribution } = props;
        
        if (url && url !== prevProps.url) {
            layer.getMaplibreMap().setStyle(url);
        }

        if (attribution && attribution !== prevProps.attribution) {
            layer.options.attribution = attribution;
        }
    }
);

export default MapLibreTileLayer;
