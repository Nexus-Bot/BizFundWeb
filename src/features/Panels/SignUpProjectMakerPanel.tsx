import React from "react";
import {
    Container,
    makeStyles,
    Theme,
    Avatar,
    CssBaseline,
    Typography,
    Button,
    Grid,
    ButtonBase,
    Box,
    IconButton,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect, ConnectedProps } from "react-redux";
import { loginProjectMaker } from "../../redux/reducers/authReducer";
import type { ProjectMakerSignUpForm } from "types/formTypes";
import { useForm } from "react-hook-form";
import PasswordInput from "../../App/Util/FormInputs/PasswordInput";
import TextInput from "../../App/Util/FormInputs/TextInput";
import InfoIcon from "@material-ui/icons/Info";
import FormErrors from "../../App/Util/resuableComp/FormErrors";
import { registerProjectMaker } from "../../redux/actions/AuthenticationActions/registerProjectMaker";
import { useAppDispatch } from "../../redux/store/hooks";

interface Props extends PropsFromRedux {
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    "@global": {
        html: {
            fontSize: ".8rem",
        },
    },
    paper: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const defaultFormValues: ProjectMakerSignUpForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpProjectMakerPanel = ({ handleChange, registerUser }: Props) => {
    const classes = useStyles();

    const showPasswordInfo = () => {
        // const { openModal } = this.props;
        const title = "Password Rules";
        const description =
            "For security of your account we ensure strong password pratices by user";
        const list = [
            "1.Password should contain one uppercase letter",
            "2.Password should contain one lowercase letter",
            "3.Password should contain one symbol",
            "4.Password should contain one digit",
            "5.Password should be min of 8 characters",
        ];
        // openModal("InfoModal", { title, description, list });
    };

    const showEmailInfo = () => {
        // const { openModal } = this.props;
        const title = "Email Rules";
        const description =
            "For stopping spam users we are currently allowing some major email domains to be supported by our system. If you want to add some email domain you can request our support team so";
        const list = [
            "1.@gmail.com",
            "2.@outlook.com",
            "3.@yahoo.com",
            "4.@hotmail.com",
        ];
        // openModal("InfoModal", { title, description, list });
    };

    const confirmPasswordValidator = (value: string) => {
        if (value !== getValues("password"))
            return "Please confirm your password";

        return true;
    };

    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, touchedFields, errors },
        getValues,
    } = useForm<ProjectMakerSignUpForm>({
        defaultValues: defaultFormValues,
        mode: "onChange",
    });

    const onFormSubmit = (data: ProjectMakerSignUpForm) => {
        registerUser(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextInput
                                name="firstName"
                                control={control}
                                rules={{
                                    required: "Please enter your first name",
                                }}
                                helperText="Please enter your first name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextInput
                                name="lastName"
                                control={control}
                                rules={{
                                    required: "Please enter your last name",
                                }}
                                helperText="Please enter your last name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <TextInput
                                    name="email"
                                    control={control}
                                    rules={{
                                        required:
                                            "Please enter a valid Email ID",
                                        validate: {
                                            emailValidator,
                                        },
                                    }}
                                    helperText="Please enter a valid Email ID"
                                />

                                <Box ml="0.5rem">
                                    <IconButton
                                        onClick={showEmailInfo}
                                        size="small"
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <PasswordInput
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: "Please enter your password",
                                        validate: {
                                            passwordValidator,
                                        },
                                    }}
                                    helperText="Please enter your password"
                                />

                                <Box ml="0.5rem">
                                    <IconButton
                                        onClick={showPasswordInfo}
                                        size="small"
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            <PasswordInput
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required:
                                        "Please enter your password again",
                                    validate: {
                                        confirmPasswordValidator,
                                    },
                                }}
                                helperText="Please enter your password again"
                            />
                        </Grid>
                    </Grid>

                    {Object.entries(errors).length > 0 && (
                        <FormErrors errors={errors}></FormErrors>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!isValid || isSubmitting || !touchedFields}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <ButtonBase
                                // className={classes.replyBtn}
                                onClick={(e) => {
                                    handleChange(e, 1);
                                }}
                            >
                                <Typography variant="body2" color="primary">
                                    Already have an account? Sign In
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const emailValidator = (value: string) => {
    const list = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];
    const domain = value.split("@")[1];

    if (list.indexOf(domain) === -1)
        return "Please ensure your email domain is in our list of supported domains";
    return true;
};

const passwordValidator = (value: string) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(value)) return "Please ensure your password is strong enough";

    return true;
};

const mapDispatch2Props = {
    logInUser: loginProjectMaker,
    registerUser: registerProjectMaker,
};

const connector = connect(null, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignUpProjectMakerPanel);
