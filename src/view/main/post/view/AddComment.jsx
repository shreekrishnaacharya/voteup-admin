import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    styled,
    TextField,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    post_detail: yup.string()
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "50px",
});
const AddComment = ({ userModel, onAddComment }) => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <Box mb={2}>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit((fb) => { onAddComment(fb); reset({ 'comment': '' }) })}>
                            <Box gap={3} sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                <UserBox>
                                    <Avatar
                                        src={userModel.img}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </UserBox>
                                <Box width={'100%'}>
                                    <Controller
                                        name="post_detail"
                                        defaultValue={''}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <TextField
                                                    multiline
                                                    // rows={2}
                                                    sx={{ width: "100%" }}
                                                    placeholder="Post your idea, issue and agenda here!"
                                                    // variant="standard"
                                                    {...field}
                                                />
                                            </>
                                        )}
                                    />

                                </Box>
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="outlined primary button group"
                                >
                                    <Button type="submit">Add</Button>
                                </ButtonGroup>
                            </Box>
                        </form>
                    </CardContent>

                </Card>
            </Box>
        </>
    );
};

export default AddComment
