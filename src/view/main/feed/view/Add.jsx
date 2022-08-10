import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addPost } from "../service";
import { isEmpty } from "_services";
import ImageLoader from "components/ImageLoader";



const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const schema = yup.object({
  image: yup.mixed(),
  post_detail: yup.string()
});
const Add = ({ userModel }) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { enqueueSnackbar } = useSnackbar();

  const submitForm = (fdata) => {
    if (isEmpty(fdata.post_detail)) {
      enqueueSnackbar("Post cannot be blank", {
        variant: 'error',
      });
      return false;
    }
    addPost(fdata).then(e => {
      if (e.flag) {
        enqueueSnackbar("Post uploaded", {
          variant: 'success',
        });
        // reset();
        // setOpen(false);
      }
    })
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create Post"
        sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={600}
          height={'auto'}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={3}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src={userModel.img}
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              {userModel.name}
            </Typography>
          </UserBox>
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="post_detail"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    sx={{ width: "100%" }}
                    multiline
                    rows={3}
                    placeholder="What's on your mind?"
                    variant="standard"
                    {...field}
                  />
                </>
              )}
            />
            <Stack direction="row" gap={1} mt={2} mb={2}>
              <label htmlFor="uploadimages">
                <Image color="secondary" />
              </label>
            </Stack>
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <ImageLoader
                    multiple={true}
                    InputProps={{
                      accept: "image/*",
                      id: 'uploadimages'
                    }}
                    size='md'
                    isModal={false}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </>
              )}
            />
            <ButtonGroup
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button type="submit">Post</Button>
            </ButtonGroup>
          </form>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
