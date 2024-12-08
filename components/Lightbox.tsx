import Image, { StaticImageData } from "next/image";
import LightboxComponent, {
  isImageFitCover,
  isImageSlide,
  LightboxExternalProps,
  RenderFunction,
  RenderSlideProps,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const Lightbox = (
  props: Omit<LightboxExternalProps, "plugins" | "render">,
) => {
  return (
    <LightboxComponent
      {...props}
      render={{
        slide: NextJsImage as RenderFunction<RenderSlideProps>,
      }}
    />
  );
};

const isNextJsImage = (slide: StaticImageData) => {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
};

const NextJsImage = ({
  slide,
  offset,
  rect,
}: {
  slide: StaticImageData;
  offset: number;
  rect: { width: number; height: number };
}) => {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
};
