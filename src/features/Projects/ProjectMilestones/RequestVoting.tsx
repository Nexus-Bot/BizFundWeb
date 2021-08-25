import React, { useState } from "react";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { Box, Button } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import useAsyncEffect from "use-async-effect";
import { checkUserIsVoterForRequest } from "../../../App/Util/reusableFunctions/checkUser";
import { getUserContributionInProjectByMetamaskaddress } from "../../../App/Util/reusableFunctions/getUserContribution";

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
}

const RequestVoting = ({ request, project, user }: Props) => {
    const [state, setState] = useState<ComponentState>({
        isEligibleVoter: false,
    });

    useAsyncEffect(async (isMounted) => {
        const isAlreadyVoter = await checkUserIsVoterForRequest(
            project?.id,
            user?.metamaskAddress,
            request?.id
        );

        if (!isMounted()) return;

        if (!user) {
            setState({ isEligibleVoter: false });
            return;
        }

        if (user.isProjectMaker) {
            setState({ isEligibleVoter: false });
            return;
        }

        if (isAlreadyVoter) {
            setState({ isEligibleVoter: false });
            return;
        }

        const contribution =
            await getUserContributionInProjectByMetamaskaddress(
                project?.id,
                user?.metamaskAddress
            );

        if (project && contribution && contribution < project.minContribution) {
            setState({ isEligibleVoter: false });
            return;
        }

        setState({ isEligibleVoter: true });
    }, []);

    const chartData = [
        {
            name: "UpVotes",
            value: request?.approvalsCount,
        },
        {
            name: "DownVotes",
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
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <Box p={1}>
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
            {state.isEligibleVoter && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ThumbUpIcon />}
                    >
                        UpVote
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<ThumbDownIcon />}
                    >
                        DownVote
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default RequestVoting;
