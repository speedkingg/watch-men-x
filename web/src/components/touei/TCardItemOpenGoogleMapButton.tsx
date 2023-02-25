import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { DOMAIN_GMAP } from "../../config/url";

export const TCardItemOpenGoogleMapButton = memo(
  ({ lat, lng }: { lat: string; lng: string }) => {
    return (
      <Button
        onClick={() => window.open(`${DOMAIN_GMAP}?q=${lat},${lng}`)}
        rightIcon={<ExternalLinkIcon />}
        leftIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      >
        Google map
      </Button>
    );
  }
);
