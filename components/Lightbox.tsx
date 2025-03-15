import LightboxComponent, {
  LightboxExternalProps,
} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const Lightbox = (props: LightboxExternalProps) => {
  return <LightboxComponent {...props} />;
};
