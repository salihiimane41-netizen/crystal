export default function Link({ href, children, ...props }) {
  const target =
    typeof href === "string" && href.startsWith("/") ? `#${href}` : href;
  return (
    <a href={target} {...props}>
      {children}
    </a>
  );
}
