import { Button, Spinner } from "react-bootstrap";
import { CloudUpload } from "@mui/icons-material";

const SubmitButton = ({ loading, text, disabledCondition = false }) => {
    
  return (
    <Button
      type="submit"
      variant="success"
      className="px-5 py-2 fw-bold"
      disabled={loading || disabledCondition}
    >
      {loading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          {text}...
        </>
      ) : (
        <>
          <CloudUpload className="me-2" />
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
