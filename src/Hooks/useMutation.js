import { useMutation } from "@tanstack/react-query"

export const useMutationHook = (fnCallback) => {
    return useMutation({
        mutationFn: fnCallback
    })
}