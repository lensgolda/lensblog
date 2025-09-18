import lume from "lume/mod.ts";
import blog from "blog/mod.ts";

const site = lume({
    basePath: Deno.env.get("GH_PAGES") ? "/lensblog" : "",
});

site.use(blog());

export default site;
