import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

function useRouter(): any {
    const history = useHistory();
    const location = useLocation();
    return {
        asPath: location?.pathname,
        query: {},
        pathname: location?.pathname,
        push: history.push,
    };
}

export default useRouter;
