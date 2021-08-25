import { Box, Typography } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "src/redux/store/store";
import AuthenticationBizFundraiserPanel from "../Panels/AuthenticationBizFundraiserPanel";

interface Props extends PropsFromRedux {}

const HomePageBizFundraiser = (props: Props): JSX.Element => {
    return (
        <Box
            p="3rem"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
        >
            <Typography variant="h3" style={{ color: "#FFF" }}>
                <strong>
                    For{" "}
                    <span style={{ color: "#cc0000" }}>
                        Buisness Fundraisers
                    </span>
                </strong>
            </Typography>
            <Box
                m="1rem"
                p="1rem"
                width="500px"
                display="flex"
                alignSelf="center"
            >
                <AuthenticationBizFundraiserPanel />
            </Box>
        </Box>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageBizFundraiser);
