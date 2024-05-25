import { getData } from "@/app/(services)/services";
import { fetchPageData } from "@/app/Fetchers";
import Navbar from "@/app/components/Navbar/Navbar";
import All_projects from "@/app/components/all_projects/All_projects";
import Footer from "@/app/components/footer/Footer";
import axios from "axios";

const ProjectsPage = async () => {
  const data = await fetchPageData("projects");
  console.log(data, "check project data 11");
  return (
    <div>
      <Navbar></Navbar>
      <All_projects projectData={data && data} />
      {/* {data?.map((item, index) => {
        return (
          <>
            <h1 className="padding">not f0ound</h1>
          </>
        );
      })} */}

      <Footer></Footer>
    </div>
  );
};

export default ProjectsPage;
