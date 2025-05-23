import React from 'react';
import { useLocation } from 'react-router-dom';

declare function cwr(operation: string, payload: any): void;

const RumContainer = () => {
    let location = useLocation();
    React.useEffect(() => {
        console.log(location.pathname);
        cwr('recordPageView', location.pathname);
    }, [location]);

    return <div>{<RumContainer />}</div>;
};

export default RumContainer;