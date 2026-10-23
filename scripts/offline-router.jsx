import { useMemo, useSyncExternalStore } from "react";

let currentRoute = window.location.hash.startsWith("#/")
  ? window.location.hash.slice(1)
  : "/";

function subscribe(notify) {
  const update = () => {
    if (window.location.hash.startsWith("#/")) {
      currentRoute = window.location.hash.slice(1);
      notify();
    } else if (window.location.hash === "") {
      currentRoute = "/";
      notify();
    }
  };
  window.addEventListener("hashchange", update);
  return () => window.removeEventListener("hashchange", update);
}

function useRoute() {
  return useSyncExternalStore(
    subscribe,
    () => currentRoute,
    () => "/",
  );
}

export function usePathname() {
  return useRoute().split("?")[0];
}

export function useSearchParams() {
  const route = useRoute();
  return useMemo(() => new URLSearchParams(route.split("?")[1] || ""), [route]);
}
