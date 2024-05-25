import Services from "@/app/models/Services";
import Category from "@/app/models/Category";
import Project from "@/app/models/Project";
import Contact from "@/app/models/Contact";
import ConnectDB from "@/app/db/Connect";
import Header from "@/app/models/Header";
import About from "@/app/models/About";
import Tech from "@/app/models/Tech";

const MODELS = {
  category: Category,
  services: Services,
  services: Services,
  projects: Project,
  contact: Contact,
  header: Header,
  tech: Tech,
  about: About,
};

export async function fetchPageData(page) {
  try {
    await ConnectDB();

    const data = await MODELS[page].find({});

    return data;
  } catch (error) {
    console.log("Failed to fetch data");
  }
}
