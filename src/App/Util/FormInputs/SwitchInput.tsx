import React from "react";
import _ from "lodash";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useController, UseControllerProps } from "react-hook-form";
import type {
    BizFundraiserSignInForm,
    BizFundraiserSignUpForm,
} from "types/formTypes";

type formType = BizFundraiserSignInForm | BizFundraiserSignUpForm | any;

interface OwnProps extends UseControllerProps<formType> {}

const SwitchInput = (props: OwnProps) => {
    const {
        field,
        fieldState: { isTouched, invalid },
    } = useController(props);

    return (
        <FormControlLabel
            control={
                <Switch
                    {...field}
                    color="primary"
                    checked={field.value === true}
                />
            }
            label={_.upperFirst(props.name)}
        />
    );
};

export default SwitchInput;
