export const extractApiErrors = (resErr) => {

    let errors = [{ status: 'Error', message: ' Ooops, someting went wrong!' }];

    if (resErr && resErr.error) {

        errors = resErr.error;

        if (resErr.error.errors) {

            errors = resErr.error.errors;
        }

    }

    return errors;
};
