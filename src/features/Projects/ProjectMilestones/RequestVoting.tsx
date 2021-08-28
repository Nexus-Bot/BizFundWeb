import React, { useState } from "react";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Box, Button, Typography, CircularProgress } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import useAsyncEffect from "use-async-effect";
import { checkUserIsVoterForRequest } from "../../../App/Util/reusableFunctions/checkUser";
import { getUserContributionInProjectByMetamaskaddress } from "../../../App/Util/reusableFunctions/getUserContribution";
import {
    downvoteRequest,
    upvoteRequest,
} from "../../../App/Util/reusableFunctions/updateProjectData";
import { payVendor } from "../../../App/Util/reusableFunctions/payments";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

interface Props {
    request: Request | null;
    user: BizFundraiser | ProjectMaker | null;
    project: Project | null;
}

interface ComponentState {
    isEligibleVoter: boolean;
    upVoteLoading: boolean;
    downVoteLoading: boolean;
    payVendorLoading: boolean;
}

const RequestVoting = ({ request, project, user }: Props) => {
    const [state, setState] = useState<ComponentState>({
        isEligibleVoter: false,
        upVoteLoading: false,
        downVoteLoading: false,
        payVendorLoading: false,
    });

    useAsyncEffect(async (isMounted) => {
        const isAlreadyVoter = await checkUserIsVoterForRequest(
            project?.id,
            user?.metamaskAddress,
            request?.id
        );

        if (!isMounted()) return;

        if (!user || user.isProjectMaker) {
            setState({ ...state, isEligibleVoter: false });
            return;
        }

        if (isAlreadyVoter) {
            setState({ ...state, isEligibleVoter: false });
            return;
        }

        const contribution =
            await getUserContributionInProjectByMetamaskaddress(
                project?.id,
                user?.metamaskAddress
            );

        if (project && contribution && contribution < project.minContribution) {
            setState({ ...state, isEligibleVoter: false });
            return;
        }

        setState({ ...state, isEligibleVoter: true });
    }, []);

    const chartData = [
        {
            name: "Up Votes",
            value: request?.approvalsCount,
        },
        {
            name: "Down Votes",
            value: request?.denialsCount,
        },
        {
            name: "Not Voted",
            value:
                (project ? project.approversCount : 0) -
                ((request ? request.approvalsCount : 0) +
                    (request ? request.denialsCount : 0)),
        },
    ];
    const COLORS = ["#329932", "#FF3232", "#333"];

    const showPayVendorBtn: boolean | null =
        user &&
        project &&
        request &&
        user.isProjectMaker &&
        user.metamaskAddress === project.creatorMetamaskAddress &&
        request.approvalsCount > project.approversCount / 2;

    const onClickUpvote = async () => {
        setState({ ...state, upVoteLoading: true });

        await upvoteRequest(project?.id, request?.id);
        setState({ ...state, upVoteLoading: false });
    };

    const onClickDownvote = async () => {
        setState({ ...state, downVoteLoading: true });

        await downvoteRequest(project?.id, request?.id);

        setState({ ...state, downVoteLoading: false });
    };

    const onClickPayVendor = async () => {
        setState({ ...state, payVendorLoading: true });

        await payVendor(project?.id, request?.id);
        setState({ ...state, payVendorLoading: false });
    };

    return (
        <Box p={1}>
            <Box textAlign="center">
                <Typography color="textPrimary" variant="h4">
                    Total Voters : {project?.approversCount}
                </Typography>
            </Box>
            <Box m={1}>
                <PieChart width={200} height={200}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        labelLine={false}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </Box>
            {!project?.cancelled &&
                !project?.finished &&
                state.isEligibleVoter &&
                !request?.cancelled &&
                !request?.isComplete && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-around"
                    >
                        <Box mx="0.25rem">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#329932",
                                    color: "#FFF",
                                }}
                                startIcon={<ThumbUpIcon />}
                                onClick={onClickUpvote}
                            >
                                {!state.upVoteLoading && <span>UpVote</span>}
                                {state.upVoteLoading && (
                                    <CircularProgress
                                        color="inherit"
                                        size="2rem"
                                    />
                                )}
                            </Button>
                        </Box>
                        <Box mx="0.25rem">
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: "#FF3232",
                                    color: "#FFF",
                                }}
                                startIcon={<ThumbDownIcon />}
                                onClick={onClickDownvote}
                            >
                                {!state.downVoteLoading && (
                                    <span>DownVote</span>
                                )}
                                {state.downVoteLoading && (
                                    <CircularProgress
                                        color="inherit"
                                        size="2rem"
                                    />
                                )}
                            </Button>
                        </Box>
                    </Box>
                )}
            {!project?.cancelled &&
                !project?.finished &&
                user &&
                user.isProjectMaker &&
                user.metamaskAddress === project?.creatorMetamaskAddress &&
                !request?.cancelled &&
                !request?.isComplete && (
                    <Box>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            disabled={showPayVendorBtn ? false : true}
                            onClick={onClickPayVendor}
                        >
                            {!state.payVendorLoading && <span>Pay Vendor</span>}
                            {state.payVendorLoading && (
                                <CircularProgress color="inherit" size="2rem" />
                            )}
                        </Button>
                    </Box>
                )}
        </Box>
    );
};

export default RequestVoting;
