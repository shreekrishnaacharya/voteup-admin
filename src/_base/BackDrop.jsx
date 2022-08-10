function BackDrop({ open, message }) {
    return (
        <div class="ui segment" style={{ display: open ? 'block' : 'none' }}>
            <div class="ui active inverted dimmer">
                <div class="ui text loader">{message}</div>
            </div>
            <p></p>
        </div>
    );
}

BackDrop.defaultProps = {
    open: true,
    message: "Loading",
};

export default BackDrop;