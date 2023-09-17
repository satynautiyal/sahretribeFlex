import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'central-singapore',
    predictionPlace: {
      address: 'Central Singapore',
      bounds: new LatLngBounds(
        new LatLng(1.41135397, 103.89581744),
        new LatLng(1.17678412, 103.73472829)
      ),
      origin: new LatLng(1.3521, 103.8198),
    },
  },
  {
    id: 'east-singapore',
    predictionPlace: {
      address: 'East Singapore',
      bounds: new LatLngBounds(
        new LatLng(1.48059273, 104.08136344),
        new LatLng(1.24602945, 103.89495258)
      ),
      origin: new LatLng(1.3521, 103.8198),
    },
  },
  {
    id: 'west-singapore',
    predictionPlace: {
      address: 'West Singapore',
      bounds: new LatLngBounds(
        new LatLng(1.45605703, 103.7867186),
        new LatLng(1.22149138, 103.60030774)
      ),
      origin: new LatLng(1.3521, 103.8198),
    },
  },
  {
    id: 'north-singapore',
    predictionPlace: {
      address: 'North Singapore',
      bounds: new LatLngBounds(
        new LatLng(1.50522621, 103.867882),
        new LatLng(1.36028245, 103.75268972)
      ),
      origin: new LatLng(1.3521, 103.8198),
    },
  },
];
