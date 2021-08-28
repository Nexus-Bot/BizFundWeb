import {
    Box,
    makeStyles,
    Paper,
    Typography,
    Theme,
    LinearProgress,
    Divider,
    withStyles,
    createStyles,
    Chip,
    CircularProgress,
    Button,
} from "@material-ui/core";
import React, { useState } from "react";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
} from "../../../../types/modelTypes";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {
    checkRefund,
    contributeInProject,
    getRefund,
} from "../../../App/Util/reusableFunctions/payments";
import { useForm } from "react-hook-form";
import { ContributionForm } from "../../../../types/formTypes";
import NumberInput from "../../../App/Util/FormInputs/NumberInput";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
}));

interface Props {
    project: Project;
    contribution: string | null;
    isProjectMaker: boolean;
    user: BizFundraiser | ProjectMaker | null;
}

interface ComponentState {
    payLoading: boolean;
    refundAmount: string | null;
    checkRefundLoading: boolean;
    getRefundLoading: boolean;
}

const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: "#F3F3F3",
        },
        bar: {
            borderRadius: 5,
            backgroundColor: "#329932",
        },
    })
)(LinearProgress);

const ProjectDetailedMoney = ({
    project,
    contribution,
    isProjectMaker,
    user,
}: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, touchedFields, errors },
    } = useForm<ContributionForm>({
        mode: "onChange",
    });

    const [state, setState] = useState<ComponentState>({
        payLoading: false,
        getRefundLoading: false,
        refundAmount: null,
        checkRefundLoading: false,
    });

    const onClickPay = async (data: ContributionForm) => {
        setState({ ...state, payLoading: true });

        const isSignedIn = user?._id ? true : false;
        await contributeInProject(isSignedIn, project.id, data.value);
        setState({ ...state, payLoading: false });
    };

    const onClickCheckRefund = async () => {
        setState({ ...state, checkRefundLoading: true });

        const refund = await checkRefund(project.id);
        setState({ ...state, checkRefundLoading: false, refundAmount: refund });
    };

    const onClickGetRefund = async () => {
        setState({ ...state, getRefundLoading: true });

        await getRefund(project.id);
        setState({ ...state, getRefundLoading: false });
    };

    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.root}>
            <Box display="flex" alignItems="center" flexDirection="column">
                <Box display="flex" alignItems="center">
                    <LocalAtmIcon
                        style={{ fontSize: "5rem", color: "#329932" }}
                    />
                    <Typography variant="h3" style={{ color: "#329932" }}>
                        <strong> Funds </strong>
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box my="0.5rem">
                        <Typography variant="h4" color="textPrimary">
                            Total Pool Balance : {project.totalPoolBalance} $
                            <Typography variant="h6" color="textSecondary">
                                Contributed By Total{" "}
                                <strong>{project.contributorsCount}</strong>{" "}
                                Contributors
                            </Typography>
                        </Typography>
                    </Box>

                    <Divider style={{ width: "100%" }} />
                    <Box my="1rem" width="100%">
                        <Typography variant="h6" color="textSecondary">
                            Current Pool Balance : {project.currentBalance} $
                        </Typography>

                        <Box width="100%">
                            <BorderLinearProgress
                                variant="determinate"
                                value={
                                    (project.currentBalance * 100) /
                                    project.totalPoolBalance
                                }
                            />
                        </Box>
                    </Box>
                    <Divider style={{ width: "100%" }} />
                    <Box my="1rem">
                        <Chip
                            label={
                                <Typography variant="h6" color="textSecondary">
                                    Minimum Contribution :{" "}
                                    {project.minContribution} $
                                </Typography>
                            }
                            variant="outlined"
                            color="secondary"
                            icon={<MonetizationOnIcon />}
                        />
                    </Box>
                    <Divider style={{ width: "100%" }} />
                    {!project.cancelled && !project.finished && (
                        <Box my="1rem">
                            {!isProjectMaker && (
                                <Box>
                                    {contribution && (
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Chip
                                                variant="outlined"
                                                color="primary"
                                                icon={<AttachMoneyIcon />}
                                                label={
                                                    <Typography
                                                        variant="h6"
                                                        color="textSecondary"
                                                    >{`My Contribution : ${contribution} $`}</Typography>
                                                }
                                            />
                                            <Box my="0.5rem" width="100%">
                                                <form
                                                    onSubmit={handleSubmit(
                                                        onClickPay
                                                    )}
                                                    className={classes.root}
                                                >
                                                    <NumberInput
                                                        name="value"
                                                        control={control}
                                                        rules={{
                                                            required:
                                                                "Please enter the amount you want to contribute",
                                                        }}
                                                        helperText="Please enter the amount you want to contribute"
                                                    />
                                                    <Box py="0.5rem">
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            fullWidth
                                                            type="submit"
                                                            disabled={
                                                                !isValid ||
                                                                isSubmitting ||
                                                                !touchedFields
                                                            }
                                                        >
                                                            {!state.payLoading && (
                                                                <span>
                                                                    Pay More
                                                                </span>
                                                            )}
                                                            {state.payLoading && (
                                                                <CircularProgress
                                                                    color="inherit"
                                                                    size="2rem"
                                                                />
                                                            )}
                                                        </Button>
                                                    </Box>
                                                </form>
                                            </Box>
                                        </Box>
                                    )}
                                    {!contribution && (
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Chip
                                                variant="outlined"
                                                color="primary"
                                                icon={<AttachMoneyIcon />}
                                                label={
                                                    <Typography
                                                        variant="h6"
                                                        color="textSecondary"
                                                    >
                                                        My Contribution : 0 $
                                                    </Typography>
                                                }
                                            />
                                            <Box my="0.5rem" width="100%">
                                                <form
                                                    onSubmit={handleSubmit(
                                                        onClickPay
                                                    )}
                                                    className={classes.root}
                                                >
                                                    <NumberInput
                                                        name="value"
                                                        control={control}
                                                        rules={{
                                                            required:
                                                                "Please enter the amount you want to contribute",
                                                        }}
                                                        helperText="Please enter the amount you want to contribute"
                                                    />
                                                    <Box my="0.5rem">
                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            size="large"
                                                            color="primary"
                                                            type="submit"
                                                            disabled={
                                                                !isValid ||
                                                                isSubmitting ||
                                                                !touchedFields
                                                            }
                                                        >
                                                            {!state.payLoading && (
                                                                <span>
                                                                    Pay for Good
                                                                </span>
                                                            )}
                                                            {state.payLoading && (
                                                                <CircularProgress
                                                                    color="inherit"
                                                                    size="2rem"
                                                                />
                                                            )}
                                                        </Button>
                                                    </Box>
                                                </form>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    )}
                    <Box my="0.5rem" width="100%">
                        <Divider style={{ width: "100%" }} />
                        {!isProjectMaker && (
                            <Box>
                                {contribution && (
                                    <Box>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            my="0.5rem"
                                        >
                                            <Chip
                                                variant="outlined"
                                                color="primary"
                                                icon={<AttachMoneyIcon />}
                                                label={
                                                    <Typography
                                                        variant="h6"
                                                        color="textSecondary"
                                                    >{`Refund Available : ${
                                                        state.refundAmount
                                                            ? state.refundAmount
                                                            : 0
                                                    } $`}</Typography>
                                                }
                                            />
                                            <Box my="0.5rem" width="100%">
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    fullWidth
                                                    onClick={onClickCheckRefund}
                                                >
                                                    {!state.checkRefundLoading && (
                                                        <span>
                                                            Check Refund
                                                        </span>
                                                    )}
                                                    {state.checkRefundLoading && (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size="2rem"
                                                        />
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                        {(project.cancelled ||
                                            project.finished) && (
                                            <Box my="0.5rem">
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    fullWidth
                                                    onClick={onClickGetRefund}
                                                >
                                                    {!state.getRefundLoading && (
                                                        <span>Get Refund</span>
                                                    )}
                                                    {state.getRefundLoading && (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size="2rem"
                                                        />
                                                    )}
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProjectDetailedMoney;
