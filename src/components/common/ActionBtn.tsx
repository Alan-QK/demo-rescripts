import { Button } from 'antd';
interface props {
    children?;
    className?;
    [propname: string]: any;
}
export default function Btn({ children, className, ...props }: props) {
    return (
        <Button type="link" size="small" className={`fz-s p-0 mr-3 ${className}`} {...props}>
            {children}
        </Button>
    );
}
