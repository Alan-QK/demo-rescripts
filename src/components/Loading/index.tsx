import { Spin, Alert } from 'antd';

const Loading = () => {
    return (
        <div className="example">
            <Spin tip="Loading..." size="large">
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Spin>
        </div>
    );
};

export default Loading;
