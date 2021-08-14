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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useForm } from "react-hook-form";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import PasswordInput from "../../App/Util/FormInputs/PasswordInput";
import TextInput from "../../App/Util/FormInputs/TextInput";
import { loginBizFundraiser } from "../../redux/reducers/authReducer";
import type { BizFundraiserSignInForm } from "types/formTypes";
import FormErrors from "../../App/Util/resuableComp/FormErrors";

interface Props extends PropsFromRedux {
    handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const defaultFormValues: BizFundraiserSignInForm = {
    email: "",
    password: "",
};

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

const SignInBizFundraiserPanel = ({ handleChange }: Props) => {
    const classes = useStyles();

    const {
        handleSubmit,
        control,
        formState: { isValid, isSubmitting, touchedFields, errors },
    } = useForm<BizFundraiserSignInForm>({
        defaultValues: defaultFormValues,
        mode: "onChange",
    });

    const onFormSubmit = (data: BizFundraiserSignInForm) => {
        console.log(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form
                    className={classes.form}
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <TextInput
                        name="email"
                        control={control}
                        rules={{ required: "Please enter a valid Email ID" }}
                        helperText="Please enter a valid Email ID"
                    />

                    <PasswordInput
                        name="password"
                        control={control}
                        rules={{
                            required: "Please enter your password",
                        }}
                        helperText="Please enter your password"
                    />

                    {/* <FormControlLabel
                        control={
                            <Checkbox value="remember" color="primary" />
                        }
                        label="Remember me"
                    /> 
                    */}
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/resetPassword">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <ButtonBase
                                // className={classes.replyBtn}
                                onClick={(e: any) => {
                                    handleChange(e, 0);
                                }}
                            >
                                <Typography variant="body2" color="primary">
                                    Don't have an account? Sign Up
                                </Typography>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

const mapDispatch2Props = {
    logInUser: loginBizFundraiser,
};

const connector = connect(null, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SignInBizFundraiserPanel);
