import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import type { DeepMap, FieldError, MultipleFieldErrors } from "react-hook-form";

interface Props {
    errors: DeepMap<any, FieldError>;
    name: string;
    errorType: string;
}

interface FuncMapType {
    [key: string]: (obj: any) => JSX.Element | JSX.Element[] | null;
    // [multiError: string]: ({
    //     messages,
    // }: {
    //     messages: MultipleFieldErrors | undefined;
    // }) => JSX.Element[] | null;
}

const FormErrorMessage = ({ errors, name, errorType }: Props) => {
    const funcMap: FuncMapType = {
        "singleError": ({ message }: { message: string }) => <p>{message}</p>,
        "multiError": ({
            messages,
        }: {
            messages: MultipleFieldErrors | undefined;
        }) => {
            if (messages)
                return Object.entries(messages).map(
                    ([type, message]: [any, any]) => <p key={type}>{message}</p>
                );

            return null;
        },
    };
    return (
        <ErrorMessage errors={errors} name={name} render={funcMap[errorType]} />
    );
};

export default FormErrorMessage;
