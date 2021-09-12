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
import ETHLogo from "../../../Assets/ethereum.png";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
        background:
            "linear-gradient(135deg, rgba(29,0,36,1) 0%, rgba(101,9,121,1) 16%, rgba(250,250,250,1) 100%);",
    },
    logo: {
        maxWidth: "3.5rem",
    },
    fundText: {
        paddingTop: "1rem",
        background: "-webkit-linear-gradient(90deg, #9ebd13 0%, #008552 100%)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
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
    console.log(contribution);
    return (
        <Paper elevation={3} className={classes.root}>
            <Box display="flex" alignItems="center" flexDirection="column">
                <Typography variant="h3" className={classes.fundText}>
                    <strong> FUNDS </strong>
                </Typography>

                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box my="0.5rem">
                        <Typography variant="h5" color="textPrimary">
                            <Box display="flex" alignItems="center">
                                <Box>
                                    Total Pool Balance :{" "}
                                    {project.totalPoolBalance}{" "}
                                </Box>
                                <Box pt="0.5rem">
                                    <img
                                        src={ETHLogo}
                                        alt="Logo"
                                        className={classes.logo}
                                    />
                                </Box>
                            </Box>
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
                            <Box display="flex" alignItems="center">
                                <Box>
                                    Current Pool Balance :{" "}
                                    {project.currentBalance}{" "}
                                </Box>
                                <Box pt="0.5rem">
                                    <img
                                        src={ETHLogo}
                                        alt="Logo"
                                        className={classes.logo}
                                    />
                                </Box>
                            </Box>
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
                                    <Box display="flex" alignItems="center">
                                        <Box>
                                            Minimum Contribution :{" "}
                                            {project.minContribution}
                                        </Box>{" "}
                                        <Box pt="0.5rem">
                                            <img
                                                src={ETHLogo}
                                                alt="Logo"
                                                className={classes.logo}
                                            />
                                        </Box>
                                    </Box>
                                </Typography>
                            }
                            variant="outlined"
                            color="secondary"
                            icon={<MonetizationOnIcon />}
                            style={{ minHeight: "4rem" }}
                        />
                    </Box>
                    <Divider style={{ width: "100%" }} />
                    {!project.cancelled && !project.finished && (
                        <Box my="1rem">
                            {!isProjectMaker && !user?.isProjectMaker && (
                                <Box>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                    >
                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            style={{ minHeight: "4rem" }}
                                            icon={<AttachMoneyIcon />}
                                            label={
                                                <Typography
                                                    variant="h6"
                                                    color="textSecondary"
                                                >
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <Box>
                                                            {`My Contribution : ${
                                                                contribution
                                                                    ? contribution
                                                                    : 0
                                                            } `}
                                                        </Box>
                                                        <Box pt="0.5rem">
                                                            <img
                                                                src={ETHLogo}
                                                                alt="Logo"
                                                                className={
                                                                    classes.logo
                                                                }
                                                            />
                                                        </Box>
                                                    </Box>
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
                                                <Box py="0.5rem">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
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
                                                                CONTRIBUTE
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
                                                style={{ minHeight: "4rem" }}
                                                icon={<AttachMoneyIcon />}
                                                label={
                                                    <Typography
                                                        variant="h6"
                                                        color="textSecondary"
                                                    >
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                        >
                                                            <Box>
                                                                {`Refund Available : ${
                                                                    state.refundAmount
                                                                        ? state.refundAmount
                                                                        : 0
                                                                } `}
                                                            </Box>
                                                            <Box pt="0.5rem">
                                                                <img
                                                                    src={
                                                                        ETHLogo
                                                                    }
                                                                    alt="Logo"
                                                                    className={
                                                                        classes.logo
                                                                    }
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </Typography>
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
