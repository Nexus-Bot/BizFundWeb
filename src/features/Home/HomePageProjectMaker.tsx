import React from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "src/redux/store/store";
import AuthenticationProjectMakerPanel from "../Panels/AuthenticationProjectMakerPanel";

interface Props extends PropsFromRedux {}

const HomePageProjectMaker = (props: Props): JSX.Element => {
    return (
        <div>
            <h3>Home Project Maker</h3>
            <AuthenticationProjectMakerPanel />
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageProjectMaker);
