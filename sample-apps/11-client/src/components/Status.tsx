import { useState } from "react";
import {
  Alert,
  Button,
  SpaceBetween
} from "@cloudscape-design/components";

function Status() {
  const [btnStatus, setBtnStatus] = useState(false);
  const [btnCancel, setBtnCancel] = useState(false);
  const [btnLoadingStatus, setBtnLoadingStatus] = useState(false);
  const [btnLoadingCancel, setBtnLoadingCancel] = useState(false);

  function waitTimeStatus() {
    setInterval(() => {
      setBtnStatus(true);
      setBtnLoadingStatus(false);
    }, 1000 * 2)
  }

  function waitTimeCancel() {
    setInterval(() => {
      setBtnCancel(true);
      setBtnLoadingCancel(false);
    }, 1000 * 6)
  }

  const handleStatus = async () => {
    fetch('/delivery-status')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
    setBtnLoadingStatus(true);
    waitTimeStatus();
  }

  const handleCancel = async () => {
    fetch('/cancel-order')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      });
    setBtnLoadingCancel(true);
    waitTimeCancel();
  }

  return (
    <>
      <SpaceBetween direction="vertical" size="l">
        <Button
          disabled={btnStatus}
          iconName="status-info"
          loading={btnLoadingStatus}
          onClick={handleStatus}
          variant="primary"
        >
          Get order status
        </Button>

        <Alert
          visible={btnStatus}
          header="Order Status"
          type="success"
        >
          On the way!
        </Alert>


        <Button
          disabled={btnCancel}
          iconName="status-stopped"
          loading={btnLoadingCancel}
          onClick={handleCancel}
        >
          Cancel order
        </Button>

        <Alert
          visible={btnCancel}
          header="Cancel"
          type="error"
        >
          We'll process your cancelation shortly.
        </Alert>

      </SpaceBetween>
    </>
  )
}

export default Status;
