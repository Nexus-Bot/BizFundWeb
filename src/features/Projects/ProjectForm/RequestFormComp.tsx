import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../App/Util/FormInputs/TextareaInput";
import TextInput from "../../../App/Util/FormInputs/TextInput";
import type { RequestForm } from "../../../../types/formTypes";
import FormErrors from "../../../App/Util/resuableComp/FormErrors";
import history from "../../../history";
import type { RouteComponentProps } from "react-router";
import { createRequestInBlockchain } from "../../../App/Util/reusableFunctions/createProjectData";
import NumberInput from "../../../App/Util/FormInputs/NumberInput";
import { addCreatedRequestIdToMilestone } from "../../../App/Util/reusableFunctions/updateProjectData";
import cuid from "cuid";

const useStyles = makeStyles((theme: Theme) => ({
    "@global": {
        html: {
            fontSize: ".8rem",
        },
    },
    mainBg: {
        //backgroundColor: grey["50"],
        marginTop: "2rem",
        marginBottom: "2rem",
        padding: "2rem",
    },
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
    },
    marg: {
        margin: ".5rem",
    },
}));

interface Props extends RouteComponentProps<any> {}

const RequestFormComp = (props: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, touchedFields, errors },
    } = useForm<RequestForm>({
        mode: "onChange",
    });

    const onFormSubmit = async (data: RequestForm) => {
        const dataTosend: any = { ...data };

        const projectAddress = props.match.params.projectId;
        const milestoneId = props.match.params.milestoneId;

        dataTosend.milestoneId = milestoneId;

        // Add the folder and img urls of request storage
        dataTosend.imgURL = cuid();
        dataTosend.filesURL = cuid();

        const requestId = await createRequestInBlockchain(
            projectAddress,
            dataTosend
        );

        if (requestId === null) console.log("Please retry!!!");
        else {
            console.log(requestId);
            const BFToken = localStorage.getItem("logInTokenBF");
            const PMToken = localStorage.getItem("logInTokenPM");
            await addCreatedRequestIdToMilestone(
                requestId,
                milestoneId,
                BFToken ? BFToken : PMToken
            );
            history.goBack();
        }
    };

    const classes = useStyles();
    return (
        <>
            <Container maxWidth="md">
                <Paper className={classes.mainBg} elevation={3}>
                    <Box textAlign="center" mb="2rem">
                        <Typography component="h1" variant="h4">
                            <i>
                                <u>REQUEST FORM</u>
                            </i>
                        </Typography>
                    </Box>
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        className={classes.root}
                    >
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item sm={2}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100%"
                                    >
                                        <Typography
                                            component="h1"
                                            variant="h5"
                                            color="secondary"
                                        >
                                            BASIC DETAILS
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item sm style={{ width: "100%" }}>
                                    <TextInput
                                        name="title"
                                        control={control}
                                        rules={{
                                            required:
                                                "Please enter the title for the project",
                                        }}
                                        helperText="Please enter the title for the project"
                                    />

                                    <TextareaInput
                                        name="description"
                                        control={control}
                                        rows={3}
                                        rules={{
                                            required:
                                                "Please enter the description for the project",
                                        }}
                                        helperText="Please enter the description for the project"
                                    />

                                    <NumberInput
                                        name="value"
                                        control={control}
                                        rules={{
                                            required:
                                                "Please enter the amount required for the request",
                                        }}
                                        helperText="Please enter the amount required for the request"
                                    />

                                    <TextInput
                                        name="vendorMetamaskAddress"
                                        control={control}
                                        rules={{
                                            required:
                                                "Please enter vendors wallet address (MetaMask)",
                                        }}
                                        helperText="Please enter vendors wallet address (MetaMask)"
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.marg} />
                        </Box>

                        {Object.entries(errors).length > 0 && (
                            <FormErrors errors={errors}></FormErrors>
                        )}
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            m="1rem"
                        >
                            <Box mx="0.5rem">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={
                                        !isValid ||
                                        isSubmitting ||
                                        !touchedFields
                                    }
                                >
                                    Submit
                                </Button>
                            </Box>
                            <Box mx="0.5rem">
                                <Button
                                    variant="contained"
                                    type="button"
                                    color="secondary"
                                    onClick={() => history.goBack()}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default RequestFormComp;
