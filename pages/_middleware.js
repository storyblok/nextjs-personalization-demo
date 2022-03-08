import { NextResponse } from "next/server";

export async function middleware(req) {
  let res = NextResponse.next();
  const user_type = req.cookies["user_type"] || "";
  let personalized_paths = [];
  let personalized_data = {};
  let no_cache = false;

  // Fetching the personalized paths data
  try {
    const personalized_data_res = await fetch(
      `${req.nextUrl.origin}/personalized-paths.json`
    );
    personalized_data = await personalized_data_res.json();
    personalized_paths = Object.keys(personalized_data)
      .map((p) => personalized_data[p])
      .flat();
  } catch (e) {
    console.log(e);
  }

  // Special actions in case it's the catalog or a personalized path
  if (req.nextUrl.pathname.includes("catalog")) {
    const catalogs = ["/catalog/sportswear", "/catalog/elegant"];
    if (!req.cookies["user_type"] && catalogs.includes(req.nextUrl.pathname)) {
      res.cookie("user_type", req.nextUrl.pathname.replace("/catalog/", ""));
    } else {
      no_cache = true;
    }
  } else if (user_type) {
    const personalized_path = `${req.nextUrl.pathname}-pers-${user_type}`;
    if (personalized_paths.includes(personalized_path)) {
      res = NextResponse.rewrite(`${req.nextUrl.origin}${personalized_path}`);
    } else {
      no_cache = true;
    }
  } else if (Object.keys(personalized_data).includes(req.nextUrl.pathname)) {
    no_cache = true;
  }

  if (no_cache) {
    res.headers.set("x-middleware-cache", "no-cache");
  }

  return res;
}
