import { Spin } from "antd";

export default function Loading({ children, isLoading }) {
    return <Spin spinning={isLoading}>{children}</Spin>;
}