import { useRouter } from "next/router";
import { useCallback } from "react";

export function UseRouteToPage(path: string, shallow = false) {
  const router = useRouter();

  return useCallback(() => {
    router.push(path, undefined, { shallow });
  }, [router, path, shallow]);
}
