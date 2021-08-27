import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
    Link,
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router-dom";
import HomePageProjectMaker from "../../features/Home/HomePageProjectMaker";
import HomePageBizFundraiser from "../../features/Home/HomePageBizFundraiser";
import type { RootState } from "../../redux/store/store";
import Navbar from "../../features/Navbar/Navbar";
import ProjectsDashboard from "../../features/Projects/ProjectsDashboard/ProjectsDashboard";
import ProjectDetailedPage from "../../features/Projects/ProjectDetailed/ProjectDetailedPage";
import { loginUsingTokenProjectMaker } from "../../redux/actions/AuthenticationActions/logInUsingTokenProjectMaker";
import { loginUsingTokenBizFundraiser } from "../../redux/actions/AuthenticationActions/logInUsingTokenBizFundraiser";
import AccountVerificationPage from "../../features/Verification/AccountVerificationPage";
import ProjectFormComp from "../../features/Projects/ProjectForm/ProjectFormComp";
import { Container, createTheme, ThemeProvider } from "@material-ui/core";
import MilestoneFormComp from "../../features/Projects/ProjectForm/MilestoneFormComp";
import ProjectMilestonesPage from "../../features/Projects/ProjectMilestones/ProjectMilestonesPage";
import RequestFormComp from "../../features/Projects/ProjectForm/RequestFormComp";
import LandingPage from "../../features/Home/LandingPage";
import GettingStartedPage from "../../features/Home/GettingStartedPage";
import Files from "../../features/Projects/Files/Files";

interface AppProps extends PropsFromRedux, RouteComponentProps<any> {}

const App = ({ logInBF, logInPM, auth, loading }: AppProps) => {
    const theme = {
        palette: {
            type: "dark",
        },
        backgr: {
            backgroundColor: "#222",
        },
    };

    // @ts-ignore
    const themeConfig = createTheme(theme);
    useEffect(() => {
        const BFToken = localStorage.getItem("logInTokenBF");
        const PMToken = localStorage.getItem("logInTokenPM");
        if (BFToken) {
            logInBF(BFToken);
        } else if (PMToken) {
            logInPM(PMToken);
        }
    }, []);

    return (
        <ThemeProvider theme={themeConfig}>
            <div style={{ backgroundColor: "#222", minHeight: "100vh" }}>
                <Route path="/" exact component={LandingPage} />
                <Route
                    path="/getstarted"
                    exact
                    component={GettingStartedPage}
                />
                <Container
                    maxWidth="lg"
                    style={{
                        paddingTop: "5rem",
                        paddingBottom: "5rem",
                    }}
                >
                    {!loading &&
                        auth.authenticated &&
                        !auth.currentUser?.isVerified && (
                            <AccountVerificationPage />
                        )}
                    {(!auth.authenticated || auth.currentUser?.isVerified) && (
                        <div>
                            <Navbar />
                            <div>
                                <Switch>
                                    <Route
                                        path="/home/bizfundraiser"
                                        exact
                                        component={HomePageBizFundraiser}
                                    />
                                    <Route
                                        path="/home/projectmaker"
                                        exact
                                        component={HomePageProjectMaker}
                                    />
                                    <Route
                                        exact
                                        path="/projects"
                                        component={ProjectsDashboard}
                                    />
                                    <Route
                                        exact
                                        path="/projects/:projectId"
                                        component={ProjectDetailedPage}
                                    />
                                    <Route
                                        exact
                                        path="/createproject"
                                        component={ProjectFormComp}
                                    />
                                    <Route
                                        exact
                                        path="/projects/:projectId/createmilestones"
                                        component={MilestoneFormComp}
                                    />
                                    <Route
                                        exact
                                        path="/project/:projectId/milestones/:milestoneId"
                                        component={ProjectMilestonesPage}
                                    />
                                    <Route
                                        exact
                                        path="/projects/:projectId/:milestoneId/createrequest"
                                        component={RequestFormComp}
                                    />
                                    <Route
                                        exact
                                        path="/setfiles/:storageId"
                                        component={Files}
                                    />
                                </Switch>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </ThemeProvider>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        auth: state.auth,
        loading: state.async.loading,
    };
};

const mapDispatch2Props = {
    logInPM: loginUsingTokenProjectMaker,
    logInBF: loginUsingTokenBizFundraiser,
};

const connector = connect(mapState2Props, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(App));
