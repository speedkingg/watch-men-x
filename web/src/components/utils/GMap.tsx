import { Box } from "@chakra-ui/react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { ULoader } from "./Uloader";

const containerStyle = {
  height: "100%",
  width: "100%",
};

export interface Location {
  lat: number;
  lng: number;
  text?: string;
  color?: string;
}

export default function GMap({
  locations,
  center,
  zoom = 13,
  onMarckerClick = (e) => {
    console.log(e.latLng.lng(), e.latLng.lat());
  },
}: {
  locations: Location[];
  center: Location;
  zoom?: number;
  onMarckerClick?: (e: any) => void;
}) {
  if (isNaN(center.lat) || isNaN(center.lng)) return <ULoader />;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {locations.map((location: Location, index: number) => (
        <div key={index}>
          {location.text ? (
            <InfoWindowF
              position={location}
              anchor={undefined}
              onLoad={() => import("../../css/map.css")}
            >
              <Box
                onClick={() =>
                  onMarckerClick({
                    latLng: {
                      lat: () => location.lat,
                      lng: () => location.lng,
                    },
                  })
                }
                cursor="pointer"
                color="blackAlpha.900"
                bgColor={
                  location.color ? `${location.color}.200` : "whiteAlpha.800"
                }
                fontSize={20}
                p={1}
              >
                {location.text}
              </Box>
            </InfoWindowF>
          ) : (
            <MarkerF position={location} onClick={onMarckerClick} />
          )}
        </div>
      ))}
    </GoogleMap>
  );
}
