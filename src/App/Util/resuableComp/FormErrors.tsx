import { Alert } from "@material-ui/lab";
import React from "react";
import type { DeepMap, FieldError } from "react-hook-form";

interface Props {
    errors: DeepMap<any, FieldError>;
}

const FormErrors = (props: Props): JSX.Element => {
    const checkFields = ["email", "password", "confirmPassword"];

    const alertsJSX = Object.entries(props.errors).map(
        ([type, details]: [any, any]) => {
            if (checkFields.includes(type))
                return (
                    <Alert severity="error" key={type}>
                        {details.message}
                    </Alert>
                );
        }
    );

    return <>{alertsJSX}</>;
};

export default FormErrors;
