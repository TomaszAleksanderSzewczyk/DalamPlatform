import { useRouter } from "next/router";
import { useEffect } from "react";
import useUserData from "../hooks/useUser"

// if false, then totally separate
const withAuthStatus = (Component, shouldBeLoggedIn = true) => {
    console.log(Component.name, 'component')
    return (props) => {
        const { isLogged, isLoading } = useUserData();
        console.log(isLogged, isLoading, 'isLogged, isLoading')
        const router = useRouter();

        useEffect(() => {
            if (isLoading) {
                return;
            }
    
            if (shouldBeLoggedIn && !isLogged) {
                router.push('/login');
            }
    
        }, [isLoading, shouldBeLoggedIn, router.push]);
    
        if (shouldBeLoggedIn && isLogged || (!shouldBeLoggedIn && !isLogged)) {
            return <Component {...props} />
        }
    
        return null;
    }
}

export default withAuthStatus;