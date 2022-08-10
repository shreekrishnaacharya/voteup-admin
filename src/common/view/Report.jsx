import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import PropTypes from 'prop-types';
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
  rtype: yup.number(),
  remark: yup.string()
});

const Report = ({ open, onReport, onClose, title }) => {
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleSubmit((fd) => { onReport(fd, reset) })}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: 20, padding: '16px 20px' }}>
            {title ? title : "Repost this content"}
          </DialogTitle>
          <DialogContent sx={{ padding: '20px' }}>

            <Stack direction="column" gap={5}>
              <Controller
                name="rtype"
                control={control}
                defaultValue={0}
                render={({ field, fieldState }) => (
                  <div>
                    <InputLabel sx={{ margin: '5px 0px' }}>Select type of voilation</InputLabel>
                    <Select
                      sx={{ width: "100%" }}
                      {...field}
                    >
                      <MenuItem value={0}>
                        <em>Select type of voilation</em>
                      </MenuItem>
                      <MenuItem value={1}>Advertisment</MenuItem>
                      <MenuItem value={2}>Abuse</MenuItem>
                      <MenuItem value={3}>Sexual Content</MenuItem>
                    </Select>
                  </div>
                )}
              />
              <Controller
                name="remark"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <InputLabel sx={{ margin: '5px 0px' }}>Description</InputLabel>
                    <TextField
                      sx={{ width: "100%" }}
                      multiline
                      rows={3}
                      placeholder="What is wrong with this post?"
                      variant="standard"
                      {...field}
                    />
                  </div>
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ padding: '20px' }}>
            <Button
              variant='outlined'
              color={'warning'}
              onClick={() => {
                onClose()
              }}>Cancel</Button>
            <Button color={'success'} variant='outlined'
              type="submit"
              autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </>
  );
};

Report.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default Report;
