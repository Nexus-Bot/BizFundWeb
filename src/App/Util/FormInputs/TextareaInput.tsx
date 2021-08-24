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
    rows: number;
}

const TextareaInput = (props: OwnProps) => {
    const {
        field,
        fieldState: { isTouched, invalid },
    } = useController(props);

    return (
        <TextField
            {...field}
            error={isTouched && !!invalid}
            variant="outlined"
            size="small"
            multiline
            label={_.upperFirst(props.name)}
            rows={props.rows}
            fullWidth
            helperText={invalid ? props.helperText : ""}
        />
    );
};

export default TextareaInput;
