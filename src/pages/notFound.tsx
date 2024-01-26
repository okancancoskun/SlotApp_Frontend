import { Empty } from "antd";

export const NotFound = () => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 60 }}
      description={<h1>Page Not Found</h1>}
    ></Empty>
  );
};
