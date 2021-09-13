import { Box, Container, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import MainLoader from "../../../App/Util/resuableComp/MainLoader";
import { getAllProjectDataAction } from "../../../redux/actions/AuthenticationActions/getAllProjectDataAction";
import type { RootState } from "../../../redux/store/store";
import ProjectList from "../ProjectList/ProjectList";
import ProjectsFilterForm from "../ProjectsFilters/ProjectsFilterForm";
import ProjectsSearchbar from "../ProjectsFilters/ProjectsSearchbar";
import BG from "../../../Assets/allBG.jpg";

interface Props extends PropsFromRedux {}

const useStyles = makeStyles((theme: Theme) => ({
    bg: {
        minHeight: "100vh",
        background: `url(${BG}) center center /cover`,
    },
}));

const ProjectsDashboard = ({ projects, getProjects, loading }: Props) => {
    useEffect(() => {
        getProjects();
    }, []);

    const classes = useStyles();
    return (
        <>
            {loading && <MainLoader />}
            {!loading && (
                <div className={classes.bg}>
                    <Container
                        maxWidth="lg"
                        style={{
                            paddingTop: "5rem",
                            paddingBottom: "5rem",
                        }}
                    >
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
                    </Container>
                </div>
            )}
        </>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        projects: state.projects.projects,
        loading: state.async.loading,
    };
};

const mapDispatch2Props = {
    getProjects: getAllProjectDataAction,
};

const connector = connect(mapState2Props, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectsDashboard);
