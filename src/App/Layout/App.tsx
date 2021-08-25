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
import { Container } from "@material-ui/core";
import MilestoneFormComp from "../../features/Projects/ProjectForm/MilestoneFormComp";
import ProjectMilestonesPage from "../../features/Projects/ProjectMilestones/ProjectMilestonesPage";
import RequestFormComp from "../../features/Projects/ProjectForm/RequestFormComp";
import LandingPage from "../../features/Home/LandingPage";

interface AppProps extends PropsFromRedux, RouteComponentProps<any> {}

const App = ({ logInBF, logInPM, auth, loading }: AppProps) => {
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
        <div>
            <div style={{ position: "fixed", top: "200px", right: "200px" }}>
                <Link to="/home/bizFundraiser">Home Fund Raiser</Link>
                <Link to="/home/projectmaker">Home Project Maker</Link>
                <Link to="/projects">Projects Dashboard</Link>
            </div>
            {/* 
            <Route
                path="/(.+)"
                render={() => ( */}
            <Route path="/" exact component={LandingPage} />
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
                            </Switch>
                        </div>
                    </div>
                )}
            </Container>
            {/* )}
            /> */}
        </div>
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
