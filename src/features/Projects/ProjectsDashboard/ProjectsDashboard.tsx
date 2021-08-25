import { Box, Grid } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "src/redux/store/store";
import ProjectList from "../ProjectList/ProjectList";
import ProjectsFilterForm from "../ProjectsFilters/ProjectsFilterForm";
import ProjectsSearchbar from "../ProjectsFilters/ProjectsSearchbar";

interface Props extends PropsFromRedux {}

const ProjectsDashboard = ({ projects }: Props) => {
    return (
        <Box py="3rem">
            <Grid container spacing={2}>
                <Grid item lg={7} md={8} xs={12}>
                    {/* {loading &&
                        [...new Array(1)].map((obj, index) => {
                            return <EventListItemSkeleton key={index} />;
                        })} */}
                    <ProjectsSearchbar />
                </Grid>

                <Grid item lg={5} md={4} xs={12}>
                    <ProjectsFilterForm
                    // changeFilter={async (date, sort) => {
                    //     this.setState({
                    //         fromDate: date,
                    //         orderBy: sort,
                    //     });
                    //     this.getEventsAtTheStart(date, sort);
                    // }}
                    />
                </Grid>
            </Grid>
            <ProjectList projects={projects} />
        </Box>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        projects: state.projects.projects,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectsDashboard);
