import React from "react";
import PdfsGuidelineTable from "../../components/guideline/pdfsGuideline/PdfsGuidelineTable";
import VideosGuidelineTable from "../../components/guideline/videosGuideline/VideosGuidelineTable";

function Guideline() {
  return (
    <div>
      <PdfsGuidelineTable />
      <VideosGuidelineTable />
    </div>
  );
}

export default Guideline;
