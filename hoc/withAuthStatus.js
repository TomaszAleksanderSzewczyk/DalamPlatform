import { useRouter } from "next/router";
import { useEffect } from "react";
import useUserData from "../hooks/useUser"

// if false, then totally separate
const withAuthStatus = (Component, shouldBeLoggedIn = true) => {
    return (props) => {
        const { isLogged, isLoading } = useUserData();
        const router = useRouter();

        const isValid = !isLoading && (shouldBeLoggedIn && isLogged || !shouldBeLoggedIn && !isLogged);
    
        useEffect(() => {
            if (isLoading) {
                return;
            }
    
            if (shouldBeLoggedIn) {
                if (!isValid) {
                    router.push('/login');
                }
                return;
            }
    
            if (!isValid) {
                router.push('/profile');
            }
        }, [isValid, isLoading, shouldBeLoggedIn, router.push]);
    
        if (isValid) {
            return <Component {...props} />
        }
    
        return null;
    }
}

export default withAuthStatus;