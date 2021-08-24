import React from "react";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import _ from "lodash";
import { useController, UseControllerProps } from "react-hook-form";
import type {
    BizFundraiserSignInForm,
    BizFundraiserSignUpForm,
} from "types/formTypes";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "1rem 0",
    },
}));

type formType = BizFundraiserSignInForm | BizFundraiserSignUpForm | any;

interface OwnProps extends UseControllerProps<formType> {
    helperText: string;
}

const PasswordInput = (props: OwnProps) => {
    const classes = useStyles();
    const {
        field,
        fieldState: { isTouched, invalid },
    } = useController(props);

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <FormControl className={classes.root} variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
                {_.upperFirst(props.name)}
            </InputLabel>
            <OutlinedInput
                error={isTouched && !!invalid}
                id={"outlined-adornment-" + field.name}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? (
                                <Visibility />
                            ) : (
                                <VisibilityOff />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                {...field}
                labelWidth={props.name.length * 7}
            />
            {isTouched && invalid && (
                <FormHelperText
                    children={props.helperText}
                    variant="outlined"
                    error={true}
                />
            )}
        </FormControl>
    );
};

export default PasswordInput;
