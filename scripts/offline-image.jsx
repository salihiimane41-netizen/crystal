export default function Image({
  src,
  fill,
  priority,
  sizes,
  quality,
  placeholder,
  blurDataURL,
  ...props
}) {
  const source = window.__L7_ASSETS__[src] || src;
  return (
    <img
      {...props}
      src={source}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...props.style,
            }
          : props.style
      }
    />
  );
}
