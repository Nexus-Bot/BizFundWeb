import React from "react";
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
import ProjectDetailed from "../../features/Projects/ProjectDetailed/ProjectDetailed";

interface AppProps extends PropsFromRedux, RouteComponentProps<any> {}

const App = (props: AppProps) => {
    return (
        <div>
            <Link to="/home/bizFundraiser">Home Fund Raiser</Link>
            <Link to="/home/projectmaker">Home Project Maker</Link>
            <Link to="/projects">Projects Dashboard</Link>

            <Route
                path="/(.+)"
                render={() => (
                    <div>
                        <Navbar />
                        <Route
                            exact
                            render={() => (
                                <div>
                                    <Switch>
                                        <Route
                                            path="/home/bizFundraiser"
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
                                            path="/projects/:id"
                                            component={ProjectDetailed}
                                        />
                                    </Switch>
                                </div>
                            )}
                        />
                    </div>
                )}
            />
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        auth: state.auth,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withRouter(App));
