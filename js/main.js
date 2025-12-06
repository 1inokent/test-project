import { fetchCourses } from "./api.js";

let offset = 6;
const LIMIT = 6;

async function load() {
    const cards = await fetchCourses(LIMIT, offset);
}

load()