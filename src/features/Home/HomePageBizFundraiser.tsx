import React from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "src/redux/store/store";
import AuthenticationBizFundraiserPanel from "../Panels/AuthenticationBizFundraiserPanel";

interface Props extends PropsFromRedux {}

const HomePageBizFundraiser = (props: Props): JSX.Element => {
    return (
        <div>
            <h3>Home Biz Fund Raiser</h3>
            <AuthenticationBizFundraiserPanel />
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentBizFundraiser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageBizFundraiser);
