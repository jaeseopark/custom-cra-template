import { Scrollbars } from "react-custom-scrollbars";

const AutohideScroll = (props) => {
    const { children, restProps } = props;
    return (
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} {...restProps}>
            {children}
        </Scrollbars>
    );
};

export default AutohideScroll;
