import { ProjectsTable } from "./ProjectsTable";

export function HomeFeaturedProjects() {
  return <ProjectsTable limit={5} showControls={false} />;
}
