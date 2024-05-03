import React from "react";
import { Alert, Flex, Spin } from "antd";
import "./loading.css";

const LoadingCircle = () => (
  <div style={{ height: "90vh", display: "flex", justifyContent: "center" }}>
    {/* <Spin tip="Loading" size="small">
        <div className="content" />
      </Spin>
      <Spin tip="Loading">
        <div className="content" />
      </Spin> */}
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>

    {/* <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin> */}
  </div>
);
export default LoadingCircle;
