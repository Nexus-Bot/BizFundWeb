import React from "react";
import _ from "lodash";
import { TextField } from "@material-ui/core";
import { useController, UseControllerProps } from "react-hook-form";
import type {
    BizFundraiserSignInForm,
    BizFundraiserSignUpForm,
} from "types/formTypes";

type formType = BizFundraiserSignInForm | BizFundraiserSignUpForm | any;

interface OwnProps extends UseControllerProps<formType> {
    helperText: string;
}

const TextInput = (props: OwnProps) => {
    const {
        field,
        fieldState: { isTouched, invalid },
    } = useController(props);

    return (
        <div>
            <TextField
                {...field}
                label={_.upperFirst(props.name)}
                error={isTouched && !!invalid}
                variant="outlined"
                fullWidth
                helperText={invalid ? props.helperText : ""}
            />
        </div>
    );
};

export default TextInput;
