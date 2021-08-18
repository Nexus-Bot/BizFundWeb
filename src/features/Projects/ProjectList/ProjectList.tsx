import { Grid } from "@material-ui/core";
import React from "react";
import type { Project } from "../../../../types/modelTypes";
import ProjectListItem from "./ProjectListItem";
import TempCard from "./TempCard";

interface Props {
    projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
    return (
        <Grid container spacing={2}>
            {projects.map((project, index) => {
                return (
                    <Grid item lg={4} md={6} xs={12}>
                        <ProjectListItem project={project} key={index} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ProjectList;
