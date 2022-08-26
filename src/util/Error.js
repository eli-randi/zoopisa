import { createContext, useState, useContext } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

export function fakeAPIRequest(value) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000, value);
  });
}

export let ErrorContext = createContext(null)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ErrorProvider(props) {
  let [isError, setIsError] = useState(false);
  let [useDummyData, setUseDummyData] = useState(false);

  const addDummyData = () => setUseDummyData(true);
  const addError = () => setIsError(true);
  const removeError = () => setIsError(false);

  return <ErrorContext.Provider value={{ isError, addError, removeError, useDummyData, addDummyData }}>{props.children}</ErrorContext.Provider>
}

export default function ErrorModal() {
  let errors = useContext(ErrorContext);
  const handleClose = () => {
    errors.removeError();
  }

  return (
    <div>
      <Modal
        open={errors.isError}
        onClose={handleClose}
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <Box sx={style}>
          <Typography id="error-title" variant="h6" component="h2">
            Sorry... you have hit the rate limit allowed by the API
          </Typography>
          <Typography id="error-description" sx={{ mt: 2 }}>
            Please click here to see the website with example data - type Westbury to see results.
            <Button onClick={() => {
              errors.addDummyData();
              handleClose();
            }}>
              Click me
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );

}
