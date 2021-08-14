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

interface AppProps extends PropsFromRedux, RouteComponentProps<any> {}

const App = (props: AppProps) => {
    return (
        <div>
            <Link to="/home/bizFundraiser">Home Fund Raiser</Link>
            <Link to="/home/projectmaker">Home Project Maker</Link>
            <Switch>
                <Route
                    path="/home/bizFundraiser"
                    component={HomePageBizFundraiser}
                />
                <Route
                    path="/home/projectmaker"
                    component={HomePageProjectMaker}
                />
            </Switch>
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
