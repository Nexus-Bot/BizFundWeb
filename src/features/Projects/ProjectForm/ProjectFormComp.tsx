import {
    Box,
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography,
    Theme,
    Divider,
    Button,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../../App/Util/FormInputs/TextInput";
import type { ProjectForm } from "../../../../types/formTypes";
import history from "../../../history";
import TextareaInput from "../../../App/Util/FormInputs/TextareaInput";
import SwitchInput from "../../../App/Util/FormInputs/SwitchInput";
import FormErrors from "../../../App/Util/resuableComp/FormErrors";
import GeoDecoder from "../../Maps/GeoDecoder";
import NumberInput from "../../../App/Util/FormInputs/NumberInput";

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

interface Props {}

const ProjectFormComp = (props: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, touchedFields, errors },
        getValues,
        setValue,
    } = useForm<ProjectForm>({
        mode: "onChange",
    });

    const onFormSubmit = (data: ProjectForm) => {
        const dataTosend: any = { ...data };

        // @ts-ignore
        delete dataTosend.location;

        if (data.isMap) {
            dataTosend.lng = data.location.center[0];
            dataTosend.lat = data.location.center[1];
            dataTosend.placeName = data.location.placeName;
        } else {
            dataTosend.isMap = false;
            dataTosend.postalAddress = data.postalAddress;
        }

        // Call the create project api
        console.log(dataTosend);
    };

    const classes = useStyles();
    return (
        <>
            <Container maxWidth="md">
                <Paper className={classes.mainBg} elevation={3}>
                    <Box textAlign="center" mb="2rem">
                        <Typography component="h1" variant="h4">
                            <i>
                                <u>PROJECT FORM</u>
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
                                        name="minContribution"
                                        control={control}
                                        rules={{
                                            required:
                                                "Please enter the minimum contribution of a individual for the project",
                                        }}
                                        helperText="Please enter the minimum contribution of a individual for the project"
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.marg} />
                        </Box>
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
                                            Options
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sm={10}>
                                    <SwitchInput
                                        name="isMap"
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.marg} />
                        </Box>

                        {/* Location using mapbox and geocoder */}
                        {getValues().isMap && (
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
                                                LOCATION DETAILS
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        sm={10}
                                        style={{ width: "100%" }}
                                    >
                                        <Controller
                                            name="location"
                                            control={control}
                                            render={({ field }) => (
                                                <GeoDecoder
                                                    setValue={setValue}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider className={classes.marg} />
                            </Box>
                        )}

                        {/* location using custom text fields */}
                        {!getValues().isMap && (
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
                                                LOCATION DETAILS
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        sm={10}
                                        style={{ width: "100%" }}
                                    >
                                        <TextInput
                                            name="postalAddress"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Give any relevant address where the project will be implemented",
                                            }}
                                            helperText="Give any relevant address where the project will be implemented"
                                        />
                                    </Grid>
                                </Grid>

                                <Divider className={classes.marg} />
                            </Box>
                        )}

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
                                    onClick={() => history.push("/projects")}
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

export default ProjectFormComp;
