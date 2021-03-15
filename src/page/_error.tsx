import { useHistory } from 'react-router';
import { Result, Button } from 'antd';

export default function Error({ statusCode }) {
    if (statusCode === 404) {
        return <Error404 />;
    }
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    );
}

function Error404() {
    const history = useHistory();
    return (
        <div className="home-wrapper error">
            <Result
                className="pos-center"
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {
        statusCode,
        noLayout: true,
        namespacesRequired: ['common'],
    };
};
