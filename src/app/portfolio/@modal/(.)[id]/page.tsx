import { Modal } from "./modal";
import { projectDetails } from "./data/projectData";
import { ProjectPagination } from "./components";

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const projectDetail = projectDetails[+resolvedParams.id];

  return (
    <Modal>
      <ProjectPagination project={projectDetail} />
    </Modal>
  );
}
